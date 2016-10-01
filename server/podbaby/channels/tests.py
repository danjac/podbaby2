import datetime
import json

from unittest import mock

from django.test import TestCase

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from account.factories import UserFactory

from episodes.factories import EpisodeFactory

from subscriptions.models import Subscription

from channels.factories import ChannelFactory
from channels.models import Channel, InvalidFeed


class MockEpisode:

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)


class MockResponse:
    status_code = 200
    content = ''


class MockRequests:

    def get(self, *args, **kwargs):
        return MockResponse()


class ChannelViewSetTests(APITestCase):

    def test_list(self):

        ChannelFactory.create_batch(3)

        resp = self.client.get('/api/channels/', format='json')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 3)

    def test_subscribe(self):

        channel = ChannelFactory.create()

        user = UserFactory.create()
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        resp = self.client.post(
            '/api/channels/{}/subscribe/'.format(
                channel.id
            ), format='json')

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Subscription.objects.exists())

    def test_unsubscribe(self):

        channel = ChannelFactory.create()

        user = UserFactory.create()
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        Subscription.objects.create(
            channel=channel,
            user=user,
        )

        resp = self.client.delete(
            '/api/channels/{}/unsubscribe/'.format(
                channel.id
            ), format='json')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        self.assertFalse(Subscription.objects.exists())

    def test_subscribed(self):

        ChannelFactory.create_batch(3)

        channel = ChannelFactory.create(name='Joe Rogan')

        user = UserFactory.create()
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        Subscription.objects.create(
            channel=channel,
            user=user,
        )
        resp = self.client.get('/api/channels/subscribed/', format='json')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 1)
        self.assertEqual(data['results'][0]['name'], 'Joe Rogan')

    def test_episodes(self):

        channel = ChannelFactory.create()
        EpisodeFactory.create_batch(3, channel=channel)
        resp = self.client.get(
            '/api/channels/{}/episodes/'.format(channel.id),
            format='json',
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 3)

    def test_episodes_search(self):

        channel = ChannelFactory.create()
        EpisodeFactory.create_batch(3, channel=channel)
        EpisodeFactory.create(title='test', channel=channel)
        resp = self.client.get(
            '/api/channels/{}/episodes/'.format(channel.id),
            {
                'q': 'test',
            },
            format='json',
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 1)
        self.assertEqual(data['results'][0]['title'], 'test')

    def test_search(self):

        ChannelFactory.create_batch(3)
        ChannelFactory.create(name='Joe Rogan')
        resp = self.client.get(
            '/api/channels/',
            {
                'q': 'joe rogan',
            },
            format='json',
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 1)
        result = data['results'][0]
        self.assertEqual(result['name'], 'Joe Rogan')


@mock.patch('channels.models.requests', MockRequests)
class ChannelTests(TestCase):

    def test_search(self):

        ChannelFactory.create(name='Joe Rogan')

        self.assertEqual(Channel.objects.search('joe rogan').count(), 1)

    def test_fetch_if_bad(self):
        """
        If a bad request, then raise InvalidFeed error
        """

        channel = ChannelFactory(name='old_title')

        class MockPodcast:

            def __init__(self, request):

                # podcast must have a title
                self.title = None

        with mock.patch('channels.models.Podcast', MockPodcast):
            self.assertRaises(InvalidFeed, channel.fetch)

    def test_fetch_if_ok(self):
        """
        Change details and add any new episodes
        """

        channel = ChannelFactory(name='old_title')

        EpisodeFactory(
            channel=channel,
            title='test 1',
            guid='1',
        )

        class MockPodcast:

            def __init__(self, request):

                self.title = 'new title'

                self.itunes_explicit = 'yes'
                self.itunes_categories = ['Society & Culture']
                self.link = 'http://example.com'
                self.description = 'test'
                self.copyright = ''
                self.creative_commons = ''
                self.image_url = None
                self.itune_image = None

                now = datetime.datetime.now()

                self.items = [
                    MockEpisode(
                        guid=str(i),
                        date_time=now,
                        title='test %d' % i,
                        link='',
                        itunes_explicit='yes',
                        itunes_subtitle='',
                        itunes_summary='',
                        itunes_duration='1:30:10',
                        description='test',
                        author='tester',
                        creative_commons='',
                        published=now,
                        enclosure_url='http://example.com',
                        enclosure_length=100000,
                        enclosure_type='audio/mp3',
                    ) for i in range(3)
                ]

        with mock.patch('channels.models.Podcast', MockPodcast):
            new_episodes = channel.fetch()

        self.assertEqual(channel.name, 'new title')
        self.assertTrue(channel.explicit)
        # only 2 new episodes
        self.assertEqual(new_episodes, 2)
        self.assertEqual(channel.episode_set.count(), 3)
        # check for new categories
        self.assertEqual(channel.categories.count(), 1)

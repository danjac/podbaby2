import datetime
import json

from unittest import mock

from django.test import TestCase

from rest_framework import status
from rest_framework.test import APITestCase

from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyText

from episodes.models import Episode
from channels.models import Channel, InvalidFeed


class ChannelFactory(DjangoModelFactory):

    rss_feed = FuzzyText(prefix='http://', suffix='.com/rss')

    class Meta:
        model = Channel


class EpisodeFactory(DjangoModelFactory):

    class Meta:
        model = Episode


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

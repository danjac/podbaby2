import json

from unittest import mock

from django.test import TestCase
from django.core.urlresolvers import reverse
from django.contrib.postgres.search import SearchVector

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from account.factories import UserFactory

from subscriptions.models import Subscription
from bookmarks.models import Bookmark
from history.models import Play

from episodes.models import Episode
from episodes.factories import EpisodeFactory


class MockResponse:
    content = ''

    def __init__(self, status_code=200):
        self.status_code = status_code

    def iter_content(self, chunk):
        return self.content


class MockRequests:

    def __init__(self, response):
        self.response = response

    def get(self, *args, **kwargs):
        return self.response


class EpisodeStreamTests(TestCase):

    def test_get_if_no_enclosure_url(self):

        episode = EpisodeFactory.create(enclosure_url='')
        url = reverse('stream-episode', args=[episode.id, '.mp3'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_get_if_enclosure_url(self):

        episode = EpisodeFactory.create(
            enclosure_url='http://testme.mp3'
        )
        url = reverse('stream-episode', args=[episode.id, '.mp3'])

        mock_requests = MockRequests(MockResponse(200))

        with mock.patch('episodes.views.requests', mock_requests):
            response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

    def test_get_if_enclosure_url_bad_response(self):

        episode = EpisodeFactory.create(
            enclosure_url='http://testme.mp3'
        )
        url = reverse('stream-episode', args=[episode.id, '.mp3'])

        mock_requests = MockRequests(MockResponse(403))

        with mock.patch('episodes.views.requests', mock_requests):
            response = self.client.get(url)

        self.assertEqual(response.status_code, 404)


class EpisodeViewSetTests(APITestCase):

    def test_list(self):

        EpisodeFactory.create_batch(3)
        resp = self.client.get('/api/episodes/', format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 3)

    def test_add_play(self):

        episode = EpisodeFactory.create()

        user = UserFactory.create()
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        resp = self.client.post(
            '/api/episodes/{}/add_play/'.format(
                episode.id
            ), format='json')

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Play.objects.exists())

    def test_add_bookmark(self):

        episode = EpisodeFactory.create()

        user = UserFactory.create()
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        resp = self.client.post(
            '/api/episodes/{}/add_bookmark/'.format(
                episode.id
            ), format='json')

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Bookmark.objects.exists())

    def test_remove_bookmark(self):

        episode = EpisodeFactory.create()
        user = UserFactory.create()

        Bookmark.objects.create(episode=episode, user=user)

        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        resp = self.client.delete(
            '/api/episodes/{}/remove_bookmark/'.format(
                episode.id
            ), format='json')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        self.assertFalse(Bookmark.objects.exists())

    def test_subscribed_if_user_signed_in(self):

        episode = EpisodeFactory.create()
        user = UserFactory.create()
        Subscription.objects.create(user=user, channel=episode.channel)

        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        resp = self.client.get('/api/episodes/subscribed/', format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 1)

    def test_subscribed_if_user_not_signed_in(self):

        resp = self.client.get('/api/episodes/subscribed/', format='json')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_bookmarks_if_user_signed_in(self):

        episode = EpisodeFactory.create()
        user = UserFactory.create()
        Bookmark.objects.create(user=user, episode=episode)

        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        resp = self.client.get('/api/episodes/bookmarks/', format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 1)

    def test_bookmarks_if_user_not_signed_in(self):

        resp = self.client.get('/api/episodes/bookmarks/', format='json')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_search(self):
        """
        If query includes 'q' parameter, search on that query
        """

        EpisodeFactory.create_batch(3)
        EpisodeFactory.create(title='my test')
        resp = self.client.get(
            '/api/episodes/',
            {
                'q': 'my test',
            },
            format='json'
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 1)
        result = data['results'][0]
        self.assertEqual(result['title'], 'my test')


class ModelTests(TestCase):

    def setUp(self):
        Episode.objects.update(
            search_vector=SearchVector('title', 'description')
        )

    def test_search_by_title(self):

        EpisodeFactory.create(title='my test')
        self.assertEqual(Episode.objects.search('test').count(), 1)

    def test_get_stream_url_if_none(self):
        """
        Should just be None if no enclosure url
        """

        e = Episode()
        self.assertEqual(e.get_stream_url(), None)

    def test_get_stream_url_if_http(self):
        """
        Http links should proxy
        """

        e = Episode(
            pk=1000,
            enclosure_url='http://www.libsyn.com/podcast_160911.mp3'
        )
        self.assertEqual(e.get_stream_url(), '/stream/1000.mp3')

    def test_get_stream_url_if_https(self):
        """
        Https links should return same URL
        """

        e = Episode(
            pk=1000,
            enclosure_url='https://www.libsyn.com/podcast_160911.mp3'
        )
        self.assertEqual(e.get_stream_url(), e.enclosure_url)

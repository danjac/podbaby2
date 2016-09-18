import json

from django.test import TestCase
from django.contrib.auth import get_user_model

from factory import SubFactory
from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyText

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from bookmarks.models import Bookmark
from episodes.models import Episode, Channel

User = get_user_model()


class UserFactory(DjangoModelFactory):

    username = FuzzyText()
    password = 'test'

    class Meta:
        model = User

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """Override the default ``_create`` with our custom call."""
        manager = cls._get_manager(model_class)
        # The default would use ``manager.create(*args, **kwargs)``
        return manager.create_user(*args, **kwargs)


class ChannelFactory(DjangoModelFactory):

    name = FuzzyText()
    rss_feed = FuzzyText(prefix='http://', suffix='.com/rss')

    class Meta:
        model = Channel


class EpisodeFactory(DjangoModelFactory):

    channel = SubFactory(ChannelFactory)
    enclosure_url = FuzzyText(prefix='http://', suffix='.com/test.mp3')

    class Meta:
        model = Episode


class ViewTests(APITestCase):

    def test_list(self):

        EpisodeFactory.create_batch(3)
        resp = self.client.get('/api/episodes/', format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        data = json.loads(resp.content.decode('utf-8'))
        self.assertEqual(len(data['results']), 3)

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

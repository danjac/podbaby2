from unittest import mock

from django.utils import timezone
from django.test import TestCase

from factory.django import DjangoModelFactory

from podcasts.models import Channel, Episode


class ChannelFactory(DjangoModelFactory):
    class Meta:
        model = Channel


class EpisodeFactory(DjangoModelFactory):
    class Meta:
        model = Episode


class MockEpisode(object):

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)


class MockResponse(object):
    content = ''


class MockRequests(object):

    def get(self, *args, **kwargs):
        return MockResponse()


@mock.patch('podcasts.models.requests', MockRequests)
class ChannelTests(TestCase):

    def test_fetch_if_ok(self):
        """
        Change details and add any new episodes
        """

        channel = ChannelFactory(name='old_title')
        assert channel.id

        EpisodeFactory(
            channel=channel,
            title='test 1',
            guid='1',
        )

        class MockPodcast(object):

            def __init__(self, request):

                self.is_valid_podcast = True
                self.title = 'new title'

                self.itunes_explicit = 'yes'
                self.itunes_categories = ['Society & Culture']
                self.link = 'http://example.com'
                self.description = 'test'
                self.copyright = ''
                self.creative_commons = ''
                self.image_url = None

                now = timezone.now()

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

        with mock.patch('podcasts.models.Podcast', MockPodcast):
            new_episodes = channel.fetch()

        self.assertEqual(channel.title, 'new title')
        self.assertTrue(channel.explicit)
        # only 2 new episodes
        self.assertEqual(new_episodes, 2)
        self.assertEqual(channel.episode_set.count(), 3)
        # check for new categories
        self.assertEqual(channel.categories.count(), 1)

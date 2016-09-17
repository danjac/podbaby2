from django.test import TestCase


from episodes.models import Episode


class EpisodeTests(TestCase):

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

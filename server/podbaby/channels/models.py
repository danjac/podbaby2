import requests

from urllib.parse import urlparse

from django.conf import settings
from django.db import models
from django.core.files.base import ContentFile
from django.utils.timezone import make_aware

from django_extensions.db.models import TimeStampedModel

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit

from pyPodcastParser.Podcast import Podcast

from categories.models import Category


class InvalidFeed(RuntimeError):
    pass


class Channel(TimeStampedModel):

    rss_feed = models.URLField(max_length=200, unique=True)
    name = models.CharField(max_length=200, blank=True)
    link = models.URLField(blank=True)
    description = models.TextField(blank=True)
    explicit = models.BooleanField(default=False)
    copyright = models.CharField(max_length=100, blank=True)
    creative_commons = models.CharField(max_length=60, blank=True)

    categories = models.ManyToManyField(Category, blank=True)

    image = models.ImageField(upload_to='images', null=True, blank=True)

    thumbnail = ImageSpecField(
        source='image',
        processors=[ResizeToFit(120, 120)],
        format='PNG',
        options={'quality': 60},
    )

    finder = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
    )

    class Meta:
        ordering = ('name', '-created')

    def __str__(self):
        return self.name

    def fetch(self):
        """
        Fetches the podcast content, updates data and
        adds any new episodes if necessary.

        Returns:
            int: number of new episodes.
        Raises:
            InvalidFeed
        """

        request_headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) '
                          'AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/39.0.2171.95 Safari/537.36',
        }

        try:
            response = requests.get(
                self.rss_feed, headers=request_headers)
            if response.status_code != 200:
                raise InvalidFeed('Network error: %d' % response.status_code)
            podcast = Podcast(response.content)
        except requests.exceptions.RequestException as e:
            raise InvalidFeed('Network error') from e

        if not podcast.title:
            raise InvalidFeed('Podcast missing title')

        self.name = podcast.title or ''
        self.link = podcast.link or ''
        self.explicit = podcast.itunes_explicit == 'yes'
        self.description = podcast.description or ''
        self.copyright = podcast.copyright or ''
        self.creative_commons = podcast.creative_commons or ''

        # fetch image, if any

        image = podcast.image_url or podcast.itune_image

        if image:
            try:
                resp = requests.get(image, headers=request_headers)
                if resp.status_code == 200:
                    name = urlparse(image).path.split("/")[-1]
                    self.image = ContentFile(resp.content, name=name)
            except requests.exceptions.RequestException:
                pass

        self.save()

        # categories
        for name in podcast.itunes_categories:
            category, _ = Category.objects.get_or_create(name=name)
            self.categories.add(category)

        new_episodes = 0

        for item in podcast.items:

            if not all((
                    item.guid,
                    item.enclosure_url,
                    item.date_time)):

                continue

            fields = {
                'title': item.title or '',
                'link': item.link or '',
                'explicit': item.itunes_explicit == 'yes',
                'subtitle': item.itunes_subtitle or '',
                'summary': item.itunes_summary or '',
                'description': item.description or '',
                'author': item.author or item.itunes_author_name or '',
                'creative_commons': item.creative_commons or '',
                'duration': item.itunes_duration or '',
                'published': make_aware(item.date_time).date(),
                'enclosure_url': item.enclosure_url,
                'enclosure_length': item.enclosure_length,
                'enclosure_type': item.enclosure_type or '',
            }

            _, created = self.episode_set.get_or_create(
                guid=item.guid,
                defaults=fields,
            )

            if created:
                new_episodes += 1

        return new_episodes

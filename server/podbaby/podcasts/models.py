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


class Category(models.Model):
    """
    An iTunes podcast category
    """
    name = models.CharField(max_length=80, unique=True)

    class Meta:
        ordering = ('name', )
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


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
        """

        podcast = Podcast(requests.get(self.rss_feed).content)

        self.name = podcast.title
        self.link = podcast.link or ''
        self.explicit = podcast.itunes_explicit == 'yes'
        self.description = podcast.description or ''
        self.copyright = podcast.copyright or ''
        self.creative_commons = podcast.creative_commons or ''

        # fetch image, if any

        image = podcast.image_url or podcast.itune_image

        if image:
            resp = requests.get(image)
            if resp.status_code == 200:
                name = urlparse(image).path.split("/")[-1]
                self.image = ContentFile(resp.content, name=name)

        self.save()

        # categories
        for name in podcast.itunes_categories:
            category, _ = Category.objects.get_or_create(name=name)
            self.categories.add(category)

        new_episodes = 0

        for item in podcast.items:

            if not item.guid:
                continue

            fields = {
                'title': item.title,
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


class Episode(TimeStampedModel):

    channel = models.ForeignKey(Channel)
    guid = models.CharField(max_length=200)

    title = models.CharField(max_length=200)
    link = models.URLField(blank=True)
    explicit = models.BooleanField(default=False)

    subtitle = models.TextField(blank=True)
    description = models.TextField(blank=True)
    summary = models.TextField(blank=True)

    author = models.CharField(max_length=100, blank=True)
    creative_commons = models.CharField(max_length=60, blank=True)

    published = models.DateField(null=True, blank=True)

    duration = models.CharField(max_length=10, blank=True)

    enclosure_url = models.URLField(null=True, blank=True)
    enclosure_length = models.BigIntegerField(null=True, blank=True)
    enclosure_type = models.CharField(max_length=20, blank=True)

    class Meta:
        unique_together = ('channel', 'guid')
        ordering = ('-published', '-created')

    def __str__(self):
        return "{} - {}".format(self.title, self.channel)

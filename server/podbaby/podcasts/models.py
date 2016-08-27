from django.db import models
from django.conf import settings

from django_extensions.db.models import TimeStampedModel

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit


class Category(models.Model):
    """
    An iTunes podcast category
    """
    name = models.CharField(max_length=80, unique=True)


class Channel(TimeStampedModel):

    name = models.CharField(max_length=200)
    rss_feed = models.URLField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    explicit = models.BooleanField(default=False)
    copyright = models.CharField(max_length=100, blank=True)
    creative_commons = models.CharField(max_length=60, blank=True)

    categories = models.ManyToManyField(Category, blank=True)

    image = models.ImageField(upload_to='images')

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


class Episode(TimeStampedModel):

    channel = models.ForeignKey(Channel)

    title = models.CharField(max_length=200)
    explicit = models.BooleanField(default=False)

    subtitle = models.TextField(blank=True)
    description = models.TextField(blank=True)
    summary = models.TextField(blank=True)

    author = models.CharField(max_length=100, blank=True)
    creative_commons = models.CharField(max_length=60, blank=True)

    published = models.DateTimeField(null=True, blank=True)

    duration = models.CharField(max_length=10, blank=True)

    enclosure_url = models.URLField(null=True, blank=True)
    enclosure_length = models.BigIntegerField(null=True, blank=True)
    enclosure_type = models.CharField(max_length=20, blank=True)

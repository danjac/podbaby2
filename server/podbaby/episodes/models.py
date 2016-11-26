import os

from urllib.parse import urlparse

from django.conf import settings
from django.db import models
from django.core.validators import URLValidator
from django.core.urlresolvers import reverse
from django.contrib.postgres.search import SearchVectorField

from django_extensions.db.models import TimeStampedModel

from channels.models import Channel


class EpisodeQuerySet(models.QuerySet):

    def search(self, query):
        return (
            self.filter(search_vector=query) |
            self.filter(channel__search_vector=query)
        )


class Episode(TimeStampedModel):

    channel = models.ForeignKey(Channel)
    guid = models.CharField(max_length=200)

    title = models.TextField()

    link = models.TextField(
        blank=True,
        validators=[URLValidator()],
    )

    explicit = models.BooleanField(default=False)

    subtitle = models.TextField(blank=True)
    description = models.TextField(blank=True)
    summary = models.TextField(blank=True)

    author = models.TextField(blank=True)
    creative_commons = models.TextField(blank=True)

    published = models.DateField(null=True, blank=True)

    duration = models.CharField(max_length=60, blank=True)

    enclosure_url = models.TextField(
        blank=True,
        validators=[URLValidator()],
    )

    enclosure_length = models.BigIntegerField(null=True, blank=True)
    enclosure_type = models.CharField(max_length=60, blank=True)

    bookmarkers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        through='bookmarks.Bookmark',
        related_name='bookmarks',
    )

    players = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        through='history.Play',
        related_name='played',
    )

    search_vector = SearchVectorField(null=True, blank=True)

    objects = EpisodeQuerySet.as_manager()

    class Meta:
        unique_together = ('channel', 'guid')
        ordering = ('-published', '-created')

    def __str__(self):
        return "{} - {}".format(self.title, self.channel)

    def get_stream_url(self):
        """
        Returns the proxy URL if an http enclosure URL
        """
        if not self.enclosure_url:
            return None

        result = urlparse(self.enclosure_url)
        if result.scheme == 'https':
            return self.enclosure_url
        _, ext = os.path.splitext(result.path)
        return reverse('stream-episode', args=[self.pk, ext])

    def is_explicit(self):
        """
        If marked explicit or channel is marked explicit

        Returns:
            bool
        """
        return self.explicit or self.channel.explicit

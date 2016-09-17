import os

from urllib.parse import urlparse

from django.db import models
from django.core.urlresolvers import reverse

from django_extensions.db.models import TimeStampedModel

from channels.models import Channel


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
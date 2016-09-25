import os

from urllib.parse import urlparse

from django.conf import settings
from django.db import models
from django.db.models import Q
from django.core.urlresolvers import reverse

from django_extensions.db.models import TimeStampedModel

from channels.models import Channel


class EpisodeQuerySet(models.QuerySet):

    def search(self, query):
        q = Q()
        for term in query.split():
            sq = Q(
                Q(title__icontains=term) |
                Q(description__icontains=term) |
                Q(channel__name__icontains=term)
            )
            q = q & sq
        return self.filter(q)


class Episode(TimeStampedModel):

    channel = models.ForeignKey(Channel)
    guid = models.CharField(max_length=200)

    users = models.ManyToManyField(
       settings.AUTH_USER_MODEL,
       blank=True,
       through='bookmarks.Bookmark',
       related_name='episodes',
    )

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

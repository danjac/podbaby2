from django.conf import settings
from django.db import models

from django_extensions.db.models import TimeStampedModel

from episodes.models import Episode


class Play(TimeStampedModel):
    episode = models.ForeignKey(Episode)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='plays')

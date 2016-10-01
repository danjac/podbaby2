from django.conf import settings
from django.db import models
from django_extensions.db.models import TimeStampedModel


from channels.models import Channel


class Subscription(TimeStampedModel):

    channel = models.ForeignKey(Channel)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyText

from channels.models import Channel


class ChannelFactory(DjangoModelFactory):

    rss_feed = FuzzyText(prefix='http://', suffix='.com/rss')

    class Meta:
        model = Channel

from factory import SubFactory
from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyText

from channels.factories import ChannelFactory
from episodes.models import Episode


class EpisodeFactory(DjangoModelFactory):

    channel = SubFactory(ChannelFactory)
    guid = FuzzyText()
    enclosure_url = FuzzyText(prefix='http://', suffix='.com/test.mp3')

    class Meta:
        model = Episode

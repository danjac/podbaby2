from rest_framework import serializers

from channels.serializers import ChannelSerializer

from episodes.models import Episode


class EpisodeSerializer(serializers.ModelSerializer):

    explicit = serializers.SerializerMethodField('is_explicit')
    stream_url = serializers.SerializerMethodField()

    class Meta:
        model = Episode
        fields = (
            'id',
            'link',
            'title',
            'subtitle',
            'summary',
            'description',
            'published',
            'explicit',
            'author',
            'creative_commons',
            'duration',
            'enclosure_url',
            'enclosure_type',
            'enclosure_length',
            'stream_url',
        )

    def get_stream_url(self, obj):
        url = obj.get_stream_url()
        request = self.context.get('request', None)
        if request and url and not url.startswith('https'):
            url = request.build_absolute_uri(url)
        return url

    def is_explicit(self, obj):
        return obj.is_explicit()


class EpisodeDetailSerializer(EpisodeSerializer):
    """
    Full serializer with all related fields
    """

    channel = ChannelSerializer()

    class Meta(EpisodeSerializer.Meta):
        model = Episode

        fields = EpisodeSerializer.Meta.fields + (
            'channel',
        )

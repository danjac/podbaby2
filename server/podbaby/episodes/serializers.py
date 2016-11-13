from rest_framework import serializers

from channels.serializers import ChannelSerializer

from episodes.models import Episode


class SimpleEpisodeSerializer(serializers.ModelSerializer):

    last_played = serializers.SerializerMethodField()
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
            'last_played',
            'stream_url',
        )

    def get_last_played(self, obj):
        """
        Possible annotated field
        """
        return getattr(obj, 'last_played', None)

    def get_stream_url(self, obj):
        url = obj.get_stream_url()
        request = self.context.get('request', None)
        if request and url and not url.startswith('https'):
            url = request.build_absolute_uri(url)
        return url

    def is_explicit(self, obj):
        return obj.is_explicit()


class EpisodeSerializer(SimpleEpisodeSerializer):
    """
    Full serializer with all related fields
    """

    channel = ChannelSerializer()

    class Meta(SimpleEpisodeSerializer.Meta):
        model = Episode

        fields = SimpleEpisodeSerializer.Meta.fields + (
            'channel',
        )

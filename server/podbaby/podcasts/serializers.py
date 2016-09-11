from rest_framework import serializers

from podcasts.models import Channel, Episode, Category


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name')


class ChannelSerializer(serializers.ModelSerializer):

    categories = CategorySerializer(many=True)
    thumbnail = serializers.SerializerMethodField('get_thumbnail_info')

    class Meta:
        model = Channel
        fields = (
            'id',
            'rss_feed',
            'name',
            'link',
            'description',
            'explicit',
            'copyright',
            'creative_commons',
            'thumbnail',
            'categories',
        )

    def get_thumbnail_info(self, obj):
        if not obj.thumbnail:
            return None
        url = obj.thumbnail.url
        request = self.context.get('request', None)
        if request:
            url = request.build_absolute_uri(url)
        return {
            'url': url,
            'width': obj.thumbnail.width,
            'height': obj.thumbnail.height,
        }


class EpisodeSerializer(serializers.ModelSerializer):

    channel = ChannelSerializer()
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
            'channel',
        )

    def get_stream_url(self, obj):
        return self.context['request'].build_absolute_uri(obj.get_stream_url())

    def is_explicit(self, obj):
        return obj.is_explicit()

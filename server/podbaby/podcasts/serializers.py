from rest_framework import serializers

from podcasts.models import Channel, Episode, Category


class CategorySerializer(serializers.ModelSerializer):

    model = Category
    fields = ('id', 'name')


class ChannelSerializer(serializers.ModelSerializer):

    thumbnail = serializers.SerializerMethodField('get_thumbnail_info')

    class Meta:
        model = Channel
        fields = (
            'id',
            'name',
            'link',
            'description',
            'explicit',
            'copyright',
            'creative_commons',
            'thumbnail',
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
            'channel',
        )

    def is_explicit(self, obj):
        return obj.is_explicit()

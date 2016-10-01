from rest_framework import serializers


from categories.serializers import CategorySerializer
from channels.models import Channel


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

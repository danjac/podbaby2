from rest_framework import serializers

from history.models import Play


class PlaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Play
        fields = (
            'episode',
            'created',
        )

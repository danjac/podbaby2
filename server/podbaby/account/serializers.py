from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.authtoken.models import Token

from history.serializers import PlaySerializer

User = get_user_model()


class CreateUserSerializer(serializers.ModelSerializer):

    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'token')

    def get_token(self, obj):
        token, _ = Token.objects.get_or_create(user=obj)
        return token.key


class UserSerializer(serializers.ModelSerializer):

    bookmarks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    subscriptions = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    plays = PlaySerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'bookmarks',
            'subscriptions',
            'plays',
        )
        read_only_fields = ('username', )

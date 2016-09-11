from django.contrib.auth import get_user_model

from rest_framework import (
    mixins,
    viewsets,
    permissions,
    generics,
)


from account.permissions import IsNewUser
from account.serializers import UserSerializer, CreateUserSerializer


class CreateUser(generics.CreateAPIView):

    permission_classes = [IsNewUser]
    serializer_class = CreateUserSerializer
    model = get_user_model()


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.CreateModelMixin,
                  viewsets.GenericViewSet):

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

from django.contrib.auth import get_user_model
from django.contrib.auth import logout as auth_logout

from rest_framework import (
    mixins,
    viewsets,
    permissions,
    generics,
)

from rest_framework.response import Response
from rest_framework.decorators import detail_route


from account.permissions import IsNewUser
from account.serializers import UserSerializer, CreateUserSerializer
from history.models import Play


class CreateUser(generics.CreateAPIView):

    permission_classes = [IsNewUser]
    serializer_class = CreateUserSerializer
    model = get_user_model()


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    @detail_route(['DELETE'])
    def clear_history(self, request, *args, **kwargs):
        Play.objects.filter(user=self.get_object()).delete()
        return Response()

    @detail_route(['DELETE'])
    def logout(self, request, *args, **kwargs):
        auth_logout(request)
        return Response()

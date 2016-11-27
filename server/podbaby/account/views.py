from django.http import Http404
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth import get_user_model, logout as auth_logout

from rest_framework.response import Response

from rest_framework import (
    mixins,
    viewsets,
    permissions,
    generics,
)

from rest_framework.decorators import detail_route, api_view

from account.permissions import IsNewUser

from account.serializers import (
    UserSerializer,
    CreateUserSerializer,
    ChangeEmailSerializer,
    ChangePasswordSerializer,
)

from history.models import Play

User = get_user_model()


@api_view(['POST'])
def recover_password(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except (KeyError, User.DoesNotExist):
        return Http404()

    new_password = User.objects.make_random_password()
    user.set_password(new_password)
    user.save()

    # send email

    body = render_to_string(
        'account/recover_password.txt', {
            'user': user,
            'new_password': new_password,
        }
    )

    send_mail(
        'Your new password',
        body,
        'services@podbaby.me',
        [user.email],
    )

    return Response()


class CreateUser(generics.CreateAPIView):

    permission_classes = [IsNewUser]
    serializer_class = CreateUserSerializer
    model = User


class UpdateUser(generics.UpdateAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UpdateEmail(UpdateUser):
    serializer_class = ChangeEmailSerializer


class UpdatePassword(UpdateUser):
    serializer_class = ChangePasswordSerializer


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

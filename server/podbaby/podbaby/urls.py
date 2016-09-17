from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from account.views import UserViewSet, CreateUser
from episodes.views import EpisodeViewSet, EpisodeStreamProxy

router = DefaultRouter()

router.register('^auth', UserViewSet, base_name='user')
router.register('^episodes', EpisodeViewSet, base_name='episode')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^stream/(?P<pk>\d+)(?P<extension>.[a-z0-9]+)',
        EpisodeStreamProxy.as_view(),
        name='stream-episode'
        ),
    url(r'^api/auth/create/$', CreateUser.as_view()),
    url(r'^api-token-auth/$', obtain_auth_token),
    url(r'^api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )

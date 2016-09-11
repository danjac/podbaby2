"""podbaby URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

# import debug_toolbar

from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from account.views import UserViewSet, CreateUser
from podcasts.views import EpisodeViewSet

router = DefaultRouter()
router.register('^auth', UserViewSet, base_name='user')
router.register('^episodes', EpisodeViewSet, base_name='episode')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/auth/create/$', CreateUser.as_view()),
    url(r'^api-token-auth/$', obtain_auth_token),
    url(r'^api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
    # urlpatterns += [
    # url(r'^__debug__/', include(debug_toolbar.urls)),
    # ]

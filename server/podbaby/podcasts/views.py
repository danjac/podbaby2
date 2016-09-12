import requests

from django.db.models import Q
from django.http import FileResponse, Http404
from django.views.generic import View
from django.views.generic.detail import SingleObjectMixin

from rest_framework import viewsets

from podcasts.serializers import EpisodeSerializer
from podcasts.models import Episode


class EpisodeStream(SingleObjectMixin, View):

    model = Episode

    def get(self, *args, **kwargs):
        episode = self.get_object()
        if not episode.enclosure_url:
            raise Http404

        resp = requests.get(episode.enclosure_url, stream=True)

        if resp.status_code != 200:
            raise Http404

        return FileResponse(
            resp.iter_content(1024),
            content_type=episode.enclosure_type
        )


class EpisodeViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = EpisodeSerializer

    def get_queryset(self):

        qs = (
            Episode.objects.
            select_related('channel').
            prefetch_related('channel__categories').
            order_by('-published', '-created')
        )

        if 'q' in self.request.GET:
            q = Q()
            for term in self.request.GET['q'].split():
                sq = Q(
                    Q(title__icontains=term) |
                    Q(description__icontains=term) |
                    Q(channel__name__icontains=term)
                )
                q = q & sq
            qs = qs.filter(q)

        return qs

import requests
import calendar

from django.db.models import Q
from django.http import FileResponse, Http404
from django.utils.http import http_date
from django.views.generic import View
from django.views.generic.detail import SingleObjectMixin

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import list_route

from episodes.serializers import EpisodeSerializer
from episodes.models import Episode


class EpisodeStreamProxy(SingleObjectMixin, View):
    """
    Proxy for enclosure URL, for episodes that only
    have an HTTP link
    """

    model = Episode

    def get(self, *args, **kwargs):
        episode = self.get_object()
        if not episode.enclosure_url:
            raise Http404

        resp = requests.get(episode.enclosure_url, stream=True)

        if resp.status_code != 200:
            raise Http404

        response = FileResponse(
            resp.iter_content(1024),
            content_type=episode.enclosure_type


        )

        last_modified = http_date(
            calendar.timegm(episode.created.utctimetuple()))

        response['Last-Modified'] = last_modified
        response['Content-Length'] = episode.enclosure_length

        return response


class EpisodeViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = EpisodeSerializer

    @list_route(permission_classes=[permissions.IsAuthenticated])
    def bookmarks(self, request):
        qs = self.get_queryset().filter(
            users=request.user
        ).order_by('-bookmark__created')

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

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

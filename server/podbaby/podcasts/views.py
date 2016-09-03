from django.db. models import Q

from rest_framework import viewsets

from podbaby.permissions import ReadOnly

from podcasts.serializers import EpisodeSerializer
from podcasts.models import Episode


class EpisodeViewSet(viewsets.ModelViewSet):

    serializer_class = EpisodeSerializer
    permission_classes = [ReadOnly]

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

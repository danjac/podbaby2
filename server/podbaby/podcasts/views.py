from rest_framework import viewsets

from podbaby.permissions import ReadOnly

from podcasts.serializers import EpisodeSerializer
from podcasts.models import Episode


class EpisodeViewSet(viewsets.ModelViewSet):

    serializer_class = EpisodeSerializer
    permission_classes = [ReadOnly]

    def get_queryset(self):
        # we'll expand this later

        return (
            Episode.objects.
            select_related('channel').
            prefetch_related('channel__categories').
            order_by('-published', '-created')
        )

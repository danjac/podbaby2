from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route


from subscriptions.models import Subscription

from episodes.models import Episode
from episodes.serializers import SimpleEpisodeSerializer

from channels.models import Channel
from channels.serializers import ChannelSerializer


class ChannelViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = ChannelSerializer

    @list_route(permission_classes=[permissions.IsAuthenticated])
    def subscribed(self, request):
        qs = self.get_queryset().filter(
            subscribers=request.user
        )
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @detail_route(methods=['POST'],
                  permission_classes=[permissions.IsAuthenticated])
    def subscribe(self, request, pk):
        Subscription.objects.get_or_create(
            channel=self.get_object(),
            user=self.request.user,
        )
        return Response('OK', status=status.HTTP_201_CREATED)

    @detail_route(methods=['DELETE'],
                  permission_classes=[permissions.IsAuthenticated])
    def unsubscribe(self, request, pk):
        Subscription.objects.filter(
            user__pk=self.request.user.id,
            channel__pk=pk,
        ).delete()
        return Response('OK', status=status.HTTP_200_OK)

    @detail_route()
    def episodes(self, request, pk):

        # no need to include channel/categories

        qs = (
            Episode.objects.
            filter(channel__pk=pk).
            with_last_played(self.request.user).
            order_by('-published', '-created')
        )

        if 'q' in self.request.GET:
            qs = qs.search(self.request.GET['q'])

        page = self.paginate_queryset(qs)

        if page is not None:
            serializer = SimpleEpisodeSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = SimpleEpisodeSerializer(qs, many=True)
        return Response(serializer.data)

    def get_queryset(self):

        qs = (
            Channel.objects.
            prefetch_related('categories').
            order_by('name')
        )

        if 'q' in self.request.GET:
            qs = qs.search(self.request.GET['q'])

        return qs

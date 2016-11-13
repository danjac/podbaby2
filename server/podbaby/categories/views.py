from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from rest_framework.pagination import PageNumberPagination

from channels.models import Channel
from channels.serializers import ChannelSerializer

from categories.models import Category
from categories.serializers import CategorySerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Category.objects.order_by('name')
    serializer_class = CategorySerializer
    pagination_class = None

    @detail_route()
    def channels(self, request, pk):
        qs = (
            Channel.objects.
            filter(categories__pk=pk).
            order_by('name')
        )
        if 'q' in self.request.GET:
            qs = qs.search(self.request.GET['q'])

        # override parent pagination
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(qs, self.request)

        if page is not None:
            serializer = ChannelSerializer(
                page,
                many=True,
                context={'request': self.request},
            )

            return paginator.get_paginated_response(serializer.data)

        serializer = ChannelSerializer(
            qs,
            many=True,
            context={'request': self.request},
        )

        return Response(serializer.data)

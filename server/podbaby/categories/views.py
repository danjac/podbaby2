from rest_framework import viewsets


from categories.models import Category
from categories.serializers import CategorySerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Category.objects.order_by('name')
    serializer_class = CategorySerializer
    pagination_class = None

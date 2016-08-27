from django.contrib import admin

from imagekit.admin import AdminThumbnail

from .models import Category, Channel, Episode


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'admin_thumbnail')
    search_fields = ('name', )
    admin_thumbnail = AdminThumbnail(image_field='thumbnail')

admin.site.register(Category)
admin.site.register(Episode)

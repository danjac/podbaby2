from django.contrib import admin

from imagekit.admin import AdminThumbnail

from .models import Channel


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'admin_thumbnail')
    search_fields = ('name', )
    list_filter = ('categories', )

    admin_thumbnail = AdminThumbnail(image_field='thumbnail')

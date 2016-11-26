from django.contrib import admin

from imagekit.admin import AdminThumbnail

from channels.models import Channel
from channels.forms import ChannelAdminForm


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):

    list_display = ('name', 'admin_thumbnail')
    search_fields = ('name', )
    list_filter = ('categories', )
    raw_id_fields = ('categories', )
    form = ChannelAdminForm

    admin_thumbnail = AdminThumbnail(image_field='thumbnail')

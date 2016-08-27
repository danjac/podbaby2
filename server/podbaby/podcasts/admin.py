from django.contrib import admin

from imagekit.admin import AdminThumbnail

from .models import Category, Channel, Episode


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'admin_thumbnail')
    search_fields = ('name', )
    list_filter = ('categories', )
    raw_id_fields = ('finder', )

    admin_thumbnail = AdminThumbnail(image_field='thumbnail')


@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('channel', 'title', 'published')
    search_fields = ('title', 'channel__name')
    raw_id_fields = ('channel', )


admin.site.register(Category)

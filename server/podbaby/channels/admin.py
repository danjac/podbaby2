from django.contrib import admin, messages

from imagekit.admin import AdminThumbnail

from channels.models import Channel
from channels.forms import ChannelAdminForm


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):

    list_display = ('display_name', 'admin_thumbnail')
    search_fields = ('name', )
    list_filter = ('categories', )
    raw_id_fields = ('categories', )
    form = ChannelAdminForm

    admin_thumbnail = AdminThumbnail(image_field='thumbnail')

    def display_name(self, obj):
        return str(obj)

    def save_related(self, request, form, formsets, change):
        """
        Call here to ensure M2M relations preserved
        http://stackoverflow.com/questions/1925383/issue-with-
        manytomany-relationships-not-updating-inmediatly-after-
        save/1925784#1925784
        """

        super().save_related(request, form, formsets, change)

        if not change:
            new_episodes = form.instance.fetch()
            messages.success(request, '%d new episodes added' % new_episodes)

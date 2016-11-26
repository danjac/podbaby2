from django.contrib import admin

from episodes.models import Episode
from episodes.forms import EpisodeAdminForm


@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('channel', 'title', 'published')
    search_fields = ('title', 'channel__name')
    readonly_fields = ('guid', )
    raw_id_fields = ('channel', )
    form = EpisodeAdminForm

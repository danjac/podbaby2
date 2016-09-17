from django.contrib import admin

from episodes.models import Episode


@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('channel', 'title', 'published')
    search_fields = ('title', 'channel__name')
    raw_id_fields = ('channel', )

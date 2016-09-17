from django.db import transaction
from django.core.management.base import BaseCommand, CommandError

from channels.models import Channel


class Command(BaseCommand):
    help = "Adds a new podcast channel, and fetches episodes"

    def add_arguments(self, parser):
        parser.add_argument('url', type=str)

    @transaction.atomic
    def handle(self, *args, **options):
        channel, created = Channel.objects.get_or_create(
            rss_feed=options['url']
        )
        if not created:
            raise CommandError(
                'We already have a podcast channel with'
                ' this URL')
        new_episodes = channel.fetch()
        if new_episodes == 0:
            raise CommandError('Unable to find any episodes for this podcast.')
        self.stdout.write(
            self.style.SUCCESS(
                'New channel added: {} ({} episodes)'.format(
                    channel.name, new_episodes
                )
            )
        )

import requests

from django.core.management.base import BaseCommand, CommandError

from podcasts.models import Channel


class Command(BaseCommand):
    help = "Adds a new podcast channel, and fetches episodes"

    def add_arguments(self, parser):
        parser.add_argument('url', type=str)

    def handle(self, *args, **options):
        channel, created = Channel.objects.get_or_create(
            rss_feed=options['url']
        )
        if not created:
            raise CommandError(
                'We already have a podcast channel with'
                ' this URL')
        try:
            new_episodes = channel.fetch()
        except requests.exceptions.RequestException as e:
            channel.delete()
            raise CommandError(
                'Error in fetching channel: {}'.format(e)
            )
        self.stdout.write(
            self.style.SUCCESS(
                'New channel added: {} ({} episodes)'.format(
                    channel.name, new_episodes
                )
            )
        )

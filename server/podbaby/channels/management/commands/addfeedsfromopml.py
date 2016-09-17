from django.db import transaction
from django.core.management.base import BaseCommand

from lxml import etree

from channels.models import Channel, InvalidFeed


class Command(BaseCommand):
    help = "Adds channels from OPML, and fetches episodes"

    def add_arguments(self, parser):
        parser.add_argument('filename', type=str)

    @transaction.atomic
    def add_feed(self, url):

        channel, created = Channel.objects.get_or_create(
            rss_feed=url
        )

        if not created:
            self.stdout.write(
                self.style.WARNING('Channel {} already added'.format(
                    channel.name
                ))
            )
            return

        try:
            new_episodes = channel.fetch()
            if new_episodes == 0:
                raise InvalidFeed('No episodes found')
        except InvalidFeed as e:
            self.stderr.write(
                self.style.ERROR(
                    'Error fetching from URL {}: {}'.format(url, e)
                )
            )
            channel.delete()
            return

        self.stdout.write(
            self.style.SUCCESS(
                'New channel added: {} ({} episodes)'.format(
                    channel.name, new_episodes
                )
            )
        )

    def handle(self, *args, **options):

        with open(options['filename']) as fp:
            root = etree.parse(fp)

        for node in root.findall('.//outline'):
            url = node.attrib.get('xmlUrl')
            if url:
                self.add_feed(url)

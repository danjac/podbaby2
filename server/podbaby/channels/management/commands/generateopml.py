from django.template.loader import render_to_string
from django.core.management.base import BaseCommand

from channels.models import Channel


class Command(BaseCommand):
    help = "Generates OPML file"

    def add_arguments(self, parser):
        parser.add_argument('filename', type=str)

        parser.add_argument(
            '--username',
            dest='username',
            type=str,
            required=False,
        )

    def handle(self, *args, **options):

        username = options.get('username')
        if (username):
            title = 'Podbaby podcast feeds for %s' % username
            channels = (
                Channel.objects
                .filter(subscribers__username=username)
                .order_by('name')
                .distinct()
            )
        else:
            title = 'Podbaby podcast feeds'
            channels = Channel.objects.order_by('name')

        context = {
            'title': title,
            'channels': channels,
        }

        result = render_to_string('channels/opml.xml', context)

        with open(options['filename'], 'w') as fp:
            fp.write(result)

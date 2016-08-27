from django.core.management.base import BaseCommand


from podcasts.models import Channel


class Command(BaseCommand):
    help = "Updates feeds for all channels"

    def handle(self, *args, **options):

        new_episodes = 0
        for channel in Channel.objects.all():
            new_episodes += channel.fetch()
        self.stdout.write("{} new episode(s)".format(new_episodes))

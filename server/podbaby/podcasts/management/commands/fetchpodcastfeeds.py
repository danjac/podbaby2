from django.core.management.base import BaseCommand


from podcasts.models import Channel, InvalidFeed


class Command(BaseCommand):
    help = "Updates feeds for all channels"

    def handle(self, *args, **options):

        total_new_episodes = 0
        verbosity = options['verbosity']
        for channel in Channel.objects.all():
            try:
                new_episodes = channel.fetch()
            except InvalidFeed as e:
                self.stderr.write(
                    self.style.ERROR("ERROR: {} {}".format(channel, e)))
                continue

            if verbosity > 1:
                self.stdout.write(
                    "{}{}".format(channel.name.ljust(50, '.'), new_episodes)
                )
            total_new_episodes += new_episodes

        if verbosity > 0:
            self.stdout.write(
                self.style.SUCCESS(
                    "{} new episode(s) in total".format(total_new_episodes)))

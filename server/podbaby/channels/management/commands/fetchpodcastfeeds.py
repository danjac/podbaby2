from django.core.management.base import BaseCommand


from channels.models import Channel, InvalidFeed


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
                msg = "{}{}".format(channel.name.ljust(80, '.'), new_episodes)
                if new_episodes:
                    msg = self.style.SUCCESS(msg)
                self.stdout.write(msg)
            total_new_episodes += new_episodes

        if verbosity > 0:
            msg = "{} new episode(s) in total".format(total_new_episodes)
            if total_new_episodes:
                msg = self.style.SUCCESS(msg)
            self.stdout.write(msg)

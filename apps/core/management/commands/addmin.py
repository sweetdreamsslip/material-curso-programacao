from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create or update a superuser named admin.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--password',
            default='3',
            help='Password for the admin superuser (default: 3).',
        )

    def handle(self, *args, **options):
        password = options['password']
        user_model = get_user_model()

        user, created = user_model.objects.update_or_create(
            username='admin',
            defaults={
                'is_staff': True,
                'is_superuser': True,
            },
        )
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS('Superuser "admin" created.'))
        else:
            self.stdout.write(self.style.SUCCESS('Superuser "admin" updated.'))

from pathlib import Path

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError
from django.db import connection


class Command(BaseCommand):
    help = (
        'Delete the SQLite database, run migrations, and recreate the admin '
        'superuser. Only available when DEBUG is True.'
    )

    def add_arguments(self, parser):
        parser.add_argument(
            '--password',
            default='3',
            help='Password passed to addmin (default: 3).',
        )

    def handle(self, *args, **options):
        if not settings.DEBUG:
            raise CommandError('wipe_db only works when DEBUG is True.')

        database = settings.DATABASES['default']
        if database['ENGINE'] != 'django.db.backends.sqlite3':
            raise CommandError('wipe_db only works with the SQLite database engine.')

        db_path = Path(database['NAME'])
        if db_path.exists():
            connection.close()
            db_path.unlink()
            self.stdout.write(f'Deleted {db_path}.')

        call_command('migrate', verbosity=options['verbosity'])
        call_command('addmin', password=options['password'], verbosity=options['verbosity'])

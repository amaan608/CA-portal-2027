#!/bin/sh

# Collect static files and upload to MinIO
python manage.py collectstatic --no-input --clear --verbosity 3

# Make and apply migrations
python manage.py makemigrations
python manage.py migrate

# Start Gunicorn server
gunicorn caportal.wsgi:application --bind 0.0.0.0:80 --access-logfile - --log-level=debug --timeout 180 --workers 4


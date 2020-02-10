#!/usr/bin/env bash

echo $DJANGO_SETTINGS_MODULE
if [ -z "${GUNICORN_WORKERS}" ]; then
    GUNICORN_WORKERS=4
fi

if [ -z "${GUNICORN_PORT}" ]; then
    GUNICORN_PORT=8000
fi

if [ -z "${GUNICORN_TIMEOUT}" ]; then
    GUNICORN_TIMEOUT=120
fi

if [ "${GUNICORN_RELOAD}" ]; then
    GUNICORN_RELOAD="--reload"
else
    GUNICORN_RELOAD=""
fi

echo Running python startups
python manage.py collectstatic --no-input
python manage.py migrate

echo Starting Gunicorn.

exec gunicorn course_roster_tool.wsgi:application \
        --bind 0.0.0.0:${GUNICORN_PORT} \
        --workers="${GUNICORN_WORKERS}"
# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-11-26 19:25
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('channels', '0007_channel_search_vector'),
    ]

    operations = [
        migrations.RunSQL("""
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON channels_channel FOR EACH ROW EXECUTE PROCEDURE
tsvector_update_trigger(
search_vector, 'pg_catalog.english', name, description);
        """,
        "DROP TRIGGER tsvectorupdate ON channels_channel;"
        ),
    ]
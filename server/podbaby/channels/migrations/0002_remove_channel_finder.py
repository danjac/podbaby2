# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-01 18:03
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('channels', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='channel',
            name='finder',
        ),
    ]

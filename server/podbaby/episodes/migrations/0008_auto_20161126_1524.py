# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-11-26 15:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('episodes', '0007_auto_20161126_1517'),
    ]

    operations = [
        migrations.AlterField(
            model_name='episode',
            name='duration',
            field=models.CharField(blank=True, max_length=60),
        ),
        migrations.AlterField(
            model_name='episode',
            name='enclosure_type',
            field=models.CharField(blank=True, max_length=60),
        ),
    ]

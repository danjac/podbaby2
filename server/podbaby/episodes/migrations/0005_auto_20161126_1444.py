# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-11-26 14:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('episodes', '0004_episode_players'),
    ]

    operations = [
        migrations.AlterField(
            model_name='episode',
            name='author',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='episode',
            name='creative_commons',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='episode',
            name='duration',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='episode',
            name='title',
            field=models.TextField(),
        ),
    ]

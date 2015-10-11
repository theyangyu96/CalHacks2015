# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0002_route'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='avg',
            field=models.FloatField(default=-1),
        ),
    ]

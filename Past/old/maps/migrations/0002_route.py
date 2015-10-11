# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('a_lat', models.FloatField(default=0)),
                ('a_lng', models.FloatField(default=0)),
                ('b_lat', models.FloatField(default=0)),
                ('b_lng', models.FloatField(default=0)),
                ('avg', models.IntegerField(default=0)),
                ('td', models.DateTimeField(auto_now_add=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]

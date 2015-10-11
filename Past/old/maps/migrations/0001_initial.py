# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('report_type', models.CharField(default=b'Generic', max_length=10)),
                ('td', models.DateTimeField(auto_now_add=True)),
                ('quality', models.CharField(default=b'Unknown', max_length=10)),
                ('desc', models.TextField(default=b' ')),
                ('lat', models.FloatField(default=0)),
                ('lng', models.FloatField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]

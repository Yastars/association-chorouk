# Generated by Django 3.0.4 on 2020-08-01 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crmapp', '0006_auto_20200731_0253'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_Accepted',
            field=models.BooleanField(),
        ),
    ]

# Generated by Django 3.0.4 on 2020-07-10 13:08

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmapp', '0002_post_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='picture',
            field=cloudinary.models.CloudinaryField(default='hello', max_length=255, verbose_name='image'),
            preserve_default=False,
        ),
    ]

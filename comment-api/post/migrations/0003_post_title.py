# Generated by Django 5.1.4 on 2024-12-26 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("post", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="post",
            name="title",
            field=models.TextField(default=""),
            preserve_default=False,
        ),
    ]

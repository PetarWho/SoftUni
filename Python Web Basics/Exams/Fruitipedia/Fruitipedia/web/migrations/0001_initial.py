# Generated by Django 4.2.2 on 2023-06-24 06:55

import Fruitipedia.web.validators
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fruit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, validators=[django.core.validators.MinLengthValidator(2), Fruitipedia.web.validators.TextContainsOnlyLetters()])),
                ('image_url', models.URLField()),
                ('description', models.TextField()),
                ('nutrition', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=15, validators=[django.core.validators.MinLengthValidator(2), Fruitipedia.web.validators.TextStartsWithLetter()])),
                ('last_name', models.CharField(max_length=35, validators=[django.core.validators.MinLengthValidator(1), Fruitipedia.web.validators.TextStartsWithLetter()])),
                ('email', models.EmailField(max_length=40)),
                ('password', models.CharField(max_length=20, validators=[django.core.validators.MinLengthValidator(8)])),
                ('image_url', models.URLField(blank=True, null=True)),
                ('age', models.PositiveIntegerField(blank=True, default=18, null=True)),
            ],
        ),
    ]

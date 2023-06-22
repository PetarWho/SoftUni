from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator
from django.db import models
from .validators import TextContainsOnlyAlnumAndUnderscoreValidator, FloatPositiveValidator


class Profile(models.Model):
    username = models.CharField(max_length=15, blank=False, null=False,
                                validators=[
                                    MinLengthValidator(2),
                                    TextContainsOnlyAlnumAndUnderscoreValidator()
                                ]
                                )

    email = models.EmailField(blank=False, null=False)
    age = models.PositiveIntegerField(blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username


class Album(models.Model):
    GENRE_CHOICES = [
        ("pop", "Pop Music"),
        ("jazz", "Jazz Music"),
        ("rnb", "R&B Music"),
        ("rock", "Rock Music"),
        ("country", "Country Music"),
        ("dance", "Dance Music"),
        ("hiphop", "Hip Hop Music"),
        ("other", "Other")
    ]

    album_name = models.CharField(blank=False, null=False, unique=True, max_length=30)
    artist = models.CharField(blank=False, null=False, max_length=30)
    genre = models.CharField(blank=False, null=False, max_length=30, choices=GENRE_CHOICES)
    description = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=False, null=False)
    price = models.FloatField(blank=False, null=False, validators=[FloatPositiveValidator()])
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

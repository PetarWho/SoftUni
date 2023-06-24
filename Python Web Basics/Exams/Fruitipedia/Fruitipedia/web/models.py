from django.db import models
from django.core.validators import MinLengthValidator
from .validators import TextStartsWithLetter, TextContainsOnlyLetters

# Create your models here.


class Profile(models.Model):
    first_name = models.CharField(max_length=15, blank=False, null=False,
                                  validators=[
                                    MinLengthValidator(2),
                                    TextStartsWithLetter()
                                    ]
                                  )
    last_name = models.CharField(max_length=35, blank=False, null=False,
                                 validators=[
                                     MinLengthValidator(1),
                                     TextStartsWithLetter()
                                 ]
                                 )
    email = models.EmailField(max_length=40, blank=False, null=False)
    password = models.CharField(max_length=20, blank=False, null=False,
                                validators=[
                                    MinLengthValidator(8)
                                ])
    image_url = models.URLField(blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True, default=18)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Fruit(models.Model):
    name = models.CharField(blank=False, null=False, unique=True, max_length=30,
                            validators=[
                                MinLengthValidator(2),
                                TextContainsOnlyLetters()
                            ])
    image_url = models.URLField(blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    nutrition = models.TextField(blank=True, null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True, null=True)

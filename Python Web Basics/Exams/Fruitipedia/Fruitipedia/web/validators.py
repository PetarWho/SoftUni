from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.deconstruct import deconstructible


@deconstructible
class TextStartsWithLetter:

    def __call__(self, value):
        if not value[0].isalpha():
            raise ValidationError("Your name must start with a letter!")

    def __eq__(self, other):
        return isinstance(other, TextStartsWithLetter)


@deconstructible
class TextContainsOnlyLetters:
    def __call__(self, value):
        if not value.isalpha():
            raise ValidationError("Fruit name should contain only letters!")

    def __eq__(self, other):
        return isinstance(other, TextContainsOnlyLetters)


@deconstructible
class FloatPositiveValidator:
    def __call__(self, value):
        if value < 0.0:
            raise ValidationError('Ensure this value is greater than or equal to 0.0!')

    def __eq__(self, other):
        return True
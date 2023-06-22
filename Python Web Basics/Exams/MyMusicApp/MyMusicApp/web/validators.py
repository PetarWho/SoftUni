from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class TextContainsOnlyAlnumAndUnderscoreValidator:
    def __call__(self, value):
        if not value.isalnum() or '_' in value:
            raise ValidationError('Ensure this value contains only letters, numbers, and underscore!')

    def __eq__(self, other):
        return True


@deconstructible
class FloatPositiveValidator:
    def __call__(self, value):
        if value < 0.0:
            raise ValidationError('Ensure this value is greater than or equal to 0.0!')

    def __eq__(self, other):
        return True

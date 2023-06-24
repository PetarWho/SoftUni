from django import forms
from .models import Profile, Fruit


class ProfileModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].label = False

    class Meta:
        model = Profile
        exclude = ['age', 'image_url']
        widgets = {
            'first_name': forms.TextInput(attrs={
                'placeholder': 'First Name'
            }),
            'last_name': forms.TextInput(attrs={
                'placeholder': 'Last Name'
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'Email'
            }),
            'password': forms.PasswordInput(attrs={
                'placeholder': 'Password'
            })
        }


class EditProfileModelForm(forms.ModelForm):
    class Meta:
        model = Profile
        exclude = ['password']
        widgets = {
            'first_name': forms.TextInput(attrs={
                'placeholder': 'First Name'
            }),
            'last_name': forms.TextInput(attrs={
                'placeholder': 'Last Name'
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'Email'
            }),
            'image_url': forms.URLInput(attrs={
                'placeholder': 'Image URL'
            }),
            'age': forms.NumberInput(attrs={
                'placeholder': 'Age'
            })
        }


class FruitModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].label = False

    class Meta:
        model = Fruit
        exclude = ['profile']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Fruit Name'
            }),
            'image_url': forms.URLInput(attrs={
                'placeholder': 'Fruit Image URL'
            }),
            'description': forms.TextInput(attrs={
                'placeholder': 'Fruit Description',
                'rows': 10,
                'cols': 50
            }),
            'nutrition': forms.TextInput(attrs={
                'placeholder': 'Nutrition Info',
                'rows': 10,
                'cols': 50
            }),
        }


class EditFruitModelForm(forms.ModelForm):
    class Meta:
        model = Fruit
        exclude = ['profile']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Fruit Name'
            }),
            'image_url': forms.URLInput(attrs={
                'placeholder': 'Fruit Image URL'
            }),
            'description': forms.TextInput(attrs={
                'placeholder': 'Fruit Description',
                'rows': 10,
                'cols': 50
            }),
            'nutrition': forms.TextInput(attrs={
                'placeholder': 'Nutrition Info',
                'rows': 10,
                'cols': 50
            }),
        }


class FruitDisabledModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].disabled = True
        self.disabled_fields = ['name','image_url', 'description', 'nutrition']

    def clean(self):
        cleaned_data = super().clean()
        if self.instance and self.instance.pk:
            for field_name in self.disabled_fields:
                if field_name in self.changed_data:
                    cleaned_data[field_name] = getattr(self.instance, field_name)
        return cleaned_data

    class Meta:
        model = Fruit
        exclude = ['profile']

from django import forms
from.models import Profile, Album


class ProfileModelForm(forms.ModelForm):
    class Meta:
        model = Profile
        exclude = ['user']
        widgets = {
            'username': forms.TextInput(attrs={
                'placeholder': 'Username'
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'Email'
            }),
            'age': forms.NumberInput(attrs={
                'placeholder': 'Age'
            }),
        }


class AlbumModelForm(forms.ModelForm):
    class Meta:
        model = Album
        exclude = ['profile']
        widgets = {
            'album_name': forms.TextInput(attrs={
                'placeholder': 'Album Name'
            }),
            'artist': forms.TextInput(attrs={
                'placeholder': 'Artist'
            }),
            'genre': forms.Select(attrs={
                'placeholder': 'Genre'
            }),
            'description': forms.TextInput(attrs={
                'placeholder': 'Description'
            }),
            'image_url': forms.URLInput(attrs={
                'placeholder': 'Image URL'
            }),
            'price': forms.NumberInput(attrs={
                'placeholder': 'Price'
            })
        }


class AlbumDisabledModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].disabled = True
        self.disabled_fields = ['album_name', 'artist', 'genre', 'description', 'image_url', 'price']

    def clean(self):
        cleaned_data = super().clean()
        if self.instance and self.instance.pk:
            for field_name in self.disabled_fields:
                if field_name in self.changed_data:
                    cleaned_data[field_name] = getattr(self.instance, field_name)
        return cleaned_data

    class Meta:
        model = Album
        exclude = ['profile']

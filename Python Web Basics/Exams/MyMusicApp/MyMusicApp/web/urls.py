from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="index"),

    path('add/', album_add, name='album add'),
    path("details/<int:id>/", album_details, name='album details'),
    path('edit/<int:id>/', album_edit, name='album edit'),
    path('delete/<int:id>/', album_delete, name='album delete'),

    path('details/', profile_details, name='profile details'),
    path('delete/', profile_delete, name='profile delete'),
]

from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('dashboard/', dashboard, name="dashboard"),

    path('create/', fruit_create, name="fruit_create"),
    path('<int:fruitId>/details/', fruit_details, name="fruit_details"),
    path('<int:fruitId>/edit/', fruit_edit, name="fruit_edit"),
    path('<int:fruitId>/delete/', fruit_delete, name="fruit_delete"),

    path('profile/create/', profile_create, name="profile_create"),
    path('profile/details/', profile_details, name="profile_details"),
    path('profile/edit/', profile_edit, name="profile_edit"),
    path('profile/delete/', profile_delete, name="profile_delete"),
]

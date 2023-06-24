from django.shortcuts import render, redirect
from Fruitipedia.web.models import Fruit, Profile
from .forms import *


# Create your views here.


def index(request):
    profile = Profile.objects.first() or None
    context={
        "profile":profile
    }
    return render(request, 'common/index.html', context)

    # user = request.user if request.user.is_authenticated else None
    # profile = Profile.objects.filter(user=user).first()
    # albums = Album.objects.all()
    # form = ProfileModelForm()

    # if request.method == 'POST':
    #     form = ProfileModelForm(request.POST)
    #     if form.is_valid():
    #         profile = form.save(commit=False)
    #         profile.user = user
    #         form.save()
    #         return redirect(request.path_info)
    #
    # context = {
    #     "profile": profile,
    #     "albums": albums,
    #     "add_form": form
    # }


def dashboard(request):
    fruits = Fruit.objects.all()
    profile = Profile.objects.first() or None

    context = {
        'fruits': fruits,
        'profile': profile
    }

    return render(request, 'common/dashboard.html', context)


def fruit_create(request):
    profile = Profile.objects.first() or None
    form = FruitModelForm(request.POST or None)
    if form.is_valid():
        fruit = form.save(commit=False)
        fruit.profile = profile
        fruit.save()
        return redirect('dashboard')

    context = {
        "create_form": form,
        "profile": profile
    }
    return render(request, 'fruit/create-fruit.html', context)


def fruit_details(request, fruitId):
    fruit = Fruit.objects.get(id=fruitId)
    profile = Profile.objects.first() or None
    context = {
        "fruit": fruit,
        "profile": profile
    }
    return render(request, 'fruit/details-fruit.html', context)


def fruit_edit(request, fruitId):
    fruit = Fruit.objects.get(id=fruitId)
    form = EditFruitModelForm(instance=fruit)
    profile = Profile.objects.first() or None

    context = {
        "fruit": fruit,
        "edit_form": form,
        "profile":profile
    }

    if request.method == "POST":
        form = FruitModelForm(request.POST, instance=fruit)
        if form.is_valid():
            form.save()
            return redirect('dashboard')

    return render(request, 'fruit/edit-fruit.html', context)


def fruit_delete(request, fruitId):
    fruit = Fruit.objects.get(id=fruitId)
    form = FruitDisabledModelForm(instance=fruit)
    profile = Profile.objects.first() or None

    context = {
        "fruit": fruit,
        "delete_form": form,
        "profile": profile
    }

    if request.method == "POST":
        form = FruitDisabledModelForm(request.POST, instance=fruit)
        if form.is_valid():
            fruit.delete()
            return redirect('dashboard')
    return render(request, 'fruit/delete-fruit.html', context)


def profile_create(request):
    form = ProfileModelForm()
    profile = Profile.objects.first() or None

    if request.method == 'POST':
        form = ProfileModelForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard')

    context = {
        "create_form": form,
        "profile": profile
    }
    return render(request, 'profile/create-profile.html', context)


def profile_details(request):
    profile = Profile.objects.first()
    posts = Fruit.objects.count()
    context = {
        "profile": profile,
        "posts": posts
    }
    return render(request, 'profile/details-profile.html', context)


def profile_edit(request):
    profile = Profile.objects.first()
    form = EditProfileModelForm(instance=profile)

    if request.method == "POST":
        form = EditProfileModelForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('profile_details')

    context = {
        "profile": profile,
        "edit_form": form
    }

    return render(request, 'profile/edit-profile.html', context)


def profile_delete(request):
    profile = Profile.objects.first()

    if request.method == "POST":
        profile.delete()
        return redirect('index')

    context = {
        "profile": profile
    }
    return render(request, 'profile/delete-profile.html', context)

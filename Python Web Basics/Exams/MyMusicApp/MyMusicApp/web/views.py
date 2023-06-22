from django.shortcuts import render, redirect
from .models import Profile, Album
from.forms import ProfileModelForm, AlbumModelForm, AlbumDisabledModelForm


# INDEX
def index(request):
    user = request.user if request.user.is_authenticated else None
    profile = Profile.objects.filter(user=user).first()
    albums = Album.objects.all()
    form = ProfileModelForm()

    if request.method == 'POST':
        form = ProfileModelForm(request.POST)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = user
            form.save()
            return redirect(request.path_info)

    context = {
        "profile": profile,
        "albums": albums,
        "add_form": form
    }

    if profile:
        return render(request, 'common/home-with-profile.html', context)
    else:
        return render(request, 'common/home-no-profile.html', context)


# ALBUMS

def album_add(request):
    user = request.user if request.user.is_authenticated else None
    profile = Profile.objects.filter(user=user).first()
    form = AlbumModelForm(request.POST or None)

    if form.is_valid():
        album = form.save(commit=False)
        album.profile = profile
        album.save()
        return redirect('index')

    context = {
        "add_form": form
    }

    return render(request, 'albums/add-album.html', context)


def album_details(request, id):
    user = request.user if request.user.is_authenticated else None
    profile = Profile.objects.filter(user=user).first()
    context = {
        "profile": profile,
        "album": Album.objects.get(id=id),

    }
    return render(request, 'albums/album-details.html', context)


def album_edit(request, id):
    user = request.user if request.user.is_authenticated else None
    profile = Profile.objects.filter(user=user).first()
    album = Album.objects.get(id=id)
    form = AlbumModelForm(instance=album)

    context = {
        "edit_form":form,
        "album": album,
        "profile": profile
    }

    if request.method == "POST":
        form = AlbumModelForm(request.POST, instance=album)
        if form.is_valid():
            form.save()
        return redirect('index')

    return render(request, 'albums/edit-album.html', context)


def album_delete(request, id):
    user = request.user if request.user.is_authenticated else None
    profile = Profile.objects.filter(user=user).first()
    album = Album.objects.get(id=id)
    form = AlbumDisabledModelForm(instance=album)

    if request.method == "POST":
        form = AlbumDisabledModelForm(request.POST, instance=album)
        if form.is_valid():
            album.delete()
            return redirect('index')

    context = {
        "delete_form": form,
        "album": album,
        "profile": profile
    }

    return render(request, 'albums/delete-album.html', context)


# PROFILE
def profile_details(request):
    user = request.user if request.user.is_authenticated else None
    profile = Profile.objects.filter(user=user).first()
    albums_count = Album.objects.filter(profile=profile).count()

    context = {
        'profile': profile,
        'albums_count': albums_count
    }

    return render(request, 'profiles/profile-details.html', context)


def profile_delete(request):
    user = request.user if request.user.is_authenticated else None
    profile = Profile.objects.filter(user=user).first()
    if request.method == "POST":
        profile.delete()
        return redirect('index')
    return render(request, 'profiles/profile-delete.html')



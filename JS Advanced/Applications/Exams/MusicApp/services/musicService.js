import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js';

const baseUrl = 'http://localhost:3030/data/albums';

export const getAll = () => httpClient.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`);
export const getOne = (id) => httpClient.get(`${baseUrl}/${id}`);

export const create = (e) => {
    e.preventDefault();

    let { name, imgUrl, price, releaseDate, artist, genre, description } = Object.fromEntries(new FormData(e.target));

    if (name && imgUrl && price && releaseDate && artist && genre && description) {
        httpClient.post(baseUrl, { name, imgUrl, price, releaseDate, artist, genre, description });
        page.redirect('/catalog');
    } else {
        alert('All fields are required!');
    }
};

export const edit = (e) => {
    e.preventDefault();
    let { name, imgUrl, price, releaseDate, artist, genre, description } = Object.fromEntries(new FormData(e.target));

    if (name && imgUrl && price && releaseDate && artist && genre && description) {
        httpClient.put(`${baseUrl}/${e.target.id}`, { name, imgUrl, price, releaseDate, artist, genre, description });
        page.redirect(`/albums/${e.target.id}`);
    } else {
        alert('All fields are required!');
    }
};

export const deleteAlbum = (e) => {
    e.preventDefault();

    if (confirm('Do you want to delete this album?')) {
        try {
            httpClient.delete(`${baseUrl}/${e.target.id}`);
            page.redirect('/catalog');
        } catch (err) {
            alert(err.message);
        }
    }
}

export const search = (e) => {
    e.preventDefault();
    let query = encodeURIComponent(e.target.parentNode.children[0].value);
    httpClient.get(`${baseUrl}?where=name%20LIKE%20%22${query}%22`);
}
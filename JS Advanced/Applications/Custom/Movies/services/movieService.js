import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js';

const baseUrl = 'http://localhost:3030/data/albums';
                                                    //_createdOn%20desc&distinct=name
export const getAll = () => httpClient.get(`${baseUrl}?sortBy=name`);
export const getOne = (id) => httpClient.get(`${baseUrl}/${id}`);

export const create = (e) => {
    e.preventDefault();

    let { name, imgUrl, releaseDate, mainActor, genre, description } = Object.fromEntries(new FormData(e.target));

    if (name && imgUrl && releaseDate && mainActor && genre && description) {
        httpClient.post(baseUrl, { name, imgUrl, releaseDate, mainActor, genre, description });
        page.redirect('/movies');
    } else {
        alert('All fields are required!');
    }
};

export const edit = (e) => {
    e.preventDefault();
    let { name, imgUrl, releaseDate, mainActor, genre, description } = Object.fromEntries(new FormData(e.target));

    if (name && imgUrl && releaseDate && mainActor && genre && description) {
        httpClient.put(`${baseUrl}/${e.target.id}`, { name, imgUrl, releaseDate, mainActor, genre, description });
        page.redirect(`/movies/${e.target.id}`);
    } else {
        alert('All fields are required!');
    }
};

export const deleteMovie = (e) => {
    e.preventDefault();

    if (confirm('Do you want to delete this album?')) {
        try {
            httpClient.delete(`${baseUrl}/${e.target.id}`);
            page.redirect('/movies');
        } catch (err) {
            alert(err.message);
        }
    }
}

export const search = (searchText) => {
    let query = encodeURIComponent(searchText);
    if (query)
        return httpClient.get(`${baseUrl}?where=name%20LIKE%20%22${query}%22`);
    else
        return getAll();
}
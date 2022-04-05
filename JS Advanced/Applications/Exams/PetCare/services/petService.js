import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js';

const baseUrl = 'http://localhost:3030/data/pets';

export const getAll = () => httpClient.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`);
export const getOne = (petId) => httpClient.get(`${baseUrl}/${petId}`);

export const create = (e) => {
    e.preventDefault();

    let { name, breed, age, weight, image } = Object.fromEntries(new FormData(e.target));

    if (name && breed && age && weight && image) {
        httpClient.post(baseUrl, { name, breed, age, weight, image });
        page.redirect('/');
    } else {
        alert('All fields are required!');
    }
};

export const edit = (e) => {
    e.preventDefault();
    let { name, breed, age, weight, image } = Object.fromEntries(new FormData(e.target));

    if (name && breed && age && weight && image) {
        httpClient.put(`${baseUrl}/${e.target.id}`, { name, breed, age, weight, image });
        page.redirect(`/pets/${e.target.id}`);
    } else {
        alert('All fields are required!');
    }
};

export const deletePet = (e) => {
    e.preventDefault();

    if (confirm('Do you want to delete this pet card?')) {
        try {
            httpClient.delete(`${baseUrl}/${e.target.id}`);
            page.redirect('/');
        } catch (err) {
            alert(err.message);
        }
    }
}
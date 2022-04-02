import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js'

const baseUrl = 'http://localhost:3030/data/theaters'

export const getAll = () => httpClient.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=title`);
export const getOne = (theaterId) => httpClient.get(`${baseUrl}/${theaterId}`);
export const getPersonal = (userId) => httpClient.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

export const create = (e) => {
    e.preventDefault();

    let { title, date, author, description, imageUrl } = Object.fromEntries(new FormData(e.target));

    if (title && date && author && description && imageUrl) {
        httpClient.post(baseUrl, { title, date, author, imageUrl, description });
        page.redirect('/');
    } else {
        alert('All fields are required!');
    }
};

export const edit = (e) => {
    e.preventDefault();
    let { title, date, author, description, imageUrl } = Object.fromEntries(new FormData(e.target));

    if (title && date && author && description && imageUrl) {
        httpClient.put(`${baseUrl}/${e.target.id}`, { title, date, author, description, imageUrl });
        page.redirect(`/theater/${e.target.id}`);
    } else {
        showNotification('All fields are required!');
    }
};

export const deleteEvent = (e) => {
    e.preventDefault();

    if (confirm('Do you want to delete this event?')) {
        try {
            httpClient.delete(`${baseUrl}/${e.target.id}`);
            page.redirect('/profile');
        } catch (err) {
            alert(err.message);
        }
    }
}
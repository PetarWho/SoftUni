import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js';

const baseUrl = 'http://localhost:3030/data/posts';

export const getAll = () => httpClient.get(`${baseUrl}?sortBy=_createdOn%20desc`);
export const getOne = (postId) => httpClient.get(`${baseUrl}/${postId}`);
export const getMyPosts = (userId) => httpClient.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

export const create = (e) => {
    e.preventDefault();

    let { title, description, imageUrl, address, phone } = Object.fromEntries(new FormData(e.target));

    if (title && description && imageUrl && address && phone) {
        httpClient.post(baseUrl, { title, description, imageUrl, address, phone });
        page.redirect('/');
    } else {
        alert('All fields are required!');
    }
};

export const edit = (e) => {
    e.preventDefault();
    let { title, description, imageUrl, address, phone } = Object.fromEntries(new FormData(e.target));

    if (title && description && imageUrl && address && phone) {
        httpClient.put(`${baseUrl}/${e.target.classList}`, { title, description, imageUrl, address, phone });
        page.redirect(`/posts/${e.target.classList}`);
    } else {
        alert('All fields are required!');
    }
};

export const deletePost = (e) => {
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
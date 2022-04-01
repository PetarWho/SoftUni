import * as httpClient from '../services/httpService.js';
import page from '../node_modules/page/page.mjs';
import { showNotification } from "./notificationService.js";

const baseUrl = 'http://localhost:3030/data/memes';

export const getAllMemes = () => httpClient.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOneMeme = (memeId) => httpClient.get(`${baseUrl}/${memeId}`);

export const getPersonalMemes = (userId) => httpClient.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

export const createMeme = (e) => {
    e.preventDefault();

    let { title, description, imageUrl } = Object.fromEntries(new FormData(e.target));

    if (title && description && imageUrl) {
        httpClient.post(baseUrl, { title, description, imageUrl });
        page.redirect('/memes');
    } else {
        showNotification('All fields are required!');
    }
};

export const editMeme = (e) => {
    e.preventDefault();
    let { title, description, imageUrl } = Object.fromEntries(new FormData(e.target));

    if (title && description && imageUrl) {
        httpClient.put(`${baseUrl}/${e.target.classList.value}`, { title, description, imageUrl });
        page.redirect(`/memes/${e.target.classList.value}`);
    } else {
        showNotification('All fields are required!');
    }
};

export const deleteMeme = (e) => {
    e.preventDefault();

    if (confirm('Do you want to delete this meme?')) {
        try {
            httpClient.delete(`${baseUrl}/${e.target.id}`);
            page.redirect('/memes');
        } catch (err) {
            showNotification(err.message);
        }
    }
}
import page from "../node_modules/page/page.mjs";
import * as httpClient from "./httpService.js";
import { showNotification } from "./notificationService.js";

const baseUrl = 'http://localhost:3030/users'

export const login = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
        httpClient.post(`${baseUrl}/login`, { email, password }).then(user => {
            if (user)
                if (user.code == undefined) sessionStorage.setItem('user', JSON.stringify(user));
            page.redirect('/memes');
        }).catch((err) => showNotification(err.message));

    } else {
        showNotification('All fields are required!');
    }
}

export const register = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const { username, email, password, repeatPass, gender } = Object.fromEntries(formData);

    if (username && email && password && repeatPass && gender && password === repeatPass) {

        httpClient.post(`${baseUrl}/register`, { username, email, password, gender }).then(user => {
            if (user)
                if (user.code == undefined) sessionStorage.setItem('user', JSON.stringify(user));
            page.redirect('/memes');
        }).catch((err)=>showNotification(err.message));
    } else {
        showNotification('Check your inputs!');
    }
}

export const isAuthenticated = () => {
    return Boolean(sessionStorage.user);
};

export const logout = () => {
    let token = JSON.parse(sessionStorage.user).accessToken;

    return fetch(`${baseUrl}/logout`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        }
    }).then(res => {
        sessionStorage.clear();
        page.redirect('/');
    });
}
import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js';

const baseUrl = 'http://localhost:3030/users';

export const isAuthenticated = () => Boolean(sessionStorage.user);

export const login = async(e) => {
    e.preventDefault();

    let { email, password } = Object.fromEntries(new FormData(e.target));

    if (email && password) {
        httpClient.post(`${baseUrl}/login`,{email, password}).then(user=>{
            if (user)
                if (user.code == undefined) sessionStorage.setItem('user', JSON.stringify(user));
            page.redirect('/');
        }).catch((err) => alert(err.message));
    } else {
        alert('Check your inputs!');
    }
}

export const register = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const { email, password, ['conf-pass']: repeatPassword } = Object.fromEntries(formData);

    if (email && password && repeatPassword && password === repeatPassword) {

        httpClient.post(`${baseUrl}/register`, { email, password }).then(user => {
            if (user)
                if (user.code == undefined) sessionStorage.setItem('user', JSON.stringify(user));
            page.redirect('/');
        }).catch((err)=>alert(err.message));
    } else {
        alert('Check your inputs!');
    }
}

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
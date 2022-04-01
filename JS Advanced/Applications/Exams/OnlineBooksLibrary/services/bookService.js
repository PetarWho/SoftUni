import * as httpClient from "../services/httpService.js";
import page from "../node_modules/page/page.mjs";

const baseUrl = 'http://localhost:3030/data/books';

export const getAll = () => fetch(`${baseUrl}?sortBy=_createdOn%20desc`).then(res=>res.json());

export const getOne = (bookId) => fetch(`${baseUrl}/${bookId}`).then(res=>res.json());

export const getMyBooks = (userId) => fetch(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`).then(res=>res.json());

export const create = (obj) => {
    return fetch(baseUrl, {
        method:'POST',
        headers:{
            'content-type': 'application/json',
            'X-Authorization': `${sessionStorage.getItem('accessToken')}`
        },
        body:JSON.stringify(obj)
    }).then(res=>res.json());
}

export const edit = (obj, bookId) => {
    return fetch(`${baseUrl}/${bookId}`, {
        method:'PUT',
        headers:{
            'content-type': 'application/json',
            'X-Authorization': `${sessionStorage.getItem('accessToken')}`
        },
        body:JSON.stringify(obj)
    }).then(res=>res.json());
}


export const deleteBook = async(e)=>{
    const bookId = e.currentTarget.id;

    if (confirm('Are you sure you want to delete this book?')) {

        await httpClient.delete(`${baseUrl}/${bookId}`);

        page.redirect('/');
    }
};
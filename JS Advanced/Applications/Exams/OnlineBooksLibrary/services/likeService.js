const baseUrl = 'http://localhost:3030/data/likes';

export const like = (bookId) => fetch(baseUrl, {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'X-Authorization': `${sessionStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ bookId })
}).then(res=>res.json());

export const getAll = (bookId) => fetch(`${baseUrl}?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`, {
    method:'GET',
    headers:{
        'content-type': 'application/json',
        'X-Authorization': `${sessionStorage.getItem('accessToken')}`
    }
}).then(res=>res.json());

export const getLikeForBook = (bookId, userId) => fetch(`${baseUrl}?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`, {
    method:'GET',
    headers:{
        'content-type': 'application/json',
        'X-Authorization': `${sessionStorage.getItem('accessToken')}`
    }
}).then(res=>res.json());
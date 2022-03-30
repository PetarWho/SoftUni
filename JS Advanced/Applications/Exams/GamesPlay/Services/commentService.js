const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = (gameId) => fetch(`${baseUrl}/?where=gameId%3D%22${gameId}%22`).then(res => res.json());

export const create = (gameId, comment) => fetch(baseUrl, {
    method: 'POST',
    headers: {
        "content-type": "application/json",
        "X-Authorization": `${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ gameId, comment })
}).then(res=>res.json());
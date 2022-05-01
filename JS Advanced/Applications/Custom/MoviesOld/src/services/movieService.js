const baseUrl = `http://localhost:3030/data/movies`

export const getAll = ()=> fetch(baseUrl).then(res=>res.json());

export const getOne = (movieId) => fetch(`${baseUrl}/${movieId}`).then(res=>res.json());
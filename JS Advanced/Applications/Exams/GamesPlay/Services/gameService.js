const baseUrl = 'http://localhost:3030/data/games'

export const getAllLatest = () => {
    return fetch(`${baseUrl}?sortBy=_createdOn%20desc&distinct=category`,{
        method:'GET',
        headers:{
            "content-type": "application/json"
        }
    }).then(res=>res.json());
}

export const getAll = () => {
    return fetch(`${baseUrl}?sortBy=_createdOn%20desc`,{
        method:'GET',
        headers:{
            "content-type": "application/json"
        }
    }).then(res=>res.json());
}

export const getOne = (gameId) =>{
    return fetch(`${baseUrl}/${gameId}`).then(res=>res.json());
}

export const create = (gameObj) =>{
    return fetch(baseUrl,{
        method:'POST',
        headers:{
            'content-type': 'application/json',
            "X-Authorization": `${localStorage.getItem('accessToken')}`
        },
        body:JSON.stringify(gameObj)
    }).then(res=>res.json());
}

export const edit = (gameObj, gameId) =>{
    return fetch(`${baseUrl}/${gameId}`,{
        method:'PUT',
        headers:{
            'content-type': 'application/json',
            "X-Authorization": `${localStorage.getItem('accessToken')}`
        },
        body:JSON.stringify(gameObj)
    }).then(res=>res.json());
}

export const remove = (gameId) => {
    return fetch(`${baseUrl}/${gameId}`,{
        method:'DELETE',
        headers:{
            'content-type': 'application/json',
            "X-Authorization": `${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json());
}
const baseUrl = 'http://localhost:3030/data/cars'

export const getAll = () => fetch(`${baseUrl}?sortBy=_createdOn%20desc`).then(res=>res.json());

export const getOne = (listingId) => fetch(`${baseUrl}/${listingId}`).then(res=>res.json());
                                            
export const getMyListings = (userId) => fetch(`${baseUrl}?where=_ownerId%3D%22${userId}%22&amp;sortBy=_createdOn%20desc`,{
    method:'GET',
    headers:{
        'content-type': 'application/json',
        'X-Authorization': `${localStorage.getItem('accessToken')}`
    }
}).then(res=>res.json());

export const create = (listingObj) => fetch(baseUrl,{
    method:'POST',
    headers:{
        'content-type': 'application/json',
        'X-Authorization': `${localStorage.getItem('accessToken')}`
    },
    body:JSON.stringify(listingObj)
}).then(res=>res.json());

export const edit = (listingObj, listingId) => fetch(`${baseUrl}/${listingId}`,{
    method:'PUT',
    headers:{
        'content-type': 'application/json',
        'X-Authorization': `${localStorage.getItem('accessToken')}`
    },
    body:JSON.stringify(listingObj)
}).then(res=>res.json());

export const remove = (listingId) => fetch(`${baseUrl}/${listingId}`, {
    method: 'DELETE',
    headers: {
        'content-type': 'application/json',
        'X-Authorization': `${localStorage.getItem('accessToken')}`
    }
})
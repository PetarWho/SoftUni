const baseUrl = 'http://localhost:3030/users';

const saveUser = (user) => {
    if(user.accessToken){
        sessionStorage.setItem('accessToken', user.accessToken);
        sessionStorage.setItem('_id', user._id);
        sessionStorage.setItem('email', user.email);
    }
}

export const login = (email, password) => {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify({email,password})
    }).then(res=>res.json()).then(user=>{
        saveUser(user);
        return user;
    }).catch((err)=>{
        alert('Incorrect username or password!');
    })
}

export const register = (email, password) => {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify({email,password})
    }).then(res=>res.json()).then(user=>{
        saveUser(user);
        return user;
    }).catch((err)=>{
        alert(err);
    })
}

export const logout = () => {
    return fetch(`${baseUrl}/logout`,{
        method:'GET',
        headers:{
            'content-type': 'application/json',
            'X-Authorization': `${sessionStorage.getItem('accessToken')}`
        }
    }).then(res=>sessionStorage.clear());
}

export const isAuthenticated = () => {
    let accessToken = sessionStorage.getItem('accessToken');
    return Boolean(accessToken);
}
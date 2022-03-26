const baseUrl = 'http://localhost:3030/users'

const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('username', user.username);
        localStorage.setItem('_id', user._id);
    }
}

export const register = (username, password, repeatPass) =>{
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({username, password, repeatPass})
    })
        .then(res => res.json())
        .then(user => {
            saveUser(user);
            return user;
        });
}

export const login = (username, password) =>{
    return fetch(`${baseUrl}/login`,{
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({username, password})
    }).then(res=>res.json())
    .then(user=>{
        saveUser(user);
        return user;
    })
    .catch((err)=>{
        alert("Incorrect username or password!");
    });
}

export const logout = () =>{
    let accessToken = localStorage.getItem('accessToken');
    return fetch(`${baseUrl}/logout`,{
        method: 'GET',
        headers:{
            "X-Authorization": `${accessToken}`
        }
    }).then(res=>{
        localStorage.clear();
    })
}

export const isAuthenticated = () => {
    let accessToken = localStorage.getItem('accessToken');
  return Boolean(accessToken);
}
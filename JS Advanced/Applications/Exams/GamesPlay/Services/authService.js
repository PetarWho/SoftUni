const baseUrl = 'http://localhost:3030/users'

const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('email', user.email);
        localStorage.setItem('_id', user._id);
    }
}

export const login = (email, password) =>{
    return fetch(`${baseUrl}/login`,{
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(res=> res.json()).then(user=>{
        saveUser(user);
        return user;
    }).catch((err)=>{
        alert("Incorrect username or password!");
    });
}

export const register = (email, password) =>{
    return fetch(`${baseUrl}/register`,{
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(res=> res.json()).then(user=>{
        saveUser(user);
        return user;
    }).catch((err)=>{
        alert(err);
    });
}

export const logout = () => {
    let accessToken = localStorage.getItem('accessToken');
    return fetch(`${baseUrl}/logout`,{
        method:'GET',
        headers:{
            "content-type": "application/json",
            "X-Authorization": `${accessToken}`
        }
    }).then(res=>localStorage.clear());
}

export const isAuthenticated = () => {
    let accessToken = localStorage.getItem('accessToken');
  return Boolean(accessToken);
}
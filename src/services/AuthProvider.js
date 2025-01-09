import {jwtDecode} from 'jwt-decode';


function isAuthenticated(){
    const token = localStorage.getItem('token');
    if(token){
        return true;
    }else{
        return false;
    }
}

function removeToken(){
    if(isAuthenticated()){
        localStorage.removeItem(token);
    }
}

function setToken(token){
    localStorage.setItem('token', JSON.stringify(token))
}

function getUserIdentity(){
    const token = localStorage.getItem('token');
    try{
        const user = jwtDecode(token);
        return user;
    }catch(error){
        console.error("erreur de decodage");
        return null;
    }
}

export { getUserIdentity, isAuthenticated, removeToken, setToken };

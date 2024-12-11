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
    localStorage.setItem('token', token)
}

function getUserIdentity(){

}

export {isAuthenticated, removeToken, setToken, getUserIdentity}
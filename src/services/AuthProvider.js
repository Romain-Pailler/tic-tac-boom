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

}

export { getUserIdentity, isAuthenticated, removeToken, setToken };

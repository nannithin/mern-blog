const storeInSession = (key,value)=> {
    return localStorage.setItem(key,value);
}

const lookInSession = (key)=> {
    return localStorage.getItem(key);
}

const removeInSession = (key)=> {
    return localStorage.removeItem(key);
}

const logoutUser = () =>{
    return localStorage.clear();
}

export {storeInSession,logoutUser,lookInSession,removeInSession}
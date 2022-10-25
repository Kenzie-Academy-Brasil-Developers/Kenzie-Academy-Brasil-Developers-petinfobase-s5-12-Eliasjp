function callLoginStorage (){
    const storage = localStorage.getItem("user-info")
    if (!storage){
        return
    }
    return storage
}

function setLoginStorage (object){
    window.localStorage.setItem("user-info", JSON.stringify(object))
}

function clearStorage (){
    window.localStorage.removeItem("user-info")
}

export { callLoginStorage, setLoginStorage, clearStorage }

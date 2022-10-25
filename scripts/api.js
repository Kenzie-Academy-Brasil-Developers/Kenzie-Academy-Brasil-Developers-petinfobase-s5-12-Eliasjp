async function creatingUser (object){
    const url = "http://localhost:3333"
    const registerUser = await fetch (`${url}/users/create`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(object)
    })
    if (!registerUser.ok){
        const response = await registerUser.json()
        return response
    }else if (registerUser.ok){
        const response = await registerUser.json()
        return response
    }
}

async function getToken (object){
    const url = "http://localhost:3333"

    const fetchToken = await fetch (`${url}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(object)
    })
    if (fetchToken.ok){
        const token = await fetchToken.json()
        return token
    } else if (!fetchToken.ok){
        const error = await fetchToken.json()
        return error
    }
}

async function getProfile (token){
    const url = "http://localhost:3333"

    const fetchProfile = await fetch (`${url}/users/profile`, {
        method: "GET",
        headers: {
            "Content-type": "application/json", 
            "Authorization": `Bearer ${token}`
        }
    })
    const profile = await fetchProfile.json()
    return profile
}

async function patchProfile (object, token){
    const url = "http://localhost:3333"
    const patching = await fetch (`${url}/users/profile`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
}

async function newPost (object, token){
    const url = "http://localhost:3333"
    const sendPost = await fetch (`${url}/posts/create`, {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
    const resp = await sendPost.json()
}

async function getPost (token){
    const url = "http://localhost:3333"
    const sendPost = await fetch (`${url}/posts`, {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${token}`
        }
    })
    const list = await sendPost.json()
    return list
}

async function patchPost (id, token, object){
    const url = "http://localhost:3333"
    const patchPost = await fetch (`${url}/posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
}

async function deletePost (id, token){
    const url = "http://localhost:3333"
    const deletePost = await fetch (`${url}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export {
    creatingUser,
    getToken,
    getProfile,
    patchProfile,
    newPost,
    getPost,
    patchPost,
    deletePost
}
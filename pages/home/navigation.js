import { callLoginStorage } from "../../scripts/localStorage.js"
import { list } from "../home/user-button-events.js"

function renderAvatar (){
    const storage = JSON.parse(callLoginStorage ())
    const queryAvatar = document.querySelector(`.avatar`)
    queryAvatar.src = storage.avatar
}

function userButton (){
    const userSettings = document.querySelector(`.profile-button`)
    const spanList = document.querySelector(`.dropdown-container`)
    
    userSettings.addEventListener(`click`, () => {
        const ul = document.querySelector(`.dropdown`)
        
        if (!ul){
            spanList.append(list (spanList))
        }else {
            spanList.innerHTML = ""
        }
    })
}

function execute (){
    renderAvatar ()
    userButton ()
}

execute ()

export { renderAvatar }
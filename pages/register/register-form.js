import {creatingUser} from "../../scripts/api.js"
import { successPopUp, errorPopUp } from "../../scripts/pop-up.js"


async function inputs (){
    const body = document.querySelector(`body`)
    const button = document.querySelector(`.submit-register`)
    const form = document.querySelector(`#register-form`)
    const spreadForm = [...form]
    
    button.addEventListener(`click`, (event) => {
        getValues (spreadForm)
        .then(async response => {
            const message = await creatingUser (response)
            if (message.message == "Email já cadastrado, favor informar um email que não pertença a um usuário já cadastrado"){
                body.append(errorPopUp (message.message))
                const queryPop = document.querySelector(`.pop-up`)
                setTimeout(() => {queryPop.remove()}, 5000)
            }else if (message.message == "Username já cadastrado, favor informar um username que não pertença a um usuário já cadastrado"){
                body.append(errorPopUp (message.message))
                const queryPop = document.querySelector(`.pop-up`)
                setTimeout(() => {queryPop.remove()}, 5000)
            }else {
                body.append(successPopUp ("Sua conta foi criada com sucesso, você será redirecionado para a página de login.", "Conta criada com sucesso"))
                const queryPop = document.querySelector(`.pop-up`)
                setTimeout(() => {queryPop.remove()}, 5000)
                setTimeout(() => {window.location.assign("/index.html", "_self")}, 5300)
                
            }
        })
        formEvents (form)
    })
}

async function getValues (formElements){
    const object = {}

    await formElements.forEach (element => {
        if (element.name){
            object[element.id] = element.value
        }
    })
    return object
}

async function formEvents (form){
    form.addEventListener(`submit`, (e) => {
        e.preventDefault()
    })
}

inputs ()






// function formEvents (formElements, form) {
//     let obj = {}
//     form.addEventListener(`submit`, (event) => {
//         formElements.forEach(element => {
//             if (!element.name){
//                 return console.log(element)
//             } else if (element.name){
//                 if (element.checkValidity()){
//                     obj[element.id] = element.value
//                 }
//             }
//         })
//         event.preventDefault()
//     })
//     console.log(obj)
// }
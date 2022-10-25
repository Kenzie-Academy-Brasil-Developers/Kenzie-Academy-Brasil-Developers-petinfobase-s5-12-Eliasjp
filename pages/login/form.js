import { getToken, getProfile } from "../../scripts/api.js"
import { callLoginStorage, setLoginStorage } from "../../scripts/localStorage.js"
import { createSpinner } from "../../scripts/spinner.js"

function inputValues (){
    const form = document.querySelector(`.account-form`)
    const queryBtn = document.querySelector(`.login-button`)
    form.addEventListener(`submit`, async (event) => {
        event.preventDefault()
        const formElements = [...form]
        const object = {}

        formElements.forEach(element => {
            if (element.name){
                object[element.id] = element.value
            }
        })
        queryBtn.innerHTML = ""
        queryBtn.append(createSpinner ())
        const response = await getToken (object)
        if (response.token){
            const profile = await getProfile (response.token)
            profile.token = response.token
            setLoginStorage (profile)
            window.location.assign("../pages/home/home.html")
        } else {
            const inputEmail = document.querySelector(`#email`)
            const inputPassword = document.querySelector(`#password`)
            const spanEmail = document.querySelector(`.wrong-email`)
            const spanPassword = document.querySelector(`.wrong-password`)

            if (response.message == "O email está incorreto"){
                inputEmail.classList = "form-input email-input wrong-input"
                inputPassword.classList = "form-input password-input"

                spanEmail.style.display = "block"
                spanPassword.style.display = "none"
            }else if (response.message == "A senha está incorreta"){
                inputEmail.classList = "form-input email-input"
                inputPassword.classList = "form-input password-input wrong-input"

                spanEmail.style.display = "none"
                spanPassword.style.display = "block"
            }
        }
        queryBtn.innerHTML = "Acessar"
    })
}

inputValues ()
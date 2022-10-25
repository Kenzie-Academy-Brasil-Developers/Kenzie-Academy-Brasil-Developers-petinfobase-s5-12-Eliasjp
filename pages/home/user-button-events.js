import { callLoginStorage, setLoginStorage, clearStorage } from "../../scripts/localStorage.js"
import { modalTemplate, closeModal, confirmCancel } from "../../scripts/modal.js"
import { patchProfile } from "../../scripts/api.js"
import { renderAvatar } from "../../pages/home/navigation.js"

function list (container){
    const ul = document.createElement(`ul`)
          ul.classList = `dropdown`

    const changeAvatar = document.createElement(`li`)
          changeAvatar.classList = `dropdown-item change-avatar`
          changeAvatar.innerHTML = `Alterar avatar`
          modalAvatar (changeAvatar, container)

    const logout = document.createElement(`li`)
          logout.classList = `dropdown-item logout`
          logout.innerHTML = `Sair`
          exitAccount (logout, container)
          

    ul.append(changeAvatar, logout)

    return ul
}

function modalAvatar (target, container){
    target.addEventListener(`click`, () => {
      container.innerHTML = ""

      const title = document.createElement(`h4`)
            title.innerHTML = `Mudança de avatar`

      const formAvatar = document.createElement(`form`)
            formAvatar.id = `avatar-change-form`
            
            const label = document.createElement(`label`)
            label.innerHTML = `Insira a nova URL do avatar`
            
            const input = document.createElement(`input`)
            input.classList = `url-input`
            input.required = `true`
            input.type = `url`
            input.name = `url`
            input.placeholder = `URL da imagem`
            
        
      formAvatar.append(label, input, confirmCancel ("Mudar avatar"))

      modalTemplate (title, formAvatar)

      formAvatarEvent (formAvatar, input)
    })
}

function formAvatarEvent (form, input){
      form.addEventListener("submit", (e) => {
            e.preventDefault()
            const parseStorage = JSON.parse(callLoginStorage ())
            parseStorage.avatar = input.value
            setLoginStorage (parseStorage)
            const patch = {
                  avatar: input.value
            }
            patchProfile (patch, parseStorage.token)
            renderAvatar ()
            closeModal ()
      })
}

function exitAccount (target, container){
    target.addEventListener(`click`, () => {
        clearStorage ()
        window.location.assign("../../../index.html")
        container.innerHTML = ""
    })
}

export { list, exitAccount }
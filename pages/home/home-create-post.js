import { modalTemplate, confirmCancel, closeModal } from "../../scripts/modal.js"
import { callLoginStorage } from "../../scripts/localStorage.js"
import { newPost } from "../../scripts/api.js"
import { renderPost } from "../../pages/home/home-render-post.js"

function modalPost (){
    const button = document.querySelector(`.new-post`)
    button.addEventListener(`click`, (e) => {
        const h4 = document.createElement(`h4`)
              h4.innerHTML = `Criar um post`

        const form = document.createElement(`form`)
              form.id = `new-post-form`

        const postTitelLabel = document.createElement(`label`)
              postTitelLabel.classList = `post-title-label`
              postTitelLabel.innerHTML = `Título do post`

        const titleInput = document.createElement(`input`)
              titleInput.classList = `post-title-input`
              titleInput.placeholder = `Digite o título aqui...`
              titleInput.required = `true`
              titleInput.name = `title`

        const postContentLabel = document.createElement(`label`)
              postContentLabel.classList = `post-content-label`
              postContentLabel.innerHTML = `Conteúdo do post`

        const postContentTextarea = document.createElement(`textarea`)
              postContentTextarea.classList = `post-content-textarea`
              postContentTextarea.placeholder = `Desenvolva o conteúdo do post aqui...`
              postContentTextarea.required = `true`
              postContentTextarea.name = `content`

        form.append(postTitelLabel, titleInput, postContentLabel, postContentTextarea, confirmCancel("Publicar"))

        modalTemplate (h4, form)

        sendPost (form)
    })
}

function sendPost (form){
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const storage = JSON.parse(callLoginStorage ())
        const token = storage.token
        const formElements = [...form]
        const object = {}
        formElements.forEach((element) => {
            if (element.required){
                object[element.name] = element.value
            }
        })
        await newPost (object, token)
        renderPost ()
        closeModal ()
    })
}

modalPost ()
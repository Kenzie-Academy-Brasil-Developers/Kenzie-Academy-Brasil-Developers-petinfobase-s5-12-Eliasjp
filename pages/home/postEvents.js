import { modalTemplate, closeModal, confirmCancel, alertCancel } from "../../scripts/modal.js"
import { patchPost, deletePost } from "../../scripts/api.js"
import { callLoginStorage } from "../../scripts/localStorage.js"
import { successPopUp } from "../../scripts/pop-up.js"
import { renderPost } from "./home-render-post.js"    

async function editEvent (postID, postTitle, postContent, date){

      const h4 = document.createElement(`h4`)
            h4.innerHTML = `Editar o post`

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
            titleInput.value = postTitle

      const postContentLabel = document.createElement(`label`)
            postContentLabel.classList = `post-content-label`
            postContentLabel.innerHTML = `Conteúdo do post`

      const postContentTextarea = document.createElement(`textarea`)
            postContentTextarea.classList = `post-content-textarea`
            postContentTextarea.placeholder = `Desenvolva o conteúdo do post aqui...`
            postContentTextarea.required = `true`
            postContentTextarea.name = `content`
            postContentTextarea.value = postContent

    form.append(postTitelLabel, titleInput, postContentLabel, postContentTextarea, confirmCancel("Salvar alteração"))
    
    modalTemplate (h4, form)

    form.addEventListener(`submit`, async (e) => {
      e.preventDefault()
      const storage = JSON.parse(callLoginStorage ())
      const token = storage.token
      const body = document.querySelector(`body`)
      const formElements = [...form]
      const object = {}
      
      formElements.forEach(async element => {
            if (element.name){
                  object[element.name] = element.value
            }
      })
      await patchPost (postID, token, object)
      body.append(successPopUp ("Post editado com sucesso", "O post foi alterado"))
      const popUp = document.querySelector(`.pop-up`)
      setTimeout(() => {popUp.remove()}, 5300)
      renderPost ()
      closeModal ()
    })
}

async function deleteEvent (postID){
    const h4 = document.createElement(`h4`)
          h4.innerHTML = `Confirmação de exclusão`

    const deleteDiv = document.createElement(`div`)
          deleteDiv.classList = `delete-alert`

    const h3 = document.createElement(`h3`)
          h3.innerHTML = `Tem certeza que deseja excluir este post`

    const p = document.createElement(`p`)
          p.innerHTML = `Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir`

    deleteDiv.append(h3, p, alertCancel ("Sim, excluir esse post"))

    modalTemplate (h4, deleteDiv)
    const storage = JSON.parse(callLoginStorage ())
    const token = storage.token

    const alertBtn = document.querySelector(`.alert`)
          alertBtn.addEventListener(`click`, async (e) => {
            e.preventDefault()
            const body = document.querySelector(`body`)
            await deletePost (postID, token)
            body.append(successPopUp ("Post foi removido com sucesso", "O post foi deletado."))
            const popUp = document.querySelector(`.pop-up`)
            setTimeout(() => {popUp.remove()}, 5300)
            renderPost ()
            closeModal ()
          })
}

async function fullPostModal (title, content, userAvatar, userUsername){
      const cardHeader = document.createElement(`header`)
          cardHeader.classList = `card-header`

      const userInfo = document.createElement(`div`)
            userInfo.classList = `user-info`

      const avatar = document.createElement(`img`)
            avatar.src = userAvatar
            avatar.alt = userUsername
            avatar.classList = `avatar-post`

      const username = document.createElement(`h6`)
            username.classList = `username`
            username.innerHTML = userUsername

      const container = document.createElement(`div`)
            container.classList = `full-post-container`

      const h4 = document.createElement(`h4`)
            h4.classList = `full-post-title`
            h4.innerHTML = title

      const postContent = document.createElement(`p`)
            postContent.classList = `full-post-content`
            postContent.innerHTML = content

      cardHeader.append(userInfo)
      userInfo.append(avatar, username)
      container.append(h4, postContent)

      modalTemplate (cardHeader, container)
}

export { editEvent, deleteEvent, fullPostModal }
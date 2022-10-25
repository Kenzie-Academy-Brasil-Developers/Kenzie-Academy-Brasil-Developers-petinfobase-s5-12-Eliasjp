import { getPost } from "../../scripts/api.js"
import { callLoginStorage } from "../../scripts/localStorage.js"
import { editEvent, deleteEvent, fullPostModal } from "../../pages/home/postEvents.js" 

async function renderPost (){
    const list = document.querySelector(`.post-list`)
          list.innerHTML = ""

    const storage = JSON.parse(callLoginStorage ())
    const userID = storage.id

    const posts = await getPost (storage.token)
    posts.forEach(post => {
        const postCreator = post.user.id
        postCard (post, userID, postCreator)
    })
}

function postCard (object, userID, postCreator){
      const li = document.createElement(`li`)
            li.classList = `post-card`
            li.id = object.id
            const teste = object.createdAt
            const datePromise = new Date(teste)
            const date = datePromise.toString()

      const cardHeader = document.createElement(`header`)
            cardHeader.classList = `card-header`

      const userInfo = document.createElement(`div`)
            userInfo.classList = `user-info`

      const avatar = document.createElement(`img`)
            avatar.src = object.user.avatar
            avatar.alt = object.user.username
            avatar.classList = `avatar-post`

      const username = document.createElement(`h6`)
            username.classList = `username`
            username.innerHTML = object.user.username

      const spanWall = document.createElement(`span`)
            spanWall.classList = `separator`
            spanWall.innerHTML = "|"

      const createdTime = document.createElement(`small`)
            createdTime.classList = `created-time`
            createdTime.innerHTML = date.slice(4, 24)

      const editDeleteContainer = document.createElement(`div`)
            editDeleteContainer.classList = `edit-delete-container`

      const postTitle = document.createElement(`h3`)
            postTitle.classList = `post-title`
            postTitle.innerHTML = object.title

      const postContent = document.createElement(`p`)
            postContent.classList = `post-content`
            postContent.innerHTML = object.content

      const fullPost = document.createElement(`button`)
            fullPost.classList = `full-post`
            fullPost.innerHTML = `Acessar publicação`
            fullPost.addEventListener(`click`, () => {
                  fullPostModal (object.title, object.content, object.user.avatar, object.user.username)
            })

      if (userID == postCreator){

      const editBtn = document.createElement(`button`)
            editBtn.classList = `edit-button`
            editBtn.innerHTML = `Editar`
            editBtn.addEventListener(`click`, (e) => {
                  editEvent (object.id, object.title, object.content, date)
            })
      
      const deleteBtn = document.createElement(`button`)
            deleteBtn.classList = `delete-button`
            deleteBtn.innerHTML = `Excluir`
            deleteBtn.addEventListener(`click`, (e) => {
                  deleteEvent (object.id)
            })
      
      editDeleteContainer.append(editBtn, deleteBtn)
      }

    const ul = document.querySelector(`.post-list`)

    ul.append(li)
    li.append(cardHeader, postTitle, postContent, fullPost)
    if (userID == postCreator){
        cardHeader.append(userInfo, editDeleteContainer)
    }else {
        cardHeader.append(userInfo)
    }
    userInfo.append(avatar, username, spanWall, createdTime)
}

renderPost ()

export { renderPost }
function modalTemplate (headerTitle, modalContent){
    const queryBody = document.querySelector(`body`)

    const modalBackground = document.createElement(`div`)
          modalBackground.classList = `modal-background`

    const modalContainer = document.createElement(`section`)
          modalContainer.classList = `modal-container`

    const modalHeader = document.createElement(`header`)
          modalHeader.classList = `modal-header`

    const modalClose = document.createElement(`button`)
          modalClose.classList = `close-modal`
          modalClose.innerHTML = `X`
          modalClose.addEventListener(`click`, () => {
            modalBackground.remove()
          })

    queryBody.append(modalBackground)
    modalBackground.append(modalContainer)
    modalHeader.append(headerTitle, modalClose)
    modalContainer.append(modalHeader, modalContent)
}

function closeModal (){
      const queryModal = document.querySelector(`.modal-background`)
      queryModal.remove()
}

function alertCancel (alertText){
      const divBtn = document.createElement(`div`)
            divBtn.classList = `button-container`
            
      const alert = document.createElement(`button`)
            alert.classList = `alert`
            alert.type = `submit`
            alert.innerHTML = alertText
            
      const cancelButton = document.createElement(`button`)
            cancelButton.classList = `cancel`
            cancelButton.innerHTML = `Cancelar`
            cancelButton.addEventListener(`click`, (e) => {
                  e.preventDefault()
                  closeModal ()
            })
      
      divBtn.append(alert, cancelButton)
      
      return divBtn
}

function confirmCancel (confirmText){
      const divBtn = document.createElement(`div`)
            divBtn.classList = `button-container`
            
      const confirm = document.createElement(`button`)
            confirm.classList = `confirm`
            confirm.type = `submit`
            confirm.innerHTML = confirmText
            
      const cancelButton = document.createElement(`button`)
            cancelButton.classList = `cancel`
            cancelButton.innerHTML = `Cancelar`
            cancelButton.addEventListener(`click`, (e) => {
                  e.preventDefault()
                  closeModal ()
            })
      
      divBtn.append(confirm, cancelButton)
      
      return divBtn
}

export { modalTemplate, closeModal, confirmCancel, alertCancel }
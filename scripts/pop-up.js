function successPopUp (popContent, popTitle){
    const divPop = document.createElement(`div`)
          divPop.classList = `pop-up`

    const header = document.createElement(`header`)
          header.classList = `pop-up-header`

    const container = document.createElement(`div`)
          container.classList = `check-container`

    const mark = document.createElement(`img`)
          mark.classList = `check-mark`
          mark.src = "../../src/images/check-mark.svg"
          mark.alt = "check-mark"

    const title = document.createElement(`p`)
          title.classList = `pop-up-title-sucess`
          title.innerHTML = popTitle

    const content = document.createElement(`small`)
          content.classList = `pop-up-content`
          content.innerHTML = popContent

    divPop.append(header, content)
    header.append(container, title)
    container.append(mark)

    return divPop
}

function errorPopUp (popContent){
    const divPop = document.createElement(`div`)
          divPop.classList = `pop-up`

    const header = document.createElement(`header`)
          header.classList = `pop-up-header`

    const container = document.createElement(`div`)
          container.classList = `x-container`

    const mark = document.createElement(`img`)
          mark.classList = `x-mark`
          mark.src = "../../src/images/x-mark.svg"
          mark.alt = "x-mark"

    const title = document.createElement(`p`)
          title.classList = `pop-up-title-error`
          title.innerHTML = `Algum erro aconteceu`

    const content = document.createElement(`small`)
          content.classList = `pop-up-content`
          content.innerHTML = popContent

    divPop.append(header, content)
    header.append(container, title)
    container.append(mark)

    return divPop
}

export { successPopUp, errorPopUp }
const headerTemplate = () => {
  return `
    <h1 id="logo">P</h1>
    <input type="text" placeholder="Search" id="searchinput"/>
    <button id="searchbtn"><img src="./assets/nube.png" alt="Search icon"/></button>
    <button id="darkmodebtn"><img src="./assets/luna.png" alt="Dark mode icon" id="darkmodeicon"></button>
    <img src="./assets/usuario.png" alt="Profile image" class="profileimg"/>
  `
}

const themeSwitch = () => {
  document.body.classList.toggle('dark')
}

const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
    if (theme) {
      document.querySelector('#darkmodeicon').src = './assets/oscuro.png'
    } else {
      document.querySelector('#darkmodeicon').src = './assets/dark.svg'
    }
  })

  const logo = document.querySelector('#logo')
  logo.addEventListener('click', async () => {
    await resetToInitialState()
  })
}

const printHeaderTemplate = () => {
  document.querySelector('#header').innerHTML = headerTemplate()
  listeners()
}

export { printHeaderTemplate }

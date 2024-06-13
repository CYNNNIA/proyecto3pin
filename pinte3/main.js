import './style.css'
import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})

// HEADER
const headerTemplate = () => {
  return `
  <h1 id="logo">P</h1>
  <input type="text" placeholder="Search" id="searchinput"/>
  <button id="searchbtn"><img src="./assets/nube.png" alt="Search icon"/></button>
  <button id="darkmodebtn"><img src="./assets/luna.png" alt="Dark mode icon" id="darkmodeicon"></button>
  <img
    src="./assets/usuario.png"
    alt="Profile image"
    class="profileimg"
  /> 
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
  document.querySelector('header').innerHTML = headerTemplate()
  listeners()
}

printHeaderTemplate()

// FOOTER
const templateFooter = () => {
  return `
    <h4>Copyright 2024 - Pinterest - Bendita Webmaster - </h4>
  `
}

const printFooterTemplate = () => {
  document.querySelector('footer').innerHTML = templateFooter()
}

printFooterTemplate()

const cardTemplate = (item) => {
  return `
    <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 10px solid ${item.color}">
    <div class="info">
        <div class="save-btn">
            <button>Guardar</button>
        </div>
        <div class="links">
            <a href=${item.links.html} class="full-link">${item.links.html}</a>
            <div>
                <a href=${item.urls.full} target="_blank" class="links-icon">
                    <img src="./assets/descargar-flecha.png" alt="Upload icon"/>
                </a>
                <a href="#null" class="links-icon">
                    <img src="./assets/mas.png" alt="More icon"/>
                </a>    
            </div>
        </div>
    </div>
    </li>
  `
}

const searchPhotos = async (keyword) => {
  const images = await unsplash.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30
  })
  return images
}

const galleryTemplate = () => {
  return `
    <ul class="gallery"></ul>
  `
}

const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  for (const item of items) {
    gallery.innerHTML += cardTemplate(item)
  }
}

const galleryListeners = async () => {
  const input = document.querySelector('#searchinput')
  const btn = document.querySelector('#searchbtn')
  btn.addEventListener('click', async () => {
    await handleSearch(input.value)
  })
}

const handleSearch = async (keyword) => {
  const input = document.querySelector('#searchinput')
  let images = await searchPhotos(keyword)
  if (images.response.results.length === 0) {
    images = await searchPhotos('cats')
    alert(
      'No se encontraron imágenes. Aquí tienes algunos gatos y te sugerimos usar otra frase o palabra para una búsqueda correcta.'
    )
  }
  printItems(images.response.results)
  input.value = ''
}

const printTemplate = async () => {
  document.querySelector('main').innerHTML = galleryTemplate()
  galleryListeners()

  const images = await searchPhotos('tattoos')
  printItems(images.response.results)
}

const resetToInitialState = async () => {
  const images = await searchPhotos('tattoos')
  printItems(images.response.results)
}

printTemplate()

import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})

const cardTemplate = (item) => {
  return `
    <li class="gallery-item" style="background-image: url(${
      item.urls.regular
    }); border: 10px solid ${item.color}">
      <div class="info">
        <div class="save-btn">
          <button>Guardar</button>
        </div>
        <div class="profile-info">
          <img src="${
            item.user.profile_image.small
          }" alt="Profile image" class="profileimg"/>
          <p>${item.user.name}</p>
          <p>${new Date(item.created_at).toLocaleDateString()}</p>
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
  document.querySelector('#main').innerHTML = galleryTemplate()
  galleryListeners()

  const images = await searchPhotos('tattoos')
  printItems(images.response.results)
}

const resetToInitialState = async () => {
  const images = await searchPhotos('tattoos')
  printItems(images.response.results)
}

export { printTemplate, resetToInitialState }

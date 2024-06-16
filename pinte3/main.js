import { printHeaderTemplate } from './header.js'
import { printFooterTemplate } from './footer.js'
import { printTemplate, resetToInitialState } from './gallery.js'

document.addEventListener('DOMContentLoaded', () => {
  printHeaderTemplate()
  printFooterTemplate()
  printTemplate()
})

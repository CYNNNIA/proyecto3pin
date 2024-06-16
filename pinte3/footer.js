const templateFooter = () => {
  return `
    <h4>Copyright 2024 - Pinterest - Bendita Webmaster</h4>
  `
}

const printFooterTemplate = () => {
  document.querySelector('#footer').innerHTML = templateFooter()
}

export { printFooterTemplate }

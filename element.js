/*
  defining the <load-file> Web Component,
  yes! the documenation is longer than the code
  License: https://unlicense.org/
*/
customElements.define("load-file", class extends HTMLElement {

  // declare default connectedCallback as sync so await can be used
  async connectedCallback(
    // call connectedCallback with parameter to *replace* SVG (of <load-file> persists)
    src = this.getAttribute("src"),
    // attach a shadowRoot if none exists (prevents displaying error when moving Nodes)
    // declare as parameter to save 4 Bytes: 'let '
    shadowRoot = this.shadowRoot || this.attachShadow({mode:"open"})
  ) {
      // load SVG file from src="" async, parse to text, add to shadowRoot.innerHTML
    shadowRoot.innerHTML = await (await fetch(src)).text()

    // append optional <tag [shadowRoot]> Elements from <load-svg> innerHTML/lightDOM after parsed <svg>
    shadowRoot.append(...this.querySelectorAll("[shadowRoot]"))

    // if "replaceWith" attribute exists
    // then replace <load-svg> with loaded content <load-svg>
    // childNodes instead of children to include #textNodes also
    this.hasAttribute("replaceWith") && this.replaceWith(...shadowRoot.childNodes)
  }
})

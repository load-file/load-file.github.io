console.clear();
customElements.define(
  "load-file",
  class extends HTMLElement {
    async connectedCallback() {
      let shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });
      let src = (this.src = this.getAttribute("src"));
      shadowRoot.innerHTML = `<load-file-cached src="${src}"></load-file-cached>`;
      let cache =
        (this.cache =
        this.constructor.cache =
          this.constructor.cache || new Map());
      let content = cache.get(src);
      if (!content) {
        cache.set(src, src);
        cache.set(src, (content = await (await fetch(src)).text()));
        URIs.append(
          Object.assign(document.createElement("li"), { innerHTML: src })
        );
        if (!customElements.get("load-file-cached")) {
          customElements.define(
            "load-file-cached",
            class extends HTMLElement {
              connectedCallback() {
                let src = this.getAttribute("src");
                let host = this.getRootNode().host;
                let content = host.constructor.cache.get(src);
                if (!content || content == src)
                  setTimeout(() => this.connectedCallback(), 0);
                else host.render(content);
              }
            }
          );
        }
      }
    }
    render(content = this.cache.get(this.src)) {
      this.shadowRoot.innerHTML = content;
      this.shadowRoot.append(...this.querySelectorAll("[shadowRoot]"));
      this.hasAttribute("replaceWith") &&
        this.replaceWith(...this.shadowRoot.childNodes);
    }
  }
);

function addSquare(color = "blue") {
  let lf = document.createElement("load-file");
  lf.setAttribute("src", `//svg-cdn.github.io/${color}.svg`);
  document.body.append(lf);
}
setTimeout(() => {
  addSquare("red");
  document.body.onclick = () => {
    addSquare();
  };
}, 1000);

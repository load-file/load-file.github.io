customElements.define("load-file",class extends HTMLElement {
    async connectedCallback() {
      let tmpname = this.localName + "-cached";
      let shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });
      let src = (this.src = this.getAttribute("src"));
      shadowRoot.innerHTML = `<${tmpname} src="${src}"></${tmpname}>`;
      let cache = (this.cache = this.constructor.cache = this.constructor.cache || new Map());
      let content = cache.get(src);
      if (!content) {
        cache.set(src, src);
        cache.set(src, (content = await (await fetch(src)).text()));
        URIs?.append(Object.assign(document.createElement("li"), { innerHTML: src }));
        if (!customElements.get(tmpname)) {
          customElements.define( tmpname, class extends HTMLElement {
              connectedCallback() {
                let src = this.getAttribute("src");
                let host = this.getRootNode().host;
                let content = host.constructor.cache.get(src);
                if (!content || content == src) setTimeout(() => this.connectedCallback(), 0);
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
      this.hasAttribute("replaceWith") && this.replaceWith(...this.shadowRoot.childNodes);
    }
  }
);
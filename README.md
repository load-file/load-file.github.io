# load-file.github.io
Web Component to load external SVG or HTML files and inject them in the Document

## see: [Dev.to post & documentation](https://dev.to/dannyengelman/load-file-web-component-add-external-content-to-the-dom-1nd)

```html
<load-file replaceWith src="//load-file.github.io/heart.svg"></load-file>

<load-file src="//load-file.github.io/heart.svg">
  <!-- elements inside load-file are MOVED to shadowDOM -->
  <style>
    svg {
      height: var(--height); /* CSS properties cascade into shadowDOM!! */
    }
    path:nth-child(2n+2) {
      fill: GREEN; /* shadowDOM style does NOT style global DOM */
    }
  </style>
</load-file>
```


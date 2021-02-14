class myElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "text", "img"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "title") {
      this.title = newVal;
    }

    if (attr === "text") {
      this.text = newVal;
    }

    if (attr === "img") {
      this.img = newVal;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
          <section>
              <h2>
                ${this.title}
              </h2>
              <div>
                <p>
                  ${this.text}
                </p>
                <img src="${this.img}" />
              </div>
          </section>
          ${this.getStyles()}
        `;

    return template;
  }

  getStyles() {
    return `
          <style>
            h2{
                font-size: 4rem;
                color: blue;
            }

            p{
                color: violet;
            }
          </style>
        `;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("my-element", myElement);

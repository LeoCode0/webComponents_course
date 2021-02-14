class myElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.p = this.getAttribute("text");
    this.title = this.getAttribute("title");
    this.img = this.getAttribute("img");
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
                  ${this.p}
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

class myElement extends HTMLElement {
  constructor(text) {
    super();
    this.p = text;
    this.attachShadow({ mode: "open" });
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
          <section>
              <h2>
                <slot name="title" ></slot>
              </h2>
              <div>
                <p>
                  <slot name="paragraph" ></slot>
                </p>
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

class myElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
          <section>
              <h2>
                Hello world!
              </h2>
              <div>
                <p>I'm more text</p>
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

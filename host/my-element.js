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
      :host{
        display: inline-block;
        width: 100%;
        min-width: 300px;
        max-width: 450px;
        font-size: 2rem;
        background: violet;
      }

      :host(.blue){
        background: blue;
      }

      :host([yellow]){
        background: yellow;
      }

      :host([yellow]) h2, :host([yellow]) p{
        color: red;
        font-size: 3rem;
      }

      :host([yellow]) p{
        color: green;
      }

      :host-context(article.card){
        display: block;
        max-width: 100px;
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

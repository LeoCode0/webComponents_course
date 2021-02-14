class myElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getTemplate() {
    const template = document.createElement("template");

    template.innerHTML = `
      <section>
        <h1>
          <slot name="title"></slot>
        </h1>
        <p>
          <slot name="text"></slot>
        </p>
        <slot></slot>
      </section>
      ${this.getStyles()}
    `;

    return template;
  }

  getStyles() {
    return `
      <style>
        ::slotted(span){
          font-size: 32px;
        }

        ::slotted(span.red){
          color: red;
        }

        ::slotted(span.blue){
          color: blue;
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

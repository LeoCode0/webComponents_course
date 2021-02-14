class MyCustomElement extends HTMLElement {
  constructor() {
    super();

    console.log("Hello from app constructor");
  }

  connectedCallback() {
    console.log("Hello from DOM (connected callback)");
  }

  disconnectedCallback() {
    console.log("Bye from Disconnected callback :(");
  }
}

customElements.define("my-app", MyCustomElement);

document.querySelector("my-app").remove();

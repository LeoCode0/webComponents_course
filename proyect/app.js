class myElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["price", "productname", "type", "img"];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === "price") {
      this.price = newValue;
    }
    if (attr === "productname") {
      this.productName = newValue;
    }
    if (attr === "type") {
      this.type = newValue;
    }
    if (attr === "img") {
      this.img = newValue;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    const formatPrice = window.Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(this.price);

    template.innerHTML = `
        <section class="container" >
            <div class="banner" >
                <span>Nike</span>
                <img src=${this.img} alt="${this.productName}" />
            </div>
            <div class="text_info" >
              <div class="container__text" >  
                <div class="details" >
                    <div class="productName" >
                      <h2>${this.productName}</h2>
                      <span class="gray-text">${this.type}</span>
                      <span class="gray-text" >Collection</span>
                    </div>
                  </div>
                <div class="text" >
                  <p><slot></slot></p>
                </div>
                <div class="payment" >
                    <span class="gray-text price" >${formatPrice}</span>
                    <button class="button" >Buy now</button>
                </div>
              </div>
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
                --bg-color: #5a6cb2;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                max-width: 900px;
                font-size: 1.8rem;
            }

            .container{
              display: flex;
              flex-wrap: wrap;
              padding: 20px;
            }

            .container__text{
              background: #FFF;
              padding: 50px 20px 20px;
              height: 500px;
            }

            .container__text h2{
              margin: 0;
            }

            .banner{
                display: block;
                background-color: var(--bg-color);
                height: 280px;
                width: 100%;
                position: relative;
                padding: 2rem;
            }

            .banner img{
              position: absolute;
              bottom: -55px;
              height: 250px;
              right: 40px;
            }

            .banner span{
              display: inline-block;
              width: 100%;
              font-size: 10rem;
              opacity: 0.1;
              font-weight: 700;
            }

            .productName{
              display: flex;
              align-items: baseline;
              flex-wrap: wrap;
            }

            .productName h2{
              font-size: 3.6rem;
              margin-right: 10px;
            }

            .gray-text{
              display: inline-block;
              width: 40%;
              text-transform: uppercase;
              font-size: 1.5rem;
              opacity: 0.4;
              font-weight: 900;
              letter-spacing: 2px;
            }

            
            .details > span{
              display: block;
              margin: 15px 0 20px;
            }

            .text{
              font-size: 1.4rem;
            }

            .payment{
              display: flex;
              width: 100%;
              justify-content: space-between;
              margin-top: 90px;
            }

            .price{
              letter-spacing: initial;
              font-size: 3rem;
              font-weight: 600;
              opacity: 0.5;
            }

            .button{
              display: block;
              height: 40px;
              width: 110px;
              border: 0;
              border-radius: 20px;
              background-color: var(--bg-color);
              color: #FFF;
              font-size: 1.4rem;
              text-transform: uppercase;
              font-weight: 600;
            }

            @media (min-width: 1024px){
              .container{
                flex-wrap: initial;
              }
              
              .banner{
                width: 45%;
              }

              .text_info{
                width: 55%;
              }

              .banner, .text_info{
                height: 480px;
              }

              .banner img{
                height: 400px;
                right: -60px;
                bottom: 5px;
                transform: rotate(-30deg);
              }

              .productName{
                flex-wrap: wrap;
              }

              .productName h2{
                width: 100%;
              }

              .gray-text{
                width: max-content;
                margin-right: 20px
              }

              .text{
                padding: 0 40px;
              }

              .container__text{
                padding-top: 0;
              }
              
              .details{
                padding-top: 50px;
              }
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

customElements.define("nike-card", myElement);

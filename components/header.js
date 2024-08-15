const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
	<style>  
    div {
      height: 60px;
      padding: 0 10px;      
      display: flex;
      align-items: center;
      justify-content: space-between;      
      background-color:  #294076;
      font-weight: 700;
      color: #fff;
      user-select: none;
      }  
    imagen{
    width: 25%;
    }
    .button {     
      border: none;
      cursor: pointer;
      font-weight: 600;
      border-radius: 4px;
      font-size: 13px;
      height: 30px;
      background-color: #7cca12;
      color: #fff;
      padding: 0 20px;              
      }
    .button:hover{
      background-color: #B31268;      
    }
    img {
      width: 40px;
      
    }
  </style>
  <header>
    <div>
      <div class="imagen"><!--<img src="images/logo-comuneros.png" alt="Logo-Comuneros">--></div>
      <div>PQRS Comuneros</div>
      <div><input type="button" class="button" value="Crear PQRS"></div>
    
    </div>
  </header>
	`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define("header-component", Header);

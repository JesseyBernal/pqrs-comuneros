const footerTemplate = document.createElement("template");

footerTemplate.innerHTML = `
	<style>
		footer {
			height: 60px;
			padding: 0 10px;
			list-style: none;
			display:flex;
			justify-content: space-between;
			align-items: center;
			background-color: #dfdfe2;
		}
		ul{		
			padding:0;
		}
		ul li {
			list-style: none;			
		}
		a {
			margin: 0 15px;
			color: inherit;
			text-decoration: none;
		}
		a:hover {
			padding-bottom: 5px;
			box-shadow: inset 0 -2px 0 0 #333;
		}		
		
		.social-row {				
			font-size: 20px;
		}
		.social-row li{
			display: inline;
		}
		.social-row li a {
			margin: 0 15px;
		}
		.derechos-autor{
		font-size: 14px;
		color: #767575;
		}
		img {
      		width: 40px;      
    	}
	</style>
	<footer>
		<div class="imagen"><img src="images/logo-comuneros.png" alt="Logo-Comuneros"></div>
		<div class="derechos-autor">© 2024 C.C. Comuneros</div>
		<ul class="social-row">
			<li><a href="https://web.facebook.com/LosComunerosOficial/?_rdc=1&_rdr"><i class="fab fa-facebook"></i></a></li>
			<li><a href=""><i class="fab fa-instagram"></i></a></li>			
		</ul>
	</footer>
	`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const fontAwesome = document.querySelector('script[src*="fontawesome"]');
    console.log(fontAwesome);
    const shadowRoot = this.attachShadow({ mode: "closed" });
    /*
		if(fontAwesome) {
			shadowRoot.appendChild(fontAwesome.cloneNode())
			
		}
		*/
    const id = setInterval(() => {
      //console.log('setInterval');
      const fontAwesomeFont = document.querySelector("#fa-v5-font-face");
      const fontAwesomeMain = document.querySelector("#fa-main");
      if (fontAwesome && fontAwesomeFont && fontAwesomeMain) {
        shadowRoot.appendChild(fontAwesome.cloneNode());
        shadowRoot.appendChild(fontAwesomeFont.cloneNode("deep"));
        shadowRoot.appendChild(fontAwesomeMain.cloneNode("deep"));
        clearInterval(id);
      }
    }, 200);

    console.log(shadowRoot);
    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define("footer-component", Footer);

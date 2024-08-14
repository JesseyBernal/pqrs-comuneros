

window.onload = (event) => {
	console.log("Pagina esta cargada")
	const template = document.getElementById('welcome-msg');
	document.body.appendChild(template.content);
}

const title = document.querySelector('#titleMain');

const text = '¡Bienvenido a la pagina principal!';

let index = 0;

console.log(title);

async function typeWriter(){

	if(index < text.length){
		title.classList.add('TituloJavaScript');
		title.innerHTML += text.charAt(index);
		index++;
		await setTimeout(typeWriter,100);	
	}

}
typeWriter();
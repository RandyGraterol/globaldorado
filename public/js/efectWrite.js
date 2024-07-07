
const title = document.querySelector('#title');
const titleMain = document.querySelector('#titleMain');

const text = '¡Bienvenido a GlobalDorado!';
const textSecond = 'Sección dedicado a ti , crecimiento y evolución personal en Global';

let index = 0;

console.log(title);

async function typeWriter(){

	if(index < text.length){
		title.style='color:rgb(255, 183, 67);width:700px;text-aling:center;margin:1rem auto;display:flex;justify-content:center;aling-items:center;font-style: italic !important;font-weight:bold'
		title.innerHTML += text.charAt(index);
		index++;
		await setTimeout(typeWriter,100);	
	}

}
typeWriter();
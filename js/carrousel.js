const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const carousselContent = document.getElementById("caroussel-content");

const listaLivros = [
  'img_livro_bd', 
  'img_livro_Csharp', 
  'img_livro_html_css',
  'img_livro_js',
  'img_livro_python',
  'img_livro_scrum'
];

let currentIndex = 0;

function updateCaroussel() {
    const elementos = carousselContent.querySelectorAll(".livro");

    for (let i = 0; i < elementos.length; i++) {
        const index = (currentIndex + i) % listaLivros.length;
        elementos[i].className = "livro"; 
        elementos[i].classList.add(listaLivros[index]); 
    }
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % listaLivros.length;
    updateCaroussel();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + listaLivros.length) % listaLivros.length;
    updateCaroussel();
});

updateCaroussel();
















/*const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const carousselContent = document.getElementById("caroussel-content");


const listaLivros = ['img_livro_bd', 'img_livro_Csharp', 'img_livro_html_css',"img_livro_js", "img_livro_python" , "img_livro_scrum"];
   

let currentIndex = 0; // contador para lista

function updateCaroussel() {
    carousselContent.classList.remove(...listaLivros); //... spread sintax, descompõe o array em elementos individuais
    carousselContent.classList.add(listaLivros[currentIndex]);

}

nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= listaLivros.length) {
        currentIndex = 0;
    }

    updateCaroussel();
});

prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = listaLivros.length-1;
    }

    updateCaroussel();
});
updateCaroussel();*/



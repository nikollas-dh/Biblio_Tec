const prevBtn = document.getElementById("prev-btn");
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
updateCaroussel();




const API = "http://localhost:3000/carrousel"

const cliqueGuardado = localStorage.getItem('botaoClicado')

async function DadosDoBanco() {
    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error('Erro na requisição à API');
        }

        const dados = await response.json();
        console.log('Dados recebidos:', dados);
        return dados; // retorna os dados para serem usados depois

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

if (cliqueGuardado === "sim") {
    document.getElementById("mensagem").innerText = "O botão na página anterior foi clicado";
}

const livroSelecionado = JSON.parse(localStorage.getItem("livroSelecionado"));

if (livroSelecionado) {
    document.getElementById("titulo").innerText = livroSelecionado.titulo;
    document.getElementById("autor").innerText = livroSelecionado.autor;
    document.getElementById("capa").src = livroSelecionado.capa_url;


}

localStorage.removeItem('botaoClicado');
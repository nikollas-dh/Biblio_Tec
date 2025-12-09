const API = 'http://localhost:3000/api/livros'


const urlParametro = new URLSearchParams(window.location.search)
const id = urlParametro.get("id")
console.log("ID do livro para editar", id)

const inputID = document.getElementById("id")
inputID.value = id;

async function carregarLivro() {
    if (!id) {
        alert("Nenhum livro selecionado para edição")
        return
    }
    const resposta = await fetch(`${API}/${id}`)
    const LIVRO = await resposta.json()
    console.log(LIVRO)

    const capaImg = document.getElementById("capa-livro-img");
    if (capaImg && LIVRO.caminho_capa) {
        capaImg.src = LIVRO.caminho_capa;
    }
    document.getElementById("caminho_capa").value = LIVRO.caminho_capa;
    document.getElementById("titulo").value = LIVRO.titulo;
    document.getElementById("autor").value = LIVRO.autor;
    document.getElementById("genero").value = LIVRO.genero;
    document.getElementById("editora").value = LIVRO.editora;
    document.getElementById("ano_publicacao").value = LIVRO.ano_publicacao.split('T')[0]; document.getElementById("isbn").value = LIVRO.isbn;
    document.getElementById("idioma").value = LIVRO.idioma;
    document.getElementById("formato").value = LIVRO.formato;
    document.getElementById("caminho_capa").value = LIVRO.caminho_capa;
    document.getElementById("sinopse").value = LIVRO.sinopse;
}

async function Atualizar(e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const editora = document.getElementById("editora").value.trim();
    const ano_publicacao = document.getElementById("ano_publicacao").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const idioma = document.getElementById("idioma").value.trim();
    const formato = document.getElementById("formato").value.trim();
    const caminho_capa = document.getElementById("caminho_capa").value.trim();;
    const sinopse = document.getElementById("sinopse").value.trim();

    const livroEditado = {
        titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse
    };

    console.log(livroEditado)
    if (!titulo && !autor) {
        alert("Gentileza preecher os campos")
        return
    }
    const novoLivro = {
        titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse
    }
    try {
        const requisicao = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: novoLivro ? JSON.stringify(livroEditado) : undefined
        })
        if (requisicao.status === 200) {
            console.log(requisicao.json())
            alert("Aluno atualizado com sucesso")
            window.location.href = "menu.html";
        } else {
            console.log("Erro na requisição", requisicao.status)
        }
    } catch (error) {
        console.error("Erro na atualização", error)
    }
}

carregarLivro()

const formEditLivro = document.getElementById("form-editar-livro");

formEditLivro.addEventListener("submit", Atualizar);

const API = "http://localhost:3000/api/livros"
console.log("JS carregou");

document.addEventListener("DOMContentLoaded", () => {
    
    const btnCadastrar = document.getElementById('btnCadastrar');
    const inputTitulo = document.getElementById("titulo");
    const inputAutor = document.getElementById("autor");
    const inputGenero = document.getElementById("genero");
    const inputEditora = document.getElementById("editora");
    const inputAno_publicacao = document.getElementById("ano_publicacao");
    const inputIsbn = document.getElementById("isbn");
    const inputIdioma = document.getElementById("idioma");
    const inputFormato = document.getElementById("formato");
    const inputsinopse = document.getElementById("sinopse");
    const formCadastrarLivro = document.getElementById("form-cadastrar-livro")
    console.log("formCadastrarLivro =", formCadastrarLivro);

    async function salvar(e) {
        e.preventDefault();
        console.log("Salvando Usuario");
        const titulo = inputTitulo.value.trim();
        const autor = inputAutor.value.trim();
        const genero = inputGenero.value.trim();
        const editora = inputEditora.value.trim();
        const ano_publicacao = inputAno_publicacao.value.trim();
        const isbn = inputIsbn.value.trim();
        const idioma = inputIdioma.value.trim();
        const formato = inputFormato.value.trim();
        const sinopse = inputsinopse.value.trim();

        if (!titulo || !autor|| !genero) {
            alert("Gentileza preecher os campos")
            return;
        }

        const novoLivro = {
            titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, sinopse
        }

        try {
            const requisicao = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoLivro)
            })

            if (requisicao.status === 201) {
                const dados = await requisicao.json();
                console.log(dados)

                alert("Livro cadastrado com sucesso!")
                window.location.href = "menu_admin.html";
            } else {
                console.log("Erro na requisição")
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (formCadastrarLivro) {
        formCadastrarLivro.addEventListener("submit", salvar);
    } else {
        console.error("Erro: O formulário 'form-cadastrar-livro' não foi encontrado.");
    }

}); 
const API = 'http://localhost:3000/api/usuarios'


const urlParametro = new URLSearchParams(window.location.search)
const id = urlParametro.get("id")
console.log("ID do usuário para editar", id)

const inputID = document.getElementById("id")
inputID.value = id;

async function carregarusuario() {
    if (!id) {
        alert("Nenhum usuário selecionado para edição")
        return
    }
    const resposta = await fetch(`${API}/${id}`)
    const USUARIO = await resposta.json()
    console.log(USUARIO)

  
    document.getElementById("nome").value = USUARIO.nome;
    document.getElementById("email").value = USUARIO.email;
    document.getElementById("genero").value = USUARIO.genero;
    document.getElementById("editora").value = USUARIO.editora;
    document.getElementById("ano_publicacao").value = USUARIO.ano_publicacao.split('T')[0]; document.getElementById("isbn").value = USUARIO.isbn;
    document.getElementById("idioma").value = USUARIO.idioma;
    document.getElementById("formato").value = USUARIO.formato;
    document.getElementById("caminho_capa").value = USUARIO.caminho_capa;
    document.getElementById("sinopse").value = USUARIO.sinopse;
}

async function Atualizar(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const editora = document.getElementById("editora").value.trim();
    const ano_publicacao = document.getElementById("ano_publicacao").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const idioma = document.getElementById("idioma").value.trim();
    const formato = document.getElementById("formato").value.trim();
    const caminho_capa = document.getElementById("caminho_capa").value.trim();;
    const sinopse = document.getElementById("sinopse").value.trim();

    const usuarioEditado = {
        nome, email, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse
    };

    console.log(usuarioEditado)
    if (!nome && !email) {
        alert("Gentileza preecher os campos")
        return
    }
    const novousuario = {
        nome, email, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse
    }
    try {
        const requisicao = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: novousuario ? JSON.stringify(usuarioEditado) : undefined
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

carregarusuario()

const formEditusuario = document.getElementById("form-editar-usuario");

formEditusuario.addEventListener("submit", Atualizar);

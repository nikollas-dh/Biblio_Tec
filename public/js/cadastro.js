const API = "http://localhost:3000/api/usuario"


const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const selectCurso = document.getElementById("curso");
const selectTurma = document.getElementById("turma");
const inputEmail = document.getElementById("email");
const inputNovaSenha = document.getElementById("novaSenha");
const inputConfirmarSenha = document.getElementById("confirmSenha");
const formCadastrar = document.getElementById("form-cadastrar");


async function salvar(e) {
    e.preventDefault()
    console.log("Salvando usuário")

    const nome = inputNome.value.trim();
    const cpf = inputCpf.value.trim()
    const curso = selectCurso.value;
    const turma = selectTurma.value;
    const email = inputEmail.value.trim();
    const novaSenha = inputNovaSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;

    if(!nome || !email || !novaSenha || !confirmarSenha){
        alert("Existem campos obrigatórios vazios!")
        return
    }

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }
    
}

formCadastrar.addEventListener("submit", salvar)

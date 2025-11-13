const API = "http://localhost:3000/usuario"

const botao = document.getElementById('btnCadastrar');
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const inputCurso = document.getElementById("curso");
const inputEmail = document.getElementById("email");
const inputNovaSenha = document.getElementById("novaSenha");
const inputConfirmarSenha = document.getElementById("confirmSenha");
const formCadastrar = document.getElementById("form-cadastrar")


async function salvar(e) {
  e.preventDefault();
  console.log("Salvando Usuario");
  const nome = inputNome.value.trim();
  const cpf = inputCpf.value.trim();
  const curso = inputCurso.value.trim();
  const email = inputEmail.value.trim();
  const novaSenha = inputNovaSenha.value.trim();
  const confirmarSenha = inputConfirmarSenha.value.trim();



  if (!nome || !cpf) {
    alert("Gentileza preecher os campos")
    return;
  }
  if (novaSenha !== confirmarSenha) {
    alert("As senhas não coincidem!")
    return;
  }
  const senha = novaSenha;
  const novoUsuario = {
    nome, cpf, curso, email, senha
  }

  // console.log(Usuarios)

  try {
    const requisicao = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario)
    })

    if (requisicao.status === 201) {
      const dados = await requisicao.json();
      console.log(dados)
      alert("Usuario cadastrado com sucesso!")
      window.location.href = "login.html";
    } else {
      console.log("Erro na requisição")
    }
  } catch (error) {
    console.error(error)
  }
}

formCadastrar.addEventListener("submit", salvar)


// const API = "http://localhost:3000/usuario"

// const botao = document.getElementById('btnCadastrar');
// const inputNome = document.getElementById("nome");
// const inputCpf = document.getElementById("cpf");
// const inputCurso = document.getElementById("curso");
// const inputEmail = document.getElementById("email");
// const inputNovaSenha = document.getElementById("novaSenha");
// const inputConfirmarSenha = document.getElementById("confirmSenha");
// const formCadastrar = document.getElementById("form-cadastrar")


// async function salvar(e) {
//   e.preventDefault();
//   console.log("Salvando Usuario");
//   const nome = inputNome.value.trim();
//   const cpf = inputCpf.value.trim();
//   const curso = inputCurso.value.trim();
//   const email = inputEmail.value.trim();
//   const novaSenha = inputNovaSenha.value.trim();
//   const confirmarSenha = inputConfirmarSenha.value.trim();

//   if (!nome || !cpf) {
//     alert("Gentileza preecher os campos")
//     return;
//   }
//   if (novaSenha !== confirmarSenha) {
//     alert("As senhas não coincidem!")
//     return;
//   }
//   const senha = novaSenha;
//   const novoUsuario = {
//     nome, cpf, curso, email, senha
//   }

//   // console.log(Usuarios)

//   try {
//     const requisicao = await fetch(API, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(novoUsuario)
//     })

//     if (requisicao.status === 201) {
//       const dados = await requisicao.json();
//       console.log(dados)
//       alert("Usuario cadastrado com sucesso!")
//       window.location.href = "login.html";
//     } else {
//       console.log("Erro na requisição")
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

// formCadastrar.addEventListener("submit", salvar)


const API = "http://localhost:3000/usuario"

const botao = document.getElementById('btnCadastrar');
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const inputCurso = document.getElementById("curso");
const inputEmail = document.getElementById("email");
const inputNovaSenha = document.getElementById("novaSenha");
const inputConfirmarSenha = document.getElementById("confirmSenha");
const formCadastrar = document.getElementById("form-cadastrar");

// CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
  let digito1 = (soma * 10) % 11;
  if (digito1 === 10) digito1 = 0;
  if (digito1 != cpf[9]) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
  let digito2 = (soma * 10) % 11;
  if (digito2 === 10) digito2 = 0;

  return digito2 == cpf[10];
}

// Email
function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Senha forte
function validarSenha(senha) {
  const regra = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  return regra.test(senha);
}

async function salvar(e) {
  e.preventDefault();
  console.log("Salvando Usuário...");

  const nome = inputNome.value.trim();
  const cpf = inputCpf.value.trim();
  const curso = inputCurso.value.trim();
  const email = inputEmail.value.trim();
  const novaSenha = inputNovaSenha.value.trim();
  const confirmarSenha = inputConfirmarSenha.value.trim();

  // Campos obrigatórios
  if (!nome || !cpf || !email || !curso || !novaSenha || !confirmarSenha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Nome sem números
  if (/\d/.test(nome)) {
    alert("O nome não pode conter números!");
    return;
  }

  // Nome mínimo
  if (nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres!");
    return;
  }

  // CPF válido
  if (!validarCPF(cpf)) {
    alert("CPF inválido!");
    return;
  }

  // Email válido
  if (!validarEmail(email)) {
    alert("E-mail inválido!");
    return;
  }

  // Senha forte
  if (!validarSenha(novaSenha)) {
    alert("A senha deve ter ao menos 8 caracteres, 1 número, 1 maiúscula e 1 símbolo!");
    return;
  }

  // Confirmar senha
  if (novaSenha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  const novoUsuario = { nome, cpf, curso, email, senha: novaSenha };

  try {
    const requisicao = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario)
    });

    if (requisicao.status === 201) {
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "login.html";
    } else {
      alert("Erro ao cadastrar usuário!");
    }
  } catch (error) {
    console.error(error);
    alert("Erro de conexão com o servidor!");
  }
}

formCadastrar.addEventListener("submit", salvar);



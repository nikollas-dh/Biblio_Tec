const API = "http://localhost:3000/api/usuario/login"


const bntLogin = document.getElementById('bntLogin');
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const formLogin = document.getElementById("form-login")


async function carregandoUsuario(e) {
  e.preventDefault();
  console.log("Procurando Usuario...");
  const email = inputEmail.value.trim();
  const senha = inputSenha.value.trim();



  if (!email || !senha) {
    alert("Gentileza preecher os campos email e senha!")
    return;
  }

  const Usuario = {
    email, senha
  }
  try {
    const requisicao = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Usuario)
    })
    if (requisicao.status === 200) {
      const dados = await requisicao.json();
      console.log(dados)
      const perfil = dados.perfil

      alert("Entrando...")
      if (dados.perfil === "Admin") {
        window.location.href = "menu_admin.html"
      } else {
        window.location.href = "principal.html"
      }
    } else {
      console.log("Email ou senha inválidos")
      alert("Email ou senha inválidos")
    }
  } catch (error) {
    console.error(error)
  }
}
formLogin.addEventListener("submit", carregandoUsuario)
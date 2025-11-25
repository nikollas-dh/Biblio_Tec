const API = "http://localhost:3000/usuario/login"


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
      alert("Entrando...")
      window.location.href = "menu_admin.html";
    } else {
      console.log("Usuário não existe")
    }
  } catch (error) {
    console.error(error)
  }
}
formLogin.addEventListener("submit", carregandoUsuario)
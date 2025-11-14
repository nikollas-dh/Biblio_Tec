const API = "http://localhost:3000/usuario/login"


const boton = document.getElementById('bntLogin');
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
      window.location.href = "inicio.html";
    } else {
      console.log("Usuário não existe")
    }
  } catch (error) {
    console.error(error)
  }
}
formLogin.addEventListener("submit", carregandoUsuario)












// async function DadosDoBanco() {
//   try {
//     const response = await fetch(API);
//     if (!response.ok) {
//       throw new Error('Erro na requisição à API');
//     }

//     const dados = await response.json();
//     console.log('Dados recebidos:', dados);
//     return dados; // retorna os dados para serem usados depois

//   } catch (error) {
//     console.error('Erro ao buscar dados:', error);
//     return null;
//   }
// }



// boton.addEventListener('click', async function () {
//   // Validação dentro do evento
//   event.preventDefault();

//   if (!inputEmail.value || !inputSenha.value) {
//     alert("Por favor, preencha todos os campos!");
//     return;
//   }

//   const alunos = await DadosDoBanco();

//   if (!alunos) {
//     alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
//     return;
//   }

//   const login = alunos.find(aluno => aluno.email === inputEmail.value && aluno.senha === inputSenha.value)
//   if (login) {
//     window.location.href = "./login.html";
//   }
//   else {
//     alert("Email ou senha incorretos!");
//     return;
//   }
// });
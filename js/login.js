const boton = document.getElementById('bntLogin');
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");

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



boton.addEventListener('click', async function () {
  // Validação dentro do evento
  event.preventDefault();

  if (!inputEmail.value || !inputSenha.value) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const alunos = await DadosDoBanco();

  if (!alunos) {
    alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    return;
  }

  const login = alunos.find(aluno => aluno.email === inputEmail.value && aluno.senha === inputSenha.value)
  if (login) {
    window.location.href = "./login.html";
  }
  else {
    alert("Email ou senha incorretos!");
    return;
  }
});
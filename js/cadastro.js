const API = "http://localhost:3000/alunos"

const botao = document.getElementById('btnCadastrar');
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const inputCurso = document.getElementById("curso");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const inputConfirmarSenha = document.getElementById("confirmarSenha");
const formCadastrar = document.getElementById("cadastroUsuario")


function contemMaiuscula(senha) {
    return /[A-Z]/.test(senha);
}
function contemMinuscula(senha) {
    return /[a-z]/.test(senha);
}

async function salvar(e) {
    e.preventDefault();
    console.log("Salvando aluno");

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

    const nome = inputNome.value.trim();
    const cpf = inputCpf.value.trim();
    const curso = inputCurso.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;

    const alunos = await DadosDoBanco();

    if (!alunos) {
        alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        return;
    }

    if (!nome || !cpf || !curso || !email || !senha || !confirmarSenha) {
        alert("Por gentileza, preencha os campos obrigatórios (nome, email, senha e confirmarSenha).");
        return;
    }

    //verificando se o email ja existe no banco de dados
    const verificarEmail = alunos.find(aluno => aluno.email === email)
    if (verificarEmail) {
        alert("Email ja cadastrado")
        return;
    }

    //verifica o tamanho da senha, so passa com 8 caracteres ou mais
    if (senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres")
        return;
    }
    if (senha.length > 10) {
        alert("A senha não pode ter mais que 10 caracteres");
        return;
    }

    //verifica se contem letra minuscula e maiuscula

    if (!contemMaiuscula(senha) || !contemMinuscula(senha)) {
        alert("A senha deve conter pelo menos uma letra maiúscula e uma minúscula")
        return;
    }

    //verifica se tem numero na senha
    function contemNUmero(senha) {
        return /[0-9]/.test(senha)
    }
    if (!contemNUmero(senha)) {
        alert("A senha deve conter pelo menos um numeral arábico")
        return;
    }

    //verifica se tem espaço na senha
    if (senha.includes(' ')) {
        alert("A senha não pode conter espaços");
        return;
    }

    //verificando se as senhas sao iguais
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const novoAluno = { nome, email, senha }
    console.log("Enviando:", novoAluno);

    try {
        const requisicao = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAluno)
        });

        if (requisicao.ok) {
            const dados = await requisicao.json();
            console.log("Aluno salvo com sucesso:", dados);
            alert("Aluno cadastrado com sucesso!");
            window.location.href = "./login.html";
            formCadastrar.reset();
        } else {
            console.error("Erro na requisição:", requisicao.status);
            alert("Erro ao cadastrar aluno. Código: " + requisicao.status);
        }


    } catch (error) {
        console.error("Erro no fetch:", error);
        alert("Erro de conexão com o servidor.");
    }
}

formCadastrar.addEventListener("submit", salvar);
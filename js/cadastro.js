const API = "http://localhost:3000/usuario";

// 1. Pegando referências dos elementos
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const inputCurso = document.getElementById("curso");
const inputEmail = document.getElementById("email");
const inputNovaSenha = document.getElementById("novaSenha");
const inputConfirmarSenha = document.getElementById("confirmSenha");
const formCadastrar = document.getElementById("form-cadastrar");

// Função para formatar o CPF (Ex: 000.000.000-00)
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for dígito
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca ponto após o 3º dígito
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca ponto após o 6º dígito
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca hífen após o 9º dígito
    return cpf;
}

// Evento para aplicar a formatação do CPF ao digitar
inputCpf.addEventListener('input', (e) => {
    e.target.value = formatarCPF(e.target.value);
});


async function salvar(e) {
    e.preventDefault();
    console.log("Tentando salvar usuário...");

    // Limpeza e obtenção dos valores
    const nome = inputNome.value.trim();
    const cpfFormatado = inputCpf.value.trim();
    const curso = inputCurso.value.trim();
    const email = inputEmail.value.trim();
    const novaSenha = inputNovaSenha.value.trim();
    const confirmarSenha = inputConfirmarSenha.value.trim();
    
    // Remove a formatação do CPF antes de enviar para o backend
    const cpf = cpfFormatado.replace(/\D/g, ''); 

    // 2. Validações Aprimoradas
    
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !cpfFormatado || !curso || !email || !novaSenha || !confirmarSenha) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Validação de formato do CPF (deve ter 11 dígitos numéricos após a remoção dos pontos/hífen)
    if (cpf.length !== 11) {
        alert("O CPF deve conter 11 dígitos.");
        return;
    }

    // Validação de senhas
    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem! Por favor, verifique.");
        return;
    }
    
    // Validação de tamanho da senha (já definida no HTML, mas bom reforçar)
    if (novaSenha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    const senha = novaSenha;
    const novoUsuario = {
        nome, 
        cpf, // Envia o CPF sem formatação
        curso, 
        email, 
        senha
    }

    // Desabilita o botão para evitar múltiplos cliques
    const btnCadastrar = document.getElementById('btnCadastrar');
    btnCadastrar.disabled = true;
    btnCadastrar.textContent = "Cadastrando...";


    // 3. Requisição à API com tratamento de erro
    try {
        const requisicao = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoUsuario)
        });

        if (requisicao.status === 201) {
            const dados = await requisicao.json();
            console.log("Usuário cadastrado:", dados);
            alert("✅ Usuário cadastrado com sucesso!");
            window.location.href = "login.html";
        } else if (requisicao.status === 409) { // Exemplo de status para CPF/Email já cadastrado (depende do seu backend)
             alert("⚠️ Este CPF ou E-mail já está cadastrado.");
        } 
        else {
            console.error("Erro na requisição, Status:", requisicao.status);
            alert(`❌ Erro ao cadastrar. Status: ${requisicao.status}`);
        }
    } catch (error) {
        console.error("Erro ao conectar com a API:", error);
        alert("❌ Erro de conexão com o servidor. Tente novamente mais tarde.");
    } finally {
        // Reabilita o botão após a tentativa
        btnCadastrar.disabled = false;
        btnCadastrar.textContent = "Cadastrar";
    }
}

// 4. Adiciona o event listener ao formulário
formCadastrar.addEventListener("submit", salvar);
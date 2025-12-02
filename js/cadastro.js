const API_BASE = "http://localhost:3000/api"; 

// CORREÇÃO: Usando a base /api e nomes no singular
const API = `${API_BASE}/usuario`; // Para cadastro POST
const API_CURSOS = `${API_BASE}/curso`; // Para listar cursos (GET /api/curso)
const API_TURMAS = `${API_BASE}/turma`; // Para listar turmas (GET /api/turma/:curso_id)

// --------------- PEGANDO ELEMENTOS ---------------
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const selectCurso = document.getElementById("curso"); 
const selectTurma = document.getElementById("turma"); 
const inputEmail = document.getElementById("email");
const inputNovaSenha = document.getElementById("novaSenha");
const inputConfirmarSenha = document.getElementById("confirmSenha");
const formCadastrar = document.getElementById("form-cadastrar");

// --------------- FORMATAR CPF ---------------
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

inputCpf.addEventListener("input", (e) => {
    e.target.value = formatarCPF(e.target.value);
});

// --------------- CARREGAR CURSOS ---------------
async function carregarCursos() {
    try {
        const resposta = await fetch(API_CURSOS); // Chamando http://localhost:3000/api/curso
        
        if (!resposta.ok) {
            throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        }

        const cursos = await resposta.json();
        
        selectCurso.innerHTML = '<option value="" disabled selected>Selecione seu curso</option>';
        cursos.forEach((curso) => {
            const option = document.createElement("option");
            option.value = curso.id;
            option.textContent = curso.nome;
            selectCurso.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        alert("Erro ao carregar cursos."); 
    }
}

// --------------- CARREGAR TURMAS ---------------
async function carregarTurmas(cursoID) {
    selectTurma.disabled = true;
    selectTurma.innerHTML = '<option value="" disabled selected>Carregando...</option>';

    try {
        const url = `${API_TURMAS}/${cursoID}`; // Ex: http://localhost:3000/api/turma/1

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        }

        const turmas = await resposta.json();
        
        selectTurma.innerHTML = '<option value="" disabled selected>Selecione sua turma</option>';
        turmas.forEach((turma) => {
            const option = document.createElement("option");
            option.value = turma.id;
            option.textContent = turma.turma;
            selectTurma.appendChild(option);
        });
        selectTurma.disabled = false;

    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        alert("Erro ao carregar turmas."); 
        selectTurma.innerHTML = '<option value="" disabled selected>Erro ao carregar</option>';
    }
}

// --------------- EVENT LISTENERS ---------------
selectCurso.addEventListener("change", () => {
    const cursoID = selectCurso.value;
    if (cursoID) {
        carregarTurmas(cursoID);
    } else {
        selectTurma.innerHTML = '<option value="" disabled selected>Selecione seu curso primeiro</option>';
        selectTurma.disabled = true;
    }
});

formCadastrar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const cpf = inputCpf.value.replace(/\D/g, ""); 
    const curso = selectCurso.value;
    const turma = selectTurma.value;
    const email = inputEmail.value.trim();
    const novaSenha = inputNovaSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;

    if (!nome || !cpf || !curso || !turma || !email || !novaSenha || !confirmarSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (cpf.length !== 11) {
        alert("CPF inválido.");
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    if (novaSenha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    const novoUsuario = {
        nome,
        cpf,
        curso_id: curso,
        turma_id: turma,
        email,
        senha: novaSenha
    };

    const btnCadastrar = document.getElementById("btnCadastrar");
    btnCadastrar.disabled = true;
    btnCadastrar.textContent = "Cadastrando...";

    try {
        const requisicao = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoUsuario)
        });

        if (requisicao.status === 201) {
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "login.html";
        } else if (requisicao.status === 409) {
            alert("CPF ou e-mail já cadastrado.");
        } else {
            alert("Erro ao cadastrar. Status: " + requisicao.status);
        }

    } catch (error) {
        console.error("Erro na rede ao tentar cadastrar:", error);
        alert("Erro de conexão com o servidor. Tente novamente.");
    } finally {
        btnCadastrar.disabled = false;
        btnCadastrar.textContent = "Cadastrar";
    }
});

// Inicialização
document.addEventListener("DOMContentLoaded", carregarCursos);

// --------------- TOGGLE VISIBILIDADE SENHA ---------------
        document.addEventListener('DOMContentLoaded', () => {
            const senhaInput = document.getElementById('senha');
            const togglePassword = document.getElementById('togglePassword');

            if (togglePassword && senhaInput) {
                // AJUSTE DE ESTADO INICIAL:
                // O campo começa como type="text" (pela mudança no HTML), então
                // o ícone inicial deve ser 'visibility' (olho aberto).
                // E o primeiro clique deve mudar para 'password'.

                // 1. Defina o ícone inicial para 'visibility' (olho aberto)
                togglePassword.textContent = 'visibility';

                togglePassword.addEventListener('click', function (e) {
                    const currentType = senhaInput.getAttribute('type');

                    // Se for 'text' (visível), muda para 'password' (oculto)
                    if (currentType === 'text') {
                        senhaInput.setAttribute('type', 'password');
                        this.textContent = 'visibility_off'; // Olho fechado

                    } else {
                        // Se for 'password' (oculto), muda para 'text' (visível)
                        senhaInput.setAttribute('type', 'text');
                        this.textContent = 'visibility'; // Olho aberto
                    }
                });
            }
        });
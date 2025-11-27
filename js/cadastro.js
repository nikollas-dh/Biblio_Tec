const API = "http://localhost:3000/usuario";
const API_CURSOS = "http://localhost:3000/cursos";
const API_TURMAS = "http://localhost:3000/turmas"; // ← NOVO

// --------------- PEGANDO ELEMENTOS ---------------
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const selectCurso = document.getElementById("curso"); 
const selectTurma = document.getElementById("turma"); // ← NOVO
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
        const resposta = await fetch(API_CURSOS);
        const cursos = await resposta.json();

        selectCurso.innerHTML = "";

        const optionDefault = document.createElement("option");
        optionDefault.textContent = "Selecione um curso";
        optionDefault.value = "";
        optionDefault.disabled = true;
        optionDefault.selected = true;
        selectCurso.appendChild(optionDefault);

        cursos.forEach(c => {
            const op = document.createElement("option");
            op.value = c.id;            // usa ID
            op.textContent = c.nome;
            selectCurso.appendChild(op);
        });

    } catch (error) {
        console.error("Erro ao carregar cursos:", error);
        alert("Erro ao carregar cursos.");
    }
}

carregarCursos();

// --------------- CARREGAR TURMAS QUANDO ESCOLHER CURSO ---------------
selectCurso.addEventListener("change", async () => {

    const cursoID = selectCurso.value;
    const url = `${API_TURMAS}/${cursoID}`;

    selectTurma.innerHTML = "";

    const optionDefault = document.createElement("option");
    optionDefault.textContent = "Selecione uma turma";
    optionDefault.value = "";
    optionDefault.disabled = true;
    optionDefault.selected = true;
    selectTurma.appendChild(optionDefault);

    try {
        const resposta = await fetch(url);
        const turmas = await resposta.json();

        turmas.forEach(t => {
            const op = document.createElement("option");
            op.value = t.id;
            op.textContent = t.turma;
            selectTurma.appendChild(op);
        });

    } catch (error) {
        console.error("Erro ao carregar turmas:", error);
        alert("Erro ao carregar turmas.");
    }
});

// --------------- SALVAR CADASTRO ---------------
async function salvar(e) {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const cpfFormatado = inputCpf.value.trim();
    const cpf = cpfFormatado.replace(/\D/g, "");
    const curso = selectCurso.value;
    const turma = selectTurma.value; // ← NOVO
    const email = inputEmail.value.trim();
    const novaSenha = inputNovaSenha.value.trim();
    const confirmarSenha = inputConfirmarSenha.value.trim();

    if (!nome || !cpf || !curso || !turma || !email || !novaSenha || !confirmarSenha) {
        alert("Preencha todos os campos.");
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
    } catch (err) {
        console.error(err);
        alert("Erro de conexão.");
    } finally {
        btnCadastrar.disabled = false;
        btnCadastrar.textContent = "Cadastrar";
    }
}

formCadastrar.addEventListener("submit", salvar);
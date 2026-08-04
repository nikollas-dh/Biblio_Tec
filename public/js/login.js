const API = "https://localhost:7119/api/auth/login";

const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const formLogin = document.getElementById("form-login");

async function carregandoUsuario(e) {
    e.preventDefault();

    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    if (!email || !senha) {
        alert("Gentileza preencher os campos email e senha!");
        return;
    }

    const usuario = {
        email,
        senha
    };

    try {
        const requisicao = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if (!requisicao.ok) {
            alert("Email ou senha inválidos!");
            return;
        }

        const dados = await requisicao.json();
        
        console.log(dados);
        localStorage.setItem("token", dados.token);
        if (dados.perfil) {
            localStorage.setItem("perfil", dados.perfil);
        }

        alert("Entrando...");

        if (dados.perfil === "Administrador") {
            window.location.href = "menu_admin.html";
        } else {
            window.location.href = "principal.html";
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com a API.");
    }
}

formLogin.addEventListener("submit", carregandoUsuario);
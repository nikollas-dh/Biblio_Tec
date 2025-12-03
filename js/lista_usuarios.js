const API_URL = 'http://localhost:3000/api/usuario';

async function carregarTabela() {
    const tbody = document.getElementById("tbody");
    const numColunas = 8; 
    tbody.innerHTML = `<tr><td colspan='${numColunas}'>Carregando usuários...</td></tr>`;

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error(`Erro na rede: Status ${resposta.status}`);
        }

        const usuarios = await resposta.json();
        console.log("Dados recebidos:", usuarios);

        if (!Array.isArray(usuarios) || usuarios.length === 0) {
            tbody.innerHTML = `<tr><td colspan='${numColunas}'>Nenhum usuário encontrado.</td></tr>`;
            return;
        }

        tbody.innerHTML = usuarios.map(u =>
            `<tr>
                <td>${u.id || 'N/A'}</td>
                <td>${u.nome || 'N/A'}</td>
                <td>${u.email || 'N/A'}</td>
                <td>${u.nascimento || 'N/A'}</td>  
                <td>${u.celular || 'N/A'}</td>
                <td>${u.curso || 'N/A'}</td>
                <td>${u.perfil || 'N/A'} </td>
                <td>u
                    <button class="btnEditar">
                        <a href="editar.html?id=${u.id}">Editar</a>
                    </button> 
                    <button class="btnExcluir" onclick="excluirUsuario(${u.id})">Excluir</button>
                </td>
            </tr>`
        ).join("");

    } catch (error) {
        console.error("Erro ao carregar a tabela:", error.message);
        tbody.innerHTML = `<tr><td colspan='${numColunas}'>Erro ao carregar dados: ${error.message}</td></tr>`;
    }
}

carregarTabela();
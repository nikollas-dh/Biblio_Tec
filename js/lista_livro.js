const API_URL = 'http://localhost:3000/api/livros';


function formatarDataParaTabela(dataUTC) {
    if (!dataUTC) {
        return 'N/A';
    }
        const dataObjeto = new Date(dataUTC);
        return dataObjeto.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Sao_Paulo' 
    });
}



async function carregarTabela() {
    const tbody = document.getElementById("tbody");
    const numColunas = 8;
    tbody.innerHTML = `<tr><td colspan='${numColunas}'>Carregando livros...</td></tr>`;

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error(`Erro na rede: Status ${resposta.status}`);
        }

        const livros = await resposta.json();
        console.log("Dados recebidos:", livros);

        if (!Array.isArray(livros) || livros.length === 0) {
            tbody.innerHTML = `<tr><td colspan='${numColunas}'>Nenhum usuário encontrado.</td></tr>`;
            return;
        }

        tbody.innerHTML = livros.map(l =>
            `<tr>
                <td>${l.id || 'N/A'}</td>
                 <td> 
                    ${l.caminho_capa 
                        ? `<img src="${l.caminho_capa}" alt="Capa do livro: ${l.titulo}" class="capa-livro">` 
                        : 'Sem Capa'
                    }
                </td>
                <td>${l.titulo || 'N/A'}</td>
                <td>${l.autor || 'N/A'}</td>
                <td>${l.genero || 'N/A'}</td>  
                <td>${l.editora || 'N/A'}</td>
                <td>${formatarDataParaTabela(l.ano_publicacao)}</td>                
                <td>${l.isbn || 'N/A'} </td>
                <td>${l.formato || 'N/A'} </td>
                <td>${l.idioma || 'N/A'} </td>
               
                
                <td> 
                    <button class="btnEditar">
                        <a href="editar.html?id=${l.id}">Editar</a>
                    </button> 
                    <button class="btnExcluir" onclick="excluirUsuario(${l.id})">Excluir</button>
                </td>


            </tr>`
        ).join("");

    } catch (error) {
        console.error("Erro ao carregar a tabela:", error.message);
        tbody.innerHTML = `<tr><td colspan='${numColunas}'>Erro ao carregar dados: ${error.message}</td></tr>`;
    }
}

carregarTabela();
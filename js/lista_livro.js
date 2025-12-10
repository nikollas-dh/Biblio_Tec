const API = 'http://localhost:3000/api/livros';


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
    const numColunas = 11;
    tbody.innerHTML = `<tr><td colspan='${numColunas}'>Carregando livros...</td></tr>`;

    try {
        const resposta = await fetch(API);

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
                        <a href="editar_livro.html?id=${l.id}">Editar</a>
                    </button> 
                    <button class="btnExcluir" onclick="excluirLivro(${l.id})">Excluir</button>
                </td>


            </tr>`     
        ).join("");

    } catch (error) {
        console.error("Erro ao carregar a tabela:", error.message);
        tbody.innerHTML = `<tr><td colspan='${numColunas}'>Erro ao carregar dados: ${error.message}</td></tr>`;
    }
}
async function excluirLivro(id) {
    const confirmarExclusao = confirm(`Deseja realmente excluir o livro de ID ${id}?`);
    if (!confirmarExclusao) {
        return
    }
    
    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE",

        })
        if (resposta.status === 200) {
            console.log(resposta.json())
            alert("Livro excluído com sucesso!")
            carregarTabela();

        } else {
            console.log("Erro na requisição")
        }
    } catch (error) {
        console.error(error)
    }
}
carregarTabela();
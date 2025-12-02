import { fetchAPI } from './api.js'; 

// Seleciona o formulário de recuperação de senha
const formRecuperar = document.getElementById('form-cadastrar');
const emailInput = document.getElementById('email');

formRecuperar.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = emailInput.value;

    if (!email) {
        alert("Por favor, insira seu e-mail.");
        return;
    }

    try {
        // 🎯 Endpoint ATUALIZADO para a rota do servidor
        const response = await fetchAPI('/api/recuperar/solicitar', { // Assumindo que fetchAPI resolve para http://localhost:3000
            method: 'POST',
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            // A mensagem agora vem do back-end, mas mantemos o alerta genérico por segurança
            alert("Se um usuário com este e-mail for encontrado, um código de recuperação foi enviado.");
            
            // 💡 Ação Sugerida: Ocultar o formulário atual e mostrar o formulário de redefinição
            // para que o usuário insira o código e a nova senha no mesmo lugar.
            
        } else {
            alert("Ocorreu um erro ao solicitar a recuperação. Tente novamente mais tarde.");
        }
    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
        alert('Erro de rede. Verifique sua conexão.');
    }
});

// FUNÇÃO PARA MOSTRAR/OCULTAR SENHA
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const input = this.closest('.input-container').querySelector('.entrada');
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
    });
});
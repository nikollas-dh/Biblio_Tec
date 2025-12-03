const API = "http://localhost:3000/api/recuperar/solicitar";

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
        const response = await fetchAPI('/api/recuperar/solicitar', { 
            method: 'POST',
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            alert("Se um usuário com este e-mail for encontrado, um código de recuperação foi enviado.");
            window.location.href = "recuperar.html";
        } else {
            alert("Ocorreu um erro ao solicitar a recuperação. Tente novamente mais tarde.");
        }
    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
        alert('Erro de rede. Verifique sua conexão.');
    }
});

document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const input = this.closest('.input-container').querySelector('.entrada');
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
    });
});
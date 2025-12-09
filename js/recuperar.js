/* Arquivo: recuperar.js
   Descrição: Fluxo simplificado de recuperação SEM TOKEN DE SEGURANÇA, 
   com alternância entre os formulários de solicitação e redefinição na mesma página.
*/

const BASE_API_URL = "http://localhost:3000/api/recuperar";

document.addEventListener('DOMContentLoaded', () => {

    const formSolicitar = document.getElementById('form-solicitar');
    const formRedefinir = document.getElementById('form-recuperar-senha'); // Nova ref. para transição

    // ======================================================
    // 1. LÓGICA DA PÁGINA: SOLICITAR RECUPERAÇÃO (Formulário do E-mail)
    // ======================================================
    if (formSolicitar) {
        formSolicitar.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const email = document.getElementById('email').value.trim();
            const btnSubmit = document.getElementById('btnCadastrar');

            if (!email) {
                alert("Por favor, insira seu e-mail.");
                return;
            }

            // Feedback visual
            const textoOriginal = btnSubmit.innerText;
            btnSubmit.innerText = "Enviando...";
            btnSubmit.disabled = true;

            try {
                const url = `${BASE_API_URL}/solicitar`;
                
                const requisicao = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });

                const dados = await requisicao.json();

                if (requisicao.ok) {
                    alert(`✅ Sucesso! ${dados.message}. Prossiga para a redefinição.`);
                    
                    // 🎯 AÇÃO: ALTERNAR VISIBILIDADE PARA A TELA DE REDEFINIÇÃO
                    if (formRedefinir) {
                        const inputEmailRedefinicao = document.getElementById('email-redefinicao');
                        
                        // 1. Preenche o email na próxima etapa
                        inputEmailRedefinicao.value = email; 
                        
                        // 2. Esconde o formulário atual
                        formSolicitar.classList.add('form-hidden'); 

                        // 3. Mostra o formulário de redefinição
                        formRedefinir.classList.remove('form-hidden');
                    } else {
                        // Caso a segunda tela não exista (erro de HTML), volta para o login ou avisa
                        window.location.href = `login.html`; 
                    }

                } else {
                    alert(`❌ Erro: ${dados.error || 'Erro de rede.'}`);
                }

            } catch (error) {
                console.error("Erro na solicitação de recuperação:", error);
                alert("🔴 Erro de conexão com o servidor. Tente novamente.");
            } finally {
                btnSubmit.innerText = textoOriginal;
                btnSubmit.disabled = false;
            }
        });
    }

    // ======================================================
    // 2. LÓGICA DA PÁGINA: REDEFINIR SENHA
    // ======================================================
    // Observação: formRedefinir só será processado se estiver presente no DOM
    if (formRedefinir) {
        
        // --- NOVO CÓDIGO: Pré-preenche o email e oculta o código de recuperação (se existir) ---
        // (Isso é mantido, embora o preenchimento agora venha do formulário de solicitação)
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email'); // Permite que a tela funcione se for acessada com ?email=
        const inputEmail = document.getElementById('email-redefinicao');
        // Usamos .closest('.form-group') para ocultar o container completo do campo
        const divCodigo = document.getElementById('codigo-recuperacao')?.closest('.form-group'); 

        if (inputEmail && emailParam) {
            inputEmail.value = emailParam;
            inputEmail.readOnly = true; 
        }
        
        // Oculta o campo de código
        if (divCodigo) {
            divCodigo.style.display = 'none';
        }
        // --------------------------------------------------------------------------------------


        formRedefinir.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Usa o ID 'email-redefinicao' do formulário de redefinição
            const email = inputEmail.value.trim(); 
            const novaSenha = document.getElementById('novaSenha').value;
            const confirmaSenha = document.getElementById('confirmaSenha').value;
            const btnRedefinir = document.getElementById('btnRedefinir');

            if (!email || !novaSenha || !confirmaSenha) {
                alert('Preencha todos os campos (e-mail e senhas).');
                return;
            }
            
            if (novaSenha !== confirmaSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            // Feedback visual
            const textoOriginal = btnRedefinir.innerText;
            btnRedefinir.innerText = "Redefinindo...";
            btnRedefinir.disabled = true;

            try {
                const url = `${BASE_API_URL}/redefinir`;
                
                const requisicao = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, novaSenha, confirmaSenha }) 
                });

                const dados = await requisicao.json();

                if (requisicao.ok) {
                    alert(`✅ ${dados.message}`);
                    window.location.href = "login.html"; // Redireciona para o login
                } else {
                    alert(`❌ Erro ao redefinir: ${dados.error || 'Erro desconhecido.'}`);
                }

            } catch (error) {
                console.error("Erro na redefinição de senha:", error);
                alert("🔴 Erro de conexão ao tentar redefinir a senha.");
            } finally {
                btnRedefinir.innerText = textoOriginal;
                btnRedefinir.disabled = false;
            }
        });
    }

    // ======================================================
    // 3. FUNCIONALIDADE COMUM: MOSTRAR/OCULTAR SENHA
    // ======================================================
    const toggleButtons = document.querySelectorAll('.password-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                button.textContent = 'visibility'; 
            } else {
                input.type = 'password';
                button.textContent = 'visibility_off'; 
            }
        });
    });
});
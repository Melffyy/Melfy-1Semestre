function dados() {
    if (!localStorage.getItem('banco')) {
        const usuarios = [
            { id: 1, nome: "Nicole", email: "nicole@gmail.com", senha: "1234" },
            { id: 2, nome: "Julia", email: "julia@gmail.com", senha: "5678" },
            { id: 3, nome: "Isabella", email: "isabella@gmail.com", senha: "1357" },
            { id: 4, nome: "Ana", email: "ana@gmail.com", senha: "2468" }
        ];
        localStorage.setItem('banco', JSON.stringify(usuarios));
    }

    if (!localStorage.getItem('confeiteiras')) {
        const confeiteiras = [];
        localStorage.setItem('confeiteiras', JSON.stringify(confeiteiras));
    }
}

function logar() {
    const usuarios = JSON.parse(localStorage.getItem('banco'));
    const confeiteiras = JSON.parse(localStorage.getItem('confeiteiras'));

    let lg = document.querySelector('#email').value.trim();
    let sn = document.querySelector('#senha').value.trim();

    if (!lg || !sn) {
        alert('Por favor, preencha ambos os campos de email e senha.');
        return;
    }

    const usuario = usuarios.find(u => u.email === lg && u.senha === sn);
    if (usuario) {
        sessionStorage.setItem("user", usuario.nome);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        window.location.href = 'confeitarias.html';
        return;
    }

    const confeiteira = confeiteiras.find(c => c.email === lg && c.senha === sn);
    if (confeiteira) {
        sessionStorage.setItem("user", confeiteira.nome);
        localStorage.setItem('usuarioLogado', JSON.stringify(confeiteira));

        const idLoja = confeiteira.id || confeiteira.idLoja || null; 
        if (idLoja) {
            localStorage.setItem('idLojaAtual', idLoja);
        }

        window.location.href = 'confeiteira/adicionarProdutos.html';
        return;
    }

    alert('Usuário ou senha inválidos.');
}


function logado() {
    let usuario = sessionStorage.getItem('user');
    document.querySelector('#usuario').value = usuario;
}

function redefinirSenha(event) {
    event.preventDefault();

    let email = document.querySelector('#emailRedefinir').value.trim();
    let novaSenha = document.querySelector('#RedefinirSenha').value.trim();
    let confirmarSenha = document.querySelector('#ConfirmarSenha').value.trim();

    if (!email || !novaSenha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('banco'));
    let userIndex = usuarios.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        usuarios[userIndex].senha = novaSenha;
        localStorage.setItem('banco', JSON.stringify(usuarios));
        alert('Senha redefinida com sucesso!');
        window.location.href = 'login.html';
        return;
    }

    let confeiteiras = JSON.parse(localStorage.getItem('confeiteiras'));
    let confIndex = confeiteiras.findIndex(c => c.email === email);

    if (confIndex !== -1) {
        confeiteiras[confIndex].senha = novaSenha;
        localStorage.setItem('confeiteiras', JSON.stringify(confeiteiras));
        alert('Senha redefinida com sucesso!');
        window.location.href = 'login.html';
        return;
    }

    alert('Email não encontrado.');
}

dados();

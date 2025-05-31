function dados() {
    if (!localStorage.getItem('Usuários')) {
        const usuarios = [
            { id: 1, nome: "Lucas Andrade", email: "lucas@email.com", senha: "lucas123", dataNascimento: "2000-05-20" },
            { id: 2, nome: "Fernanda Lima", email: "fernanda@email.com", senha: "nanda456", dataNascimento: "1998-08-10" },
            { id: 3, nome: "Carlos Mendes", email: "carlos@email.com", senha: "carl789", dataNascimento: "1995-02-14" },
            { id: 4, nome: "Juliana Silva", email: "juliana@email.com", senha: "ju321", dataNascimento: "2001-11-05" },
            { id: 5, nome: "Nicole", email: "nicole@gmail.com", senha: "1234", dataNascimento: "1999-03-15" },
            { id: 6, nome: "Julia", email: "julia@gmail.com", senha: "5678", dataNascimento: "2002-07-22" },
            { id: 7, nome: "Isabella", email: "isabella@gmail.com", senha: "1357", dataNascimento: "1997-12-03" },
            { id: 8, nome: "Ana", email: "ana@gmail.com", senha: "2468", dataNascimento: "2000-09-30" }
        ];
        localStorage.setItem('Usuários', JSON.stringify(usuarios));
    }

    if (!localStorage.getItem('Confeiteiras')) {
        const Confeiteiras = [];
        localStorage.setItem('Confeiteiras', JSON.stringify(Confeiteiras));
    }
}

function logar() {
    const usuarios = JSON.parse(localStorage.getItem('Usuários'));
    const Confeiteiras = JSON.parse(localStorage.getItem('Confeiteiras'));

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

    const confeiteira = Confeiteiras.find(c => c.email === lg && c.senha === sn);
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

    let usuarios = JSON.parse(localStorage.getItem('Usuários'));
    let userIndex = usuarios.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        usuarios[userIndex].senha = novaSenha;
        localStorage.setItem('Usuários', JSON.stringify(usuarios));
        alert('Senha redefinida com sucesso!');
        window.location.href = 'login.html';
        return;
    }

    let Confeiteiras = JSON.parse(localStorage.getItem('Confeiteiras'));
    let confIndex = Confeiteiras.findIndex(c => c.email === email);

    if (confIndex !== -1) {
        Confeiteiras[confIndex].senha = novaSenha;
        localStorage.setItem('Confeiteiras', JSON.stringify(Confeiteiras));
        alert('Senha redefinida com sucesso!');
        window.location.href = 'login.html';
        return;
    }

    alert('Email não encontrado.');
}

dados();

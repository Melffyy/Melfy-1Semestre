// função que inicializa os dados de usuários no localStorage caso não existam
function dados() {
    // verifica se já existe um banco de dados no localStorage
    if (!localStorage.getItem('banco')) {
        // se não houver, cria um banco de dados padrão com alguns usuários
        const ds = [
            {id: 1, nome: "Nicole", email: "nicole@gmail.com", senha: "1234"},
            {id: 2, nome: "Julia", email: "julia@gmail.com", senha: "5678"},
            {id: 3, nome: "Isabella", email: "isabella@gmail.com", senha: "1357"},
            {id: 4, nome: "Ana", email: "ana@gmail.com", senha: "2468"}
        ];
        // converte o banco de dados para formato JSON
        let json = JSON.stringify(ds);
        // armazena o banco de dados no localStorage
        localStorage.setItem('banco', json);
    }
}

// função que realiza o login do usuário
function logar() {
    // carrega o banco de usuários do localStorage
    const ds = JSON.parse(localStorage.getItem('banco'))

    // pega os valores digitados pelo usuário no formulário de login
    let lg = document.querySelector('#email').value
    let sn = document.querySelector('#senha').value

    // percorre todos os usuários no banco de dados
    for (let i = 0; i < ds.length; i++) {
        // verifica se o email e a senha fornecidos são válidos
        if (lg == ds[i].email && sn == ds[i].senha) {
            // se os dados estiverem corretos, exibe uma mensagem de boas-vindas
            alert('Bem-vindo: ' + ds[i].nome)

            // armazena o nome do usuário na sessionStorage para mantê-lo logado
            sessionStorage.setItem("user", ds[i].nome)

            // armazena as informações do usuário logado no localStorage
            localStorage.setItem('usuarioLogado', JSON.stringify(ds[i]));

            // redireciona o usuário para a página inicial (home.html)
            window.location.href = 'home.html'; 
            return;
        }
    }
    alert('Usuário ou senha inválidos.');
}

// função que exibe o nome do usuário logado no campo do formulário
function logado() {
    // pega o nome do usuário logado da sessionStorage
    let usuario = sessionStorage.getItem('user')
    // preenche o campo de entrada com o nome do usuário
    document.querySelector('#usuario').value = usuario
}

// função para redefinir a senha
function redefinirSenha(event) {
    event.preventDefault();  // Evita o envio do formulário (recarregar a página)

    // pega os dados inseridos pelo usuário
    let email = document.querySelector('#emailRedefinir').value;
    let novaSenha = document.querySelector('#RedefinirSenha').value;
    let confirmarSenha = document.querySelector('#ConfirmarSenha').value;

    // Verifica se as senhas são iguais
    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    // carrega o banco de usuários
    const ds = JSON.parse(localStorage.getItem('banco'));

    // busca o usuário pelo email
    let usuarioEncontrado = ds.find(user => user.email === email);

    if (usuarioEncontrado) {
        // atualiza a senha do usuário 
        usuarioEncontrado.senha = novaSenha;

        // salva as alterações no localStorage
        localStorage.setItem('banco', JSON.stringify(ds));

        alert('Senha redefinida com sucesso!');
        window.location.href = 'login.html';
    } else {
        alert('Email não encontrado.');
    }
}

// chama a função que inicializa o banco de usuários 
dados();


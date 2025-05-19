function cadastrar() {
    // pega os valores dos campos de entrada e remove espaços extras
    let nome = document.querySelector('#nome').value.trim();
    let email = document.querySelector('#email').value.trim();
    let dataNascimento = document.querySelector('#data').value;
    let senha = document.querySelector('#senha').value;

    // verifica se algum campo está vazio, se estiver, mostra um alerta e para o cadastro
    if (!nome || !email || !dataNascimento || !senha) {
        alert("preencha todos os campos!");
        return; // interrompe a execução da função
    }

    // pega a lista de usuários armazenada no localStorage 
    let usuarios = JSON.parse(localStorage.getItem('banco')) || [];

    // verifica se o e-mail já está cadastrado
    let existe = usuarios.some(user => user.email === email);
    if (existe) {
        alert("este e-mail já está cadastrado."); 
        return; // interrompe o cadastro
    }

    // cria o novo id para o usuário, baseado no maior id da lista ou começa com 1
    let novoId = usuarios.length > 0 ? Math.max(...usuarios.map(user => user.id)) + 1 : 1;

    // cria um objeto com os dados do novo usuário
    let novoUsuario = {
        id: novoId,
        nome,
        email,
        senha,
        dataNascimento
    };

    // adiciona o novo usuário na lista de usuários
    usuarios.push(novoUsuario);

    // salva a lista de usuários de volta no localStorage
    localStorage.setItem('banco', JSON.stringify(usuarios));

    alert("cadastro realizado com sucesso!");
    window.location.href = 'login.html';
}

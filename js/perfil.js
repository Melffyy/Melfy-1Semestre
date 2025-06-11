document.addEventListener("DOMContentLoaded", function () {
  exibirInformacoes();
  renderizarEnderecos();
});





function entrarPerfil() {
  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuarioLogado || Object.keys(usuarioLogado).length === 0) {
      alert('Você precisa se logar primeiro!');
      window.location.href = 'login.html';
  } else {
      alert('Usuário logado!!');
      window.location.href = 'perfil.html';
  }

  console.log(usuarioLogado);
}



function exibirInformacoes(){
  const usuarioLogadoJSON = localStorage.getItem("usuarioLogado");

  if (!usuarioLogadoJSON) {
    console.warn("Nenhum usuário logado encontrado no localStorage.");
    return;
  }

  const usuarioLogado = JSON.parse(usuarioLogadoJSON);


  document.getElementById('nome-exibir').innerText = usuarioLogado.nome 
  document.getElementById('email-exibir').innerText = usuarioLogado.email
  document.getElementById("nome-input").value = usuarioLogado.nome || "";
  document.getElementById("sobrenome-input").value = usuarioLogado.sobrenome || "";
  document.getElementById("email-input").value = usuarioLogado.email || "";
  document.getElementById("celular-input").value = usuarioLogado.celular || "";
  document.getElementById("cpf-input").value = usuarioLogado.cpf || "";
  document.getElementById("dataNascimento-input").value = usuarioLogado.dataNascimento || "";
 
}

function salvarDados() {

  const usuarioLogadoJSON = localStorage.getItem("usuarioLogado");
  if (!usuarioLogadoJSON || usuarioLogadoJSON === "undefined") {
    alert("Nenhum usuário logado.");
    return;
  }

  const usuarioLogado = JSON.parse(usuarioLogadoJSON);
  const idUsuarioLogado = usuarioLogado.id;


  let listaUsuarios = JSON.parse(localStorage.getItem("Usuários")) || [];


  const usuarioOriginal = listaUsuarios.find((u) => u.id === idUsuarioLogado);

  if (!usuarioOriginal) {
    alert("Usuário não encontrado na lista de usuários.");
    return;
  }

  const usuarioAtualizado = {
    ...usuarioOriginal,
    nome: document.getElementById("nome-input").value,
    sobrenome: document.getElementById("sobrenome-input").value,
    email: document.getElementById("email-input").value,
    celular: document.getElementById("celular-input").value,
    cpf: document.getElementById("cpf-input").value,
    dataNascimento: document.getElementById("dataNascimento-input").value
  };


  const novaListaUsuarios = listaUsuarios.map((usuario) =>
    usuario.id === idUsuarioLogado ? usuarioAtualizado : usuario
  );


  localStorage.setItem("Usuários", JSON.stringify(novaListaUsuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

  alert("Dados atualizados com sucesso!");
}







function habilitarEdicao() {
  const botao = document.getElementById('botao-editar');


  if (botao.textContent === "Editar") {
   
    botao.textContent = "Salvar";
    botao.style.backgroundColor = "green";


    const campos = [
      "nome-input",
      "sobrenome-input",
      "email-input",
      "celular-input",
      "cpf-input",
      "dataNascimento-input"
    ];

    campos.forEach(id => {
      const campo = document.getElementById(id);
      campo.disabled = false;
      campo.classList.add("editando");
    });

  } else {

    botao.textContent = "Editar";
    botao.style.backgroundColor = "";

    const campos = [
      "nome-input",
      "sobrenome-input",
      "email-input",
      "celular-input",
      "cpf-input",
      "dataNascimento-input"
    ];

    campos.forEach(id => {
      const campo = document.getElementById(id);
      campo.disabled = true;
      campo.classList.remove("editando");
    });

    salvarDados();
  }
}



function sairConta() {
    localStorage.removeItem('usuarioLogado');
    alert('Usuário deslogado');
    window.location.href = 'index.html';
}


function abrirModal(){
  let modal = document.getElementById('modal')
  
  modal.style.display = 'flex'
}

function fecharModal(){
  let modal = document.getElementById('modal')
  modal.style.display = 'none'
}



function adicionarEndereco() {

  let usuarios = JSON.parse(localStorage.getItem('Usuários')) || [];
  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')); // <-- Aqui


  let logadouro = document.getElementById('logadouro').value;
  let tipo = document.getElementById('tipo').value;


  const usuarioIndex = usuarios.findIndex(user => user.id === usuarioLogado.id);
  if (usuarioIndex === -1) {
    alert('Usuário logado não encontrado.');
    return;
  }


  if (!usuarios[usuarioIndex].enderecos) {
    usuarios[usuarioIndex].enderecos = [];
  }

    
  if (usuarios[usuarioIndex].enderecos.length >= 3) {
    alert('Você já atingiu o limite máximo de 3 endereços.');
    return;
  }


  usuarios[usuarioIndex].enderecos.push({
    logadouro,
    tipo
  });


  localStorage.setItem('Usuários', JSON.stringify(usuarios));

 
  renderizarEnderecos();
}



function renderizarEnderecos() {
  const container = document.getElementById('enderecos');
  const botaoAdicionar = document.getElementById('add-endereco');
  container.innerHTML = '';
  let usuarios = JSON.parse(localStorage.getItem('Usuários')) || [];
  let usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
  if (!usuarioLogadoJSON) return;

  let usuarioLogado = JSON.parse(usuarioLogadoJSON);
  const usuario = usuarios.find(user => user.id === usuarioLogado.id);
  
  if (!usuario || !usuario.enderecos) return;

  usuario.enderecos.forEach((endereco, index) => {
    const div = document.createElement('div');
    div.className = 'endereco-box';
    div.innerHTML = `
      <p><strong>${endereco.logadouro}</strong><br>${endereco.tipo}</p>
      <span class="numero-endereco">#${index + 1}</span>
    `;
    container.appendChild(div);
  });


  if (botaoAdicionar) container.appendChild(botaoAdicionar);
}



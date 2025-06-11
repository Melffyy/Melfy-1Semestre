document.addEventListener("DOMContentLoaded", function () {
 
  renderizarEnderecos();
});




function abrirModal(){
  let modal = document.getElementById('modal')
  let usuarios = JSON.parse(localStorage.getItem('Usuários')) || [];
  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

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
  console.log(document.getElementById('enderecos')); // deve mostrar <div id="enderecos">...</div>

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



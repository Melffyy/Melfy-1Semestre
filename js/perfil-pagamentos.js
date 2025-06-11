function abrirModal() {
  const modal = document.getElementById('modalPagamento');
  let usuarios = JSON.parse(localStorage.getItem('Usuários')) || [];
  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  const usuarioIndex = usuarios.findIndex(user => user.id === usuarioLogado.id);
  if (usuarioIndex === -1) {
    alert('Usuário logado não encontrado.');
    return;
  }

  if (!usuarios[usuarioIndex].cartoes) {
    usuarios[usuarioIndex].cartoes = [];
  }

  if (usuarios[usuarioIndex].cartoes.length >= 3) {
    alert('Você já atingiu o limite máximo de 3 cartões.');
    return;
  }

  modal.style.display = 'flex';
}

function fecharModal() {
  const modal = document.getElementById('modalPagamento');
  modal.style.display = 'none';
}

function salvarCartao() {
  let usuarios = JSON.parse(localStorage.getItem('Usuários')) || [];
  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  let nomeTitular = document.getElementById('nomeTitular').value;
  let numeroCartao = document.getElementById('numeroCartao').value;
  let validade = document.getElementById('validade').value;
  let cvv = document.getElementById('cvv').value;

  if (!nomeTitular || !numeroCartao || !validade || !cvv) {
    alert('Preencha todos os campos!');
    return;
  }

  const usuarioIndex = usuarios.findIndex(user => user.id === usuarioLogado.id);
  if (usuarioIndex === -1) {
    alert('Usuário logado não encontrado.');
    return;
  }

  if (!usuarios[usuarioIndex].cartoes) {
    usuarios[usuarioIndex].cartoes = [];
  }

  if (usuarios[usuarioIndex].cartoes.length >= 3) {
    alert('Você já atingiu o limite máximo de 3 cartões.');
    return;
  }

  usuarios[usuarioIndex].cartoes.push({
    nomeTitular,
    numeroCartao,
    validade,
    cvv
  });

  localStorage.setItem('Usuários', JSON.stringify(usuarios));
  fecharModal();
  renderizarCartoes();
}

function renderizarCartoes() {
  const container = document.querySelector('.formas-pagamento-wrapper');
  container.innerHTML = '';

  let usuarios = JSON.parse(localStorage.getItem('Usuários')) || [];
  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  const usuario = usuarios.find(user => user.id === usuarioLogado.id);
  if (!usuario || !usuario.cartoes) return;

  usuario.cartoes.forEach((cartao, index) => {
    const div = document.createElement('div');
    div.className = 'forma-cartao';
    div.innerHTML = `
      <div class="info-cartao">
        <p><strong>Cartão ${cartao.numeroCartao.startsWith('4') ? 'Crédito' : 'Débito'}</strong></p>
        <p>nº ${cartao.numeroCartao}</p>
      </div>
      <div class="info-direita">
        <p>${cartao.nomeTitular}</p>
        <span>#${index + 1}</span>
      </div>
    `;
    container.appendChild(div);
  });

  // Botão de adicionar cartão
  // const botaoAdicionar = document.createElement('button');
  // botaoAdicionar.className = 'adicionar-forma';
  // botaoAdicionar.onclick = abrirModal;
  // botaoAdicionar.innerHTML = `
  //   <img src="https://cdn-icons-png.flaticon.com/512/929/929408.png" alt="Adicionar">
  //   <p id="p-add-pag">Adicionar</p>
  // `;
  // container.appendChild(botaoAdicionar);
}

// Formatar número do cartão
function formatarNumero(input) {
  let valor = input.value.replace(/\D/g, '');
  valor = valor.replace(/(.{4})/g, '$1 ').trim();
  input.value = valor;
}

// Formatar validade
function formatarValidade(input) {
  let valor = input.value.replace(/\D/g, '');
  if (valor.length >= 3) {
    valor = valor.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  }
  input.value = valor;
}

// Ao carregar a página
window.onload = () => {
  renderizarCartoes();
};

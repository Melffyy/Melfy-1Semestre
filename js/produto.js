window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const modal = document.getElementById('product-modal');
  const modalImg = modal.querySelector('.modal-img');
  const modalTitulo = modal.querySelector('.modal-title');
  const modalDescricao = modal.querySelector('.modal-description');
  const modalPreco = modal.querySelector('.modal-price');
  const fecharBtn = modal.querySelector('.modal-close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.querySelector('img')?.src || '';
      const titulo = card.querySelector('h3')?.innerText || 'Sem nome';
      const preco = `${card.querySelector('.icone-preco')?.innerText || 'R$'} ${card.querySelector('.valor')?.innerText || '0,00'}`;

      modalImg.src = imgSrc;
      modalTitulo.textContent = titulo;
      modalDescricao.textContent = 'Descrição do produto ainda não definida.';
      modalPreco.textContent = preco;

      modal.style.display = 'flex';
    });
  });

  fecharBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const nomeBusca = getQueryParam('nome')?.toLowerCase() || '';

// Pega os produtos do localStorage
const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Filtra os produtos que contenham o nome buscado, ignorando maiúsculas/minúsculas
const produtosFiltrados = produtos.filter(produto =>
  produto.nome.toLowerCase().includes(nomeBusca)
);

// Exibe os produtos filtrados na tela
function mostrarProdutos(lista) {
  const container = document.querySelector('.cards-container');
  container.innerHTML = '';

  lista.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="foto-produto">
      <div class="descricao">
        <h3>${produto.nome}</h3>
      </div>
      <div class="preco-comprar">
        <div class="preco">
          <span class="icone-preco">R$</span>
          <span class="valor">${produto.preco.toFixed(2)}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

mostrarProdutos(produtosFiltrados);


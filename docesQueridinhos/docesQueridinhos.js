window.addEventListener('DOMContentLoaded', () => {
  const categoriaSelecionada = localStorage.getItem('categoriaSelecionada');
  const lojas = JSON.parse(localStorage.getItem('Lojas')) || [];
  const produtos = JSON.parse(localStorage.getItem('Produtos')) || [];

  const produtosFiltrados = produtos.filter(produto =>
    produto.categoria === categoriaSelecionada
  );

  const mainContainer = document.querySelector('main');
  mainContainer.innerHTML = '';

  
  if (produtosFiltrados.length === 0) {
    mainContainer.innerHTML = `
      <p class="mensagem-vazia">Nenhum produto encontrado para a categoria selecionada.</p>
    `;
    return;
  }

  // Agrupar produtos por loja
  const produtosPorLoja = {};
  produtosFiltrados.forEach(produto => {
    if (!produtosPorLoja[produto.idLoja]) {
      produtosPorLoja[produto.idLoja] = [];
    }
    produtosPorLoja[produto.idLoja].push(produto);
  });

  // Exibir apenas as lojas que têm produtos filtrados
  Object.keys(produtosPorLoja).forEach(idLoja => {
    const loja = lojas.find(l => l.idLoja == idLoja);
    const produtosDaLoja = produtosPorLoja[idLoja];

    if (!loja) {
      console.warn(`Loja com id ${idLoja} não encontrada!`);
      return;
    }

    const container = document.createElement('div');
    container.classList.add('container_produtos');

    container.innerHTML = `
      <div class="loja-categoria">
        <img src="${loja.fotoPerfil}" alt="Logo da Loja" class="perfil-logo">
        <div class="perfil-nome-avaliacao">
          <span class="nome-loja">${loja.nomeLoja}</span>
          <img src="../img/Avaliação.svg" alt="Avaliação" class="perfil-avaliacao">
        </div>
      </div>

      <div class="carrossel">
        <button class="arrow left"><img src="../img/seta esquerda.svg" alt=""></button>
        <div class="cards-container">
          ${produtosDaLoja.map(prod => `
            <div class="card">
              <img src="${prod.foto}" alt="${prod.nome}" class="foto-produto">
              <div class="descricao">
                <h3>${prod.nome}</h3>
                <p>${prod.subtitulo}</p>
              </div>
              <div class="preco-comprar">
                <div class="preco">
                  <span class="icone-preco">R$</span>
                  <span class="valor">${prod.preco.toFixed(2)}</span>
                </div>
              </div>
              <button class="arrow right"><img src="../img/seta direita.svg" alt="" srcset=""></button>

            </div>
          `).join('')}
        </div>
      </div>
    `;

    mainContainer.appendChild(container);
  });

  adicionarEventosAoModal();
});




function adicionarEventosAoModal() {
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
}




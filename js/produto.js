window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const modal = document.getElementById('product-modal');
  const modalImg = modal.querySelector('.modal-img');
  const modalTitulo = modal.querySelector('.modal-title');
  const modalDescricao = modal.querySelector('.modal-description');
  const modalPreco = modal.querySelector('.modal-price');
  const fecharBtn = modal.querySelector('.btn-cancel');

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

document.addEventListener("DOMContentLoaded", function () { 
    let produtos = JSON.parse(localStorage.getItem('Produtos')) || [];
    let lojas = JSON.parse(localStorage.getItem('Lojas')) || [];

    const cardsWrapper = document.querySelector('.cards-wrapper');
    const modal = document.getElementById('product-modal');

    if (produtos.length > 0) {
        produtos.forEach(produto => {
            const idLojaProduto = parseInt(produto.idLoja);
            const loja = lojas.find(l => l.idLoja === idLojaProduto);

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="border-card">
                    <div class="headerNovidade">
                        <img src="${loja?.fotoPerfil || ''}" alt="Logo da Loja" class="logoLoja" />
                        <span class="marca">${loja?.nomeLoja || 'Loja Desconhecida'}</span>
                    </div>
                    <img src="${produto.foto}" alt="Imagem do Produto" class="imagem-produto" />
                    <div class="descricao">
                        <h3>${produto.nome}</h3>
                        <p>${produto.subtitulo}</p>
                    </div>
                    <div class="footerNovidades">
                        <div class="preco">
                            <span class="icone-preco">R$</span>
                            <span class="valor">${produto.preco}</span>
                        </div>
                    </div>
                </div>
            `;

            card.addEventListener('click', function (event) {
                const isHeader = event.target.closest('.headerNovidade');
                if (!isHeader) {
                    openModal(produto);
                }
            });

            cardsWrapper.appendChild(card);
        });
    } else {
        cardsWrapper.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }
    
    function openModal(produto) {
        const idLojaProduto = parseInt(produto.idLoja);
        const loja = lojas.find(l => l.idLoja === idLojaProduto);
      
        document.querySelector('.modal-img').src = produto.foto || '';
        document.querySelector('.modal-img').alt = produto.nome || '';
      
        document.querySelector('.modal-logo').src = loja?.fotoPerfil || '';
        document.querySelector('.modal-nome-loja').textContent = loja?.nomeLoja || 'Loja Desconhecida';
      
        document.querySelector('.modal-title').textContent = produto.nome || '';
        document.querySelector('.modal-subtitulo').textContent = produto.subtitulo || '';
        document.querySelector('.modal-description').textContent = produto.descricao || '';
        document.querySelector('.modal-peso').textContent = `Peso: ${produto.peso || 'Não informado'}`;
        document.querySelector('.modal-price').textContent = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`;
      
        document.getElementById('qtd-value').textContent = 1;
        document.getElementById('comentario').value = '';
      
        document.getElementById('product-modal').style.display = 'flex';
      }
});

function alterarQuantidade(valor) {
  const qtdSpan = document.getElementById('qtd-value');
  let quantidade = parseInt(qtdSpan.textContent);
  quantidade += valor;
  if (quantidade < 1) quantidade = 1;
  qtdSpan.textContent = quantidade;
}

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function fecharModal() {
  document.getElementById("product-modal").style.display = "none";
}


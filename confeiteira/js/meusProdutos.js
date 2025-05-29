document.addEventListener("DOMContentLoaded", function () {
    let produtos = JSON.parse(localStorage.getItem('Produtos')) || [];
    let lojas = JSON.parse(localStorage.getItem('Lojas')) || [];

    if (produtos.length > 0) {
        const cardsWrapper = document.querySelector('.cards-wrapper');

        produtos.forEach(produto => {
            const idLojaProduto = parseInt(produto.idLoja);
            const loja = lojas.find(l => l.idLoja === idLojaProduto);

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="border-card">
                    <div class="headerNovidade">
                        <img src="${loja?.fotoPerfil || ''}" alt="Logo da Loja" class="logoLoja">
                        <span class="marca">${loja?.nomeLoja || 'Loja Desconhecida'}</span>
                    </div>
                    <img src="${produto.foto}" alt="Imagem do Produto" class="imagem-produto">
                    <div class="descricao">
                        <h3>${produto.nome}</h3>
                        <p>${produto.subtitulo}</p>
                    </div>
                    <div class="footerNovidades">
                        <div class="preco">
                            <span class="icone-preco">$</span>
                            <span class="valor">${produto.preco}</span>
                        </div>
                        <button class="botao-editar">Editar</button>
                    </div>
                </div>
            `;

            const botaoEditar = card.querySelector('.botao-editar');
            botaoEditar.addEventListener('click', function () {
                window.location.href = `./editarProdutos.html?id=${produto.id}`;
            });

            cardsWrapper.appendChild(card);
        });
    } else {
        const cardsWrapper = document.querySelector('.cards-wrapper');
        cardsWrapper.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }
});

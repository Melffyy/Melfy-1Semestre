
// Função que carrega os produtos salvos no localStorage e exibe no carrinho
function carregarSacola() {
    // Pega a sacola do localStorage (ou array vazio se não existir nada)
    const sacola = JSON.parse(localStorage.getItem('Sacola')) || [];

    // Pega a lista de produtos cadastrados no sistema (pode estar em outro localStorage)
    const produtos = JSON.parse(localStorage.getItem('Produtos')) || [];

    // Seleciona o corpo da tabela onde os produtos serão exibidos
    const tbody = document.querySelector('tbody');

    // Seleciona onde será exibido o subtotal (primeiro valor do resumo)
    const subtotalSpan = document.querySelector('#subtotal');

    // Seleciona onde será exibido o total no rodapé
    const totalSpan = document.querySelector('#total');

    // Limpa o conteúdo atual da tabela (para não duplicar)
    tbody.innerHTML = '';

    // Se a sacola estiver vazia, mostra uma mensagem e zera os totais
    if (sacola.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Sua sacola está vazia.</td></tr>';
      subtotalSpan.textContent = 'R$ 0,00';
      totalSpan.textContent = 'R$ 0,00';
      return;
    }

    // Variável para somar os totais
    let subtotal = 0;

    // Para cada item da sacola (array de objetos)
    sacola.forEach((item, index) => {
      // Procura o produto na lista de produtos pelo id
      const produto = produtos.find(p => p.idProduto === item.idProduto);

      // Pega os dados do produto (nome, imagem, loja), com valor padrão se faltar algo
      const nome = produto?.nome || 'Produto';
      const imagem = produto?.foto || 'img/default.jpg';
      const nomeLoja = produto?.nomeLoja || 'Loja';

      // Formata o preço unitário e total para o formato brasileiro (ex: 12,99)
      const valorUnitario = item.valorUnitario.toFixed(2).replace('.', ',');
      const valorTotal = item.valorTotal.toFixed(2).replace('.', ',');

      // Soma ao subtotal
      subtotal += item.valorTotal;

      // Cria a linha da tabela (`<tr>`) dinamicamente com os dados do produto
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="produto">
            <img src="${imagem}" alt="${nome}" class="foto-produto">
            <div class="info">
              <h3 class="nome">${nome}</h3>
              <div class="nome-loja">${nomeLoja}</div>
            </div>
          </div>
        </td>
        <td>R$ ${valorUnitario}</td>
        <td>
          <div class="qtd">
            <button onclick="alterarQuantidade(${index}, -1)"> <i class='bx bx-minus'></i> </button>
            <span>${item.quantidade}</span>
            <button onclick="alterarQuantidade(${index}, 1)"> <i class='bx bx-plus'></i> </button>
          </div>
        </td>
        <td>R$ ${valorTotal}</td>
        <td>
          <button class="remover" onclick="removerItem(${index})"> <i class='bx bx-x'></i> </button>
        </td>
      `;
      // Adiciona a linha na tabela
      tbody.appendChild(tr);
    });

    // Atualiza os valores no resumo da compra
    subtotalSpan.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    totalSpan.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
 }

  // Altera a quantidade de um item (+1 ou -1)
 function alterarQuantidade(index, delta) {
    const sacola = JSON.parse(localStorage.getItem('Sacola')) || [];
    if (!sacola[index]) return;

    // Muda a quantidade do item
    sacola[index].quantidade += delta;

    // Garante que a quantidade mínima seja 1
    if (sacola[index].quantidade < 1) sacola[index].quantidade = 1;

    // Atualiza o valor total do item com base na nova quantidade
    sacola[index].valorTotal = sacola[index].valorUnitario * sacola[index].quantidade;

    // Salva a sacola de volta no localStorage
    localStorage.setItem('Sacola', JSON.stringify(sacola));

    // Recarrega a tabela
    carregarSacola();
}
// Remove um item da sacola pelo índice
function removerItem(index) {
    const sacola = JSON.parse(localStorage.getItem('Sacola')) || [];

    // Remove 1 item a partir do índice
    sacola.splice(index, 1);

    // Atualiza o localStorage
    localStorage.setItem('Sacola', JSON.stringify(sacola));

    // Atualiza a tabela
    carregarSacola();
}

// quando a página carregar, chama a função para preencher o carrinho
window.onload = carregarSacola;


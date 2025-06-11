function carregarSacola() {
  const sacola = JSON.parse(localStorage.getItem('Sacola')) || [];
  const produtos = JSON.parse(localStorage.getItem('Produtos')) || [];
  const lojas = JSON.parse(localStorage.getItem('Lojas')) || [];
  const tbody = document.querySelector('tbody');
  const subtotalSpan = document.querySelector('#subtotal');
  const totalSpan = document.querySelector('#total');

  tbody.innerHTML = '';

  if (sacola.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Sua sacola está vazia.</td></tr>';
    subtotalSpan.textContent = 'R$ 0,00';
    totalSpan.textContent = 'R$ 0,00';
    return;
  }

  let subtotal = 0;

  const lojasAgrupadas = {};
  sacola.forEach((item, index) => {
    const produto = produtos.find(p => p.idProduto === item.idProduto);
    const idLoja = parseInt(produto?.idLoja);
    const loja = lojas.find(l => parseInt(l.idLoja) === idLoja);

    if (!lojasAgrupadas[idLoja]) {
      lojasAgrupadas[idLoja] = {
        nomeLoja: loja?.nomeLoja || 'Loja Desconhecida',
        logoLoja: loja?.fotoPerfil || 'img/logo-default.png',
        itens: [],
        idLoja: idLoja
      };
    }

    lojasAgrupadas[idLoja].itens.push({ item, produto, index });
  });

  Object.values(lojasAgrupadas).forEach((loja, i) => {
    if (i > 0) {
      const trSeparador = document.createElement('tr');
      trSeparador.classList.add('linha-separadora');
      trSeparador.innerHTML = `<td colspan="5" class="td-separador"></td>`;
      tbody.appendChild(trSeparador);
    }

    const trLoja = document.createElement('tr');
    trLoja.classList.add('linha-loja');
    trLoja.innerHTML = `
      <td colspan="5">
        <div class="loja-header" style="display: flex; align-items: center; gap: 12px;">
          <input type="checkbox" class="check-loja" data-idloja="${loja.idLoja}" checked onchange="LojaCheckbox(this)">
          <div class="loja-header-info" style="display:flex; align-items:center; gap:8px;">
            <img src="${loja.logoLoja}" alt="Logo da Loja" class="logo-loja">
            <strong>${loja.nomeLoja}</strong>
          </div>
        </div>
      </td>
    `;
    tbody.appendChild(trLoja);

    loja.itens.forEach(({ item, produto, index }) => {
      const nome = produto?.nome || 'Produto';
      const imagem = produto?.foto || 'img/default.jpg';
      const valorUnitario = item.valorUnitario.toFixed(2).replace('.', ',');
      const valorTotal = item.valorTotal.toFixed(2).replace('.', ',');

      subtotal += item.valorTotal;

      const tr = document.createElement('tr');
      tr.classList.add('linha-produto');
      tr.innerHTML = `
        <td>
          <div class="produto" style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" class="check-produto" data-index="${index}" data-idloja="${loja.idLoja}" checked onchange="atualizarTotal()">
            <img src="${imagem}" alt="${nome}" class="foto-produto">
            <div class="info">
              <h3 class="nome">${nome}</h3>
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
      tbody.appendChild(tr);
    });
  });

  subtotalSpan.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  totalSpan.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

function LojaCheckbox(lojaCheckbox) {
  const idLoja = lojaCheckbox.getAttribute('data-idloja');
  const checkboxesProdutos = document.querySelectorAll(`input.check-produto[data-idloja="${idLoja}"]`);
  checkboxesProdutos.forEach(checkbox => {
    checkbox.checked = lojaCheckbox.checked;
  });
  atualizarTotal();
}

function alterarQuantidade(index, delta) {
  const sacola = JSON.parse(localStorage.getItem('Sacola')) || [];

  if (!sacola[index]) return;

  sacola[index].quantidade += delta;

  if (sacola[index].quantidade < 1) {
    sacola[index].quantidade = 1;
  }

  sacola[index].valorTotal = sacola[index].quantidade * sacola[index].valorUnitario;

  localStorage.setItem('Sacola', JSON.stringify(sacola));
  carregarSacola();
  atualizarTotal();
}

function removerItem(index) {
  if (confirm('Tem certeza que deseja remover este item da sacola?')) {
    const sacola = JSON.parse(localStorage.getItem('Sacola')) || [];

    if (index >= 0 && index < sacola.length) {
      sacola.splice(index, 1);
      localStorage.setItem('Sacola', JSON.stringify(sacola));
      carregarSacola();
      atualizarTotal();
    }
  }
}

function atualizarTotal() {
  const checkboxes = document.querySelectorAll('.check-produto');
  const subtotalSpan = document.querySelector('#subtotal');
  const totalSpan = document.querySelector('#total');
  let subtotal = 0;

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const sacola = JSON.parse(localStorage.getItem('Sacola')) || [];
      const item = sacola[index];
      if (item) {
        subtotal += item.valorTotal;
      }
    }
  });

  subtotalSpan.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  totalSpan.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

window.onload = carregarSacola;

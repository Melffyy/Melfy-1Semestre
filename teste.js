function openModal() {
    // Exemplo de dados que você pode ter em um sistema real
    const user = {
        address: "Rua Exemplo, 123 - Bairro Exemplo",
        storeName: "Loja Exemplo",
        storeImg: "https://via.placeholder.com/50",
        paymentMethod: "Cartão de Crédito",
        deliveryType: "Entrega",
        shippingCost: 10.00,
        totalCost: 200.00,
        products: [
            { name: "Produto 1", img: "https://via.placeholder.com/60", quantity: 2, price: 50.00 },
            { name: "Produto 2", img: "https://via.placeholder.com/60", quantity: 1, price: 100.00 }
        ]
    };

    // Populando o modal com os dados
    document.getElementById("userAddress").textContent = user.address;
    document.getElementById("storeName").textContent = user.storeName;
    document.querySelector(".store-img").src = user.storeImg;

    let productListHTML = '';
    user.products.forEach(product => {
        productListHTML += `
            <div class="product-item">
                <img src="${product.img}" alt="Foto do Produto">
                <div class="product-name">${product.name}</div>
                <div class="quantity">x${product.quantity}</div>
                <div class="price">R$${(product.price * product.quantity).toFixed(2)}</div>
            </div>
        `;
    });
    document.getElementById("productList").innerHTML = productListHTML;

    const totalValue = user.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const finalValue = totalValue + user.shippingCost;

    document.getElementById("totalValue").textContent = `Total dos Produtos: R$${totalValue.toFixed(2)}`;
    document.getElementById("shippingValue").textContent = `Frete: R$${user.shippingCost.toFixed(2)}`;
    document.getElementById("finalValue").textContent = `Total Final: R$${finalValue.toFixed(2)}`;

    document.getElementById("paymentModal").style.display = "block";
}

function closeModal() {
    document.getElementById("paymentModal").style.display = "none";
}

// Adicionando funções para capturar a escolha do usuário
function getSelectedDelivery() {
    const deliveryRadios = document.getElementsByName('delivery');
    for (const radio of deliveryRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

function getSelectedPayment() {
    const paymentRadios = document.getElementsByName('payment');
    for (const radio of paymentRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

// Exemplo de como usar essas funções
console.log("Forma de entrega escolhida:", getSelectedDelivery());
console.log("Forma de pagamento escolhida:", getSelectedPayment());

document.addEventListener("DOMContentLoaded", function() {

    if (!localStorage.getItem('ProdutosIniciaisAdicionados')) {
        const produtosPadrao = [
            {
                nome: "Éclairs",
                subtitulo: "Caixa com 7 éclairs sortidas",
                categoria: "Éclairs",
                descricao: "Caixa com 7 éclairs sortidas",
                peso: null,
                preco: 133.00,
                foto: "./img/Eclairs.svg",
                idLoja: "1",
                idConfeiteira: "1",
                idProduto: 1
            },
            {
                nome: "Bombons",
                subtitulo: "Caixa com 36 doces",
                categoria: "Bombons",
                descricao: "Caixa com 36 doces",
                peso: null,
                preco: 148.00,
                foto: "./img/Bombons.svg",
                idLoja: "2",
                idConfeiteira: "2",
                idProduto: 2
            },
            {
                nome: "Brigadeiros",
                subtitulo: "Caixa com 6 brigadeiros",
                categoria: "Brigadeiros",
                descricao: "Caixa com 6 brigadeiros de chocolate",
                peso: null,
                preco: 15.00,
                foto: "./img/Brigadeiros.svg",
                idLoja: "3",
                idConfeiteira: "3",
                idProduto: 3
            },
            {
                nome: "Brownie ninho e nutella",
                subtitulo: "Marmita brownie de ninho e nutella",
                categoria: "Brownie",
                descricao: "Marmita brownie de ninho e nutella",
                peso: null,
                preco: 20.00,
                foto: "./img/Brownie de Ninho.svg",
                idLoja: "4",
                idConfeiteira: "4",
                idProduto: 4
            },
            {
                nome: "Cookies Recheados",
                subtitulo: "Cookie recheado de chocolate",
                categoria: "Cookies",
                descricao: "Cookie recheado de chocolate",
                peso: null,
                preco: 6.00,
                foto: "./img/Cookies de Chocolate.svg",
                idLoja: "2",
                idConfeiteira: "2",
                idProduto: 5
            },
            {
                nome: "Pudim",
                subtitulo: "Pudim tamanho família",
                categoria: "Pudim",
                descricao: "Pudim tamanho família",
                peso: null,
                preco: 56.00,
                foto: "./img/Pudim.svg",
                idLoja: "4",
                idConfeiteira: "4",
                idProduto: 6
            },
            {
                nome: "Mini Sonhos",
                subtitulo: "Sonhos tradicionais unidade",
                categoria: "Sonhos",
                descricao: "Sonhos tradicionais unidade",
                peso: null,
                preco: 2.50,
                foto: "./img/Mini Sonhos.svg",
                idLoja: "1",
                idConfeiteira: "1",
                idProduto: 7
            },
            {
                nome: "Cheescake de Morango",
                subtitulo: "Cheescake de 8 fatias",
                categoria: "Cheescake",
                descricao: "Cheescake de 8 fatias",
                peso: null,
                preco: 163.00,
                foto: "./img/Cheescake.svg",
                idLoja: "3",
                idConfeiteira: "3",
                idProduto: 8
            },
            {
                nome: "Pavê de Chocolates",
                subtitulo: "Pavê de chocolate preto e branco",
                categoria: "Pavê",
                descricao: "Pavê de chocolate preto e branco",
                peso: null,
                preco: 16.00,
                foto: "./img/Pave.svg",
                idLoja: "1",
                idConfeiteira: "1",
                idProduto: 9
            },
            {
                nome: "Romcabole Red Velvet",
                subtitulo: "Recheado com geléia de amoras",
                categoria: "Romcabole", 
                descricao: "Recheado com geléia de amoras",
                peso: null, 
                preco: 120.00,
                foto: "./img/Romcabole.svg",
                idLoja: "1", 
                idConfeiteira: "1", 
                idProduto: 10 
            }

        ];

        let produtosExistentes = JSON.parse(localStorage.getItem('Produtos')) || [];

        const nomesExistentes = new Set(produtosExistentes.map(p => p.nome + p.subtitulo));
        const novosProdutos = produtosPadrao.filter(p => !nomesExistentes.has(p.nome + p.subtitulo));

        produtosExistentes = produtosExistentes.concat(novosProdutos);
        localStorage.setItem('Produtos', JSON.stringify(produtosExistentes));

    }

    const nomeInput = document.getElementById("nome");
    const subtituloInput = document.getElementById("subtitulo");
    const nomeCounter = document.getElementById("nomeCounter");
    const subtituloCounter = document.getElementById("subtituloCounter");
    const pesoInput = document.getElementById("pesoInput");
    const precoInput = document.getElementById("precoInput");
    const pesoCounter = document.getElementById("pesoCounter");
    const precoCounter = document.getElementById("precoCounter");

    let pesoGramas = 0;
    let preco = 0.00;

    function updateCounter(input, counterElement, maxLength) {
        const currentLength = input.value.length;
        counterElement.textContent = `${currentLength} / ${maxLength}`;

        if (currentLength > maxLength) {
            counterElement.classList.add("red");
        } else {
            counterElement.classList.remove("red");
        }

        if (currentLength > maxLength) {
            input.value = input.value.substring(0, maxLength);
        }
    }

    nomeInput.addEventListener("input", function() {
        updateCounter(nomeInput, nomeCounter, 21);
    });

    subtituloInput.addEventListener("input", function() {
        updateCounter(subtituloInput, subtituloCounter, 35);
    });

    function updatePrecoCounter() {
        precoCounter.textContent = `R$ ${preco.toFixed(2).replace('.', ',')}`;
    }

    function updatePesoCounter() {
        if (pesoGramas >= 1000) {
            let pesoKg = pesoGramas / 1000;
            pesoCounter.textContent = `${pesoKg.toFixed(2)} kg`;
        } else {
            pesoCounter.textContent = `${pesoGramas} g`;
        }
    }

    function validarPesoInput(value) {
        if (value < 0 || isNaN(value)) {
            return 0;
        }
        return value;
    }

    function validarPrecoInput(value) {
        if (value < 0 || isNaN(value)) {
            return 0;
        }
        return value;
    }

    pesoInput.addEventListener("input", function() {
        pesoGramas = validarPesoInput(parseFloat(pesoInput.value));
        updatePesoCounter();
    });

    precoInput.addEventListener("input", function() {
        preco = validarPrecoInput(parseFloat(precoInput.value));
        updatePrecoCounter();
    });

    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();

        let nomeProduto = nomeInput.value.trim();
        let subtitulo = subtituloInput.value.trim();
        const categoria = document.getElementById("categoria").value.trim();
        const descricao = document.getElementById("detalhes").value.trim();

        if (nomeProduto.length > 21) {
            alert("O nome do produto deve ter no máximo 21 caracteres.");
            return;
        }

        if (subtitulo.length > 35) {
            alert("O subtítulo deve ter no máximo 35 caracteres.");
            return;
        }

        if (preco <= 0) {
            alert("O preço deve ser maior que zero.");
            return;
        }

        if (pesoGramas <= 0) {
            alert("O peso deve ser maior que zero.");
            return;
        }

        const novoProduto = {
            nome: nomeProduto,
            subtitulo: subtitulo,
            categoria: categoria,
            descricao: descricao,
            peso: pesoGramas,
            preco: preco,
            foto: document.getElementById("imagemExibida").src,
            idLoja: localStorage.getItem('idLojaAtual'),
            idConfeiteira: localStorage.getItem('idConfeiteiraAtual')
        };

        const idProduto = gerarIdProduto();
        novoProduto.idProduto = idProduto;

        let produtos = JSON.parse(localStorage.getItem('Produtos')) || [];
        produtos.push(novoProduto);

        localStorage.setItem('Produtos', JSON.stringify(produtos));

        alert("Produto adicionado com sucesso!");
        window.location.href = "meusProdutos.html";
    });

    updatePesoCounter();
    updatePrecoCounter();
    updateCounter(nomeInput, nomeCounter, 21);
    updateCounter(subtituloInput, subtituloCounter, 35);
});

function gerarIdProduto() {
    let produtos = JSON.parse(localStorage.getItem('Produtos')) || [];
    return produtos.length > 0 ? Math.max(...produtos.map(p => p.idProduto)) + 1 : 1;
}

function exibirImagem(event) {
    const input = event.target;
    const arquivo = input.files[0];

    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            const imagemExibida = document.getElementById('imagemExibida');
            imagemExibida.src = e.target.result;
            imagemExibida.style.display = 'block';
        };
        leitor.readAsDataURL(arquivo);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const nomeProduto = document.getElementById("nome").value.trim();
        const categoria = document.getElementById("categoria").value.trim();
        const descricao = document.getElementById("detalhes").value.trim();
        const peso = document.getElementById("peso").value.trim();
        const preco = document.getElementById("preco").value.trim();
        const foto = document.getElementById("imagemExibida").src; 

        if (!nomeProduto || !categoria || !descricao || !peso || !preco || !foto) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const novoProduto = {
            nome: nomeProduto,
            categoria: categoria,
            descricao: descricao,
            peso: peso,
            preco: preco,
            foto: foto,
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

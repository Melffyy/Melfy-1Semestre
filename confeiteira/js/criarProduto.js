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
            foto: foto
        };

        const idConfeiteiraAtual = localStorage.getItem("idConfeiteiraAtual");
        if (idConfeiteiraAtual) {
            let confeiteiras = JSON.parse(localStorage.getItem("confeiteiras")) || [];
            const confeiteira = confeiteiras.find(c => c.id == idConfeiteiraAtual);

            if (confeiteira) {
                let loja = confeiteira.dadosLoja || {
                    nomeLoja: "",
                    produtos: []   
                };

                loja.nomeLoja = confeiteira.nome;

                if (!loja.produtos) {
                    loja.produtos = [];
                }

                loja.produtos.push(novoProduto);

                confeiteira.dadosLoja = loja;

                localStorage.setItem("confeiteiras", JSON.stringify(confeiteiras));

                alert("Produto adicionado com sucesso!");

                window.location.href = "meusProdutos.html"; 
            } else {
                alert("Confeiteira não encontrada.");
            }
        } else {
            alert("Confeiteira não logada.");
        }
    });
});

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

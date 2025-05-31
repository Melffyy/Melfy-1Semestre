document.addEventListener('DOMContentLoaded', function () {
  if (!localStorage.getItem('Lojas')) {
    const lojasIniciais = [
      {
        idLoja: 1,
        nomeLoja: "Dama",
        horario: "08:00 - 18:00",
        descricao: "Bolos decorados e doces artesanais feitos com carinho.",
        fotoPerfil: "img/Lojas/Dama.svg",
        idConfeiteira: "1"
      },
      {
        idLoja: 2,
        nomeLoja: "Caseirinho",
        horario: "09:00 - 20:00",
        descricao: "Tortas gourmet, cupcakes e doces personalizados para eventos.",
        fotoPerfil: "img/Lojas/Caseirinho.svg",
        idConfeiteira: "2"
      },
      {
        idLoja: 3,
        nomeLoja: "Da Bê",
        horario: "10:00 - 17:00",
        descricao: "Bolos caseiros e brigadeiros feitos com ingredientes naturais.",
        fotoPerfil: "img/Lojas/Da Bê.svg",
        idConfeiteira: "3"
      },
      {
        idLoja: 4,
        nomeLoja: "Barcelle",
        horario: "11:00 - 19:00",
        descricao: "Brownies, cookies e sobremesas de potinho irresistíveis.",
        fotoPerfil: "img/Lojas/Barcelle.png",
        idConfeiteira: "4"
      }
    ];
    localStorage.setItem('Lojas', JSON.stringify(lojasIniciais));
  }
});

function continuar() { 
  const nomeLoja = document.getElementById('nomeloja').value.trim();
  const horario = document.getElementById('horario').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const fotoPerfil = document.getElementById('fotoExibida').src;
  
  if (!nomeLoja || !horario || !descricao) {
    alert("Por favor, preencha todos os campos da loja.");
    return;
  }

  const dadosLoja = {
    nomeLoja: nomeLoja,
    horario: horario,
    descricao: descricao,
    fotoPerfil: fotoPerfil,
    idConfeiteira: localStorage.getItem('idConfeiteiraAtual') 
  };

  const idLoja = gerarIdLoja();

  let lojas = JSON.parse(localStorage.getItem('Lojas')) || [];
  lojas.push({ idLoja, ...dadosLoja });
 
  localStorage.setItem('Lojas', JSON.stringify(lojas));

  localStorage.setItem('idLojaAtual', idLoja);

  alert("Dados da loja salvos com sucesso!");
  location.href = "adicionarProdutos.html";
}

function gerarIdLoja() {
  let lojas = JSON.parse(localStorage.getItem('Lojas')) || [];
  return lojas.length > 0 ? Math.max(...lojas.map(l => l.idLoja)) + 1 : 1;
}

function mostrarFotoPerfil(event) {
  const foto = document.getElementById('fotoExibida');
  const arquivo = event.target.files[0];

  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
      foto.src = e.target.result;
      foto.style.display = 'block';
    };
    leitor.readAsDataURL(arquivo);
  }
}

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

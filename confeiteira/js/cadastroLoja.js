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
    fotoPerfil: fotoPerfil
  };

  const idConfeiteiraAtual = localStorage.getItem('idConfeiteiraAtual');

  if (idConfeiteiraAtual) {
    let confeiteiras = JSON.parse(localStorage.getItem('confeiteiras')) || [];
    const confeiteiraIndex = confeiteiras.findIndex(c => c.id == idConfeiteiraAtual);
    
    if (confeiteiraIndex !== -1) {
      confeiteiras[confeiteiraIndex].dadosLoja = dadosLoja;
      localStorage.setItem('confeiteiras', JSON.stringify(confeiteiras));

      alert("Dados da loja salvos com sucesso!");
      location.href = "adicionarProdutos.html";
    } else {
      alert("Erro ao localizar a confeiteira.");
    }
  } else {
    alert("Confeiteira não logada.");
  }
}

function mostrarFormularioNovo() {
  document.getElementById('form-informacoes').style.display = 'none';
  document.getElementById('form-novo').style.display = 'block';
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

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

  function mostrarFotoPerfil(event) {
  const imagem = document.getElementById('fotoExibida');
  const arquivo = event.target.files[0];

  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = function(e) {
      imagem.src = e.target.result;
    };
    leitor.readAsDataURL(arquivo);
  }
}

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}


function voltarFormulario() {
  document.getElementById('form-novo').style.display = 'none';
  document.getElementById('form-informacoes').style.display = 'block';
}


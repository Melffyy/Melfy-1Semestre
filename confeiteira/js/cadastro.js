window.onload = function () {
  if (!localStorage.getItem('confeiteiras')) {
    const dadosIniciais = [
      { 
        id: 1, 
        nome: "Ana Clara Souza", 
        cpf_cnpj: "123.456.789-00", 
        nascimento: "1995-08-12", 
        endereco: "Rua Girassol, 100 - São Paulo", 
        celular: "(11) 91234-5678", 
        email: "ana@melfy.com", 
        senha: "ana123" 
    },
      { 
        id: 2, 
        nome: "Bruno Ferreira", 
        cpf_cnpj: "987.654.321-00", 
        nascimento: "1988-04-23", 
        endereco: "Av. Brasil, 2000 - Campinas", 
        celular: "(19) 99876-5432", 
        email: "bruno@melfy.com", 
        senha: "bruno456" }
    ];
    localStorage.setItem('confeiteiras', JSON.stringify(dadosIniciais));
  }

  document.getElementById('form-informacoes').style.display = 'block';
  document.getElementById('form-novo').style.display = 'none';

  const container = document.querySelector('.container');
  const imageBox = document.getElementById('image-box');
  const formNovo = document.getElementById('form-novo');
  
  container.removeChild(imageBox);
  container.insertBefore(imageBox, formNovo);

  document.getElementById('btn-cadastrar').addEventListener('click', cadastrar);
};

function gerarId() {
  let confeiteiras = JSON.parse(localStorage.getItem('confeiteiras')) || [];
  return confeiteiras.length > 0 ? Math.max(...confeiteiras.map(c => c.id)) + 1 : 1;
}

function continuar() {
  const confeiteira = {
    id: gerarId(),
    nome: document.getElementById('nome').value.trim(),
    cpf_cnpj: document.getElementById('cpf_cnpj').value.trim(),
    nascimento: document.getElementById('data').value,
    endereco: document.getElementById('endereco').value.trim(),
    celular: document.getElementById('celular').value.trim(),
    email: document.getElementById('email').value.trim(),
    senha: document.getElementById('senha').value.trim()
  };

  if (!confeiteira.nome || !confeiteira.cpf_cnpj || !confeiteira.nascimento || !confeiteira.endereco || !confeiteira.celular || !confeiteira.email || !confeiteira.senha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  let confeiteiras = JSON.parse(localStorage.getItem('confeiteiras')) || [];
  confeiteiras.push(confeiteira);
  localStorage.setItem('confeiteiras', JSON.stringify(confeiteiras));

  alert("Cadastro realizado com sucesso!");

}


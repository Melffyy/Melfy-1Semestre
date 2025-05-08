const coordenadasIniciais = [-23.561684, -46.625378];
const mapa = L.map("mapa").setView(coordenadasIniciais, 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(mapa);

let marcador;

function pesquisar() {
  const endereco = document.getElementById("inputLocal").value;

  if (!endereco) {
    alert("Por favor, digite um endereço.");
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`)
    .then((res) => res.json())
    .then((dados) => {
      if (dados.length > 0) {
        const lat = parseFloat(dados[0].lat);
        const lon = parseFloat(dados[0].lon);
        mapa.setView([lat, lon], 15);

        if (marcador) {
          marcador.setLatLng([lat, lon]);
        } else {
          marcador = L.marker([lat, lon]).addTo(mapa);
        }
      } else {
        alert("Endereço não encontrado.");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar endereço:", erro);
      alert("Ocorreu um erro ao buscar o endereço.");
    });
}

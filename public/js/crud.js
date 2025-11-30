const apiURL = "http://localhost:3000/galeria";


async function listarGaleria() {
  const response = await fetch(apiURL);
  const obras = await response.json();
  const container = document.getElementById("galeria-container");
  container.innerHTML = "";

  obras.forEach((obra) => {
    container.innerHTML += `
      <div class="card">
        <img src="${obra.imagem}" class="card-img-top" alt="${obra.titulo}">
        <div class="card-body">
          <h5 class="card-title">${obra.titulo}</h5>
          <p class="card-text"><strong>Artista:</strong> ${obra.artista}</p>
          <p><strong>Ano:</strong> ${obra.ano}</p>
          <p>${obra.descricao}</p>
          <p><strong>Categoria:</strong> ${obra.categoria}</p>
          <button class="btn btn-warning" onclick="editarObra(${obra.id})">Editar</button>
          <button class="btn btn-danger" onclick="excluirObra(${obra.id})">Excluir</button>
        </div>
      </div>
    `;
  });
}


async function adicionarObra(event) {
  event.preventDefault();

  const novaObra = {
    titulo: document.getElementById("titulo").value,
    artista: document.getElementById("artista").value,
    ano: document.getElementById("ano").value,
    descricao: document.getElementById("descricao").value,
    imagem: document.getElementById("imagem").value,
    categoria: document.getElementById("categoria").value,
  };

  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaObra),
  });

  alert("Obra adicionada com sucesso!");
  document.getElementById("form-obra").reset();
  listarGaleria();
}


async function editarObra(id) {
  const response = await fetch(`${apiURL}/${id}`);
  const obra = await response.json();

  document.getElementById("id").value = obra.id;
  document.getElementById("titulo").value = obra.titulo;
  document.getElementById("artista").value = obra.artista;
  document.getElementById("ano").value = obra.ano;
  document.getElementById("descricao").value = obra.descricao;
  document.getElementById("imagem").value = obra.imagem;
  document.getElementById("categoria").value = obra.categoria;
}


async function atualizarObra(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  if (!id) {
    alert("Selecione uma obra para editar!");
    return;
  }

  const obraAtualizada = {
    titulo: document.getElementById("titulo").value,
    artista: document.getElementById("artista").value,
    ano: document.getElementById("ano").value,
    descricao: document.getElementById("descricao").value,
    imagem: document.getElementById("imagem").value,
    categoria: document.getElementById("categoria").value,
  };

  await fetch(`${apiURL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obraAtualizada),
  });

  alert("Obra atualizada com sucesso!");
  document.getElementById("form-obra").reset();
  listarGaleria();
}
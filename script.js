function ajaxCall(stringCall, callback) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        callback(httpRequest.responseText);
      }
    }
  };
  httpRequest.open('GET', stringCall);
  httpRequest.send();
}

function inicializa() {
  ajaxCall('livros.php?action=recuperaAutores', inicializaSelecaoAutores);
  ajaxCall('livros.php?action=mostraLivros', listaLivros);
}

function inicializaSelecao(lis, elemento) {
  let x = document.getElementById(elemento);
  let jsonData = JSON.parse(lis);

  for (i = 0; i < jsonData.length; i++) {
    let option = document.createElement('option');
    option.text = jsonData[i]['name'];
    option.value = jsonData[i]['id'];
    if (i == 0) option.selected = true;
    x.add(option);
  }
}

function inicializaSelecaoAutores(lisAutores) {
  inicializaSelecao(lisAutores, 'listaAutores');
}

function listaLivros(lisLivros) {
  document.getElementById('livros').innerHTML = lisLivros;
}

function toggleAutor() {
  let autorInput = document.getElementById('autorNome');
  let addButton = document.getElementById('insereAutor');
  if (autorInput.style.display === 'none') {
    autorInput.style.display = 'inline';
    addButton.style.display = 'inline';
  } else {
    autorInput.style.display = 'none';
    addButton.style.display = 'none';
  }
}

function insereLivro() {
  let titulo = document.getElementById('titulo').value;
  let ano = document.getElementById('ano').value;
  let edicao = document.getElementById('edicao').value;
  let editora = document.getElementById('editora').value;
  let paginas = document.getElementById('paginas').value;
  let listaAutores = document.getElementById('listaAutores').value;

  document.getElementById('titulo').value = '';
  document.getElementById('ano').value = '';
  document.getElementById('edicao').value = '';
  document.getElementById('editora').value = '';
  document.getElementById('paginas').value = '';
  document.getElementById('listaAutores').value = 0;

  params = `&titulo=${titulo}&autor=${listaAutores}&ano=${ano}&edicao=${edicao}&editora=${editora}&paginas=${paginas}`;
  ajaxCall('livros.php?action=insLivro' + params, listaLivros);
}

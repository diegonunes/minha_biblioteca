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

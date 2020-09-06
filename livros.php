<?php

$db = new PDO('mysql:host=localhost;dbname=minha_biblioteca;charset=utf8','root','root');

function mostraTabela($qtdeColunas, $consulta, $func) {

  $i = 0;
  $tab = "<thead>";
  $tab .= "<tr>";
  $tab .= "<th>Título</th>";
  $tab .= "<th>Autor</th>";
  $tab .= "<th>Ano</th>";
  $tab .= "<th>Edição</th>";
  $tab .= "<th>Editora</th>";
  $tab .= "<th>Páginas</th>";
  $tab .= "<th></th>";
  $tab .= "</tr>";
  $tab .= "</thead>";

  while ($row = $consulta->fetch(PDO::FETCH_NUM)) {
    $tab .= "<tr>";
    for($j = 0; $j < $qtdeColunas; $j++) {
      $tab .= "<td>".htmlspecialchars($row[$j])."</td>";
    }
    $tab .= "<td><button type=\"button\" onclick=\"deleta".$func."(".htmlspecialchars($row[$j]).")\">X</button></td>";
    $tab .= "</tr>";
    $i++;
  }
  $tab .= "<p></p>";
  echo $tab;
}

function mostraLivros($db) {
  $result = $db->query("SELECT livros.titulo,autores.nome,livros.ano,livros.edicao,livros.editora,livros.paginas,livros.id FROM livros,autores WHERE livros.autor_id = autores.id");
  mostraTabela(6, $result, 'Livro');
}

function recuperaTabela($tabela, $db) {
  $retData = array();
  $allData = $db->query("SELECT id,nome FROM ".$tabela);
  foreach($allData as $data) {
    $retData[] = [
      'id' => $data[0],
      'name' => $data[1],
    ];
  }
  echo json_encode($retData);
}

if(@$_REQUEST['action'] == "recuperaAutores") {
  recuperaTabela('autores', $db);
}

if(@$_REQUEST['action'] == "mostraLivros") {
  mostraLivros($db);
}

if(@$_REQUEST['action'] == "insLivro") {
  $titulo = $_REQUEST['titulo'];
  $autorId = intval($_REQUEST['autor']);
  $ano = intval($_REQUEST['ano']);
  $edicao = intval($_REQUEST['edicao']);
  $editora = $_REQUEST['editora'];
  $paginas = intval($_REQUEST['paginas']);

  $stm = $db->prepare("INSERT INTO livros (titulo,autor_id,ano,edicao,editora,paginas) VALUES ('$titulo','$autorId','$ano','$edicao','$editora',$paginas);");
  $stm->execute();
  mostraLivros($db);
}

if(@$_REQUEST['action'] == "insAutor") {
  $autorNome = $_REQUEST['autorNome'];

  $stm = $db->prepare("INSERT INTO autores (nome) values ('$autorNome');");
  $stm->execute();
  echo("<meta http-equiv='refresh' content='1'>");
}

if(@$_REQUEST['action'] == "delLivro") {
  $stm = $db->prepare("DELETE FROM livros WHERE livros.id = ".$_REQUEST['id']);
  $stm->execute();
  mostraLivros($db);
}

?>

<?php
include_once('../dbmanager.php');
include_once('../modelo/Foto.php');
include_once('../modelo/Tag.php');

header('Content-Type: text/html; charset=utf-8');

$idTag=$_GET['idTag'];
$fotos=array();
$tag=new Tag();
$db = new dbmanager();
$sql = "SELECT DISTINCT F.idFoto,F.urlFoto, F.ancho, F.alto, F.proporcion,F.idFbFoto,F.ranking FROM Foto F
        JOIN FotoTag FT ON F.idFoto=FT.idFotoF
        JOIN Tag T ON T.idTag=FT.idTagF
        WHERE T.idTag='$idTag'";
$resultado=$db->executeQuery($sql);
if(!$resultado) {
    die('<br/>MySQL Error: ' . mysql_error());
}
else {

    while($row = mysql_fetch_array($resultado))
   {
    $foto=new Foto();
    $foto->idFoto=$row['idFoto'];
    $foto->urlFoto=$row['urlFoto'];
    $foto->ancho=$row['ancho'];
    $foto->alto=$row['alto'];
    $foto->proporcion=$row['proporcion'];
    $foto->idFbFoto=$row['idFbFoto'];
    $foto->ranking=$row['ranking'];
    $foto->nombrePerfil=$row['nombrePerfil'];
    $foto->tags=$tag->tagsPorFoto($foto->idFoto);
    array_push($fotos, $foto);
   }
}
print_r(json_encode($fotos,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
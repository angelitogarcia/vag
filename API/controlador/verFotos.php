<?php
include_once('../dbmanager.php');
include_once('../modelo/Foto.php');

header('Content-Type: text/html; charset=utf-8');

$limit=$_GET['limite'];
$fotos=array();
$db = new dbmanager();

$sql = "SELECT * from Foto LIMIT ".$limit;

$resultado=$db->executeQuery($sql);

if(!$resultado) {
    die("<br/>MySQL Errors: " . mysql_error());
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
    array_push($fotos, $foto);
   }

}

print_r(json_encode($fotos,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
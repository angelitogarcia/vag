<?php
include_once('../dbmanager.php');
include_once('../modelo/Foto.php');
include_once('../modelo/Tag.php');

header('Content-Type: text/html; charset=utf-8');

$idPerfil=$_GET['idPerfil'];
$fotos=array();
$db = new dbmanager();
$tag=new Tag();

//$sql = "SELECT * from Foto JOIN Perfil ON Perfil.idPerfil=Foto.idPerfil WHERE Foto.idPerfil=".$idPerfil;
$sql = "SELECT DISTINCT * FROM Foto F
JOIN Perfil P ON P.idPerfil=F.idPerfil
WHERE F.idPerfil=".$idPerfil;

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
    $foto->idPerfil=$row['idPerfil'];
    $foto->nombrePerfil=$row['nombrePerfil'];
    $foto->tags=$row['tagsFoto'];
    array_push($fotos, $foto);
   }

}

print_r(json_encode($fotos,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
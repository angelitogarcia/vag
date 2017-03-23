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
JOIN PerfilFoto PF ON PF.idFoto=F.idFoto
JOIN Perfil P ON P.idPerfil=PF.idPerfil
WHERE PF.idPerfil=".$idPerfil;

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
    $foto->tags=$tag->tagsPorFoto($foto->idFoto);
    array_push($fotos, $foto);
   }

}

print_r(json_encode($fotos,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
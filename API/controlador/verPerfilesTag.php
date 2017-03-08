<?php
include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

header('Content-Type: text/html; charset=utf-8');

$idTag=$_GET['idTag'];
$perfiles=array();
$db = new dbmanager();
$sql = "SELECT DISTINCT P.nombrePerfil,P.idPerfil,P.imgPerfil,P.urlFb,P.idFb,P.insta,P.ranking,P.vistas,P.descripcion FROM Perfil P
        JOIN PerfilTag PT ON P.idPerfil=PT.idPerfil
        JOIN Tag T ON T.idTag=PT.idTag
        WHERE T.idTag='$idTag'";
$resultado=$db->executeQuery($sql);
if(!$resultado) {
    die('<br/>MySQL Error: ' . mysql_error());
}
else {

    while($row = mysql_fetch_array($resultado))
   {
    $perfil=new Perfil();
    $perfil->idPerfil=$row['idPerfil'];
    $perfil->nombrePerfil=$row['nombrePerfil'];
    $perfil->urlFb=$row['urlFb'];
    $perfil->imgPerfil=$row['ImgPerfil'];
    $perfil->idFb=$row['idFb'];
    $perfil->insta=$row['insta'];
    $perfil->ranking=$row['ranking'];
    $perfil->vistas=$row['vistas'];
    $perfil->descripcion=$row['descripcion'];
    array_push($perfiles, $perfil);
   }
}
print_r(json_encode($perfiles,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
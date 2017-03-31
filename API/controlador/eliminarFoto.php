<?php
include_once('../dbmanager.php');
include_once('../modelo/Foto.php');

header('Content-Type: text/html; charset=utf-8');

$idFoto=$_GET['idFoto'];
$urlFoto="";
$nombrePerfil="";
$db = new dbmanager();

$sql = "SELECT F.idFoto,F.urlFoto,P.nombrePerfil from Foto F
        JOIN Perfil P ON P.idPerfil=F.idPerfil
        WHERE F.idFoto='$idFoto'";
$resultado=$db->executeQuery($sql);
if(!$resultado) {
    echo "No se pudo buscar nombre y perfil de la foto";
    die("<br/>MySQL Errors: " . mysql_error());
}
else {
    $row = mysql_fetch_array($resultado);
    $urlFoto=$row['urlFoto'];
    $nombrePerfil=$row['nombrePerfil'];
}

$sql = "DELETE from Foto WHERE idFoto='$idFoto'";

$resultado=$db->executeQuery($sql);

if(!$resultado) {
    die("<br/>MySQL Errors: " . mysql_error());
    echo "no se pudo eliminar la imagen de la base de datos";
}
else {
    unlink(config::getUrlImgs().$nombrePerfil."/".$urlFoto);
    unlink(config::getUrlImgs().$nombrePerfil."/thumbs/".$urlFoto);
    echo '[{"res":"200"}]';
}

//print_r(json_encode($fotos,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
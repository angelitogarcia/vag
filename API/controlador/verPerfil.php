<?php
include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

header('Content-Type: text/html; charset=utf-8');

$perfil=new Perfil();
$perfil->idPerfil=$_GET['idPerfil'];

$db = new dbmanager();
$sql = "select * from Perfil where idPerfil='$perfil->idPerfil'";
$resultado=$db->executeQuery($sql);


if(!$resultado) {
    die('<br/>MySQL Error: ' . mysql_error());
}
else{
    $row = mysql_fetch_array($resultado);
	$perfil->idPerfil=$row['idPerfil'];
	$perfil->nombrePerfil=$row['nombrePerfil'];
	$perfil->urlFb=$row['urlFb'];
	$perfil->imgPerfil=$row['imgPerfil'];
	$perfil->idFb=$row['idFb'];
	$perfil->insta=$row['insta'];
	$perfil->ranking=$row['ranking'];
	$perfil->vistas=$row['vistas'];
	$perfil->descripcion=$row['descripcion'];
	$perfil->tags=$row['tags'];
	$perfil->albums=$row['albums'];

}
echo(json_encode($perfil,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
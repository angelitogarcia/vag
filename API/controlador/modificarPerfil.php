<?php
include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

header('Content-Type: text/html; charset=utf-8');

$perfil=new Perfil();
$idPerfil=(isset($_GET['idPerfil'])) ? $_GET['idPerfil'] : '';
$nombreAnterior=(isset($_GET['nombreAnterior'])) ? $_GET['nombreAnterior'] : '';
$perfil->nombrePerfil=(isset($_GET['nombrePerfil'])) ? $_GET['nombrePerfil'] : '';
//$perfil->urlFb=$_GET['urlFb'];
$perfil->urlFb= (isset($_GET['urlFb'])) ? $_GET['urlFb'] : '';
//$perfil->idFb=$_GET['idFb'];
$perfil->idFb= (isset($_GET['idFb'])) ? $_GET['idFb'] : '';
//$perfil->insta=$_GET['insta'];
$perfil->insta= (isset($_GET['insta'])) ? $_GET['insta'] : '';
$perfil->tags= (isset($_GET['tags'])) ? $_GET['tags'] : '';
$imgPerfil=$perfil->nombrePerfil."/imgPerfil.png";
$sql="UPDATE Perfil SET nombrePerfil='$perfil->nombrePerfil',urlFb='$perfil->urlFb',idFb='$perfil->idFb',insta='$perfil->insta',tags='$perfil->tags',imgPerfil='$imgPerfil'
where idPerfil='$idPerfil'";
$db = new dbmanager();
$resultado=$db->executeQuery($sql);
if($resultado){
	$directorio=$perfil->nombrePerfil;
	if(rename(config::getUrlImgs().$nombreAnterior,config::getUrlImgs().$directorio)){
		echo "se renombro la carpeta correctamente";
	}else{
		die('Fallo al renombrar las carpetas...');
	}
	echo "Se modifico el perfil correctamente";
}
else{
	die('<br/>MySQL Error: ' . mysql_error());
}

?>
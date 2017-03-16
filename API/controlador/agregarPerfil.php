<?php
include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

header('Content-Type: text/html; charset=utf-8');

$perfil=new Perfil();
$perfil->nombrePerfil=$_GET['nombrePerfil'];
//$perfil->urlFb=$_GET['urlFb'];
$perfil->urlFb= (isset($_GET['urlFb'])) ? $_GET['urlFb'] : '';
//$perfil->idFb=$_GET['idFb'];
$perfil->idFb= (isset($_GET['idFb'])) ? $_GET['idFb'] : '';
//$perfil->insta=$_GET['insta'];
$perfil->insta= (isset($_GET['insta'])) ? $_GET['insta'] : '';

$sql="INSERT INTO Perfil(nombrePerfil,urlFb,idFb,insta)
VALUES('$perfil->nombrePerfil','$perfil->urlFb','$perfil->idFb','$perfil->insta')";
$db = new dbmanager();
$resultado=$db->executeQuery($sql);
if($resultado){
	//$row=mysql_fetch_array($resultado);
	//$perfil->idPerfil=$row['idPerfil'];
	//crear carpeta con nombre
	$directorio=$perfil->nombrePerfil;
	//$dirmake = mkdir("$directorio", 777);
	if(!mkdir(config::getUrlImgs(). $directorio, 0777)) {
    	die('Fallo al crear las carpetas...');

	}
	else
	{
		
		mkdir(config::getUrlImgs(). $directorio . "/thumbs", 0777);
		echo "Se creo  el perfil correctamente";
	}
}
else{
	die('<br/>MySQL Error: ' . mysql_error());
}

?>
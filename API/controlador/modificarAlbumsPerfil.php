<?php
include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

header('Content-Type: text/html; charset=utf-8');

$idPerfil=(isset($_GET['idPerfil'])) ? $_GET['idPerfil'] : '';
$albums=(isset($_GET['albums'])) ? $_GET['albums'] : '';
$sql="UPDATE Perfil SET albums='$albums' where idPerfil='$idPerfil'";
$db = new dbmanager();
$resultado=$db->executeQuery($sql);
if($resultado){

	echo "Se creo el album correctamente";
}
else{
	die('<br/>MySQL Error al crear el album: ' . mysql_error());
}

?>
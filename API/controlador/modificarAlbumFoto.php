<?php
include_once('../dbmanager.php');
include_once('../modelo/Foto.php');

header('Content-Type: text/html; charset=utf-8');

$idFoto=$_GET['idFoto'];
$album= (isset($_GET['album'])) ? $_GET['album'] : '';
$db = new dbmanager();
$sql="UPDATE Foto SET album='$album' WHERE idFoto='$idFoto'";
$resultado=$db->executeQuery($sql);

if(!$resultado) {
    echo "No se pudo modificar el album de la foto";
    die("<br/>MySQL Errors: " . mysql_error());
}else{
	echo "Se modifico el album de la foto correctamente";
}
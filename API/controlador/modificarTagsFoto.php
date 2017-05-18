<?php
include_once('../dbmanager.php');
include_once('../modelo/Foto.php');

header('Content-Type: text/html; charset=utf-8');

$idFoto=$_GET['idFoto'];
$tags= (isset($_GET['tags'])) ? $_GET['tags'] : '';
$db = new dbmanager();
$sql="UPDATE Foto SET tagsFoto='$tags' WHERE idFoto='$idFoto'";
$resultado=$db->executeQuery($sql);

if(!$resultado) {
    echo "No se pudo modificar los tags de la foto";
    die("<br/>MySQL Errors: " . mysql_error());
}else{
	echo "Se modifico los tags de la foto correctamente";
}
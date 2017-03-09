<?php
include_once('../dbmanager.php');
include_once('../modelo/Tag.php');

header('Content-Type: text/html; charset=utf-8');

$idTag=$_GET['idTag'];
$db = new dbmanager();

$sql = "DELETE from Tag WHERE idTag='$idTag'";
$resultado=$db->executeQuery($sql);
if(!$resultado) {
    die("<br/>MySQL Errors: " . mysql_error());
}
else {
    echo "Se elimino el tag correctamente";
}

//print_r(json_encode($fotos,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
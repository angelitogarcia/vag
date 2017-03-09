<?php
include_once('../dbmanager.php');
include_once('../modelo/Tag.php');

header('Content-Type: text/html; charset=utf-8');

$idPerfil=$_GET['idFoto'];
$tags=array();
$db = new dbmanager();
$sql = "SELECT * FROM Tag T
        JOIN FotoTag FT ON T.idTag=FT.idTagF
        JOIN Foto F ON F.idFoto=FT.idFotoF
        WHERE F.idFoto='$idFoto'";
$resultado=$db->executeQuery($sql);
if(!$resultado){
    die('<br/>MySQL Error: ' . mysql_error());
}
else{
    while($row = mysql_fetch_array($resultado))
    {
        $tag=new Tag();
        $tag->idTag=$row['idTag'];
        $tag->nombre=$row['nombre'];
        array_push($tags, $tag);
    }
}
print_r(json_encode($tags,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
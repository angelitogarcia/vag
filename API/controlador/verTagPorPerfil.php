<?php
include_once('../dbmanager.php');
include_once('../modelo/Tag.php');

header('Content-Type: text/html; charset=utf-8');

$idPerfil=$_GET['idPerfil'];
$tags=array();
$db = new dbmanager();
$sql = "SELECT * FROM Perfil P
        JOIN PerfilTag PT ON P.idPerfil=PT.idPerfil
        JOIN Tag T ON T.idTag=PT.idTag
        WHERE P.idPerfil='$idPerfil'";
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
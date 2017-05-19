<?php
include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

header('Content-Type: text/html; charset=utf-8');

$perfiles=array();
$db = new dbmanager();

$sql = "SELECT Perfil.*, count(Perfil.idPerfil) as numFotos from Perfil
left join Foto on Perfil.idPerfil = Foto.idPerfil group by Perfil.idPerfil";

$resultado=$db->executeQuery($sql);

if(!$resultado) {
    die("<br/>MySQL Errors: " . mysql_error());
}
else {
        while($row = mysql_fetch_array($resultado))
       {
        $perfil=new Perfil();
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
        $perfil->numFotos=$row['numFotos'];
        array_push($perfiles, $perfil);
       }

}

print_r(json_encode($perfiles,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
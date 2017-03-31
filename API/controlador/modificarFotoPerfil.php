<?php

include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

$db=new dbmanager();
$idPerfil=$_POST["idPerfil"];
$nombrePerfil=$_POST["nombrePerfil"];
$url=config::getUrlImgs().$nombrePerfil."/imgPerfil.png";
$urlImg=$nombrePerfil."/imgPerfil.png";
echo $url;

if(move_uploaded_file($_FILES["croppedImage"]["tmp_name"], $url))
{
	$sql="UPDATE Perfil SET imgPerfil = '$urlImg' WHERE idPerfil='$idPerfil'";
	$resultado=$db->executeQuery($sql);
	if($resultado)
	{
		echo "se ha actualizado la imagen correctamente";
	}else{
		echo "error no se puedo guardar en base de datos";
	}

}else
{
	echo "error al guardar imagen";
}


?>
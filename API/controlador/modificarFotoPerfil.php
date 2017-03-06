<?php

include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

$db=new dbmanager();
$url="../imagenes/Monica Treviño/imgPerfil.png";


if(move_uploaded_file($_FILES["croppedImage"]["tmp_name"], $url))
{
	$sql="UPDATE Perfil SET imgPerfil = 'imagenes/Monica Treviño/imgPerfil.png' WHERE idPerfil=19";
	$resultado=$db->executeQuery($sql);
	if($resultado)
	{
		echo "se ha actualizado imagen correctamente";
	}else{
		echo "error no se puedo guardar en base de datos";
	}

}else
{
	echo "error al guardar imagen";
}


?>
<?php
include_once('../dbmanager.php');
include_once('../modelo/Tag.php');

header('Content-Type: text/html; charset=utf-8');

// ---------------------------------------------

$tag=new Tag();
$idFoto=$_GET['idFoto'];
$nombreTag=$_GET['nombreTag'];
$idTag=0;

// ------- verificar si ya existe el tag --------- //

$sql = "SELECT * from Tag WHERE nombre='$nombreTag' LIMIT 1";
$db = new dbmanager();
$resultado=$db->executeQuery($sql);
if($resultado){
	if(mysql_fetch_array($resultado) === false)
	{
		//no existe, agregar tag a base de datos
		$sql="INSERT INTO Tag(nombre) VALUES('$nombreTag')";
		$db = new dbmanager();
		$resultado=$db->executeQuery($sql);
		if(!$resultado){
			die('<br/>MySQL Error: ' . mysql_error());
		}else{
			echo "Se agrego correctamente el Tag";
		}
	}
	// conseguir id del tag en base al nombre
	$sql="SELECT idTag from Tag WHERE nombre='$nombreTag' LIMIT 1";
	$resultado=$db->executeQuery($sql);
	if($resultado){
		$row = mysql_fetch_array($resultado);
		$idTag=$row['idTag'];
	}else{
		die('<br/>MySQL Error: ' . mysql_error());
	}

	// agregar tag a foto

	$sql="INSERT INTO FotoTag(idFotoF,idTagF) VALUES('$idFoto','$idTag')";
	$resultado=$db->executeQuery($sql);
	if($resultado){
		echo "Tag $nombreTag agregado a la Foto correctamente";
	}
	else{
		die('<br/>MySQL Error: ' . mysql_error());
	}

}else{
	die('<br/>MySQL Error: ' . mysql_error());
}


?>
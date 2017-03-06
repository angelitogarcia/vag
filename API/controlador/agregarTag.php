<?php
include_once('../dbmanager.php');
include_once('../modelo/Tag.php');

header('Content-Type: text/html; charset=utf-8');

// ---------------------------------------------

$tag=new Tag();
$json = file_get_contents('php://input');
$decode = json_decode($json, true);
$numItems = count($decode);
$idPerfil=$decode[1]["idPerfil"];
$sql="INSERT INTO PerfilTag(idPerfil,idTag) VALUES"
$i=0;
foreach ($decode as $item) {
	//los tags que no tengan id son nuevos y se agregaran
	if($item['idTag']===null)
	{
		//si el tag no tiene id es nuevo
		$nombre=$item['nombre'];
		$sqlNewTag="INSERT INTO Tag(nombre) VALUES($nombre)";
		$resultado=$db->executeQuery($sqlNewTag);
		if($resultado)
		{
			$row=mysql_fetch_array($resultado);
			$idTag=$row['idTag'];
			if(++$i === $numItems) 
	    	{
	    		$sql .= "('$idPerfil','idTag');";

	    	}else{
	    		$sql .= "('$idPerfil','idTag'),";
	    	}
		}
		else{
			die('<br/>MySQL Error: ' . mysql_error());
		}
	}else
	{
		$idTag=$item['idTag'];
		if(++$i === $numItems) 
    	{
    		$sql .= "('$idPerfil','idTag');";

    	}else{
    		$sql .= "('$idPerfil','idTag'),";
    	}	
	}
}
$db->executeQuery($sql);

?>
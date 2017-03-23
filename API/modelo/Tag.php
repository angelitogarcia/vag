<?php
class Tag
{
	var $idTag;
    var $nombre;
    var $tipoTag;
    public function tagsPorFoto($id){
    	$tags=array();
		$db = new dbmanager();
		$sql = "SELECT * FROM Tag T
		        JOIN FotoTag FT ON T.idTag=FT.idTagF
		        JOIN Foto F ON F.idFoto=FT.idFotoF
		        WHERE F.idFoto='$id'";
		$resultado=$db->executeQuery($sql);
		if(!$resultado){
		    die('<br/>MySQL Error: ' . mysql_error());
		}
		else{
		    while($row = mysql_fetch_array($resultado))
		    {

		        //$tag->idTag=$row['idTag'];
		        $tag->idTag="2";
		        //$tag->nombre=$row['nombre'];
		        $tag->nombre="beautiful";
		        echo $tag->idTag;
		        array_push($tags, $tag);
		    }
		}
		$tag1=new Tag();
		$tag1->idTag="2";
		$tag1->nombre="beautiful";
		array_push($tags, $tag1);
		$tag2=new Tag();
		$tag2->idTag="3";
		$tag2->nombre="beautiful";
		array_push($tags, $tag2);
		return $tags;
    }
}
?>
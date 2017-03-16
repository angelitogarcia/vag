<?php

include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');
include_once('../modelo/Foto.php');

header('Content-Type: text/html; charset=utf-8');

$db = new dbmanager();

$thumb_height=400;
$idPerfil=$_GET['idPerfil'];

// traer el nombre del perfil

$sqlPerfil="SELECT nombrePerfil from Perfil WHERE idPerfil='$idPerfil'";
$resultadoPerfil=$db->executeQuery($sqlPerfil);
$rowPerfil = mysql_fetch_array($resultadoPerfil);
$nombrePerfil=$rowPerfil['nombrePerfil'];

$upload_dir = config::getUrlImgs() . $nombrePerfil;
$thumb_dir=config::getUrlImgs(). $nombrePerfil . '/thumbs/';

$cnt=0;
foreach($_FILES as $eachFile)
{
    if($eachFile['size'] > 0)
    $cnt++;
}


$sql="INSERT INTO Foto(urlFoto,ancho,alto,proporcion,idFbFoto,extension) VALUES";


// --------- one file ----------

/*
if (!empty($_FILES)) {

 $tempFile = $_FILES['file']['tmp_name'];
 // using DIRECTORY_SEPARATOR constant is a good practice, it makes your code portable.
 $targetPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $upload_dir . DIRECTORY_SEPARATOR;
 // Adding timestamp with image's name so that files with same name can be uploaded easily.
 $mainFile = $targetPath.time().'-'. $_FILES['file']['name'];

 move_uploaded_file($tempFile,$mainFile);
 */

 // ------ multiple files
$indice=0;

foreach($_FILES['file']['name'] as $index=>$name)
{
    $filename_err=explode(".",$_FILES['file']['name'][$index]);
    $filename_err_count = count($filename_err);
    $file_ext=$filename_err[$filename_err_count-1];
    $filename = $name;

    $upload_image=$upload_dir . "/" . $filename;
    if(!file_exists($upload_image))
    {
    	if(move_uploaded_file($_FILES["file"]["tmp_name"][$index],$upload_image))
    	{
    		$indice++;
           	list($width,$height)=getimagesize($upload_image);
           	if($indice>1){$sql.=",";};
           	if($file_ext=='jpg'||$file_ext=='jpeg'||$file_ext=='png'||$file_ext=='gif')
           	{

           		$proporcion=$height/$width;
	           	$multiplo=$thumb_height/$height;
	           	$thumb_width=intval($width*$multiplo);
	           	$thumb_create=imagecreatetruecolor($thumb_width,$thumb_height);
	           	switch($file_ext)
	           	{
	                case 'jpg':
	                    $source = imagecreatefromjpeg($upload_image);
	                    break;
	                case 'jpeg':
	                    $source = imagecreatefromjpeg($upload_image);
	                    break;

	                case 'png':
	                    $source = imagecreatefrompng($upload_image);
	                    break;
	                case 'gif':
	                    $source = imagecreatefromgif($upload_image);
	                    break;
	                default:
	                    $source = imagecreatefromjpeg($upload_image);
	            }
	            imagecopyresized($thumb_create,$source,0,0,0,0,$thumb_width,$thumb_height,$width,$height);
	           	switch($file_ext)
	           	{
	                case 'jpg' || 'jpeg':
	                    imagejpeg($thumb_create,$thumb_dir.$filename,100);
	                    break;
	                case 'png':
	                    imagepng($thumb_create,$thumb_dir.$filename,100);
	                    break;

	                case 'gif':
	                    imagegif($thumb_create,$thumb_dir.$filename,100);
	                    break;
	                default:
	                    imagejpeg($thumb_create,$thumb_dir.$filename,100);

	           	}
	           	$sql.="('$filename','$width','$height','$proporcion','','$file_ext')";
            }
            else
            {
            	$sql.="('$filename',0,0,0,'','$file_ext')";
            }
            
            echo $filename . " - ";
           	echo $width . " X " . $height;
           	echo "Extension:";
           	echo $file_ext;

           	// guardar en base de datos


        }
        $sql.=";";
		echo $sql;
		$db->executeQuery($sql);
		$sql="SELECT MAX(idFoto) as idFoto FROM Foto;";
		$resultado=$db->executeQuery($sql);
		$row = mysql_fetch_array($resultado);
		$lastId=$row["idFoto"];
		$sql="INSERT INTO PerfilFoto(idPerfil,idFoto) values('$idPerfil','$lastId')";
		$db->executeQuery($sql);
		echo $sql;
    }// if file exist
    else{
    	echo "la foto ".$upload_image." ya existe. <br>"
    }
    
}// for each

?>
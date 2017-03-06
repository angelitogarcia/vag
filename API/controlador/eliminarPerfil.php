<?php
include_once('../dbmanager.php');
include_once('../modelo/Perfil.php');

header('Content-Type: text/html; charset=utf-8');

$idPerfil=$_GET['idPerfil'];
$nombrePerfil="";
$db = new dbmanager();

$sql = "SELECT nombrePerfil from Perfil
        WHERE idPerfil=".$idPerfil;
$resultado=$db->executeQuery($sql);
if(!$resultado) {
    die("<br/>MySQL Errors: " . mysql_error());
}
else {
    $row = mysql_fetch_array($resultado);
    $nombrePerfil=$row['nombrePerfil'];
}

$cont=0;
chmod("../imagenes/".$nombrePerfil,0777);
if(Delete("../imagenes/".$nombrePerfil))
{
    $cont++;
    echo $cont. " / ";
    echo "se elimino correctamente";
    $sql = "DELETE from Perfil WHERE idPerfil='$idPerfil'";
    $resultado=$db->executeQuery($sql);
    if(!$resultado) {
        die("<br/>MySQL Errors: " . mysql_error());
    }
    else{     

    }
}
else
{
    echo "no se pudo eliminar el directorio";
}





function Delete($path)
{
    if (is_dir($path) === true)
    {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::CHILD_FIRST);

        foreach ($files as $file)
        {
            if (in_array($file->getBasename(), array('.', '..')) !== true)
            {
                if ($file->isDir() === true)
                {
                    rmdir($file->getPathName());
                }

                else if (($file->isFile() === true) || ($file->isLink() === true))
                {
                    unlink($file->getPathname());
                }
            }
        }

        return rmdir($path);
    }

    else if ((is_file($path) === true) || (is_link($path) === true))
    {
        return unlink($path);
    }

    return false;
}

//print_r(json_encode($fotos,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

?>
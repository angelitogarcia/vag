<?php
include_once('globals.php');

class dbmanager{
 
 public function executeQuery($sql){
  $con = mysql_connect(config::getBBDDServer(), config::getBBDDUser(), config::getBBDDPwd());
  if (!$con)
    {
     die('Could not connect: ' . mysql_error());
    }
  
  mysql_select_db(config::getBBDDName(), $con);
  mysql_query ("SET NAMES 'utf8'");
  $result = mysql_query($sql);
  
  mysql_close($con);
  return $result;	
  }
  public function last_ID(){
    $con = mysql_connect(config::getBBDDServer(), config::getBBDDUser(), config::getBBDDPwd());
    if (!$con)
      {
       die('Could not connect: ' . mysql_error());
      }
    
    mysql_select_db(config::getBBDDName(), $con);
    mysql_query ("SET NAMES 'utf8'");
    //$result = mysql_query($sql);
    $result=mysql_query("SELECT MAX(idFoto) FROM Foto");
    mysql_close($con);
    return $result;
  }
}
?>
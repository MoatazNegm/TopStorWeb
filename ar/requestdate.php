<?php 
 $myfile = $_GET["file"];
 $datey = date("H:i:s", filemtime($myfile));
 print '{"timey":"'.$datey.'"}';
?>

<?php 
 date_default_timezone_set('UTC');
 $myfile = $_GET["file"];
 $datey = date("H:i:s", filemtime($myfile));
 print '{"timey":"'.$datey.'"}';
?>

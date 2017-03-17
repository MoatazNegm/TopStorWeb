<?php 
 $myfile = $_GET["file"];
 $datey = filemtime($myfile);
 print '{"timey":"'.$datey.'"}';
?>

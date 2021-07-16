<?php 
 $myfile = fopen($_GET["file"],"r");
 $content = fread($myfile,filesize($_GET["file"]));
 fclose($myfile); 
 print $content;
?>

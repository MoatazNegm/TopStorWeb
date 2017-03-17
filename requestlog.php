<?php 
 $waitfile = $_GET["file"]."wait";
 while(file_exists($waitfile)){
 usleep(5000);
 }
 $myfile = fopen($_GET["file"],"r");
 $content = fread($myfile,filesize($_GET["file"]));
 fclose($myfile); 
 print $content;
?>

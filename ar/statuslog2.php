<?php 
 $myfile = fopen("Data/status.log","r");
 $content = fread($myfile,filesize("Data/status.log"));
 fclose($myfile); 
 print $content;
?>

<?php 
 exec("echo ".$_GET["req"]." ".$_GET["name"]." > Data/pumpy.txt");
 $content=exec("./".$_GET["req"]." ".$_GET["name"]." 2>&1");
 print $content 
?>
	

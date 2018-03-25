<?php 
 $content=shell_exec("./".$_GET["req"]." ".$_GET["name"]." ".$_GET["passwd"]);
 print $content 
?>
	

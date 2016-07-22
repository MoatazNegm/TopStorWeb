<?php 
 $naming = $_GET["file"]; 
 $naming = "Data/topstorlin-20160722*";
 $content = shell_exec('./Getstats'.' '.$_GET["date"].' '.$_GET["time"]);
 print $content;
}
?>

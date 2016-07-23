<?php 
 $content = shell_exec('./Getstats'.' '.$_GET["date"].' '.$_GET["time"]);
 print $_GET["date"];
?>

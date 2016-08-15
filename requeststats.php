<?php 
 shell_exec("/var/www/html/des20/Getstats.sh ".$_POST["date"]." ".$_POST["time"]);
 shell_exec("echo ".$_POST["date"]." ".$_POST["time"]." > /var/www/html/des20/Data/tmp2Get");
?>

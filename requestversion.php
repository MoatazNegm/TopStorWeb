<?php 
 $ver = exec("/bin/git branch | grep \* | awk '{print $2}'");
 echo "$ver" 
?>

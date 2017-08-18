<?php 
 $ver = exec("/bin/git branch | tr '* ' ' ' | awk '{print $1}' | tr '\n' ','");
 echo "$ver" 
?>

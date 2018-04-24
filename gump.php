<?php
 $ret = exec("ETCDCTL_API=3 /bin/python3.6 etcdget.py ".$_GET["req"]." ".$_GET["name"]);
 $ret2 = exec("echo  ".$ret." >> Data/tmtp");
 print $ret;
?>
	

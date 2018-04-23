<?php
 $ret = exec("ETCDCTL_API=3 ./etcdget.py ".$_GET["req"]." ".$_GET["name"]);
 print $ret;
?>
	

<?php

 $ret = exec("ETCDCTL_API=3 /bin/python3.6 etcdget2.py ".$_GET["req"]." ".$_GET["name"]);
 exec("echo ".$ret." > Data/gump.txt");
 print $ret;
?>
	

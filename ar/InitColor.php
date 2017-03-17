<?php
	$myfile=fopen("Data/Initcolor.ini", "w");
	$postj= json_encode($_POST);
	fwrite($myfile,$postj);
	fclose($myfile);
?>
	

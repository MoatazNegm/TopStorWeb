<?php
	$myfile=fopen("Data/InitcolorSaved.ini", "w");
	$postj= json_encode($_POST);
	fwrite($myfile,$postj);
	fclose($myfile);
?>
	

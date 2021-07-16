<?php 
 do {
    if(file_exists($_GET["file"])) {
     break;
    }
    sleep(1);
} while (true);
 $myfile = fopen($_GET["file"],"r");
 $content = fread($myfile,filesize($_GET["file"]));
 fclose($myfile); 
 print $content;
?>

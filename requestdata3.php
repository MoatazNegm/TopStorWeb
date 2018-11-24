<?php 
 $_GET["file"]="Data/currentinfo2.log2";
 $myfile = fopen($_GET["file"],"r");
 $content = fread($myfile,filesize($_GET["file"]));
 $msgformat = explode("@",$content);
 fclose($myfile); 
 $msgcode = array_shift($msgformat); 
 $myfile = fopen("msgsglobal.txt","r");
 $msglinesall = fread($myfile,filesize("msgsglobal.txt"));
 fclose($myfile); 
 $msglines = explode("\n",$msglinesall);
# $msglines = array_reverse($msglines);
 $pos = -1;
 $isfound = "";
 $msgf = "no error code found";
 for ($l = 0; $l < count($msglines); $l++) {
  $isfound = strpos ($msglines[$l], $msgcode);
  if(  is_numeric($isfound)  ) {  $pos = $l; };
 };
 if ($pos >= 0 ) { 
  $msgf="";
  $msgfarr = explode(":",$msglines[$pos]); 
  print_r($msgfarr);
  print_r($msgformat);
  array_shift($msgfarr);
  $level=array_shift($msgfarr);
   print $level."\n" ;
  if($level < 0) { exit();}; 
  #array_push($msgformat," ");
  $msgfformcount=count($msgformat);
  for ($w = 0; $w < count($msgfarr); $w++) {
   if(array_key_exists($w,$msgformat)==1) {
    $msgf .= $msgformat[$w] ; 
   };
   $msgf .=$msgfarr[$w];
  };
 };
 
 
 print str_replace("\n","",$msgf);
?>

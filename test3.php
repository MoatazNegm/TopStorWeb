<?php 
$ColorizeArr = array ( "background" => array ( ".Peter" => "#3434534", "#nndsl" => "66666" ),
						"textcolor" => array (".Peterelww" => "s", "#ekwrje" => "534545" ));
$ColorizeArr["#Min"]="rrrrrks";
//print_r($ColorizeArr["background"][".Peter"]);

function background($CArr){
	print_r($CArr);
	
	}
	
		
		foreach ($ColorizeArr["background"] as $k => $val ) {
		
//		echo $k+'{ background-color : ' + $val+' }';
//echo "<script> $('".$k."').css('background-color',".$val.");</script>";
	echo "<script> console.log(\"$('".$k."').css('background-color',".$val.");\");</script>";	
		}
		
	

<?php
$ColorizeArr = array ( "background" => array ( "#body" => "red", "#caption" => "white" ),
						"textcolor" => array (".Peterelww" => "s", "#ekwrje" => "534545" ));
$ColorizeArr["#Min"]="rrrrrks";
function background($CArr){
	print_r($CArr);
	
	}
	foreach ($ColorizeArr["background"] as $k => $val ) {
		
	echo "<script> $('".$k."').css('background-color','".$val."');</script>";	
echo "<script> console.log(\"$('".$k."').css('background-color','".$val."');\");</script>";		
		};
		
?>
	

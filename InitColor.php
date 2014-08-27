<?php
$ColorizeArr = array (	"default" => array (
																"background" => array ( 
																								"#body" => "red", 
																								"#caption" => "white"
																								),
																"textcolor" => array ( 
																								"#body" => "green", 
																								"#caption" => "red"
																								),
																"bordercolor" => array ( 
																								"#body" => "red", 
																								"#caption" => "white"
																								),
																),
												"running" => array (
																"background" => array ( 
																								"#body" => "green", 
																								"#caption" => "red"
																								),
																"textcolor" => array ( 
																								"#body" => "red", 
																								"#caption" => "white"
																								),
																"bordercolor" => array ( 
																								"#body" => "red", 
																								"#caption" => "white"
																								),
																),
												"saved" => array (
																"background" => array ( 
																								"#body" => "red", 
																								"#caption" => "white"
																								),
																"textcolor" => array ( 
																								"#body" => "red", 
																								"#caption" => "white"
																								),
																"bordercolor" => array ( 
																								"#body" => "red", 
																								"#caption" => "white"
																								),
																)												
																
							);

function background($CArr){
	print_r($CArr);
	
	}
	foreach ($ColorizeArr["running"]["background"] as $k => $val ) {
		
	echo "<script> $('".$k."').css('background-color','".$val."');</script>";	
//echo "<script> console.log(\"$('".$k."').css('background-color','".$val."');\");</script>";		
		};
		
?>
	

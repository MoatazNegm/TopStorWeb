

var Elementinit = new Object(); var Elementcurrent = new Object(); var Elementsaved = new Object();
var b;

function init(colorclass) {
	
	$(colorclass).each(function() { 
			Elementinit[$(this).attr("Data-tag")]= new Object();
			Elementinit[$(this).attr("Data-tag")]["Data-tag"]= $(this).attr("Data-tag");
			Elementinit[$(this).attr("Data-tag")]["Data-id"]= $(this).attr("Data-id");
			Elementinit[$(this).attr("Data-tag")]["Data-textcolor"]= $(this).attr("Data-textcolor");
			Elementinit[$(this).attr("Data-tag")]["Data-background"]= $(this).attr("Data-background");
			Elementinit[$(this).attr("Data-tag")]["Data-border"]= $(this).attr("Data-border");
			GetInitialColors(Elementinit[$(this).attr("Data-tag")]);
	});
//	console.log("init is running");
	Elementcurrent = $.extend(true,{},Elementinit);
	//ElementObject["saved"]=ElementObject["init"]; // just for time being till we get them from files
	//console.log(ElementObject);
 
//	$.post("InitColor.php", Elementinit);
	
}

function GetInitialColors(Ele) {
				Elementid = Ele["Data-id"];
				
				if(Ele["Data-background"] == "yes") { 
					if($("#"+Elementid).css("background-color") == "transparent") {
						Ele["Data-backtrans"]=true; Ele["background-color"]="transparent";
						$("#"+Elementid).data("Data-backtrans",true); $("#"+Elementid).data("background-color","transparent");
						
					} else {
						Ele["Data-backtrans"]=false; Ele["background-color"]= colorToHex($("#"+Elementid).css("background-color"));
						$("#"+Elementid).data("Data-backtrans",false);$("#"+Elementid).data("background-color",colorToHex($("#"+Elementid).css("background-color")));
						 
					}
					//console.log("back is disabled");
					//$("#background").minicolors("value", "#ffffff");
				};
				if(Ele["Data-textcolor"] == "yes") { 
					
					Ele["color"] = $('#'+Elementid).css("color");
					$("#"+Elementid).data("color",$('#'+Elementid).css("color"));
					//console.log("textcolor enabled");
					//$("#background").minicolors("value", "#ffffff");
				};
				if(Ele["Data-border"] == "yes") { 
					Ele["border-color"]= $('#'+Elementid).css("border-color");
					$('#'+Elementid).data("border-color", $('#'+Elementid).css("border-color"));
					
					//$("#background").minicolors("value", "#ffffff");
				};


	}
function ColorCurrentupdate(Ele,loc,colr) {
	console.log ("Ele: " + Ele +",loc:"+ loc + ",colr:"+colr);
	Elementcurrent[Ele][loc]= colr;
	
	}
	
function Savecurrent() {
		Elementsaved = $.extend(true,{},Elementcurrent);
	//ElementObject["saved"]=ElementObject["init"]; // just for time being till we get them from files
//	console.log(ElementObject);
	$.post("./InitColorSaved.php", Elementsaved);
	
	};

function ApplySetting() {
	
	var Ele = new Object();
	Ele = $.extend(true,{},Elementcurrent);
/*	for(var locc in Elementcurrent) {
		Ele[locc]=$.extend(true,{},Elementcurrent[locc]);
	}
*/	console.log("Ele: "+Ele["#rightPane"]["background-color"]);
	for(var loc in Ele) {
		 
		 if(Ele[loc].hasOwnProperty("color")== true) {
			 $(loc).css("color",Ele[loc]["color"]);
//			 console.log(loc+" "+ Ele[loc]["background-color"]);
		 }
		 if(Ele[loc].hasOwnProperty("border-color") == true ) {
			 $(loc).css("border-color",Ele[loc]["border-color"]);
		 }
		 
		 if(Ele[loc].hasOwnProperty("Data-backtrans") == true) {
			  //console.log("backtrans: "+ Ele["rightPane"]["Data-backtrans"]);
			 if(Ele[loc]["Data-backtrans"] == true) { 
				 $(loc).css("background-color","rgba(200,54,54,0)");
//				 console.log("found true :"+loc) ;
				 } else {
					if(Ele[loc].hasOwnProperty("background-color") == true) {
					
			 
					$(loc).css("background-color",Ele[loc]["background-color"]);
				
					}
			 }
			}
		 }
		}
		

	
function RestoreLastSettings() {
	
	 $.getJSON("./Data/InitcolorSaved.ini", function(data) { 
		 
		 for(var loc in data) {
			 Elementsaved[data[loc]["Data-tag"]] = $.extend(true,{},data[loc]);
			 Elementcurrent[data[loc]["Data-tag"]] = $.extend(true,{},data[loc]);
			 console.log( Elementsaved[data[loc]["Data-tag"]]["Data-tag"] + Elementsaved[data[loc]["Data-tag"]]["background-color"]);
			 
//		
			};
			
			console.log("data "+data["#rightPane"]["background-color"]);

			console.log("Eleme"+Elementcurrent["#rightPane"]["background-color"]); 
			ApplySetting(); 
			
		});
		
	 
	 
	}	

function RestoreInitSettings() {
	
	 $.getJSON("./Data/Initcolor.ini", function(data) { 
		 
		 for(var loc in data) {
			 Elementsaved[data[loc]["Data-tag"]] = $.extend(true,{},data[loc]);
			 Elementcurrent[data[loc]["Data-tag"]] = $.extend(true,{},data[loc]);
			 console.log( Elementsaved[data[loc]["Data-tag"]]["Data-tag"] + Elementsaved[data[loc]["Data-tag"]]["background-color"]);
			 
//		
			};
			
			console.log("data "+data["#rightPane"]["background-color"]);

			console.log("Eleme"+Elementcurrent["#rightPane"]["background-color"]); 
			ApplySetting(); 
			
		});
		
	 
	 
	}	



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
			Elementinit[$(this).attr("Data-tag")]["Data-backtrans"]= $(this).attr("Data-backtrans");
			GetInitialColors(Elementinit[$(this).attr("Data-tag")]);
	});
//	console.log("init is running");
	Elementcurrent = $.extend(true,{},Elementinit);
	//ElementObject["saved"]=ElementObject["init"]; // just for time being till we get them from files
	//console.log(ElementObject);
 
//	$.post("InitColor.php", Elementinit);
	
}
function rgba2hex( color_value ) {
	if ( ! color_value ) return false;

	var  parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
	    length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
	    ;

if (color_value.indexOf('rgba') === false) { //check if it is 0 (start with rgba) or false (it is NOT rgba)
length = 2;
} else{
length = 3;
delete(parts[4]); //delete the alpha value prevent adding it by parts.join
};

	delete(parts[0]);
	for ( var i = 1; i <= length; i++ ) {
		parts[i] = parseInt( parts[i] ).toString(16);
		if ( parts[i].length == 1 ) parts[i] = '0' + parts[i];
	}
	return '#' + parts.join('').toUpperCase(); // #F7F7F7
}
function GetInitialColors(Ele) {
			Elementid = Ele["Data-id"];
			Ele["Data-backtrans"]=false; Ele["background-color"]= rgba2hex($("#"+Elementid).css("background-color"));
			$("#"+Elementid).data("Data-backtrans",false);$("#"+Elementid).data("background-color",rgba2hex($("#"+Elementid).css("background-color")));
			Ele["color"] = $('#'+Elementid).css("color");
			$("#"+Elementid).data("color",$('#'+Elementid).css("color"));
			Ele["border-color"]= $('#'+Elementid).css("border-color");
			$('#'+Elementid).data("border-color", $('#'+Elementid).css("border-color"));
					
					//$("#background").minicolors("value", "#ffffff");
}

function GetInitialColorsold(Ele) {
				Elementid = Ele["Data-id"];
		//		console.log(Elementid + " " +Ele["Data-background"] + " "+Ele["Data-backtrans"] + " "  +Ele["Data-backtrans"] == true);
				if(Ele["Data-background"] == "yes") { 
					if(Ele["Data-backtrans"] == "true") {
						Ele["Data-backtrans"]=true; Ele["background-color"]="transparent"; 
						$("#"+Elementid).data("Data-backtrans",true); $("#"+Elementid).data("background-color","transparent");
						
					} else {
						//console.log("element:",Elementid,rgba2hex($("#"+Elementid).css("background-color")));
						Ele["Data-backtrans"]=false; Ele["background-color"]= rgba2hex($("#"+Elementid).css("background-color"));
						$("#"+Elementid).data("Data-backtrans",false);$("#"+Elementid).data("background-color",rgba2hex($("#"+Elementid).css("background-color")));
						 
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
	//console.log ("Ele: " + Ele +",loc:"+ loc + ",colr:"+colr);
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
	for(var loc in Ele) {
		 
	
		 $(loc).css("color",Ele[loc]["color"]);
		 $(loc).css("border-color",Ele[loc]["border-color"]);
		 $(loc).css("background-color",Ele[loc]["background-color"]);
				
					
			
	}
}

		
function ApplySettingold() {
	
	var Ele = new Object();
	Ele = $.extend(true,{},Elementcurrent);
/*	for(var locc in Elementcurrent) {
		Ele[locc]=$.extend(true,{},Elementcurrent[locc]);
	}
*///	console.log("Ele: "+Ele["#rightPane"]["background-color"]);
	for(var loc in Ele) {
		 
		 if(Ele[loc].hasOwnProperty("color")== true) {
			 $(loc).css("color",Ele[loc]["color"]);
//			 console.log(loc+" "+ Ele[loc]["background-color"]);
		 }
		 if(Ele[loc].hasOwnProperty("border-color") == true ) {
			 $(loc).css("border-color",Ele[loc]["border-color"]);
		 }
	//	 console.log(Ele[loc].hasOwnProperty("Data-backtrans") + loc);
		 if(Ele[loc].hasOwnProperty("Data-backtrans") == true) {
			  
			 if(Ele[loc]["Data-backtrans"] == "true") { 
			//	 console.log(loc+ " : "+ Ele[loc]["Data-backtrans"]);
				 $(loc).css("background-color","rgba(200,54,54,0)");
		//	 console.log("found true :"+loc) ;
				 } else {
					
						$(loc).css("background-color",Ele[loc]["background-color"]);
				
					
			 }
			}
		 }
		}

	
function RestoreLastSettings() {
	$.get("requestdata.php", { file: "Data/InitcolorSaved.ini" }, function(pdata){
				var		data = jQuery.parseJSON(pdata);
			 
		 for(var loc in data) {
				
			 Elementcurrent[data[loc]["Data-tag"]] = $.extend(true,{},data[loc]);
		};
			
		ApplySetting(); 
			
		});
		
	 
	 
	}	

function RestoreInitSettings() {
	console.log("restoring Init");
	 $.get("requestdata.php", { file: "Data/Initcolor.ini" }, function(pdata){
					var	data = jQuery.parseJSON(pdata);
	      console.log("data",data);
		 
		 for(var loc in data) {
			 Elementsaved[data[loc]["Data-tag"]] = $.extend(true,{},data[loc]);
			 Elementcurrent[data[loc]["Data-tag"]] = $.extend(true,{},data[loc]);
		 }
	
			ApplySetting(); 
			
		});
	
}

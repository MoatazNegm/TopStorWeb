

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
	console.log("init is running");
	Elementcurrent = $.extend(true,{},Elementinit);
	//ElementObject["saved"]=ElementObject["init"]; // just for time being till we get them from files
//	console.log(ElementObject);
 
	$.post("InitColor.php", Elementinit);
	
}

function GetInitialColors(Ele) {
				Elementid = Ele["Data-id"];
				ElementtoColor= Ele;
				if(Ele["Data-background"] == "yes") { 
					if($("#"+Elementid).css("background-color") == "transparent") {
						Ele["Data-backtrans"]=true; Ele["background-color"]="transparent";
						$("#"+Elementid).data("Data-backtrans",true); $("#"+Elementid).data("background-color","transparent");
						
					} else {
						Ele["Data-backtrans"]=false; Ele["background-color"]= $("#"+Elementid).css("background-color");
						$("#"+Elementid).data("Data-backtrans",false);$("#"+Elementid).data("background-color",$("#"+Elementid).css("background-color"));
						 
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
	console.log ("current: " + Ele + loc + colr);
	Elementcurrent[Ele][loc]= colr;
	
	}
	
function Savecurrent() {
		Elementsaved = $.extend(true,{},Elementcurrent);
	//ElementObject["saved"]=ElementObject["init"]; // just for time being till we get them from files
//	console.log(ElementObject);
	$.post("InitColorSaved.php", Elementsaved);
	
	};
function RestoreLastSettings() {
	
	 $.getJSON("./Data/InitcolorSaved.ini", function(data) { Elementsaved = $.extend(true,{},data); });   
	
	$.extend(Elementcurrent,Elementsaved);
	}
function ApplySetting() {
	var Ele = $.extend(true,{},Elementcurrent);
	for(var loc in Ele) {
		 if(loc.hasOwnProperty("color")) {
			 $(loc).css("color",loc["color"]);
		 }
		 if(loc.hasOwnProperty("border-color")) {
			 $(loc).css("border-color",loc["border-color"]);
		 }
		 if(loc.hasOwnProperty("background-color")) {
			 $(loc).css("background-color",loc["background-color"]);
		 }
		 if(loc.hasOwnProperty("Data-backtrans")) {
			 if(loc["Data-backtrans"]) { $(loc).css("background-color","rgba(200,54,54,0)"); }
		 }
	}
}

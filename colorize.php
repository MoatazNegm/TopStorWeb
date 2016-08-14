<script src="js/Colour.js"></script>
<script src="js/jquery.minicolors.js"></script>
<script src="InitColor.js?lskdew"></script>
<div class=" row "> 
	<div class="col-sm-12">
								
									<div id="Popup" class="xbox  " Data-tag=".box" Data-id="Popup" Data-textcolor="yes" Data-background="yes" Data-border="yes">
										<div class="row">
											<h2 class="  separatortbot" style="margin-top:2px;"  id="mymodal"  Data-tag="" Data-background="no" Data-border="no">Pls-select-to-Colorize</h2>
										</div>									
	</div>
	
	<form class="form-horizontal " role="form">
			<div class="row">
				<div class=" form-group minicolorgrp">
					<div class="  col-sm-1 textcolor ">
						<label  for="textcolor" class="control-label col-sm-1">Text</label>
					</div>
					<div class="  col-sm-offset-1 col-sm-5 textcolor ">
						<input type="input"   id="textcolor"  class="form-control tocolor "  data-inline="false" value="#ffffff">
					</div>
					<div class=" col-sm-1 textcolor ">
						<label  for="transtxt" class="control-label">transparent</label>
					</div>
					<div class=" col-sm-offset-1 col-sm-2 textcolor ">
						<input type="checkbox" class="form-control" id="transtxt" value="0">
					</div>
				</div>
			</div>
			<div class="row" >
				<div class=" form-group minicolorgrp">	
					<div class="col-sm-2 background ">
						<label  for="background"  class="control-label" >Back-ground</label>
					</div>
					<div class="  col-sm-5 background ">
						<input type="input" id="background" class="form-control tocolor "  data-inline="false" value="#ffffff">
					</div>
					<div class=" col-sm-1 background ">
						<label  for="transbckgrnd" class="control-label" >transparent</label>
					</div>
					<div class=" col-sm-offset-1 col-sm-2 background ">
						<input type="checkbox" class="form-control" id="transbckgrnd" value="0">
					</div>
					
				</div>
			</div>
			<div class="row">
				<div class=" form-group minicolorgrp">	
					<div class="col-sm-2 frame ">
						<label  for="frame"  class="control-label" >frame</label>
					</div>
					<div class="  col-sm-5 frame ">
						<input type="input" id="frame" class="form-control tocolor "  data-inline="false" value="#ffffff">
					</div>
					<div class=" col-sm-1 frame ">
						<label  for="transfrm" class="control-label" >transparent</label>
					</div>
					<div class=" col-sm-offset-1 col-sm-2 frame ">
						<input type="checkbox" class="form-control" id="transfrm" value="0">
					</div>
			</div>
			<div class="row">
				<div id="sbox" class="col-sm-offset-2 col-sm-8"style="margin-top: 0.3 rem; text-align: center; border: solid 2px; color: red; background-color: green;">sample box</div>
			</div>
			
			</div>
	</form>

						<div class="xmodal-footer col-sm-offset-1" style="margin-top: 3rem;" >
							
							<button type="button" id="RestIntstng"class="col-sm-12 btn btn-default btn-warning" >Restore defaults</button>
							<button type="button" id="Restlststng"class="col-sm-12 btn btn-default btn-danger" >Restore last settings</button>
							<button type="button" id="Savechanges" class="col-sm-12 btn btn-default btn-success">Save changes</button>
						</div>
					</div>
				</div> 
			


<script>
		var ElementtoColor;	
		var Elementid;
		init(".colorize");
		
	$("#textcolor").minicolors({
		theme: 'bootstrap',
		control: 'hue',
		opacity: false,
		format: "hex",
		change: function(hex, opacity) {
		 
		 $("#sbox").css("color", hex);
		 var title = $("#mymowdal").text();
		 $(ElementtoColor).css("color", hex);
		 $("#"+title).css("color",hex);
			 ColorCurrentupdate(ElementtoColor,"color",hex);

		}
});		 

$("#background").minicolors({
		theme: 'bootstrap',
		control: 'hue',
		opacity: false,
		format: "hex",
		change: function(hex, opacity) {
		 
		 $("#sbox").css("background-color", hex);
		 var title = $("#mymodal").text();
		 $(ElementtoColor).css("background-color", hex);
		 $("#"+title).css("background-color",hex);
			 ColorCurrentupdate(ElementtoColor,"background-color",hex);

		}
		 
	});
	$("#frame").minicolors({
		theme: 'bootstrap',
		control: 'hue',
		opacity: false,
		format: "hex",
		change: function(hex, opacity) {
		 
		 $("#sbox").css("border-color", hex);
		 var title = $("#mymodal").text();
		 $(ElementtoColor).css("border-color", hex);
		 $("#"+title).css("border-color",hex);
			 ColorCurrentupdate(ElementtoColor,"border-color",hex);

		}
		 
	});
	
	
			$(".colorize").click(function (e) {
				e.stopPropagation();
				ElementtoColor = $(this).attr("Data-tag");
				Elementid=  $(this).attr("Data-id");
				var title = $(this).attr("class").split(' ').pop();
				$("#mymodal").text(Elementid);
					$("#sbox").css("backgroundColor", $(ElementtoColor).css("backgroundColor"));
					$("#background").val(rgba2hex($(ElementtoColor).css("backgroundColor")) );
					$('.background .minicolors-swatch-color').css('background-color',$(ElementtoColor).css("backgroundColor"))
					if(rgba2hex($(ElementtoColor).css("background-color")) == "#000000") {$("#transbckgrnd").prop("checked",true);$("#background").prop("disabled",true);
					} else { $("#transbckgrnd").prop("checked",false); $("#background").prop("disabled",false); }
					
					$("#sbox").css("color", $(ElementtoColor).css("color"));
					$("#textcolor").val(rgba2hex($(ElementtoColor).css("color")) );
					$('.textcolor .minicolors-swatch-color').css('background-color',$(ElementtoColor).css("color"))
					if(rgba2hex($(ElementtoColor).css("color")) == "#000000") {$("#transtxt").prop("checked",true); $("#textcolor").prop("disabled",true);
					} else { $("#transtxt").prop("checked",false); $("#textcolor").prop("disabled",false);}
					$("#sbox").css("border-color", $(this).css("border-color"));
					$('.frame .minicolors-swatch-color').css('background-color',$(ElementtoColor).css("border-color"))
					$("#frame").val(rgba2hex($(ElementtoColor).css("border-color")) ); 
					if(rgba2hex($(ElementtoColor).css("border-color")) == "#000000") {$("#transfrm").prop("checked",true);$("#frame").prop("disabled",true);
					} else { $("#transfrm").prop("checked",false); $("#frame").prop("disabled",false); }

			});
			
	//$("#modalcontainer").draggable();
	$("#textcolor.minicolors2").minicolors({
		theme: 'bootstrap',
		
		change: function(hex, opacity) {
		 
		 $("#samplebox").css("color", hex);
		 var title = $("#myModalLabel").text();
		 $(ElementtoColor).css("color", hex);
		 $("#"+Elementid).data("color",hex);
			 ColorCurrentupdate(ElementtoColor,"color",hex);
//		console.log($("#samplebox").css("color"), " for " + ElementtoColor);
//		console.log($(ElementtoColor).css("color"));
		}
		 
	});
	$("#background.minicolors2").minicolors({
		theme: 'bootstrap',
		
		change: function(hex, opacity) {
			var title = $("#myModalLabel").text();
				$("#samplebox").css("background-color", hex);
				if(!$("#noback").prop("checked")){ $(ElementtoColor).css("background-color", hex); $("#"+Elementid).data("background-color",hex);
																						ColorCurrentupdate(ElementtoColor,"background-color",hex);
																				}
				
//			console.log($("#myModalLabel").text().match(/back/g));
//			console.log("...."+hex + "....." + opacity);
		}
		 
	});
	$("#frame.minicolors2").minicolors({
		theme: 'bootstrap',
		
		change: function(hex, opacity) {
		 $("#samplebox").css("border-color", hex);
		 var title = $("#myModalLabel").text();
		 $(ElementtoColor).css("border-color", hex);
		 $("#"+Elementid).data("Data-bordercolor",hex);
		 ColorCurrentupdate(ElementtoColor,"border-color",hex);
//			console.log($("#sampleboxsamplebox").css("color"));
//			console.log("...."+hex + "....." + opacity);
		}
		 
	});
	
$("#transtxt").click(function(){
 if ($("#transtxt").prop("checked")) { 
	 $("#sbox").css("color", "transparent");
	 $("#textcolor").prop("disabled",true);
	 $(ElementtoColor).css("color","transparent");
	 ColorCurrentupdate(ElementtoColor,"color","transparent");
 } else {
	 $("#textcolor").prop("disabled",false);
	 $("#sbox").css("color", $("#textcolor").val());
	 $(ElementtoColor).css("color",$("#textcolor").val());
	 ColorCurrentupdate(ElementtoColor,"color",$("#textcolor").val());
	 
 }
});
$("#transbckgrnd").click(function(){
 if ($("#transbckgrnd").prop("checked")) { 
	 $("#sbox").css("background-color", "transparent");
	 $("#background").prop("disabled",true);
	 $(ElementtoColor).css("background-color","transparent");
	 ColorCurrentupdate(ElementtoColor,"background-color","transparent");
 } else {
	 $("#background").prop("disabled",false);
	 $("#sbox").css("background-color", $("#background").val());
	 $(ElementtoColor).css("background-color",$("#background").val());
	 ColorCurrentupdate(ElementtoColor,"background-color",$("#background").val());
	 
 }
});
$("#transfrm").click(function(){
 if ($("#transfrm").prop("checked")) { 
	 $("#sbox").css("border-color", "transparent");
	 $("#frame").prop("disabled",true);
	 $(ElementtoColor).css("border-color","transparent");
	 ColorCurrentupdate(ElementtoColor,"border-color","transparent");
 } else {
	 $("#frame").prop("disabled",false);
	 $("#sbox").css("border-color", $("#frame").val());
	 $(ElementtoColor).css("border-color",$("#frame").val());
	 ColorCurrentupdate(ElementtoColor,"border-color",$("#frame").val());
	 
 }
});

$("#Savechanges").click(function(){
	console.log("saving");
	Savecurrent();
	});	
$("#Restlststng").click(function(){
	
	RestoreLastSettings();
	
	
	ApplySetting();
	});	
	
$("#RestIntstng").click(function(){
	
	
	RestoreInitSettings();
	
	
	ApplySetting();
	});	

</script>
	

/<script src="js/Colour.js"></script>
<script src="js/jquery.minicolors.js"></script>
<script src="InitColor.js?lskdsldew"></script>
<div class=" row "> 
	<div class="col-sm-12">
								
									<div id="Popup" class="xbox colorize " Data-tag=".box" Data-id="Popup" Data-textcolor="yes" Data-background="yes" Data-border="yes">
										<div class="row">
											<h2 class="configTitle colorize separatortbot" style="margin-top:2px;"  id="mymodal"  Data-tag="#SubTitle" Data-id="SubTitle" Data-textcolor="yes" Data-background="no" Data-border="no">Colorize</h2>
										</div>									
	</div>
	
	<form class="form-horizontal " role="form">
			<div class="row">
				<div class="minicolorgrp" class=" form-group ">
					<div class="  col-sm-12 textcolor ">
						<label  for="textcolor" class="col-sm-1">Text</label>
						<div class="  col-sm-5 textcolor ">
							<input type="input"   id="textcolor"  style="margin-top: 0.5rem;"class="form-control tocolor "  data-inline="false" value="#ffffff">
							
						</div>
						
						<div class=" col-sm-1 textcolor ">
							<label  for="transtxt" class="col-sm-1">transparent</label>
						</div>
						<div class=" col-sm-offset-2 col-sm-2 textcolor ">
							<input type="checkbox" class="form-control" id="transtxt" value="0">
						</div>
					</div>
										
						
						
				</div>
			</div>
			<div class="row">
				<div class="minicolorgrp" class=" form-group ">	
					<div class=" col-sm-offset-1 col-sm-6 background ">
						<label  for="background" class=" control-label" style="margin-left: -1rem;">Background</label>
						<input type="input" id="background" class="form-control   " data-inline="false" value="#ffffff">
						<input type="radio" style="margin-left: 2rem;" name="Period" id="bckgrnd" value="bckgrnd">
						<div class="row">
							<div class="col-sm-offset-3 col-sm-1" >
								<input type="checkbox" id="transbckgrnd" value="0">
							</div>
						</div>
					
					</div>
				</div>
			</div>
			<div class="row">
				<div class="minicolorgrp" class=" form-group ">	
				
					<div class=" col-sm-offset-1 col-sm-6 frame ">
						<label  for="frame" class=" control-label">frame</label>
						<input type="input"  id="frame" class="form-control  " placeholder="Admin password" value="#ffffff">
						<input type="radio"  name="Period" style="margin-left: 2rem;"  id="frm" value="frm">
						<div class="row">
							<div class="col-sm-offset-3 col-sm-1" >
								<input type="checkbox" id="transfrm" value="0">
							</div>
						</div>
					
					</div>
				</div>
			</div>
			<div class="row">
				<div class="minicolorgrp" class=" form-group ">	

			<div class="row">
			<div id="sbox" class="col-sm-offset-3 col-sm-8"style="margin-top: 0.3 rem; text-align: center; border: solid 2px; color: red; background-color: green;">sample box</div>
			</div>
			<div class="row">
			<div id="minimin" class="col-sm-offset-3 col-sm-8" style="height: 10rem;"></div>
			</div>
				</div>
			</div>
			
				
										 
	</form>

						<div class="xmodal-footer col-sm-offset-1" style="margin-top: 3rem;" >
							<button type="button" class="col-sm-12 btn btn-primary" data-dismiss="xmodal">Close</button>
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
		 var title = $("#mymodal").text();
		 $(ElementtoColor).css("color", hex);
		 $("#"+title).css("color",hex);
			 ColorCurrentupdate(ElementtoColor,"color",hex);

		}
		 
	});
	
		$('#noback').change(function() {
			if($(this).prop("checked")) { 
				$(ElementtoColor).css("background-color", "rgba(200,54,54,0)");
				$("#"+Elementid).data("Data-backtrans",true);
				
				//console.log("opacitytrans:"+$('#'+Elementid).css("background-color"));
			} else {
				$(ElementtoColor).css("background-color", "rgba(200,54,54,1)");
				 //console.log("opacitysolid:"+$('#'+Elementid).css("background-color"));
				$(ElementtoColor).css("background-color",$("#samplebox").css("background-color"));
				$("#"+Elementid).data("Data-backtrans",false); $("#"+Elementid).data("background-color",$("#samplebox").css("background-color"));
			};
			ColorCurrentupdate(ElementtoColor,"Data-backtrans",$("#"+Elementid).data("Data-backtrans"));	
		});
	
	$(".colorize").click(function (e) {
				e.stopPropagation();
				ElementtoColor = $(this).attr("Data-tag");
				Elementid=  $(this).attr("Data-id");
				var title = $(this).attr("class").split(' ').pop();
				$("#mymodal").text(Elementid);
					$("#sbox").css("backgroundColor", $("#"+Elementid).css("backgroundColor"));
					$("#background").val(rgba2hex($("#"+Elementid).css("backgroundColor")) );
					if(rgba2hex($("#"+Elementid).css("background-color")) == "#000000") {$("#transbckgrnd").prop("checked",true);
					} else { $("#transbckgrnd").prop("checked",false); }
					
					$("#sbox").css("color", $('#'+Elementid).css("color"));
					$("#textcolor").val(rgba2hex($('#'+Elementid).css("color")) );
					if(rgba2hex($("#"+Elementid).css("color")) == "#000000") {$("#transtxt").prop("checked",true);
					} else { $("#transtxt").prop("checked",false); }
					$("#sbox").css("border-color", $('#'+Elementid).css("border-color"));
					$("#frame").val(rgba2hex($('#'+Elementid).css("border-color")) ); 
					if(rgba2hex($("#"+Elementid).css("border-color")) == "#000000") {$("#transfrm").prop("checked",true);
					} else { $("#transfrm").prop("checked",false); }

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
	
/*	$(".colorize").each(function(index){
		
		console.log(index + ":" + $(this).attr("Data-id") + ":" + $(this).attr("Data-tag"));
		
		});
*/
$("#Savechanges").click(function(){
	
	Savecurrent();
	});	
$("#Restlststng").click(function(){
	
	RestoreLastSettings();
	
	
	//ApplySetting();
	});	
	
$("#RestIntstng").click(function(){
	
	RestoreInitSettings();
	
	
	//ApplySetting();
	});	

</script>
	

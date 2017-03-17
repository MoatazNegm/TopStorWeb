<script src="../js/Colour.js"></script>
<script src="../js/jquery.minicolors.js"></script>
<script src="InitColor.js"></script>
<div id="modalcontainer" >
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
							<h4 class="modal-title" id="myModalLabel">العنوان</h4>
						</div>
						<div class="modal-body">
							<form class="form-horizontal " role="form">
											<div class="row">
												<div class="   ">
													<div id="minicolor" class="  ">
														<div class=" col-sm-4 textcolor">
															<label  for="textcolor" class=" control-label">النص</label>
															<input type="hidden" id="textcolor" class="form-control minicolors2  " data-inline="false" value="#ffffff">
														</div>
													</div>
													<div class="   ">
														<div class=" col-sm-4 background">
															<label  for="background" class=" control-label" >لون الخلفية</label>
															<input type="hidden" id="background" class="form-control minicolors2  " data-inline="false" value="#ffffff">
														</div>
													</div>
													<div class="  ">
														<div class=" col-sm-4 frame">
															<label  for="frame" class=" control-label">الإطار</label>
															<input type="hidden" id="frame" class="form-control minicolors2 " placeholder="Admin password" value="#ffffff">
														</div>
													</div>
												</div>
											</div>
											
											<div class="row">
											<div id="samplebox"> نموذج مربع</div>
											</div>
											<div class="row col-sm-offset-1 checkbox noback" style="margin-left: 2px;">
														<label>
														<input type="checkbox" id="noback" value="background is transparent"> الخلفية شفافة
														</label>
												</div>
												
										 
										</form>

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">إغلاق</button>
							<button type="button" id="RestIntstng"class="btn btn-default" >إستعادة إستعادة التعديلات الأصلية</button>
							<button type="button" id="Restlststng"class="btn btn-default" >إستعادة آخر تعديلات</button>
							<button type="button" id="Savechanges" class="btn btn-default">حفظ التعديلات</button>
						</div>
					</div>
				</div>
			</div>
		</div>


<script>
		var ElementtoColor;	
		var Elementid;
		init(".colorize");
		
		$('#noback').change(function() {
			if($(this).prop("checked")) { 
				$(ElementtoColor).css("background-color", "rgba(200,54,54,0)");
				$("#"+Elementid).data("Data-backtrans",true);
				
				console.log("opacitytrans:"+$('#'+Elementid).css("background-color"));
			} else {
				$(ElementtoColor).css("background-color", "rgba(200,54,54,1)");
				 console.log("opacitysolid:"+$('#'+Elementid).css("background-color"));
				$(ElementtoColor).css("background-color",$("#samplebox").css("background-color"));
				$("#"+Elementid).data("Data-backtrans",false); $("#"+Elementid).data("background-color",$("#samplebox").css("background-color"));
			};
			ColorCurrentupdate(ElementtoColor,"Data-backtrans",$("#"+Elementid).data("Data-backtrans"));	
		});
	function colorToHex(color) {
		if (color==null) { return '#ffffff';}
		if (!color.match(/rgb/g)) { return "#ffffff"; }
		if (color.substr(0, 1) === '#') {
				return color;
		}
		
		var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
		
		var red = parseInt(digits[2]);
		var green = parseInt(digits[3]);
		var blue = parseInt(digits[4]);

		var rgb = blue | (green << 8) | (red << 16);
		return digits[1] + '#' + rgb.toString(16);
	};



	$(".colorize").click(function (e) {
				e.stopPropagation();
				ElementtoColor = $(this).attr("Data-tag");
				Elementid=  $(this).attr("Data-id");
				var title = $(this).attr("class").split(' ').pop();
				$("#myModalLabel").text(Elementid);
				
				
				
				
			//	console.log($(this).attr("class"));
			//	console.log("B=" + $(this).css("background-color") +";" + colorToHex($(this).css("background-color").match(/rgb/g))+ ", F:" + $(this).css("color") + ", bor=" + $(this).css("border-color")+";" + colorToHex($(this).css("background-color").match(/rgb/g)));
			//	$("#textcolor").minicolors("value", colorToHex($(this).css("color")) ); 
		
	//		$(".minicolors2").minicolors({ theme: 'bootstrap'});

			
				
				if($(this).attr("Data-background") == "yes") { 
					$(".background").show(); $(".noback").show();
					$("#samplebox").css("background-color", $("#"+Elementid).css("background-color"));
					$("#background").minicolors("value", colorToHex($("#"+Elementid).css("background-color")) );
					if($("#"+Elementid).css("background-color") == "transparent") {
						$("#noback").prop("checked",true); //console.log("found transparent"+$("#"+Elementid).css("background-color"));
						$(ElementtoColor).css("background-color","transparent"); 
						//$("#"+Elementid).data("Data-backtrans",true); 
						
					} else {
						$("#noback").prop("checked",false);//console.log("found not transparent"+$('#'+Elementid).css("background-color"));
					//	$("#"+Elementid).data("Data-backtrans",false);
						 
					}
					//console.log("back is disabled");
					//$("#background").minicolors("value", "#ffffff");
				} else { 
					$(".background").hide();
					$(".noback").hide();
					
				};
				if($(this).attr("Data-textcolor") == "yes") { 
					$(".textcolor").show();
					$("#samplebox").css("color", $('#'+Elementid).css("color"));
					$("#textcolor").minicolors("value", colorToHex($('#'+Elementid).css("color")) );
					//console.log("textcolor enabled");
					//$("#background").minicolors("value", "#ffffff");
				} else { 
				$(".textcolor").hide();
					
				};
				if($(this).attr("Data-border") == "yes") { 
					$(".frame").show();
					$("#samplebox").css("border-color", $('#'+Elementid).css("border-color"));
					$("#frame").minicolors("value", colorToHex($('#'+Elementid).css("border-color")) ); 
					//$("#background").minicolors("value", "#ffffff");
				} else { 
					$(".frame").hide();
					
				};

				$("#myModal").modal("show");
			});
			
	$("#modalcontainer").draggable();
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
//			console.log($("#samplebox").css("color"));
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
	

<script src="jquery/Colour.js"></script>
<script src="jquery/jquery.minicolors.js"></script>
<div id="modalcontainer" >
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
							<h4 class="modal-title" id="myModalLabel">Modal title</h4>
						</div>
						<div class="modal-body">
							<form class="form-horizontal " role="form">
											<div class="row">
												<div class="   ">
													<div id="minicolor" class="  ">
														<div class=" col-sm-4 textcolor">
															<label  for="textcolor" class=" control-label">Text</label>
															<input type="hidden" id="textcolor" class="form-control minicolors2  " data-inline="false" value="#ffffff">
														</div>
													</div>
													<div class="   ">
														<div class=" col-sm-4 background">
															<label  for="background" class=" control-label" >Background color</label>
															<input type="hidden" id="background" class="form-control minicolors2  " data-inline="false" value="#ffffff">
														</div>
													</div>
													<div class="  ">
														<div class=" col-sm-4 frame">
															<label  for="frame" class=" control-label">frame</label>
															<input type="hidden" id="frame" class="form-control minicolors2 " placeholder="Admin password" value="#ffffff">
														</div>
													</div>
												</div>
											</div>
											
											<div class="row">
											<div id="samplebox"> sample box</div>
											</div>
											<div class="row col-sm-offset-1 checkbox">
														<label>
														<input type="checkbox" id="noback" value="background is transparent"> Background is transparent
														</label>
												</div>
												
										 
										</form>

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>
		</div>


<script>
		var ElementtoColor;	
		$('#noback').change(function() {
			if($(this).prop("checked")) { 
				$('#'+ElementtoColor).css("background-color", "rgba(200,54,54,0)"); console.log("opacitytrans:"+$('#'+ElementtoColor).css("background-color"));
			} else {
				$('#'+ElementtoColor).css("background-color", "rgba(200,54,54,1)"); console.log("opacitysolid:"+$('#'+ElementtoColor).css("background-color"));
				$('#'+ElementtoColor).css("background-color",$("#samplebox").css("background-color"));
			};
				
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
				ElementtoColor = $(this).attr("Data-id");
				var title = $(this).attr("class").split(' ').pop();
				$("#myModalLabel").text(ElementtoColor);
				
				
				
				
			//	console.log($(this).attr("class"));
			//	console.log("B=" + $(this).css("background-color") +";" + colorToHex($(this).css("background-color").match(/rgb/g))+ ", F:" + $(this).css("color") + ", bor=" + $(this).css("border-color")+";" + colorToHex($(this).css("background-color").match(/rgb/g)));
			//	$("#textcolor").minicolors("value", colorToHex($(this).css("color")) ); 
			$('.demo').each( function() {
								//
								// Dear reader, it's actually very easy to initialize MiniColors. For example:
								//
								//  $(selector).minicolors();
								//
								// The way I've done it below is just for the demo, so don't get confused
								// by it. Also, data- attributes aren't supported at this time...they're
								// only used for this demo.
								//
				$(this).minicolors({
					control: $(this).attr('data-control') || 'hue',
					defaultValue: $(this).attr('data-defaultValue') || '',
					inline: $(this).attr('data-inline') === 'true',
					letterCase: $(this).attr('data-letterCase') || 'lowercase',
					opacity: $(this).attr('data-opacity'),
					position: $(this).attr('data-position') || 'bottom left',
	//				change: function(hex, opacity) {
	//					if( !hex ) return;
	//					if( opacity ) hex += ', ' + opacity;
	//					try {
	//						console.log(hex);
	//					} catch(e) {}
	//				},
					theme: 'bootstrap'
				});

			});
	//		$(".minicolors2").minicolors({ theme: 'bootstrap'});

				
				
				if($(this).attr("Data-background") == "yes") { 
					$(".background").show();
					$("#samplebox").css("background-color", $('#'+ElementtoColor).css("background-color"));
					$("#background").minicolors("value", colorToHex($('#'+ElementtoColor).css("background-color")) );
					if($('#'+ElementtoColor).css("background-color") == "transparent") {
						$("#noback").prop("checked",true); console.log("found transparent"+$('#'+ElementtoColor).css("background-color"));
						$('#'+ElementtoColor).css("background-color","transparent"); 
						
					} else {
						$("#noback").prop("checked",false);console.log("found not transparent"+$('#'+ElementtoColor).css("background-color"));
						
					}
					//console.log("back is disabled");
					//$("#background").minicolors("value", "#ffffff");
				} else { 
					$(".background").hide();
					
				};
				if($(this).attr("Data-textcolor") == "yes") { 
					$(".textcolor").show();
					$("#samplebox").css("color", $('#'+ElementtoColor).css("color"));
					$("#textcolor").minicolors("value", colorToHex($('#'+ElementtoColor).css("color")) );
					//console.log("textcolor enabled");
					//$("#background").minicolors("value", "#ffffff");
				} else { 
				$(".textcolor").hide();
					
				};
				if($(this).attr("Data-border") == "yes") { 
					$(".frame").show();
					$("#samplebox").css("border-color", $('#'+ElementtoColor).css("border-color"));
					$("#frame").minicolors("value", colorToHex($('#'+ElementtoColor).css("border-color")) ); 
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
		 $("#"+ElementtoColor).css("color", hex);
		console.log($("#samplebox").css("color"), " for " + ElementtoColor);
		console.log($("#"+ElementtoColor).css("color"));
		}
		 
	});
	$("#background.minicolors2").minicolors({
		theme: 'bootstrap',
		
		change: function(hex, opacity) {
			var title = $("#myModalLabel").text();
				$("#samplebox").css("background-color", hex);
				if(!$("#noback").prop("checked")){ $("#"+ElementtoColor).css("background-color", hex); }
			
//			console.log($("#myModalLabel").text().match(/back/g));
//			console.log("...."+hex + "....." + opacity);
		}
		 
	});
	$("#frame.minicolors2").minicolors({
		theme: 'bootstrap',
		
		change: function(hex, opacity) {
		 $("#samplebox").css("border-color", hex);
		 var title = $("#myModalLabel").text();
		 $("#"+ElementtoColor).css("border-color", hex);
//			console.log($("#samplebox").css("color"));
//			console.log("...."+hex + "....." + opacity);
		}
		 
	});
		
</script>
	

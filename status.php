<!DOCTYPE html>
<html>
		
	<?php $men=2; include "header.html"; ?>
	
							<li><a href="#" class="SSa rightli"><h4 id="SS"><span>Services Status</span></h4></a></li>
							<li><a href="#" class="Logsa rightli"><h4 id="Logs"><span>Logs</span></h4></a></li>
						</ul>
						<?php include "SS.php" ?>
						<?php include "Logs.php" ?>
					</div>
				</div>
			
			</div>
			<div class="row">
			<div id="Chart"></div>	
			<footer class="footer"> Errors
			</footer>
		</div>
	</div>
	</div>
	<script src='js/jquery.js'></script>
	<script src="js/bootstrap.min.js" ></script>
	<script src='js/bootstrap-datepicker.js'></script>
		<script src="js/bootstrap-timepicker.js"></script>
		<script src='js/jquery.jqplot.min.js'></script>
		<script src='js/excanvas.min.js'></script>
		<script src="js/jqplot.dateAxisRenderer.min.js"></script>
		
		<script>
			var config = 1;
			var objc;
			var deviceobj;
			var dl =[[[0,0]],[[0,0]]];
			var sineRenderer = function() {
				//var data = [[]];
				for (var i=0; i<13; i+=0.5) {
					dl[0].push([i, Math.sin(i)]);
				}
				
				return dl;
			};
			var plot1 = $.jqplot('chart1',dl);
			$("#Stimec").timepicker({
					appendWidgetTo: 'body',
					minuteStep: 1,
					showMeridian: false,
			});

			$("#Stime").timepicker({
								appendWidgetTo: 'body',
                minuteStep: 1,
								showMeridian: false,
			});
			$('.input-daterange').datepicker({
				format: "mm/dd/yyyy",
				weekStart: 6,
				startDate: "1/1/2014",
				todayBtn: "linked",
				keyboardNavigation: false,
				autoclose: true,
				todayHighlight: true
			});
			$(".SS").hide(); $(".Logs").hide(); 
			$("#SS").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/SS.png')").text("Service Status"); $(".SS").show();updatechartarea(); plot1.replot(); };});
			$("#Logs").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/logs.png')").text("Logs");updatelogarea(); $(".Logs").show();};});
			$(".finish").click(function (){ config = 1; $(".SS").hide(); $(".Logs").hide();});
	
	function updatechartarea(){
		var chartarea = "";
		var maxy = 0;
		var miny = 1000000;
		var tm;
		var tm2;
		var qlen=[[]];var rs=[[]];var ws=[[]];var dl=[[]];var bw=[[]];var svct=[[]];
		var seriesarr="";
		$.get("requestdata.php", { file: 'Data/currenttraffic.log' }, function(data){
			objc = jQuery.parseJSON(data);
			var device = "ad0";
			deviceobj= $.grep(objc.device,function(e){return e.name=="ad1"});
			for (var k in deviceobj[0].stats[0].Dates) { 
				for (var y in deviceobj[0].stats[0].Dates[k].times) {
					 tm=new Date ($("#Sdatec").val()+" "+$("#Stimec").val()+":00");  tm2= new Date (deviceobj[0].stats[0].Dates[k].Date+" "+deviceobj[0].stats[0].Dates[k].times[y].time); 
					if(Number(tm-tm2) < 0 && Number(Date.parse($("#Edatec").val()) - Date.parse(deviceobj[0].stats[0].Dates[k].Date)) > 0) {
						if($("#bw").is(":checked")) {
							//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].bw );
							bw[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].bw]);
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].bw) > maxy ) { maxy = Number(deviceobj[0].stats[0].Dates[k].times[y].bw);}
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].bw) < miny ) { miny = Number(deviceobj[0].stats[0].Dates[k].times[y].bw);}
							seriesarr = "bw[0]";
							//dl[0].push([y,y]);
							
							
						};
						if($("#rs").is(":checked")) {
							//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].rs );
							rs[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].rs]);
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].rs) > maxy ) { maxy = Number(deviceobj[0].stats[0].Dates[k].times[y].rs);}
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].rs) < miny ) { miny = Number(deviceobj[0].stats[0].Dates[k].times[y].rs);}
							seriesarr = seriesarr+","+"rs[0]";
							//dl[0].push([y,y]);
						}
						if($("#ws").is(":checked")) {
							//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].ws );
							ws[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].ws]);
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].ws) > maxy ) { maxy = Number(deviceobj[0].stats[0].Dates[k].times[y].ws);}
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].ws) < miny ) { miny = Number(deviceobj[0].stats[0].Dates[k].times[y].ws);}
							seriesarr = seriesarr+","+"ws[0]";
							//dl[0].push([y,y]);
						}
						if($("#svct").is(":checked")) {
							//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].svct );
							svct[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].svct]);
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].svct) > maxy ) { maxy = Number(deviceobj[0].stats[0].Dates[k].times[y].svct);}
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].svct) < miny ) { miny = Number(deviceobj[0].stats[0].Dates[k].times[y].svct);}
							seriesarr = seriesarr+","+"svct[0]";
							//dl[0].push([y,y]);
						}
						if($("#qlen").is(":checked")) {
							//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].qlen );
							qlen[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].qlen]);
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].qlen) > maxy ) { maxy = Number(deviceobj[0].stats[0].Dates[k].times[y].qlen);}
							if ( Number(deviceobj[0].stats[0].Dates[k].times[y].qlen) < miny ) { miny = Number(deviceobj[0].stats[0].Dates[k].times[y].qlen);}
							seriesarr = seriesarr+","+"qlen[0]";
							//dl[0].push([y,y]);
						}

					};
				};
			};
			plot1.destroy();
			maxy = Number(maxy+1); miny = Number(miny -1);
			console.log(miny, maxy);
			console.log(seriesarr);
			plot1 = $.jqplot('chart1',[seriesarr], {seriesDefaults: {
        showMarker:false},axes: {yaxis: {min:miny ,max:maxy}, xaxis:{renderer: $.jqplot.DateAxisRenderer,tickOptions:{formatString:'%b %#d, %#H:%#M'}}},
        series: [
            {
                color: 'rgba(198,88,88,.6)',
                negativeColor: 'rgba(100,50,50,.6)',
                showMarker: false,
                showLine: true,
                fill: false,
                fillAndStroke: false,
                markerOptions: {
                    style: 'filledCircle',
                    size: 8
                },
                rendererOptions: {
                    smooth: true
                }
            }]
      });
		});
		
	}
					
			
			
	
	function updatelogarea(){
		var logarea = "";
		var tm;
		var tm2;
		$("#Logdetails tr.datarow").remove();
		$.get("requestdata.php", { file: 'Data/currentinfo.log' }, function(data){
			var obj = jQuery.parseJSON(data);
			for (var k in obj.Dates) { 
				for (var y in obj.Dates[k].times) {
					 tm=new Date ($("#Sdate").val()+" "+$("#Stime").val()+":00");  tm2= new Date (obj.Dates[k].Date+" "+obj.Dates[k].times[y].time); 
					if(Number(tm-tm2) < 0 && Number(Date.parse($("#Edate").val()) - Date.parse(obj.Dates[k].Date)) > 0) {
						if($("#INFO").is(":checked")) {
							if(obj.Dates[k].times[y].msg == "info") { 
								logarea=logarea+obj.Dates[k].Date+" "+obj.Dates[k].times[y].time+" info: "+obj.Dates[k].times[y].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:blue;"><td class="Volname">'+obj.Dates[k].Date+'</td><td>'+obj.Dates[k].times[y].time+'</td><td>'+obj.Dates[k].times[y].msg+'</td><td>'+obj.Dates[k].times[y].data+'</td></tr>');
								//console.log(Number(Date.parse($("#Stime").val()) - Date.parse(obj.Dates[k].times[y].time))/1000/60/60/24);
							}
						};
						if($("#Warning").is(":checked")) {
							
							if(obj.Dates[k].times[y].msg == "warning") { 
								logarea=logarea+obj.Dates[k].Date+" "+obj.Dates[k].times[y].time+" warning: "+obj.Dates[k].times[y].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:orange;"><td class="Volname">'+obj.Dates[k].Date+'</td><td>'+obj.Dates[k].times[y].time+'</td><td>'+obj.Dates[k].times[y].msg+'</td><td>'+obj.Dates[k].times[y].data+'</td></tr>');
								//console.log(Number(Date.parse($("#Stime").val()) - Date.parse(obj.Dates[k].times[y].time)));
							}
						}
						if($("#Error").is(":checked")) {
							if(obj.Dates[k].times[y].msg == "error") { 
								logarea=logarea+obj.Dates[k].Date+" "+obj.Dates[k].times[y].time+" error: "+obj.Dates[k].times[y].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:red;"><td class="Volname">'+obj.Dates[k].Date+'</td><td>'+obj.Dates[k].times[y].time+'</td><td>'+obj.Dates[k].times[y].msg+'</td><td>'+obj.Dates[k].times[y].data+'</td></tr>');
								
							}
						}
					}
				};
			};
			$("#logsarea").val(logarea);	
		});
	}
		$(".datep").datepicker().on("changeDate",function(e){
			
			if ( Number(Date.parse($("#Edate").val()) - Date.parse($("#Sdate").val()))/1000/60/60/24 > 0) {
				$.post("./pump.php", { req:"LogDateRange", name: $("#Stime").val()+" "+$("#Sdate").val()+" "+$("#Edate").val() }, function (data1){ 
					updatelogarea();											
				});	
			}
		});
		$(".datec").datepicker().on("changeDate",function(e){
					updatechartarea();											
		});
		$(".traffic").change( function () { updatechartarea();});
		$(".checkboxy").change (function(){ updatelogarea();});
		</script>
 
	</body>

</html>

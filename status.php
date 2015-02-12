<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/des19/Login.php');}
 
?>
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
			<div id="chart1"></div>	
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
			var plotflag = 0;
			var config = 1;
			var objc;
			var deviceobj;
			var dl =[[[0,0]],[[0,0]]];
			var plotbw; var plotrs; var plotws; var plotsvct; var plotqlen; var plotdl;
			var traffictime = "55:55:55";
			var sineRenderer = function() {
				//var data = [[]];
				for (var i=0; i<13; i+=0.5) {
					dl[0].push([i, Math.sin(i)]);
				}
				
				return dl;
			};
			
			function refreshList(req,listid,fileloc) {
				$.post("./pump.php", { req: req, name:"a" }, function (data1){
					$(listid+' option').remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							 $(listid).append($('<option>').text(i).val(v)); 
							
						});
					});
				});
			};

//			var plot1 = $.jqplot('chart1',dl);
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
				if(config == 1 ) { 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Service_Charts
							}
						};
						if( userpriv=="true" | curuser=="admin" ) {
							config= 0; $("h2").css("background-image","url('img/SS.png')").text("Service Status"); $(".SS").show();updatechartarea(); 
						} 
					});
				};
			});
			
			$("#Logs").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Logs
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) {
							config = 0; $("h2").css("background-image","url('img/logs.png')").text("Logs");updatelogarea(); $(".Logs").show();
						}
					});
				};
			});
			$(".finish").click(function (){ config = 1; $(".SS").hide(); $(".Logs").hide();});
	
	function updatechartarea(){
		var chartarea = "";
		var maxy = 0;var bwmaxy = 0;var rsmaxy = 0;var wsmaxy = 0;var svctmaxy = 0;var qlenmaxy = 0; var totalio = 0;
		var miny = 1000000;var bwminy = 1000000;var rsminy = 1000000;var wsminy = 1000000;var svctminy = 1000000;var qlenminy = 1000000;
		var tm;
		var tm2;
		
		var qlen=[[]];var rs=[[]];var ws=[[]];var dl=[[]];var bw=[[]];var svct=[[]];
		var seriesarr="";
		$.get("requestdate.php", { file: 'Data/currenttraffic.log' }, function(data){
			var objdate = jQuery.parseJSON(data);
			trafficnewtime=objdate.timey;
		//	console.log("timey",trafficnewtime);
			
		});
		
		if(traffictime==trafficnewtime) { //console.log("traffic not changed"); 
		} else { 
			//console.log ("traffic changed"); 
			traffictime=trafficnewtime; 
			$.get("requestdata.php", { file: 'Data/currenttraffic.log' }, function(data){
				objc = jQuery.parseJSON(data);
				var device = $("#Disks").val();
				deviceobj= $.grep(objc.device,function(e){return e.name==device});
				for (var k in deviceobj[0].stats[0].Dates) { 
					for (var y in deviceobj[0].stats[0].Dates[k].times) {
							
						 tm=new Date ($("#Sdatec").val()+" "+$("#Stimec").val()+":00");  tm2= new Date (deviceobj[0].stats[0].Dates[k].Date+" "+deviceobj[0].stats[0].Dates[k].times[y].time); 
						if(Number(tm-tm2) < 0 && Number(Date.parse($("#Edatec").val()) - Date.parse(deviceobj[0].stats[0].Dates[k].Date)) > 0) {
								//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].bw );
								bw[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].bw]);
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].bw) > bwmaxy ) { bwmaxy = Number(deviceobj[0].stats[0].Dates[k].times[y].bw);}
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].bw) < bwminy ) { bwminy = Number(deviceobj[0].stats[0].Dates[k].times[y].bw);}
								
								//dl[0].push([y,y]);
								//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].rs );
								rs[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].rs]);
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].rs) > rsmaxy ) { rsmaxy = Number(deviceobj[0].stats[0].Dates[k].times[y].rs);}
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].rs) < rsminy ) { rsminy = Number(deviceobj[0].stats[0].Dates[k].times[y].rs);}
								//dl[0].push([y,y]);
						
								//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].ws );
								ws[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].ws]);
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].ws) > wsmaxy ) { wsmaxy = Number(deviceobj[0].stats[0].Dates[k].times[y].ws);}
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].ws) < wsminy ) { wsminy = Number(deviceobj[0].stats[0].Dates[k].times[y].ws);}
								//dl[0].push([y,y]);
					
								//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].svct );
								svct[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].svct]);
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].svct) > svctmaxy ) { svctmaxy = Number(deviceobj[0].stats[0].Dates[k].times[y].svct);}
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].svct) < svctminy ) { svctminy = Number(deviceobj[0].stats[0].Dates[k].times[y].svct);}
								//dl[0].push([y,y]);
								//console.log(k,y,tm2,deviceobj[0].stats[0].Dates[k].times[y].qlen );
								qlen[0].push([tm2, deviceobj[0].stats[0].Dates[k].times[y].qlen]);
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].qlen) > qlenmaxy ) { qlenmaxy = Number(deviceobj[0].stats[0].Dates[k].times[y].qlen);}
								if ( Number(deviceobj[0].stats[0].Dates[k].times[y].qlen) < qlenminy ) {qlenminy = Number(deviceobj[0].stats[0].Dates[k].times[y].qlen);}
								//dl[0].push([y,y]);

								totalio= Number(deviceobj[0].stats[0].Dates[k].times[y].rs ) + Number (deviceobj[0].stats[0].Dates[k].times[y].ws);
								if ( totalio > maxy ) { maxy = totalio;}
								if ( totalio < miny ) { miny = totalio;}
								dl[0].push([tm2,totalio]);
						};
					};
				};
				if(plotflag > 0) { plotbw.destroy();plotrs.destroy();plotws.destroy();plotsvct.destroy();plotqlen.destroy();plotdl.destroy(); };
				//plotbw.destroy();
			
				bwmaxy = Number(bwmaxy+1); bwminy = Number(bwminy -1);rsmaxy = Number(rsmaxy+1); rsminy = Number(rsminy -1);
				wsmaxy = Number(wsmaxy+1); wsminy = Number(wsminy -1);svctmaxy = Number(svctmaxy+1); svctminy = Number(svctminy -1);
				qlenmaxy = Number(qlenmaxy+1); qlenminy = Number(qlenminy -1);
			//	plotbw.destroy();
				var sercolr="#455B5B";
				console.log("plotting");
				plotbw = $.jqplot('bwchart',[bw[0]], {
					title: "Bandwidth",
					seriesDefaults: {
					showMarker:false},axes: {yaxis: {min:bwminy ,max:bwmaxy}, xaxis:{renderer: $.jqplot.DateAxisRenderer,tickOptions:{formatString:'%b %#d, %#H:%#M'}}},
					series: [
							{
									color: sercolr,
								//	negativeColor: 'rgba(100,50,50,.6)',
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
				plotrs = $.jqplot('rschart',[rs[0]], {
					title: "Read IO/s",
					seriesDefaults: {
					showMarker:false},axes: {yaxis: {min:rsminy ,max:rsmaxy}, xaxis:{renderer: $.jqplot.DateAxisRenderer,tickOptions:{formatString:'%b %#d, %#H:%#M'}}},
					series: [
							{
									color: sercolr,
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
				plotws = $.jqplot('wschart',[ws[0]], {
					title: "Write IO/s",
					seriesDefaults: {
					showMarker:false},axes: {yaxis: {min:wsminy ,max:wsmaxy}, xaxis:{renderer: $.jqplot.DateAxisRenderer,tickOptions:{formatString:'%b %#d, %#H:%#M'}}},
					series: [
							{
									color: sercolr,
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
				plotsvct = $.jqplot('svctchart',[svct[0]], {
					title: "Latency ms",
					seriesDefaults: {
					showMarker:false},axes: {yaxis: {min:svctminy ,max:svctmaxy}, xaxis:{renderer: $.jqplot.DateAxisRenderer,tickOptions:{formatString:'%b %#d, %#H:%#M'}}},
					series: [
							{
									color: sercolr,
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
				plotqlen = $.jqplot('qlenchart',[qlen[0]], {
					title: "Queue length",
					seriesDefaults: {
		showMarker:false},axes: {yaxis: {min:qlenminy ,max:qlenmaxy}, xaxis:{renderer: $.jqplot.DateAxisRenderer,tickOptions:{formatString:'%b %#d, %#H:%#M'}}},
		series: [
				{
						color: sercolr,
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
				plotdl = $.jqplot('totaliochart',[dl[0]], {
					title: "Total IO/s",
					seriesDefaults: {
					showMarker:false},axes: {yaxis: {min:miny ,max:maxy}, xaxis:{renderer: $.jqplot.DateAxisRenderer,tickOptions:{formatString:'%b %#d, %#H:%#M'}}},
					series: [
							{
						color: sercolr,
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
				plotflag = 1;
			});
		}
	}
					
			
			
	
	function updatelogarea(){
		var logarea = "";
		var tm;
		var tm2;
		$("#Logdetails tr.datarow").remove();
		$.get("requestdata.php", { file: 'Data/currentinfo2.log' }, function(data){
			var obj = jQuery.parseJSON(data);
			for (var k in obj) { 
					 tm=new Date ($("#Sdate").val()+" "+$("#Stime").val()+":00");  tm2= new Date (obj[k].Date+" "+obj[k].time); 
					if(Number(tm-tm2) < 0 && Number(Date.parse($("#Edate").val()) - Date.parse(obj[k].Date)) > 0) {
						if($("#INFO").is(":checked")) {
							if(obj[k].msg == "info") { 
								logarea=logarea+obj.Date+" "+obj[k].time+" info: "+obj[k].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:blue;"><td class="Volname">'+obj[k].Date+' '+obj[k].time+'</td><td>'+obj[k].user+'</td><td>'+obj[k].data+'</td></tr>');
								//console.log(Number(Date.parse($("#Stime").val()) - Date.parse(obj.Dates[k].times[y].time))/1000/60/60/24);
							}
						};
						if($("#Warning").is(":checked")) {
							
							if(obj[k].msg == "warning") { 
								logarea=logarea+obj[k].Date+" "+obj[k].time+" warning: "+obj[k].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:orange;"><td class="Volname">'+obj[k].Date+' '+obj[k].time+'</td><td>'+obj[k].user+'</td><td>'+obj[k].data+'</td></tr>');
								//console.log(Number(Date.parse($("#Stime").val()) - Date.parse(obj.Dates[k].times[y].time)));
							}
						}
						if($("#Error").is(":checked")) {
							if(obj[k].msg == "error") { 
								logarea=logarea+obj[k].Date+" "+obj[k].time+" error: "+obj[k].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:red;"><td class="Volname">'+obj[k].Date+' '+obj[k].time+'</td><td>'+obj[k].user+'</td><td>'+obj[k].data+'</td></tr>');
								
							}
						}
					}
				
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
					traffictime="44:44:34";updatechartarea();											
		});
		$(".traffic").change( function () { traffictime="44:44:34"; updatechartarea();});
		$(".checkboxy").change (function(){ updatelogarea();});
		refreshList("GetDisklist","#Disks","Data/disklist.txt");
		setInterval('updatechartarea()', 1000); // Loop every 1000 milliseconds (i.e. 1 second)
		console.log("<?php print $_REQUEST["idd"]; print session_id(); ?>");
		
		</script>
 
	</body>

</html>

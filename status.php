<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
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
			var msgdata= "no no no";
			var msgs="no data";
			var datalogf = [];
			var betweend = [];
			var oldSdatec="1"; var oldEdatec="2";
			var newSdatec="3"; var newEdatec="4";
			var datemod="";
			var plotflag = 0;
			var config = 1;
			var disktime="23:3434:34534";
			var disktimenew="34543:43543:34";
			var logtime=[]; var logtimenew="34543:43543:34";
			var dl =[[[0,0]],[[0,0]]];
			var plotpls=[[0,0]]; var plotrs; var plotws; var plotsvct; var plotqlen; var plotdl;
			var traffictime = "55:55:55";
			var trafficnewtime = "new 3444"
			var logstatus=[];
			var logcache=3;
			var obj=[];
			var disksval="hi"
			var dater;
			var dater2;
			var statsdata="initial";
			var page=0;
			var reqpage=0;
			var activepage=0; var lastpage=-1;
			
			var sineRenderer = function() {
				//var data = [[]];
				for (var i=0; i<13; i+=0.5) {
					dl[0].push([i, Math.sin(i)]);
				}
				
				return dl;
			};
			function searchmsg (strarr,str) {
				for (var j=0; j< strarr.length; j++) {
					if (strarr[j].match(str)) return j;
				};
				return -1;
			};
			
			$.ajax({
				url : "Data/msgs.txt",
				dataType: "text",
				success : function (data) {
					
					 msgdata=data;
					msgs=msgdata.split("\n");
						}
				});
			
			function refreshList(req,listid,fileloc) {
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					disktimenew=cdata.updated;
				});
				if(disktimenew!=disktime)
				{ 
					disktime=disktimenew;
					$(listid+' option').remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						//console.log(data);
						
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							 $(listid).append($('<option>').text(i).val(v)); 
							
						});
					});
				}
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
			$("#lines").click(function(){
				logstatus=[];
				$("#Logdetails tr.datarow").remove();
				page=0; activepage=0; lastpage=-1
				for (var i=0; i<logcache; i+=1) {
						    updatelogarea(i); 
								logstatus[i]=10;
								logtime[i]="3434TREYLKTRJ";		
							}
			});
			$("#pnext").click(function(){  
				activepage=activepage+1;
				logstatus[activepage]=50;
				logstatus[logstatus.length]=10;
			});
			$("#pprev").click(function(){  
				if (activepage > 0 ) { activepage = activepage-1; logstatus[activepage]=50 }
				
			});
			$("#refresh").click(function(){ 
				$("#Logdetails tr.datarow").remove();
				activepage=0; page=0; lastpage=-1
				logstatus=[];
				for (var i=0; i<logcache; i+=1) {
						    updatelogarea(i); 
								logstatus[i]=10;
								logtime[i]="3434TREYLKTRJ";		
							}
			});
			$("#INFO").click(function() {
				$(".datarow").hide();
				if($("#INFO").is(":checked")) { $(".info").show(); }
				if($("#Warning").is(":checked")) { $(".warning").show(); }
				if($("#Error").is(":checked")) { $(".error").show(); }
			});
			$("#Warning").click(function() {
				$(".datarow").hide();
				if($("#INFO").is(":checked")) { $(".info").show(); }
				if($("#Warning").is(":checked")) { $(".warning").show(); }
				if($("#Error").is(":checked")) { $(".error").show(); }
			});
			$("#Error").click(function() {
				$(".datarow").hide();
				if($("#INFO").is(":checked")) { $(".info").show(); }
				if($("#Warning").is(":checked")) { $(".warning").show(); }
				if($("#Error").is(":checked")) { $(".error").show(); }
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
						   
					   for (var i=0; i<logcache; i+=1) {
						    updatelogarea(i); 
								logstatus[i]=10;				
							}
					
						
							
						    config = 0; $("h2").css("background-image","url('img/logs.png')").text("Logs"); $(".Logs").show();
						}
					});
				};
			});
			$(".finish").click(function (){ 
				for (var i=0; i<logcache; i+=1) { logstatus[i]=0 } config = 1; $(".SS").hide(); $(".Logs").hide();});
	function refreshall() {
		
		$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
		refreshList("GetDisklist","#Disks","Data/disklist.txt");
		if (config == 0) {
			var date2
			if( $("#dater2").val() == "") { 
				date2 = new Date
				$("#dater2").val(date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + ("0" + (date2.getDate() + 0)).slice(-2))
			} 			
			dater2=new Date($("#dater2").val())
			dater2=dater2.getFullYear() + ("0" + (dater2.getMonth() + 1)).slice(-2) +  ("0" + (dater2.getDate() + 0)).slice(-2)
			chartplease(dater2);
			
		
		}
		
		if (logstatus[0] > 0) {
			var date
			if( $("#dater").val() == "") { 
				date = new Date
				$("#dater").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2)) 
			} 			
			dater=Date.parse($("#dater").val())
	
			for (var i=0; i< logstatus.length; i+=1) { 
				console.log("page:",page," logstatus:"," ",logstatus," activepage:",activepage," lastpage:",lastpage," obj:",obj)
				updatelogarea(i);
				presentlog(i);
				if(logstatus[i]==10) { 
					logstatus[i]=11; 
					 $.post("./pump.php", { req:"GetLog", name: dater+' '+i+' '+$("#lines").val()+' '+"<?php echo $_SESSION["user"]; ?>"},function(){}); 
				//console.log(logstatus)
				//console.log("GetLog"+dater+' '+reqpage+' '+$("#lines").val()+' '+i)
				}
				if ( logstatus[i] > 10 ) { ; ; logstatus[i]++ }
				if ( logstatus[i] > 30 ) { 
					if (i > obj.length) { logstatus.pop(1); i = lastpage; activepage=lastpage
					}
					logstatus[i]=1;
					if (i == activepage) { 
						lastpage=activepage; 
					}
				
				}
			
			updatechartarea();
			}
			
		}
	}
	function chartplease(datern) {
		$.get("requestdate.php", { file: 'Data/ctr.log' }, function(data){
				var objdate = jQuery.parseJSON(data);
				trafficnewtime=objdate.timey;
		});
		if( traffictime == trafficnewtime ) { //console.log("traffic not changed");
			$.get("requeststats.php", { date: datern, time: plotpls[0][0] });
		} 
		else {
			traffictime = trafficnewtime 			
			$.get("requestdata.php", { file: 'Data/ctr.log' }, function(data){

				datalogf = jQuery.parseJSON(data)
						var xax=[]; var yax=[];
						var data = [[]];
						for (var i=0; i<50; i++) {
							plotpls[0].push([datalogf[i].time,datalogf[i].cpu]);
							xax.push(datalogf[i].time); yax.push(datalogf[i].cpu);
						}
						//console.log("max yax:"+Math.max.apply(null,yax)+" "+Math.min.apply(null,yax));
						//console.log("max xax:"+Math.max.apply(null,xax)+" "+Math.min.apply(null,xax));	
						drawnow("CPU","CPU Utilization %",Math.min.apply(null,yax),Math.max.apply(null,yax),0);
			});
		}
	}
	function drawnow(name,title,miny,maxy,series) {
  // we have an empty data array here, but use the "dataRenderer"
  // option to tell the plot to get data from our renderer.
			  var plot1 = $.jqplot(name,[plotpls[series]],{
				  title: title,
				  seriesDefaults: {
							  rendererOptions: {
								  smooth: true
							  },
							  showMarker: false,
				   },
				  axesDefaults: {
					rendererOptions: {
								baselineWidth: 1.5,
								baselineColor: '#444444',
								drawBaseline: false
							},
						
					},
				  axes:{
					xaxis:{
						renderer:$.jqplot.DateAxisRenderer,
						  tickOptions:{formatString:'%H:%M:%S'},
						  tickInterval:'60 second'
						},
					yaxis: {
						min: miny,
						max: maxy,
						 
						},
					}	
					
			  });
				
	}
	
	function updatechart(){
		$.get("requestdate.php", { file: 'Data/ctr.logudupated' }, function(data){
				var objdate = jQuery.parseJSON(data);
				trafficnewtime=objdate.timey;
		});
		if( traffictime == trafficnewtime ) { //console.log("traffic not changed"); 
		} 
		else {
			$.get("requestdata.php", { file: 'Data/ctr.log' }, function(data){
							
				datalogf = jQuery.parseJSON(data)
				for (i=0; i<100; i++) {
					plotpls.push("50");
				}
				
			});
	
		} 
	}
	
	
	
	function updatelogarea(ii){
		
		var tm, splitstime;
		var tm2; var tme, splitstimee;
		var rqpg
		rqpg=ii+page
      
		$.get("requestdate.php", { file: 'Data/Logs.logupdated'+rqpg }, function(data){
			var objdate = jQuery.parseJSON(data);
			logtimenew=objdate.timey;
		});
		if(logtimenew!=logtime[ii] ) {
			$.get("requestdata.php", { file: 'Data/Logs.log'+rqpg}, function(data){
			console.log("Data/Logs.log"+ii+" obj ")
			obj[ii] = jQuery.parseJSON(data);
			});
		}
	}
	function presentlog(ii) {
		var logarea = "";
		config=1;
		logtime[ii]=logtimenew;
		if(lastpage!=activepage && ii==activepage) {$("#Logdetails tr.datarow").remove();}
		if( lastpage!=activepage && ii==activepage) {
				for (var k in obj[ii]) { 
						
							var objdata=obj[ii][k].data;
							var codes; var msgcode; var jofcode; var themsg; var themsgarr;
							if(typeof obj[ii][k].code != 'undefined'){
								codes=obj[ii][k].code.split("@");
								msgcode=codes[0];
								jofcode=0;
								jofcode=searchmsg(msgs,msgcode);
								//console.log("jofcode",jofcode);
								themsg=msgs[jofcode];
								themsgarr=themsg.split(":");
								codes.push(".");
								objdata=""
								for (i=1; i < themsgarr.length ;i++) {
									 objdata=objdata+themsgarr[i]+" "+codes[i]+" ";
								 }
								//console.log("codes",codes);
								//console.log("themsgarr",themsgarr);
							}
							logarea=logarea+obj[ii][k].Date+" "+obj[ii][k].time+" "+obj[ii][k].msg+": "+objdata+obj[ii][k].code+"\n";
							if(obj[ii][k].msg == "info") { color="blue"}; if(obj[ii][k].msg == "warning") { color="yellow"}; if(obj[ii][k].msg == "error") { color="red"}
							
							$("#Logdetails").append('<tr class="datarow '+obj[ii][k].msg+'" style="color:'+color+';"><td class="Volname col/-sm-3"data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >' +obj[ii][k].Date+' '+obj[ii][k].time+'</td><td class="col-sm-1" data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >'+obj[ii][k].user+'</td><td class="col-sm-7"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >'+objdata+'</td></tr>');
							
										$("#INFO").click();			$("#INFO").click();
							
						
					
				};
			}
			//$("#logsarea").val(logarea);	
			$("td").css("padding","0.1rem");
			//$('[data-toggle="popover"]').popover({ placement: "bottom",html: false,
              //      animation: false,});
	}
		
	

		$(".datec").datepicker().on("changeDate",function(e){
					traffictime="44:44:34";updatechartarea();											
		});
		$(".timec").change(function(){
					traffictime="44:44:34";updatechartarea();											
		});
$("#Disks").change(function(){
			traffictime="disk changes";updatechartarea();
		});
		$(".traffic").change( function () { traffictime="44:44:34"; updatechartarea();});
		$(".checkboxy").change (function(){ updatelogarea();});
		refreshList("GetDisklist","#Disks","Data/disklist.txt");
		$.post("./pump.php", { req:"GetDisklist", name: "Data/disklist.txt"},function(){});
		setInterval('refreshall()', 500); // Loop every 1000 milliseconds (i.e. 1 second)
		//console.log("<?php print $_REQUEST["idd"]; print session_id(); ?>");
		
		$('[data-toggle="popover"]').popover({
										html: true,
                    animation: false,
                    content: "TO BE ANNOUNCED",
                    placement: "bottom"
			
			
			});
			

		for (var i=0; i<logcache; i+=1) {
					logstatus[i]=0; logtime[i]="ksldl";
				}
				
		
		</script>
 
	</body>

</html>

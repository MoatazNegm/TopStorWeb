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
				
			<footer class="footer"> Errors
			</footer>
		</div>
	</div>
	</div>
	<script src='js/jquery.js'></script>
	<script src="js/bootstrap.min.js" ></script>
	<script src='js/bootstrap-datepicker.js'></script>
	
		
		<script src="js/bootstrap-timepicker.js"></script>
		
		
		<script>
			var config = 1;
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
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/SS.png')").text("Service Status"); $(".SS").show(); };});
			$("#Logs").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/logs.png')").text("Logs"); $(".Logs").show();};});
			$(".finish").click(function (){ config = 1; $(".SS").hide(); $(".Logs").hide();});
						
			var d1 = [];
			for (var i = 0; i < 14; i += 0.5) {
				d1.push([i, Math.sin(i)]);
			};
		
			
	/*		$.plot("#placeholder", [{
			data: d1,
			lines: { show: true, fill: false }
		}]);

	*/
	function updatelogarea(){
		var logarea = "";
		var tm;
		var tm2;
		$("#Logdetails tr.datarow").remove();
		$.get("requestdata.php", { file: 'Data/currentinfo.log' }, function(data){
			var obj = jQuery.parseJSON(data);
			for (var k in obj.Dates) { 
				for (var y in obj.Dates[k].times) {
					 tm=new Date ($("#Sdate").val()+" "+$("#Stime").val()+":00");  tm2= new Date (obj.Dates[k].Date+" "+obj.Dates[k].times[y].time); console.log(Number(tm-tm2)/1000/60)
					if(Number(tm-tm2) < 0 && Number(Date.parse($("#Edate").val()) - Date.parse(obj.Dates[k].Date)) > 0) {
						if($("#INFO").is(":checked")) {
							if(obj.Dates[k].times[y].msg == "info") { 
								logarea=logarea+obj.Dates[k].Date+" "+obj.Dates[k].times[y].time+" info: "+obj.Dates[k].times[y].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:blue;"><td class="Volname">'+obj.Dates[k].Date+'</td><td>'+obj.Dates[k].times[y].time+'</td><td>'+obj.Dates[k].times[y].msg+'</td><td>'+obj.Dates[k].times[y].data+'</td></tr>');
								console.log(Number(Date.parse($("#Stime").val()) - Date.parse(obj.Dates[k].times[y].time))/1000/60/60/24);
							}
						};
						if($("#Warning").is(":checked")) {
							
							if(obj.Dates[k].times[y].msg == "warning") { 
								logarea=logarea+obj.Dates[k].Date+" "+obj.Dates[k].times[y].time+" warning: "+obj.Dates[k].times[y].data+"\n";
								$("#Logdetails").append('<tr class="datarow" style="color:orange;"><td class="Volname">'+obj.Dates[k].Date+'</td><td>'+obj.Dates[k].times[y].time+'</td><td>'+obj.Dates[k].times[y].msg+'</td><td>'+obj.Dates[k].times[y].data+'</td></tr>');
								console.log(Number(Date.parse($("#Stime").val()) - Date.parse(obj.Dates[k].times[y].time)));
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
		$(".checkboxy").change (function(){ updatelogarea();});
		</script>
 
	</body>

</html>

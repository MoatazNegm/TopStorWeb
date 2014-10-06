<!DOCTYPE html>
<html>
	<?php $men= 5; include "header.html"; ?>
	
							<li><a href="#" class="DiskGroupa rightli"><h4 id="DiskGroups"><span>Disk Groups</span></h4></a></li>
							<li><a href="#" class="SnapShotsa rightli"><h4 id="SnapShots"><span>SnapShots</span></h4></a></li>
						</ul>
						<?php include "DiskGroups.php"; ?>
						<?php include "SnapShots.php" ; ?>
					</div>
				</div>
			</div>
			
		<div class="row">
			<footer class="footer"> Errors
			</footer>
		</div>
		<script src="jquery/jquery.js"></script>
		<script src="jquery-ui/jquery-ui.js"></script>
		<script src="jquery/jquery.datetimepicker.js"></script>
		<script src="Bootstrap/js/bootstrap.min.js"></script>
		<script>
			function refreshList(req,listid,fileloc,show) {
				$.post("./pump.php", { req: req, name:"a" }, function (data1){
					$(listid+' option').remove();
					$.get("statuslog.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							if(show < 2) { $(listid).append($('<option>').text(i+":"+v).val(v));}
							else { $(listid).append($('<option>').text(v).val(v)); }
						});
					});
				});
			};
			function refresh2(textareaid) {
				
				$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$(textareaid).val(data);
					});
			}	;
			setInterval('refresh2("#statusarea2")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			setInterval('refresh2("#statusarea3")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			setInterval('refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt",1)', 10000); // Loop every 1000 milliseconds (i.e. 1 second)
			setInterval('refreshList("GetPoolHourlylist","#Hourlylist","Data/Hourlylist.txt")', 10000); // Loop every 1 second
			setInterval('refreshList("GetPoolMinutelylist","#Minutelylist","Data/Minutelylist.txt")', 10000); // Loop every 1 second
			setInterval('refreshList("GetPoolWeeklylist","#Weeklylist","Data/Weeklylist.txt")', 10000); // Loop every 1 second
			
			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".DiskGroups").hide(); $(".SnapShots").hide(); 
			$("#DiskGroups").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); $(".DiskGroups").show(); };});
			$("#SnapShots").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/snapshot.png')").text("SnapShots"); $(".SnapShots").show();};});
			$(".finish").click(function (){ config = 1; $(".DiskGroups").hide(); $(".SnapShots").hide();});
			
			$("#DTime").datetimepicker({step: 15});
			$("#STime").datetimepicker({step: 15});$("#Hour").datetimepicker({ datepicker: false, format:'H'});
			$("#SMinute").datetimepicker({step: 15});$("#Minute").datetimepicker({ datepicker: false, format:'i', step:2});
			$("#SWeek").datetimepicker({step: 15});
			
			$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
			$("#Once").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Onceset").show();
			});
			$("#Hourly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();$("#SWeek").datetimepicker("hide");
				$("#Hourlyset").show();
			});
			$("#Minutely").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();$("#SWeek").datetimepicker("hide");
				$("#Minutelyset").show();
			});
			$("#Weekly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Weeklyset").show();
			})
		function diskgetsize(no,spanid,fileloc) {
			$.post("./pump.php", { req:"DiskSize", name: no, passwd:fileloc }, function(data1){
				$.get("statuslog.php", { file: fileloc }, function(data){
					var jdata = jQuery.parseJSON(data);
					
					$.each(jdata, function(i,v) {
					//console.log(i,v);
						$(spanid).text(i);
					});
				});
					
			});
		};
		function disksraidzsize(spanid,fileloc) {
			$.post("./pump.php", { req:"DiskraidzSize", name: fileloc }, function(data1){
				$.get("statuslog.php", { file: fileloc }, function(data){
					var jdata = jQuery.parseJSON(data);
					
					$.each(jdata, function(i,v) {
					//console.log(i,v);
						$(spanid+i).text(v);
					});
				});
					
			});
		};
		
		diskgetsize("1","#onedisk",'Data/disksize.txt');
		diskgetsize("5","#alldisks",'Data/disksizeall.txt');
		refreshList("GetPoollist","#Pool","Data/Poollist.txt",3);
		refreshList("GetPoolVollist","#Vol","Data/Vollist.txt",3);
		
		
		
		disksraidzsize("#Raidz",'Data/diskraidz.txt');
		$("#submitdiskgroup").click( function (){ $.post("./pump.php", { req:"DGsetPool", name:$('input[name=Raidselect]:checked').val() }, function (data){
				 refresh2("#statusarea2"); 
				 });
			});
		$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotDelete", name:$("#Snaplist option:selected").val() }, function (data){
				 refresh2("#statusarea3"); 
				 });
			});
		$("#DeleteHourly").click( function (){ $.post("./pump.php", { req:"SnapShotHourlyDelete", name:$("#Hourlylist option:selected").val() }, function (data){
				 refresh2("#statusarea3"); 
				 });
			});
		$("#DeleteMinutely").click( function (){ $.post("./pump.php", { req:"SnapShotMinutelyDelete", name:$("#Minutelylist option:selected").val() }, function (data){
				 refresh2("#statusarea3"); 
				 });
			});
		$("#DeleteWeekly").click( function (){ $.post("./pump.php", { req:"SnapShotWeeklyDelete", name:$("#Weeklylist option:selected").val() }, function (data){
				 refresh2("#statusarea3"); 
				 });
			});
		$("#SnapshotCreate").click( function (){ 
				var period=$('input[name=Period]:checked').val();
				console.log(period);
				var oper="";
				switch(period) {
					case "Once" : oper = $("#DTime").val(); break;
					case "Hourly": oper = $("#STime").val()+" "+$("#Hour").val(); break;
					case "Minutely": oper = $("#SMinute").val()+" "+$("#Minute").val(); break;
					case "Weekly" : oper = $("#SWeek").val()+" "+$("#Week").val(); break;
				}
				console.log(oper);
				$.post("./pump.php", { req:"SnapshotCreate"+period, name: oper }, function (data){
				 refresh2("#statusarea3"); 
				 });
			});	
		</script>

	</body>

</html>

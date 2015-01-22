<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id()) {  header('Location:/des19/Login.php');}

?>
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
			
		
		<script src="js/bootstrap-timepicker.js"></script>
		
		<script>
			var status=0;
			function snaponce(txtin,but,altbut){
				
						var chars=$(txtin).val().length;
						//console.log(txtin, but, altbut, chars);
						if ( chars < 3 ) {  $(but).show();
												 $(altbut).hide();
						} else 					{	$(but).hide();
												 $(altbut).show();
						};
			};
			
			function refreshall() {
				if(status=1) { //DiskGroup
				diskgetsize('Data/disksize.txt','#size',"#count","#onedisk");
				
				}
			}	;
			
			
			function refreshList(req,listid,fileloc,show) {
				$.post("./pump.php", { req: req, name:"a" }, function (data1){
					$(listid+' option').remove();
					$.get("statuslog.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							if(show < 2) { $(listid).append($('<option>').text(i).val(v));}
							else if(show < 10 ){ $(listid).append($('<option>').text(v).val(v)); }
							else if(show < 13) { $(listid).append($('<option>').text(i+":"+v).val(i)); }
							else { $(listid).append($('<option>').text(i).val(i)); }
						});
					});
				});
			};
			function refresh2(textareaid) {
				
				$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$(textareaid).val(data);
					});
			}	;
			//setInterval('refresh2("#statusarea2")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refresh2("#statusarea3")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt",12)', 10000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refreshList("GetPoolHourlylist","#Hourlylist","Data/Hourlylist.txt",5)', 10000); // Loop every 1 second
			//setInterval('refreshList("GetPoolMinutelylist","#Minutelylist","Data/Minutelylist.txt",5)', 10000); // Loop every 1 second
			//setInterval('refreshList("GetPoolWeeklylist","#Weeklylist","Data/Weeklylist.txt",5)', 10000); // Loop every 1 second
			
			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".DiskGroups").hide(); $(".SnapShots").hide(); 
			$("#DiskGroups").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".DiskGroups").show(); };});
			$("#SnapShots").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/snapshot.png')").text("SnapShots"); status=2;$(".SnapShots").show();};});
			$(".finish").click(function (){ config = 1; status=0; $(".DiskGroups").hide(); $(".SnapShots").hide();});
			
			
			
			$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
			$("#Once").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Onceset").show(); snaponce("#Oncename","#disableddiv","#SnapshotCreatediv");
			});
			$("#Hourly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Hourlyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Minutely").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Minutelyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Weekly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Weeklyset").show();$("#SnapshotCreatediv").show();
			})
		function diskgetsize(fileloc,spanid1,spanid2,spanid3) {
			$.post("./pump.php", { req:"DiskSize", name:fileloc }, function(data1){
				$.get("requestdata.php", { file: fileloc }, function(data){
					var jdata = jQuery.parseJSON(data);
					$(spanid1).text(jdata.size);$(spanid2).text(jdata.count);$(spanid3).text(jdata.onedisk);
					$("#R10").text(jdata.R10);$("#R5").text(jdata.R5);$("#R6").text(jdata.R6);
					
				});
					
			});
		};
				
		
		refreshList("GetPoollist","#Pool","Data/Poollist.txt",3);
		refreshList("GetPoolVollist","#Vol","Data/Vollist.txt",5);

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
				
				var oper="";
				switch(period) {
					case "Once" : oper = $("#Oncename").val();  break;
					case "Hourly": oper = $("#Sminute").val()+" "+$("#Hour").val()+" "+$("#KeepHourly").val(); break;
					case "Minutely": oper = $("#Minute").val()+" "+$("#KeepMinutely").val(); break;
					case "Weekly" : oper = $("#Stime").val()+" "+$("#Week").val()+" "+$("#KeepWeekly").val(); break;
				}
				oper =oper+" "+$("#Pool option:selected").val()+" "+$("#Vol option:selected").val();
				
				$.post("./pump.php", { req:"SnapshotCreate"+period, name: oper }, function (data){
				 refresh2("#statusarea3"); 
				 });
			});
		
		$("#Oncename").keyup(function(){
				snaponce("#Oncename","#disableddiv","#SnapshotCreatediv");
		});
			
			$("#Stime").timepicker({
								appendWidgetTo: 'body',
                minuteStep: 1,
								showMeridian: false,

            });
            
			setInterval("refreshall()",1000);
		</script>

	</body>

</html>

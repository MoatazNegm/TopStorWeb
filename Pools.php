<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
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
			var Vollisttime="44:333:222";
			var times= { "snaps":"30:43:433", "periods":"30:43:433" };
			var requiredtime={ "snaps":"33==:433", "periods":"30==erwe:43:433" }
			var Vollisttimenew="23:434:34543";
			var status=0;
			var syscounter=10;
			var syscounter2=1000;
			var pools=[];
			$("#deletePool").hide();$("#submitdiskgroup").hide();
			
			function refreshList3(request,listid,fileloc) {
				if(syscounter2==1000) { $.post("./pump.php", { req: request, name:"a" }); }
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;

				});
				if(Vollisttime==Vollisttimenew) { 
				} else { 
					Vollisttime=Vollisttimenew;
					
					$(listid+" option.vvariable").remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var gdata = jQuery.parseJSON(data);
						$(listid+" option.vvariable").remove();
						$("#Pool option.variable2").remove();
						chartdata=[];
						for (var prot in gdata){
							if ($.inArray(gdata[prot].Pool,pools) < 0 ) {
										pools.push(gdata[prot].Pool);
										$("#Pool").append($('<option class="variable2">').text(gdata[prot].uPool).val(gdata[prot].class));
										chartdata.push(gdata[prot].class);
										//chartdata[gdata[prot].class]=[];
							}
							$(listid).append($('<option class="vvariable '+gdata[prot].class+'">').text(gdata[prot].name).val(gdata[prot].name));
							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
						
						}
						$("#Pool").change()
							pools = [];
					});
				}
			};

			function snaponce(txtin,but,altbut){
				
						var chars=$(txtin).val().length;
						
						if ( chars < 3 ) {  $(but).show();
												 $(altbut).hide();
						} else 					{	$(but).hide();
												 $(altbut).show();
						};
			};
			
			function refreshall() { //check pool status
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
				if(status==3) { 
					$.post("./pump.php", { req:"DGPoolstatus" });
					$.get("requestdata.php", { file: "Data/poolstatus.txt" },function(data){
						var jdata = jQuery.parseJSON(data);	
						if(jdata.status=="ok") {
							$("#"+jdata.raid).attr("checked","checked");
							$(".radiocontrol").attr("disabled",true);
							$("#deletePool").show();$("#submitdiskgroup").hide();
						} else {
							$(".radiocontrol").attr("disabled",false);
							$("#deletePool").hide();$("#submitdiskgroup").show();
						}
						status=1;
					});
				}
				if(status==1) { //DiskGroup
					diskgetsize('Data/disksize.txt','#size',"#count","#onedisk");
					status=3;
					refresh2("DGstatus");	
				}
				if(status=="snaps"){ //snapshots
					refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
					refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt","snaps","snaps");
					refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods","periods");
					$("#Vol").change(); 
					if(syscounter == 10) {
					
					
					
					syscounter=0;
					}
				syscounter++;
				refresh2("Snapsstatus");	
				}
				if(syscounter2==1000) { syscounter2=0; } else { syscounter2=syscounter2+1; }
			}
				
			
			
			
			function refreshList(req,listid,fileloc,showtime,update) {
				if(syscounter2==1000){$.post("./pump.php", { req: req, name:"a" }, function (data1){});};
					$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					requiredtime[showtime]=objdate.updated;
				
				});
				
				if(times[showtime]==requiredtime[showtime]) { 
				} 
				else { 
					times[showtime]=requiredtime[showtime];
					//$(listid+" tr.variable").remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						
						var gdata = jQuery.parseJSON(data);
						
						$("."+update).remove();

						for (var prot in gdata){
							
								if( showtime=="snaps" ) {
									//$(listid).append($('<option class="variable">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));	
								$(listid).append($('<option class="variable '+update+' '+gdata[prot].pool+' '+gdata[prot].father+'">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								$("#Vol").change();	
							}
							if (showtime=="periods") {
								    
									switch (gdata[prot].period) {
									//	case "hourly": $("#Hourlylist").append($('<option class="variable">').text('Every:'+gdata[prot].t3+"hrs At:"+gdata[prot].t2+ "mins Keep:"+ gdata[prot].t1+"snaps").val("hourly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3));	 break;
									//	case "Minutely": $("#Minutelylist").append($('<option class="variable">').text('Every:'+gdata[prot].t2+"mins Keep:"+gdata[prot].t1+"snaps").val("Minutely."+gdata[prot].t1+"."+gdata[prot].t2));	 break;
									//	case "Weekly" : $("#Weeklylist").append($('<option class="variable">').text('Every:'+gdata[prot].t4+" At:"+gdata[prot].t2+":"+gdata[prot].t3+" Keep:"+gdata[prot].t1+"snaps").val("Weekly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3+"."+gdata[prot].t4));	 break;
									//switch (gdata[prot].period) {
										case "hourly": $("#Hourlylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'">').text('Every:'+gdata[prot].t3+"hrs At:"+gdata[prot].t2+ "mins Keep:"+ gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;
										case "Minutely": $("#Minutelylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'">').text('Every:'+gdata[prot].t2+"mins Keep:"+gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;
										case "Weekly" : $("#Weeklylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'">').text('Every:'+gdata[prot].t4+" At:"+gdata[prot].t2+":"+gdata[prot].t3+" Keep:"+gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;

									
										
								}
							
							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
							}
						}
					});
				
				};
			};
			function refresh2(textareaid) {
				
				$.get("requestdata2.php", { file: 'Data/'+textareaid+'.log' }, function(data){
					$('#'+textareaid).val(data);
					});
			}	;
			//setInterval('refresh2("DGstatus")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refresh2("Snapsstatus")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt",12)', 10000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refreshList("GetPoolHourlylist","#Hourlylist","Data/Hourlylist.txt",5)', 10000); // Loop every 1 second
			//setInterval('refreshList("GetPoolMinutelylist","#Minutelylist","Data/Minutelylist.txt",5)', 10000); // Loop every 1 second
			//setInterval('refreshList("GetPoolWeeklylist","#Weeklylist","Data/Weeklylist.txt",5)', 10000); // Loop every 1 second
			
			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".DiskGroups").hide(); $(".SnapShots").hide(); 
			$("#DiskGroups").click(function (){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DISK_Groups
						}
					};
				
					if( userpriv=="true" | curuser=="admin" ) { 
					 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".DiskGroups").show(); 
					}
				});
			});
			$("#SnapShots").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].SnapShots
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="snaps"; $("h2").css("background-image","url('img/snapshot.png')").text("SnapShots");  $("option.variable").remove(); Vollisttime="44:333:22";times= { "snaps":"30:43:433", "periods":"30:43:433" }; $(".SnapShots").show();
							 $("#Vol").change();
						}
					});
				};
			});
			
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
			});
			$("#Vol").change(function() {
				//Vollisttime="44:333:222";
				var poolsel=$("#Pool option:selected").text();
				var volsel=$("#Vol option:selected").val();
				//times= { "snaps":"30:43:433", "periods":"30:43:433" };
				$(".variable").hide();
				if(status=="snaps")
				$("."+poolsel+"."+volsel).show();
					
				//$(" tr.variable").remove();
				
			});
			$("#Pool").change(function () {
				
				var selection=$("#Pool option:selected").val();
				
				$('#Vol option.'+selection+':first').prop('selected', true);
				$(".vvariable").hide();
				$(".vvariable."+selection).show();
					
					$('#Vol').change();
		/*			if(plotflag > 0 ) {
										plotb.destroy();
									}
					plotchart('chartNFS',chartdata[$("#Pool2").val()]);
		*/
				
		
			});
		function diskgetsize(fileloc,spanid1,spanid2,spanid3) {
			$.post("./pump.php", { req:"DiskSize", name:fileloc }, function(data1){
				$.get("requestdata.php", { file: fileloc }, function(data){
					var jdata = jQuery.parseJSON(data);
					$(spanid1).text(jdata.size);$(spanid2).text(jdata.count);$(spanid3).text(jdata.onedisk);
					$("#R10").text(jdata.R10);$("#R5").text(jdata.R5);$("#R6").text(jdata.R6);
					
				});
					
			});
		};
				
		
		//refreshList("GetPoollist","#Pool","Data/Poollist.txt",3);
		//refreshList2("GetPoolVollist","#Vol","Data/Vollist2.txt","Volumes");

		$("#submitdiskgroup").click( function (){ $.post("./pump.php", { req:"DGsetPool", name:$('input[name=Raidselect]:checked').val()+" "+$('input[name=Raidselect]:checked').attr("id")+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("DGstatus");
		});
	 });
	 
		$("#deletePool").click( function (){ $.post("./pump.php", { req:"DGdestroyPool"+" "+"<?php echo $_SESSION["user"]; ?>" });
		});

			
		$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotDelete", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		$("#RollbackSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotRollback", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});	
		$("#DeleteHourly").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Hourlylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		$("#DeleteMinutely").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Minutelylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		$("#DeleteWeekly").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Weeklylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
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
				
				$.post("./pump.php", { req:"SnapshotCreate"+period, name: oper+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
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
            
			setInterval("refreshall()",500);
			refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
			refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt","snaps","snaps");
			refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods","periods");
			$.post("./pump.php", { req: "GetPoolperiodlist", name:"a" });
			$.post("./pump.php", { req: "GetPoolVollist", name:"a" });
			$.post("./pump.php", { req: "GetSnaplist", name:"a" });
		</script>

	</body>

</html>

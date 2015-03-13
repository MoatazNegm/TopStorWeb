<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/des19/Login.php');}
 
?>
<html>
	<?php $men= 4; include "header.html"; ?>
	
							<li><a href="#" class="Partnersa rightli"><h4 id="Partners"><span>Partners</span></h4></a></li>
							<li><a href="#" class="Replicatea rightli"><h4 id="Replicate"><span>Replications</span></h4></a></li>
						</ul>
						<?php include "Partners.php"; ?>
						<?php include "Replicate.php" ; ?>
					</div>
				</div>
			</div>
			
		<div class="row">
			<footer class="footer"> Errors
			</footer>
		</div>
			
		
		<script src="js/bootstrap-timepicker.js"></script>
		
		<script>
			var partner="44:333:222";
			var partnernew="44:d3243:erw22"
			var Vollisttime="44:333:222";
			var times= { "snaps":"30:43:433", "periods":"30:43:433" };
			var requiredtime={ "snaps":"33==:433", "periods":"30==erwe:43:433" }
			var Vollisttimenew="23:434:34543";
			var status=0;
			var syscounter=10;
			var syscounter2=1000;
			$("#deletePool").hide();$("#submitdiskgroup").hide();
			
			function refreshList3(request,listid,fileloc) {
				if(syscounter2==1000) { $.post("./pump.php", { req: request, name:"a" }); }
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;
					//console.log("updated",fileloc+"updated",objdate);
				});
				if(Vollisttime==Vollisttimenew) { //console.log("traffic not changed"); 
				} else { 
					Vollisttime=Vollisttimenew;
					//console.log(Vollisttime);
					$(listid+" option.variable").remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var gdata = jQuery.parseJSON(data);
						$(listid+" option.variable").remove();
						chartdata=[];
						for (var prot in gdata){
							if(gdata[prot].Pool=="Data") {
									$(listid).append($('<option class="variable">').text(gdata[prot].name).val(gdata[prot].name));
									//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
							}
						}
					});
				}
			};

			function snaponce(txtin,but,altbut){
				
						var chars=$(txtin).val().length;
						//console.log(txtin, but, altbut, chars);
						if ( chars < 3 ) {  $(but).show();
												 $(altbut).hide();
						} else 					{	$(but).hide();
												 $(altbut).show();
						};
			};
			function refreshPartnerlist(listid,fileloc) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					partnernew=cdata.updated;
				});
				//console.log(partner,partnernew,listid,fileloc);
				if(partnernew!=partner)
				{ 
					partner=partnernew;
					$(listid+' option').remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						//console.log(data);
						
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							 $(listid).append($('<option>').text(v.name+" : "+v.type+" partner").val(v.name)); 
							
						});
					});
				}
			};

			function refreshReplicatelist(listid,fileloc) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					partnernew=cdata.updated;
				});
				//console.log(partner,partnernew,listid,fileloc);
				if(partnernew!=partner)
				{ 
					partner=partnernew;
					$(listid+' option').remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						//console.log(data);
						
						$.each(jdata, function(i,v) {
						console.log(v.name,v.type);
						if (v.type == "receiver" || v.type=="DualWay")
							 $(listid).append($('<option>').text(v.name).val(v.name)); 
					
						});
					});
				}
			};

			function refreshall() { //check pool status
				if($(".Partners").is(":visible")) {
					$.get("requestdata.php", { file: 'Data/Partnersstatus.log' }, function(data){ $("#Partnersstatus").val(data);});
					refreshPartnerlist("#Partnerlist","Data/Partnerslist.txt");
				}
				if($(".Replicate").is(":visible")) {
					$.get("requestdata.php", { file: 'Data/Replicatestatus.log' }, function(data){ $("#Replicatestatus").val(data);});
					refreshReplicatelist("#Partner","Data/Partnerslist.txt");
				}
				$.get("requestdata.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
				if(status==3) { 
					
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
				if(status=="snaps"){ //Replicate
					refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
					refreshList("RemoteGetSnaplist","#Replicatelist","Data/listsnaps.txt","snaps");
					refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods");
					if(syscounter == 10) {
					
					
					
					syscounter=0;
					}
				syscounter++;
				refresh2("Snapsstatus");	
				}
				if(syscounter2==1000) { syscounter2=0; } else { syscounter2=syscounter2+1; }
			}
				
			
			
			
			function refreshList(req,listid,fileloc,showtime) {
				if(syscounter2==1000){$.post("./pump.php", { req: req, name:"a" }, function (data1){});};
					$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					requiredtime[showtime]=objdate.updated;
					//console.log("timey", objdate,fileloc);
				});
				//console.log(showtime);
				if(times[showtime]==requiredtime[showtime]) { //console.log("traffic not changed"); 
				} 
				else { 
					times[showtime]=requiredtime[showtime];
					//$(listid+" tr.variable").remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						//console.log(fileloc)
						var gdata = jQuery.parseJSON(data);
						//console.log(data);
						$(listid+" option.variable").remove();

						//console.log(times[showtime],showtime);
						if(showtime=="periods") { 	$("#Hourlylist option.variable").remove();$("#Minutelylist option.variable").remove();$("#Weeklylist option.variable").remove();}
						for (var prot in gdata){
							if($("#Vol").val()==gdata[prot].father){
								if( showtime=="snaps" ) {
									console.log(gdata[prot]);
									if(gdata[prot].receiver==$("#Partner").val())
									$(listid).append($('<option class="variable">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								}
								if (showtime=="periods") {
									switch (gdata[prot].period) {
										case "hourly": $("#Hourlylist").append($('<option class="variable">').text('Every:'+gdata[prot].t3+"hrs At:"+gdata[prot].t2+ "mins Keep:"+ gdata[prot].t1+"snaps").val("hourly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3));	 break;
										case "Minutely": $("#Minutelylist").append($('<option class="variable">').text('Every:'+gdata[prot].t2+"mins Keep:"+gdata[prot].t1+"snaps").val("Minutely."+gdata[prot].t1+"."+gdata[prot].t2));	 break;
										case "Weekly" : $("#Weeklylist").append($('<option class="variable">').text('Every:'+gdata[prot].t4+" At:"+gdata[prot].t2+":"+gdata[prot].t3+" Keep:"+gdata[prot].t1+"snaps").val("Weekly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3+"."+gdata[prot].t4));	 break;
									}
								}
									
							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
							}
						}
					});
				};
			};
			function refresh2(textareaid) {
				
				$.get("statuslog.php", { file: 'Data/'+textareaid+'.log' }, function(data){
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
			$(".Partners").hide(); $(".Replicate").hide(); 
			$("#Partners").click(function (){
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
					 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Partners"); status="Partners"; $(".Partners").show(); 
					}
				});
			});
			$("#Replicate").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Replicate
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="snaps"; $("h2").css("background-image","url('img/snapshot.png')").text("Replicate");  $("option.variable").remove(); Vollisttime="44:333:22";times= { "snaps":"30:43:433", "periods":"30:43:433" }; $(".Replicate").show();
						}
					});
				};
			});
			
			$(".finish").click(function (){ config = 1; status=0; $(".Partners").hide(); $(".Replicate").hide();});
			
			
			
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
				times= { "snaps":"30:43:433", "periods":"30:43:433" };
				//$(" tr.variable").remove();
				
			});
			$("#Partner").change(function() {
				//Vollisttime="44:333:222";
				times= { "snaps":"30:43:433", "periods":"30:43:433" };
				//$(" tr.variable").remove();
				
			});	

		$("#AddPartner").click( function (){ $.post("./pump.php", { req:"PartnerAdd", name:$('#Partn').val()+" "+$('#type').val()+" "+"<?php echo $_SESSION["user"]; ?>" });
	 });
	 
		$("#DelPartner").click( function (){ $.post("./pump.php", { req:"PartnerDel", name:$("#Partnerlist").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
		});

			
		$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotDelete", name:$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); 
				 });
			});
		$("#RollbackSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotRollback", name:$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); 
				 });
			});	
		$("#DeleteHourly").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Hourlylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); 
				 });
			});
		$("#DeleteMinutely").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Minutelylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); 
				 });
			});
		$("#DeleteWeekly").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Weeklylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); 
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
				
				$.post("./pump.php", { req:"RemoteSnapshotCreate"+period, name: oper+" "+$("#Partner").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); 
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
			$.post("./pump.php", { req:"Partnerslist" });
			refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
			refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt","snaps");
			refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods");
			$.post("./pump.php", { req: "GetPoolperiodlist", name:"a" });
			$.post("./pump.php", { req: "GetPoolVollist", name:"a" });
			$.post("./pump.php", { req: "GetSnaplist", name:"a" });
		</script>

	</body>

</html>

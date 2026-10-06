<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
?>
<html>
	<?php $men= 4; include "header.html"; ?>
	
							<li><a href="#" class="Partnersa rightli"><h4 id="Partners"><span>تعريف الشركاء</span></h4></a></li>
							<li><a href="#" class="Replicatea rightli"><h4 id="Replicate"><span>المستقبلون</span></h4></a></li>
							<li><a href="#" class="Sendersa rightli"><h4 id="Senders"><span>المرسلون</span></h4></a></li>
							<li><a href="#" class="Proxya rightli"><h4 id="Proxys"><span>رخصة الإرسال</span></h4></a></li>
						</ul>
						<?php include "Partners.php"; ?>
						<?php include "Replicate.php" ; ?>
						<?php include "Senders.php" ; ?>
						<?php include "Proxy.php"; ?>
					</div>
				</div>
			</div>
			
		<div class="row">
			<footer class="footer"> مشاكل
			</footer>
		</div>
			
		
		<script src="../js/bootstrap-timepicker.js"></script>
		
		<script>
			var partner="44:333:222";
			var partnernew="44:d3243:erw22"
			var replival= { "snaps":"33=fgsssdf=:43", "periods":"30==ergrwe:43:43", "sender":"43534ss:46dfd:4563", "Proxy":"3242ew35s34rwe" };
			var replivalnew={ "snaps":"33==:433", "periods":"30==erwe:43:433", "sender":"43534:456356:4563" , "Proxy":"3242ewrwe"};
			var Vollisttime="44:333:ss222";
			var times= { "snaps":"33==s:43", "periods":"30==erwe:s43:43", "sender":"43534:46s:4563" };
			var requiredtime={ "snaps":"33==:s433", "periods":"30==erwe:s43:433", "sender":"43534:45s6356:4563" };
			var Vollisttimenew="23:434s:34543";
			var status=0;
			var syscounter=10;
			var syscounter2=1000;
			$("#deletePool").hide();$("#submitdiskgroup").hide();$("#passphrase").hide();
			
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
					//replival="2323:334544"; replivalsend="sdfkjdf;dsfalkjdkjdkaj";
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
							if(v.proxy=="true")
							 $(listid).append($('<option>').text(v.name+" : "+v.type+" شريك عن طريق مسهل إرسال").val(v.name)); 
							else
								$(listid).append($('<option>').text(v.name+" : "+v.type+" شريك مباشر").val(v.name));
							
						});
					});
				}
			};

			function refreshProxy(listid,fileloc,showtime,listid2,listid3) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					replivalnew[showtime]=cdata.updated;
				});
				console.log(replival[showtime],replivalnew[showtime]);
				
				if(replival[showtime] != replivalnew[showtime])
				{ 
					
					replival[showtime]=replivalnew[showtime];

					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						//console.log(data);
						
						$.each(jdata, function(i,v) {
						 $('#'+listid).val(v[listid]); 
						 $('#'+listid2).val(v[listid2]);
						 $('#'+listid3).val(v[listid3]);
						});
					});
				}
			};

			
			function refreshReplicatelist(listid,fileloc,showtime,way) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					replivalnew[showtime]=cdata.updated;
				});
				//console.log(replival,replivalnew);
				
				if(replival[showtime] != replivalnew[showtime])
				{ 
					
					replival[showtime]=replivalnew[showtime];
					$(listid+' option').remove();
					
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						//console.log(data);
						
						$.each(jdata, function(i,v) {
							
						//console.log(v.name,v.type);
						if (v.type == way || v.type=="DualWay")
							 $(listid).append($('<option>').text(v.name).val(v.name)); 
					
						});
					});
				}
			};

			function refreshall() { //check pool status
				if($(".Partners").is(":visible")) {
					$.get("requestdata2.php", { file: '../Data/Partnersstatus.log' }, function(data){ $("#Partnersstatus").val(data);});
					refreshPartnerlist("#Partnerlist","../Data/Partnerslist.txt");
				};
				if($(".Replicate").is(":visible")) {
					$.get("requestdata2.php", { file: '../Data/Replicatestatus.log' }, function(data){ $("#Replicatestatus").val(data);});
					refreshReplicatelist("#Partner","../Data/Partnerslist.txt","snaps","receiver");
				};
				if($(".Sendersc").is(":visible")) {
					$.get("requestdata2.php", { file: '../Data/Replicatestatus.log' }, function(data){ $("#Sendersstatus").val(data);});
					refreshReplicatelist("#Partnersend","../Data/Partnerslist.txt","sender","sender");
				};
				if($(".Proxy").is(":visible")) {
					$.get("requestdata2.php", { file: '../Data/Proxystatus.log' }, function(data){ $("#Proxystatus").val(data);});
					
					
				};
				
				
				$.get("requestdata.php", { file: '../Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
				if(status==3) { 
					
					$.get("requestdata.php", { file: "../Data/poolstatus.txt" },function(data){
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
					refreshList("RemoteGetSnaplist","#Replicatelist","Data/listsnaps.txt","snaps","#Vol");
					refreshList("RemoteGetPoolperiodlist","#all","Data/Remoteperiodlist.txt","periods","#Vol");
				}
				if(status=="Senders"){ //Replicate
					refreshList3("GetPoolVollist","#Volsend","Data/Vollist.txt");
					refreshList("GetSnaplist","#Senderslist","Data/listsnaps.txt","sender","#Volsend");
				}
				if(syscounter2==1000) { syscounter2=0; } else { syscounter2=syscounter2+1; }
			}
				
			
			
			
			function refreshList(req,listid,fileloc,showtime,voll) {
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
						//console.log(fileloc);
						var gdata = jQuery.parseJSON(data);
						//console.log(data);
						$(listid+" option.variable").remove();

						//console.log(times[showtime],showtime);
						if(showtime=="periods") { 	$("#Hourlylist option.variable").remove();$("#Minutelylist option.variable").remove();$("#Weeklylist option.variable").remove();}
						for (var prot in gdata){
							if($(voll).val()==gdata[prot].father){
								if( showtime=="snaps" ) {
									//console.log(gdata[prot]);
									if(gdata[prot].receiver==$("#Partner").val())
									$(listid).append($('<option class="variable">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								}
								if( showtime=="sender" ) {
									//console.log(gdata[prot]);
									if(gdata[prot].sender==$("#Partnersend").val())
									$(listid).append($('<option class="variable">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								}

								if (showtime=="periods" &&  gdata[prot].partner==$("#Partner").val()) {
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
			$(".Partners").hide(); $(".Replicate").hide(); $(".Sendersc").hide();$(".Proxy").hide();
			$("#Partners").click(function (){
				var userpriv="false";
				
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DISK_Groups
						}
					};
				
					if( userpriv=="true" | curuser=="admin" ) { 
					 config= 0; $("h2").css("background-image","url('../img/Partners.png')").text("الشركاء"); status="Partners"; $(".Partners").show(); partner="2432334";
					}
				});
			});
			$("#Replicate").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Replicate
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="snaps"; $("h2").css("background-image","url('../img/receivers.png')").text("المستقبلون");  $("option.variable").remove(); Vollisttime="44:3133:22";times= { "snaps":"331==:433", "periods":"30==erwe1:43:43", "sender":"435341:456356:563"}; $(".Replicate").show();replival={ "snaps":"33=1=:433", "periods":"30==e1rwe:43:43", "sender":"435341:456356:563", "Proxy":"32442ewrwe"};
						}
					});
				};
			});
			$("#Senders").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Replicate
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="Senders"; $("h2").css("background-image","url('../img/senders.png')").text("المرسلون");  $("option.variable").remove(); ;times= { "snaps":"33=e33", "periods":"30==erwe3e:433", "sender":"43534:456:45e63" }; $(".Sendersc").show();replival={ "snaps":"33==e:433", "periods":"30==erwe:e43:43", "sender":"43534:4e56356:563", "Proxy":"3242ewr5we"};Vollisttime="44:333:sedfsd";
						}
					});
				};
			});
			$("#Proxys").click(function (){ 
							if(config== 1){
								 
								var userpriv="false";
								var curuser="<?php echo $_SESSION["user"] ?>";
								$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
									var gdata = jQuery.parseJSON(data);
									for (var prot in gdata){
										if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
											userpriv=gdata[prot].Proxy
										}
									};
								
									if( userpriv=="true" | curuser=="admin" ) { 
										config = 0; status="Proxy"; $("h2").css("background-image","url('../img/senders.png')").text("رخصة مسهل الإرسال");  $("option.variable").remove(); ;times= { "snaps":"33=f33", "periods":"30==erwe3:4f33", "sender":"43534:456:4563" }; $(".Proxy").show();replival={ "snaps":"33==:4f33", "periods":"30==erwe:4f3:43", "sender":"43534:456f356:563", "Proxy":"3242efwrwe"};Vollisttime="44:333:sdfsd";
										refreshProxy("License","../Data/Proxylist.txt","Proxy","Proxyurl","Alias");
									}
								});
							};
						});

			$(".finish").click(function (){ 
				config = 1; status=0; $(".Partners").hide(); $(".Replicate").hide(); $(".Sendersc").hide(); $(".Proxy").hide()});
			
			
			
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
				times= { "snaps":"333", "periods":"3rwe:43:433", "sender":"43534:4563563" };
				//$(" tr.variable").remove();
				
			});
			$("#Volsend").change(function() {
				//Vollisttime="44:333:222";
				times= { "snaps":"334563", "periods":"3rwe:43:433", "sender":"43534:4563563" };
				//$(" tr.variable").remove();
				
			});
			$("#Partner").change(function() {
				//Vollisttime="44:333:222";
				times= { "snaps":"3df33", "periods":"30==e43:467833", "sender":"435ddf34:46:4563" };
				//$(" tr.variable").remove();
				
			});	
			$("#Partnersend").change(function() {
				//Vollisttime="44:333:222";
				times= { "snaps":"3dgf33", "periods":"30==e43:767433", "sender":"43dfs534:46:4563" };
				//$(" tr.variable").remove();
				
			});	
			$("#Proxy").change(function() { if($("#Proxy").is(":checked") == true ) {
				$.get("requestport.php", function(data){
					$("#Port").val(data); 
			  });
				$("#passphrase").show(); 
				} else {$("#passphrase").hide(); $("#Port").val("<?php echo rand(15000,16000) ?>");} })
		$("#AddPartner").click( function (){ $.post("./pump.php", { req:"PartnerAdd", name:$('#Partn').val()+" "+$('#type').val()+" "+$("#Proxy").is(":checked")+" "+$("#Pass").val()+" "+$("#Port").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
	 });
	 
		$("#AddLicense").click( function (){ $.post("./pump.php", { req:"LicenseAdd", name:$('#License').val()+" "+"<?php echo $_SESSION["user"]; ?>" });
	 });

		$("#AddProxy").click( function (){ $.post("./pump.php", { req:"ProxyAdd", name:$('#Proxyurl').val()+" "+"<?php echo $_SESSION["user"]; ?>" });
	 });
		$("#AddAlias").click( function (){ $.post("./pump.php", { req:"AliasAdd", name:$('#Alias').val()+" "+"<?php echo $_SESSION["user"]; ?>" });
	 });

		$("#DelPartner").click( function (){ $.post("./pump.php", { req:"PartnerDel", name:$("#Partnerlist").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
		});

			
		$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotDelete", name:$("#Replicatelist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 });
			});
		$("#DeleteSnapshotsend").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotDelete", name:$("#Senderslist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 });
			});
		
		$("#RollbackSnapshotsend").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotRollback", name:$("#Senderslist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 
				 });
			});	

		$("#DeleteHourly").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotPeriodDelete", name:$("#Hourlylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Replicatestatus"); 
				 });
			});
		$("#DeleteMinutely").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotPeriodDelete", name:$("#Minutelylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Replicatestatus"); 
				 });
			});
		$("#DeleteWeekly").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotPeriodDelete", name:$("#Weeklylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Replicatestatus"); 
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
								appendWidgetTo: '#timepick',
                minuteStep: 1,
								showMeridian: false,

            });
            
			setInterval("refreshall()",500);
			$.post("./pump.php", { req:"Partnerslist" });
			refreshList3("GetPoolVollist","#Vol","../Data/Vollist.txt");
			refreshList3("GetPoolVollist","#Volsend","../Data/Vollist.txt");
			refreshList("GetSnaplist","#Replicatelist","../Data/listsnaps.txt","snaps");
			refreshList("GetSnaplist","#Senderslist","../Data/listsnaps.txt","sender","#Volsend");
			refreshList("RemoteGetPoolperiodlist","#all","../Data/Remoteperiodlist.txt","periods");
			$.post("./pump.php", { req: "GetPoolperiodlist", name:"a" });
			$.post("./pump.php", { req: "GetPoolVollist", name:"a" });
			$.post("./pump.php", { req: "GetSnaplist", name:"a" });
			
						$("#timepick").click( function(){
				$("#timepick div").css("top","100%");
				$("#timepick div tbody tr:nth-child(1) td:nth-child(3) a").data("action","incrementHour");
				$("#timepick div tbody tr:nth-child(1) td:nth-child(1) a").data("action","incrementMinute");
				$("#timepick div tbody tr:nth-child(3) td:nth-child(3) a").data("action","decrementHour");
				$("#timepick div tbody tr:nth-child(3) td:nth-child(1) a").data("action","decrementMinute");
				$("#timepick div tbody tr:nth-child(2) td:nth-child(1) input").val($("#Stime").val().split(":")[1]);
				$("#timepick div tbody tr:nth-child(2) td:nth-child(3) input").val($("#Stime").val().split(":")[0]);
				if( $(".minc").hasClass("minc") == false ) {
					$(".bootstrap-timepicker-hour").addClass("minc");
					$(".bootstrap-timepicker-minute").addClass("hrc");
					$(".minc").removeClass("bootstrap-timepicker-hour");
					$(".hrc ").removeClass("bootstrap-timepicker-minute");
					$(".hrc").addClass("bootstrap-timepicker-hour ");
					$(".minc").addClass("bootstrap-timepicker-minute");
				}
			});

		</script>

	</body>

</html>

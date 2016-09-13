<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
?>
<html class="bodydiv">
	<?php $men= 4; include "header.html"; ?>
	
							<li><a href="#" class="Partnersa rightli"><h4 id="Partners"><span>Partners</span></h4></a></li>
							<li><a href="#" class="Replicatea rightli"><h4 id="Replicate"><span>Receivers</span></h4></a></li>
							<li><a href="#" class="Sendersa rightli"><h4 id="Senders"><span>Senders</span></h4></a></li>
							<li><a href="#" class="Proxya rightli"><h4 id="Proxy"><span>Proxy license</span></h4></a></li>
						</ul>
						<?php include "Partners.php"; ?>
						<?php include "Replicate.php" ; ?>
						<?php include "Senders.php" ; ?>
						<?php include "Proxy.php"; ?>
					</div>
				</div>
			</div>
			
		<div class="row">
			<footer class="footer prefooter"> Errors
			</footer>
		</div>
			
		
		<script src="js/bootstrap-timepicker.js"></script>
		
		<script>
			var partner="44:333:222";
			var partnernew="44:d3243:erw22"
			var replival= { "snaps":"33=fgsssdf=:43", "periods":"30==ergrwe:43:43", "sender":"43534ss:46dfd:4563", "Proxy":"3242ew35s34rwe" };
			var replivalnew={ "snaps":"33==:433", "periods":"30==erwe:43:433", "sender":"43534:456356:4563" , "Proxy":"3242ewrwe"};
			var Vollisttime="44:333:ss222";
			var times= { "snaps":"33==s:43", "periods":"30==erwe:s43:43", "sender":"43534:46s:4563" };
			var requiredtime={ "snaps":"33==:s433", "periods":"30==erwe:s43:433", "sender":"43534:45s6356:4563" };
			var Vollisttimenew="23:434s:34543";
			var listupdated=[];
			var pools = [];
			var status=0;
			var syscounter=10;
			var syscounter2=1000;
			$("#deletePool").hide();$("#submitdiskgroup").hide();$("#passphrase").hide();$(".finish").hide();$("#SnapshotCreatediv").hide();
			

			function snaponce(txtin,but,altbut){
				
						var chars=$(txtin).val().length;
				
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
				
				if(partnernew!=partner)
				{ 
					partner=partnernew;
					$(listid+' option').remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);

						
						$.each(jdata, function(i,v) {

							if(v.proxy=="true")
							 $(listid).append($('<option>').text(v.name+" : "+v.type+" partner through proxy").val(v.name)); 
							else
								$(listid).append($('<option>').text(v.name+" : "+v.type+" partner").val(v.name));
							
						});
					});
				}
			};

			function refreshProxy(listid,fileloc,showtime,listid2,listid3) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					replivalnew[showtime]=cdata.updated;
				});
			
				
				if(replival[showtime] != replivalnew[showtime])
				{ 
					
					replival[showtime]=replivalnew[showtime];

					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
					
						
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
				
				
				if(replival[showtime] != replivalnew[showtime])
				{ 
					
					replival[showtime]=replivalnew[showtime];
					$(listid+' option').remove();
					
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
					
						
						$.each(jdata, function(i,v) {

						if (v.type == way || v.type=="DualWay")
							 $(listid).append($('<option>').text(v.name).val(v.name)); 
					
						});
					});
				}
			};

			function refreshall() { //check pool status
				if($(".Partners").is(":visible")) {
					$.get("requestdata2.php", { file: 'Data/Partnersstatus.log' }, function(data){ $("#Partnersstatus").val(data);});
					refreshPartnerlist("#Partnerlist","Data/Partnerslist.txt");
				};
				if($(".Replicate").is(":visible")) {
					$.get("requestdata2.php", { file: 'Data/Replicatestatus.log' }, function(data){ $("#Replicatestatus").val(data);});
					refreshReplicatelist("#Partner","Data/Partnerslist.txt","snaps","receiver");
				};
				if($(".Sendersc").is(":visible")) {
					$.get("requestdata2.php", { file: 'Data/Replicatestatus.log' }, function(data){ $("#Sendersstatus").val(data);});
					refreshReplicatelist("#Partnersend","Data/Partnerslist.txt","sender","sender");
				};
				if($(".Proxy").is(":visible")) {
					$.get("requestdata2.php", { file: 'Data/Proxystatus.log' }, function(data){ $("#Proxystatus").val(data);});
					
					
				};
				
				
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
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
					
					refreshList2("GetPoolVollist","#Vol","Data/Vollist.txt","Vol");
					refreshList4("RemoteGetSnaplist","#Replicatelist","Data/listsnaps.txt","snaps","#Vol","listsnaps");
					refreshList4("RemoteGetPoolperiodlist","#all","Data/Remoteperiodlist.txt","periods","#Vol","periods");
					$("#Partner").change(); 
				}
				if(status=="Senders"){ //Replicate
					refreshList2("GetPoolVollist","#Volsend","Data/Vollist.txt","Vol");
					refreshList4("GetSnaplist","#Senderslist","Data/listsnaps.txt","sender","#Volsend","listsnaps");
					$("#Partnersend").change(); 
				
				}
			    
				if(syscounter2==1000) { syscounter2=0; ; } else { syscounter2=syscounter2+1; }
			}
				
			
	function refreshList4(req,listid,fileloc,showtime,voll,update) {
				if ($.inArray(update,listupdated) < 0 ) {
										listupdated.push(update);
										listupdated[update]="hello first time"
							} 
				if(syscounter2==1000){$.post("./pump.php", { req: req, name:"a" }, function (data1){});};
					$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					requiredtime[showtime]=objdate.updated;
					
				});
				if(requiredtime[showtime].valueOf() != listupdated[update].valueOf()) {  
					
					listupdated[update]=requiredtime[showtime].valueOf();
					//$(listid+" tr.variable").remove();
					
					$.get("requestdata.php", { file: fileloc }, function(data){
						
						var gdata = jQuery.parseJSON(data);
						
						$("."+update).remove();
						$(".variable"+"."+update).remove();
						
						;
						
						for (var prot in gdata){
					
								if( showtime=="snaps" ) {
									var receiver=gdata[prot].receiver;
									receiver=receiver.replace(/\./g,"");
									$(listid).append($('<option class="variable '+update+' '+gdata[prot].pool+' '+gdata[prot].father+' '+receiver+' '+'">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								}
								if( showtime=="sender" ) {
									var sender=gdata[prot].sender;
									sender=sender.replace(/\./g,"");
								
									$(listid).append($('<option class="variable '+update+' '+gdata[prot].pool+' '+gdata[prot].father+' '+sender+' '+'">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								}

								if (showtime=="periods" ) {
									
									var partner=gdata[prot].partner;
									partner=partner.replace(/\./g,"");
									
									switch (gdata[prot].period) {
										case "hourly": $("#Hourlylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+partner+'">').text('Every:'+gdata[prot].t3+"hrs At:"+gdata[prot].t2+ "mins Keep:"+ gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;
										case "Minutely": $("#Minutelylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+partner+'">').text('Every:'+gdata[prot].t2+"mins Keep:"+gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;
										case "Weekly" : $("#Weeklylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+partner+'">').text('Every:'+gdata[prot].t4+" At:"+gdata[prot].t2+":"+gdata[prot].t3+" Keep:"+gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;
									}
								}
									
							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
							
						}
						;
					});
					if (showtime == "sender" ) { $("#Partnersend").change() } else { $("#Partner").change() }	
				};
				
			};
				function refresh2(textareaid) {
				
				$.get("statuslog.php", { file: 'Data/'+textareaid+'.log' }, function(data){
					$('#'+textareaid).val(data);
					});
			}	;
		
			
			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".Partners").hide(); $(".Replicate").hide(); $(".Sendersc").hide();$(".Proxy").hide();$(".finish").hide();
			$("#Partners").click(function (){
				var userpriv="false";
				
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].Partners
						}
					};
				
					if( userpriv=="true" | curuser=="admin" ) { 
					 config= 0; $("h2").css("background-image","url('img/Partners.png')").text("Partners"); status="Partners"; $(".ullis").hide();$(".finish").show(); $(".Partners").show(); partner="2432334";
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
								userpriv=gdata[prot].Replication
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="snaps"; $("h2").css("background-image","url('img/receivers.png')").text("Replicate");  $("option.variable").remove(); Vollisttime="44:3133:22";times= { "snaps":"331==:433", "periods":"30==erwe1:43:43", "sender":"435341:456356:563"};$(".ullis").hide(); $(".finish").show(); $(".Replicate").show();replival={ "snaps":"33=1=:433", "periods":"30==e1rwe:43:43", "sender":"435341:456356:563", "Proxy":"32442ewrwe"};
						}
					});
				};
			});
			$("#Senders").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Senders
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="Senders"; $("h2").css("background-image","url('img/senders.png')").text("Senders");  $("option.variable").remove(); ;times= { "snaps":"33=e33", "periods":"30==erwe3e:433", "sender":"43534:456:45e63" };$(".ullis").hide();$(".finish").show(); $(".Sendersc").show();replival={ "snaps":"33==e:433", "periods":"30==erwe:e43:43", "sender":"43534:4e56356:563", "Proxy":"3242ewr5we"};Vollisttime="44:333:sedfsd";
						}
					});
				};
			});
			$("#Proxy").click(function (){ 
							if(config== 1){
								 
								var userpriv="false";
								var curuser="<?php echo $_SESSION["user"] ?>";
								$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
									var gdata = jQuery.parseJSON(data);
									for (var prot in gdata){
										if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
											userpriv=gdata[prot].Proxylic
										}
									};
								
									if( userpriv=="true" | curuser=="admin" ) { 
										config = 0; status="Proxy"; $("h2").css("background-image","url('img/senders.png')").text("Proxy License");  $("option.variable").remove(); ;times= { "snaps":"33=f33", "periods":"30==erwe3:4f33", "sender":"43534:456:4563" };$(".ullis").hide();$(".finish").show(); $(".Proxy").show();replival={ "snaps":"33==:4f33", "periods":"30==erwe:4f3:43", "sender":"43534:456f356:563", "Proxy":"3242efwrwe"};Vollisttime="44:333:sdfsd";
										refreshProxy("License","Data/Proxylist.txt","Proxy","Proxyurl","Alias");
									}
								});
							};
						});

			$(".finish").click(function (){ 
				config = 1; status=0; $(".Partners").hide(); $(".Replicate").hide(); $(".Sendersc").hide();$(".ullis").show();$(".finish").hide(); $(".Proxy").hide()});
			
			
			
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
				var selection=$("#Vol option:selected").val();
					$('#Partner option.'+selection+':first').prop('selected', true);
					$('#Partner').change();
				
				//$(" tr.variable").remove();
				
			});
			$("#Pool").change(function () {
				var selection=$("#Pool option:selected").val();
				$(".pvariable").hide();
				$(".vvariable").hide();
				$("."+selection).show();
				$('#Vol option.'+selection+':first').prop('selected', true);
				$('#Vol').change();
				//$('#Volsend').change();
		
			});
			$("#Poolsend").change(function () {
				var selection=$("#Poolsend option:selected").val();
				$(".pvariable").hide();
				$(".vvariable").hide();
				$("."+selection).show();
				$('#Volsend option.'+selection+':first').prop('selected', true);
				$('#Volsend').change();
				//$('#Volsend').change();
		
			});
			$("#Volsend").change(function() {
				//Vollisttime="44:333:222";
				var selection=$("#Volsend option:selected").val();
					$('#Partnersend option.'+selection+':first').prop('selected', true);
					$('#Partnersend').change();
				
			});
			$("#Partner").change(function() {
				var selection=$("#Partner option:selected").val();
				selection=selection.replace(/\./g,"");
				//Vollisttime="44:333:222";
				//times= { "snaps":"3df33", "periods":"30==e43:467833", "sender":"435ddf34:46:4563" };
				$(".variable").hide();
				$("."+$("#Vol").val()+"."+$("#Pool option:selected").text()+"."+selection).show();
			
				//	$("."+selection+"."+$("#Vol").val()+"."+$("#Pool").val()).show();
					
					
					//$(" tr.variable").remove();
				
			});	
			$("#Partnersend").change(function() {
				var selection=$("#Partnersend option:selected").val();
				selection=selection.replace(/\./g,"");
				//Vollisttime="44:333:222";
				//times= { "snaps":"3df33", "periods":"30==e43:467833", "sender":"435ddf34:46:4563" };
				$(".variable").hide();
				$("."+$("#Volsend").val()+"."+$("#Poolsend option:selected").text()+"."+selection).show();
				
					$("."+$("#Partnersend").val()+"."+$("#Volsend").val()+"."+$("#Poolsend").val()).show();
				
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

			
		$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotDelete", name:$("#Pool").val()+" "+$("#Replicatelist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 });
			});
		$("#DeleteSnapshotsend").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotDelete", name:$("#Pool").val()+" "+$("#Senderslist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 });
			});
		
		$("#RollbackSnapshotsend").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotRollback", name:$("#Pool").val()+" "+$("#Senderslist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 
				 });
			});	
		$("#RollbackSnapshot").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotRollback", name:$("#Pool").val()+" "+$("#Replicatelist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 
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
								appendWidgetTo: 'body',
                minuteStep: 1,
								showMeridian: false,

            });
            
            function refreshList2(req,listid,fileloc,update) {
				
				var request=req;
				if ($.inArray(update,listupdated) < 0 ) {
										listupdated.push(update);
										listupdated[update]="hello first time"
							} 
				
				 
				if(syscounter2==1000){$.post("./pump.php", { req: request, name:"a" }); }
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;
					
				});
				if(listupdated[update].valueOf() != Vollisttimenew.valueOf()) { 
					listupdated[update]=Vollisttimenew.valueOf();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var gdata = jQuery.parseJSON(data);
						
							$(listid+' option').remove();
							$(listid+' tr').remove();
							$(".pvariable").remove();
							$(".variable2").remove();
							$(".variable2send").remove();
							chartdata=[];
							for (var prot in gdata){

									if ($.inArray(gdata[prot].Pool,pools) < 0 ) {
										pools.push(gdata[prot].Pool);
										$("#Pool").append($('<option class="variable2">').text(gdata[prot].uPool).val(gdata[prot].class));
										$("#Poolsend").append($('<option class="variable2send">').text(gdata[prot].uPool).val(gdata[prot].class));
										
									}
									
										
									
									$(listid).append($('<option class="pvariable '+gdata[prot].class+'" >').text(gdata[prot].name).val(gdata[prot].name));
									
								}
							
							
							pools = [];

						});
					if (listid == "Vol" ) { $("#Pool").change() } else { $("#Poolsend").change() }	;
				};
		
			}
			;

			setInterval("refreshall()",500);
			$.post("./pump.php", { req:"Partnerslist" });
			//$.post("./pump.php", { req: "GetPoolperiodlist", name:"a" });
			$.post("./pump.php", { req: "GetPoolVollist", name:"a" });
			$.post("./pump.php", { req: "GetSnaplist", name:"a" });
			function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivPartners="false"; var userprivReplicate="false";var userprivSenders="false"; var userprivProxy="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
										userprivPartners=gdata[prot].Partners;
										userprivReplicate=gdata[prot].Replication;
										userprivSenders=gdata[prot].Senders;
										userprivProxy=gdata[prot].Proxylic;
										
									}
								};
									
								if( userprivPartners =="true") { $("#Partners").show(); } else { $("#Partners").hide(); } ; if( userprivReplicate =="true") { $("#Replicate").show(); } else { $("#Replicate").hide(); };;
								if( userprivSenders =="true") { $("#Senders").show(); } else { $("#Senders").hide(); }; if( userprivProxy =="true") { $("#Proxy").show(); } else { $("#Proxy").hide(); };
						});
					}
					$(".ullis").show();
			}
		}
		starting();
		</script>

	</body>

</html>

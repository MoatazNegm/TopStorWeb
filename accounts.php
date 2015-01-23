<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id()) {  
	 header('Location:/des19/Login.php');
	 //echo "<script>console.log('sess:".session_id()."req:".$_REQUEST["idd"]."');</script>";
	 }

?>
<html>
	<?php $men = 1; include "header.html"; ?>
	
							<li><a href="#" class="ADa rightli"><h4 id="AD"><span>Active Directory</span></h4></a></li>
							<li><a href="#" class="UnLina rightli"><h4 id="UnLin"><span>Box users</span></h4></a></li>
							<li><a href="#" class="Futurea rightli"><h4 id="Future"><span>Box properties</span></h4></a></li>
						</ul>
						<?php include "Future.php"; ?>
						<?php include "AD.php"; ?>
						<?php include "UnLin.php"; ?>

					</div>
			</div>
			
		</div>
			
		<div class="row">
			<footer class="footer"> Errors
		</footer>
		</div>
		</div>
	</div>
	<?php  include "footer.php"; ?>	
		<script>
			var DNS=1;
			function refreshall() {
				DNS=1;
			//	console.log("AD is visible : " , $(".AD").is(":visible"));
				if($(".AD").is(":visible"))
				{
					$.get("requestdata.php", { file: 'Data/status.log' }, function(data){ $("#ADstatus").val(data);});
				}
				else if($(".Future").is(":visible"))
				{
					$.get("requestdata.php", { file: 'Data/status.log' }, function(data){ $("#Futurestatus").val(data);});
				}
				else if($(".UnLin").is(":visible"))
				{
					$.get("requestdata.php", { file: 'Data/status.log' }, function(data){ $("#UnLinstatus").val(data);});
					refreshUserList();
				}

			}
			function refresh4(request,field) {
				if(DNS > 0) {
					$.get("requestdata.php", { file: 'Data/'+request+'.log' }, function(data){
					$(field).val(data);
				if(request=="network") {
					if (data==1) {
						$("#network").val(1);  
					} else { 
						$("#network").val(2);
					}; 
					$("#network").change();
				}
	//				if(request=="network") { $("#network").val(data); $("#network").change(); }
	//				console.log(field,request,data,$("#network").val());
					});
					
				}
			}	
						
			function refresh() {
				
				$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$("#statusarea").val(data);
					});
			}	;
			function refreshUserList() {
				var jdata;
				
				$.post("./pump.php", { req:"UnixListUsers", name:"a" }, function (data1){ 
					
					$.get("requestdata.php", { file: 'Data/listusers.txt' }, function(data){
						jdata = jQuery.parseJSON(data);
						if(Number($("#UserList option").length)+1 > 0 ) {
							$("#UserList option").each(function (i,v) { 
								for(var key in jdata) { 
									if ( key == this.value) {
										console.log(this.value,key,"found"); $(this).toggleClass("dontdelete"); jdata[key]="inin"; 
									} else { 
										console.log(this.value,key,"notfound");
									} 
								}

							});
						}
						
						for (var key in jdata ) { 
							if(jdata[key] == "o") { $("#UserList").append($("<option class='dontdelete'>").text(key).val(key)); }
						}
					});
												console.log("before:",$("#UserList option.dontdelete")); 
												;
					$("#UserList option").not(".dontdelete").remove();
					$("#UserList option").toggleClass("dontdelete");
					console.log("after:",$("#UserList option.dontdelete"));
				});	
			};
//			setInterval('refresh()', 1000); // Loop every 1000 milliseconds (i.e. 1 second)
//			setInterval('refreshUserList()', 5000); // Loop every 10000 milliseconds (i.e. 1 second)
			//refreshUserList();
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide(); $(".IPAddress").hide(); $(".Gateway").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".AD").show(); 
					$.get("requestdata.php", { file: 'Data/DomName.txt' },function(data){ $("#DomName").val(data);});
					$.get("requestdata.php", { file: 'Data/Domtype.txt' },function(data){ $("#Domtype").val(data);});
					$.get("requestdata.php", { file: 'Data/DCserver.txt' },function(data){ $("#DCserver").val(data);});
				};
			});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/linux.png')").text("Linux/Unix"); $(".UnLin").show();};});
			$("#Future").click(function (){ 
				if(config== 1){ config = 0; $("h2").css("background-image","url('img/future.png')").text("Box properties");$("#network").val("1") ; $(".IPAddress").show(); $(".Gateway").show(); $(".Future").show(); 
								$.get("requestdata.php", { file: 'Data/BoxName.txt' },function(data){ $("#BoxName").val(data);});
								$.get("requestdata.php", { file: 'Data/IPAddress.txt' },function(data){ $("#IPAddress").val(data);});
								$.get("requestdata.php", { file: 'Data/Gateway.txt' },function(data){ $("#Gateway").val(data);});
								$.get("requestdata.php", { file: 'Data/DNS.txt' },function(data){ $("#DNS").val(data);});
				}; 
			});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			$("#UnixAddUser").click( function (){ $.post("./pump.php", { req:"UnixAddUser", name:$("#User").val(), passwd:$("#UserPass").val() }, function (data){
				 //refreshUserList(); 
				 });
			});
			$("#UnixDelUser").click( function (){ $.post("./pump.php", { req:"UnixDelUser", name:$("#UserList option:selected").val() }, function (data){
				 //refreshUserList(); 
				 });
			});
			$("#network").change( function () {
					var value= $("#network").val();
					switch(value) {
						case "2" : $(".IPAddress").hide(); $(".Gateway").hide(); break;
						case "1" : $(".IPAddress").show(); $(".Gateway").show(); break;
					}
			});
			$("#DNSsubmit").click( function (){ 
				$("form").validator("validate");
				if($("div").hasClass("has-error")== false) {
					if($("#network").val()=="2") {
						$.post("./pump.php", { req:"HostDHCPconfig", name:$("#BoxName").val()+" "+$("#DNS").val() });
					}
					else {
						$.post("./pump.php", { req:"HostManualconfig", name:$("#BoxName").val()+" "+$("#IPAddress").val()+" "+$("#Gateway").val()+" "+$("#DNS").val() });
					}
				}
			});
			$("#ADsubmit").click( function() {
				if($("#Domtype").val()=="Domain") {
					$.post("./pump.php", { req:"DomainChange", name:$("#DomName").val()+" "+$("#Admin").val()+" "+"\""+$("#Pass").val()+"\""+" "+$("#DCserver").val() });
				}
			});
			setInterval('refreshall()', 2000);
			refreshall();
		</script>
			 
	</body>

</html>

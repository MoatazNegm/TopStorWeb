<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/ar/Login.php');}
?>
<html>
	<?php $men = 1; include "header.html"; ?>
	
							<li><a href="#" class="ADa rightli"><h4 id="AD"><span>توصيل بالوندوز</span></h4></a></li>
							<li><a href="#" class="UnLina rightli"><h4 id="UnLin"><span>مستخدمي الجهاز</span></h4></a></li>
							<li><a href="#" class="Futurea rightli"><h4 id="Future"><span>خصائص الجهاز</span></h4></a></li>
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
			var needupdate=1
			var proptime="55:55:55";
			var proptimenew="33:333:33";
			var DNS=1;
			
			function updateprop() {
				if (needupdate==1) { needupdate=0; $.post("./pump.php", { req:"HostgetIPs", name:"a" }); }	
				$.get("requestdate.php", { file: '../Data/Hostprop.txt' },function(data){ 
						var jdata=jQuery.parseJSON(data);
						proptimenew=jdata.timey;
					});
				
				if (proptimenew===proptime) {;} else {
					$.get("requestdata.php", { file: '../Data/Hostprop.txt' },function(data){ 
						var jdata=jQuery.parseJSON(data);
						$("#BoxName").val(jdata.name); $("#IPAddress").val(jdata.addr); $("#Gateway").val(jdata.rout);
						$("#DNS").val(jdata.dns);
						proptime=proptimenew;
					});
				}
			}
			function refreshall() {
				DNS=1;
			//	console.log("AD is visible : " , $(".AD").is(":visible"));
				if($(".AD").is(":visible"))
				{
					$.get("requestdata2.php", { file: '../Data/DomainChangestatus.log' }, function(data){ $("#ADstatus").val(data);});
				}
				else if($(".Future").is(":visible"))
				{
					
					$.get("requestdata2.php", { file: '../Data/HostManualconfigstatus.log' }, function(data){ $("#Futurestatus").val(data);});
				}
				else if($(".UnLin").is(":visible"))
				{
					$.get("requestdata2.php", { file: '../Data/Usersstatus.log' }, function(data){ $("#UnLinstatus").val(data);});
					refreshUserList();
				}
				$.get("requestdata3.php", { file: '../Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
			}
			function refresh4(request,field) {
				if(DNS > 0) {
					$.get("requestdata.php", { file: '../Data/'+request+'.log' }, function(data){
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
				
				$.get("statuslog.php", { file: '../Data/status.log' }, function(data){
					$("#statusarea").val(data);
					});
			}	;
			function refreshUserList() {
				var jdata;
				
				$.post("./pump.php", { req:"UnixListUsers", name:"a" }, function (data1){ 
					
					$.get("requestdata.php", { file: '../Data/listusers.txt' }, function(data){
						jdata = jQuery.parseJSON(data);
						if(Number($("#UserList option").length)+1 > 0 ) {
							$("#UserList option").each(function (i,v) { 
								for(var key in jdata) { 
									if ( key == this.value) {
										 $(this).toggleClass("dontdelete"); jdata[key]="inin"; 
									} else { 
										;
									} 
								}

							});
						}
						
						for (var key in jdata ) { 
							if(jdata[key] == "o") { $("#UserList").append($("<option class='dontdelete'>").text(key).val(key)); }
						}
					});
												
												;
					$("#UserList option").not(".dontdelete").remove();
					$("#UserList option").toggleClass("dontdelete");
					
				});	
			};
//			setInterval('refresh()', 1000); // Loop every 1000 milliseconds (i.e. 1 second)
//			setInterval('refreshUserList()', 5000); // Loop every 10000 milliseconds (i.e. 1 second)
			//refreshUserList();
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide(); $(".IPAddress").hide(); $(".Gateway").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Active_Directory
								
							}
						};
						if( userpriv=="true" | curuser=="admin" ) {
							config= 0; $("h2").css("background-image","url('../img/AD.png')").text("التوصيل بالوندوز"); $(".AD").show(); 
							$.get("requestdata.php", { file: '../Data/DomName.txt' },function(data){ $("#DomName").val(data);});
							$.get("requestdata.php", { file: '../Data/Domtype.txt' },function(data){ $("#Domtype").val(data);});
							$.get("requestdata.php", { file: '../Data/DCserver.txt' },function(data){ $("#DCserver").val(data);});
						}
					});
				};
			});
			$("#UnLin").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Box_Users
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) {
					
							config = 0; $("h2").css("background-image","url('../img/linux.png')").text("مستخدمي الجهاز"); $(".UnLin").show();
						}
					});
				};
			});
			$("#Future").click(function (){ 
				if(config== 1){
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Error
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							proptime="55:55:55";
							config = 0; $("h2").css("background-image","url('../img/future.png')").text("خصائص الجهاز");$("#network").val("1") ; $(".IPAddress").show(); $(".Gateway").show(); $(".Future").show();
							needupdate=1;
							updateprop(); 
						}
					});
				}; 
			});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			$("#UnixAddUser").click( function (){ $.post("./pump2.php", { req:"UnixAddUser", name:$("#User").val(), passwd:$("#UserPass").val()+" "+"<?php echo $_SESSION["user"]; ?>"}, function (data){
				 //refreshUserList(); 
				 });
			});
			$("#UnixDelUser").click( function (){ $.post("./pump.php", { req:"UnixDelUser", name:$("#UserList option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 //refreshUserList(); 
				 });
			});

				$("#Chapasswd").click( function (){ $.post("./pump.php", { req:"UnixChangePass", name:"'"+$("#UserPass").val()+"'", passwd:$("#UserList").val()+" "+"<?php echo $_SESSION["user"]; ?>"}, function (data){});
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
						$.post("./pump.php", { req:"HostDHCPconfig", name:$("#BoxName").val()+" "+$("#DNS").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
					}
					else {
						$.post("./pump.php", { req:"HostManualconfig", name:$("#BoxName").val()+" "+$("#IPAddress").val()+" "+$("#Gateway").val()+" "+$("#DNS").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
						needupdate=1;
					}
				}
			});
			$("#ADsubmit").click( function() {
				if($("#Domtype").val()=="Domain") {
					$.post("./pump.php", { req:"DomainChange", name:$("#DomName").val()+" "+$("#Admin").val()+" "+"\""+$("#Pass").val()+"\""+" "+$("#DCserver").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
				} 
				else {
					$.post("./pump.php", { req:"DomainChangeWorkgrp", name:$("#DomName").val()+" "+$("#Admin").val()+" "+"\""+$("#Pass").val()+"\""+" "+$("#DCserver").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
				} 
			});
			setInterval('refreshall()', 500);
			refreshall();
		</script>
			 
	</body>

</html>

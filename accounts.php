<!DOCTYPE html>
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
				if(DNS > 0) {
					refresh4("boxname","#BoxName");
					refresh4("IPAddress","#IPAddress");
					refresh4("Gateway","#Gateway");
					refresh4("DNS","#DNS");
					refresh4("network","#network");
					
				
				//	Voldirtytable();
				DNS=0;
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
					console.log(field,request,data,$("#network").val());
					});
					
				}
			}	
						
			function refresh() {
				
				$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$("#statusarea").val(data);
					});
			}	;
			function refreshUserList() {
				$.post("./pump.php", { req:"UnixListUsers", name:"a" }, function (data1){
					$('#UserList option').remove();
					$.get("statuslog.php", { file: 'Data/listusers.txt' }, function(data){
						var jdata = jQuery.parseJSON(data);
						
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							$('#UserList').append($('<option>').text(i).val(i));
						});
					});
				});
			};
//			setInterval('refresh()', 1000); // Loop every 1000 milliseconds (i.e. 1 second)
//			setInterval('refreshUserList()', 5000); // Loop every 10000 milliseconds (i.e. 1 second)
			refreshUserList();
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide(); $(".IPAddress").hide(); $(".Gateway").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".AD").show(); };});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/linux.png')").text("Linux/Unix"); $(".UnLin").show();};});
			$("#Future").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/future.png')").text("Box properties");DNS=1;refreshall(); $(".Future").show();};});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			$("#UnixAddUser").click( function (){ $.post("./pump.php", { req:"UnixAddUser", name:$("#User").val(), passwd:$("#UserPass").val() }, function (data){
				 refreshUserList(); 
				 });
			});
			$("#UnixDelUser").click( function (){ $.post("./pump.php", { req:"UnixDelUser", name:$("#UserList option:selected").val() }, function (data){
				 refreshUserList(); 
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
						$.post("./pump.php", { req:"DHCPconfig", name:$("#BoxName").val()+" "+$("#DNS").val() });
					}
					else {
						$.post("./pump.php", { req:"Manualconfig", name:$("#BoxName").val()+" "+$("#IPAddress").val()+" "+$("#Gateway").val()+" "+$("#DNS").val() });
					}
				}
			});
			//setInterval('refreshall()', 2000);
			refreshall();
		</script>
			 
	</body>

</html>

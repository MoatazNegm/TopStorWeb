<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/des19/Login.php');}
 
?>
<html>
	<?php $men= 6; include "header.html"; ?>
	
							<li><a href="#" class="UserPrivilegesa rightli"><h4 id="UserPrivileges"><span>User Priviliges</span></h4></a></li>
							<li><a href="#" class="SnapShotsa rightli"><h4 id="SnapShots"><span>SnapShots</span></h4></a></li>
						</ul>
						<?php include "UserPrivileges.php"; ?>
					
					</div>
				</div>
			</div>
			
		<div class="row">
			<footer class="footer"> Errors
			</footer>
		</div>
			
		
		<script src="js/bootstrap-timepicker.js"></script>
		<script>
			var needupdate=1
			var proptime="55:55:55";
			var proptimenew="33:333:33";
			var DNS=1;
			$(".UserPrivileges").hide();
			$(".finish").click(function (){ $(".checkboxy").each(function(){ $(this).prop("checked",false)});
																				$(".UserPrivileges").hide(); $(".UserPrivileges").hide();});
			$("#UserPrivileges").click(function (){   $("h2").css("background-image","url('img/snapshot.png')").text("User Privileges");  $("option.variable").remove(); proptime="44:333:22";; $(".UserPrivileges").show();refreshall();});
			function refreshall() {
				DNS=1;
		//	console.log("AD is visible : " , $(".AD").is(":visible"));
			if($(".AD").is(":visible")){
				$.get("requestdata.php", { file: 'Data/status.log' }, function(data){ $("#ADstatus").val(data);});
			}
			else if($(".Future").is(":visible")) {
				$.get("requestdata.php", { file: 'Data/status.log' }, function(data){ $("#Futurestatus").val(data);});
			}
			else if($(".UserPrivileges").is(":visible")) {
				refreshUserList();
				var objdate;
				$.get("requestdatein.php", { file: 'Data/userprivdate.txt' }, function(data){ 
				var objdate = jQuery.parseJSON(data);
				proptimenew=objdate.updated });
				
				if(proptimenew == proptime) { }
				else {
					proptime=proptimenew;
				var gdata;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' }, function(data){ 
						gdata=jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==$("#UserList option:selected").val()) {
								$.each(gdata[prot], function(key,value){ if(value=="yes") {$("#"+key).prop('checked',true)} else {$("#"+key).prop('checked',false)};});
							}
						}
					});
				}
			}

	}
			function refreshUserList() {
				var jdata;
				
				$.post("./pump.php", { req:"UnixListUsers", name:"a" }, function (data1){ 
					
					$.get("requestdata.php", { file: 'Data/listusers.txt' }, function(data){
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
			$("#SubmitPriv").click( function (){ 
				
				sm="user"+" "+$("#UserList option:selected").val()+" ";
				$(".checkboxy").each(function (){if ($(this).prop('checked')){ sm=sm+$(this).attr('id')+" ";}});
				$.post("./pump.php", { req:"Priv", name:sm+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("#statusarea2");
		});
	 });
			$("#UserList").change(function(){
				$(".checkboxy").each(function(){ $(this).prop("checked",false)});
				proptime="44:333:22";
				});
			setInterval('refreshall()', 500);
			refreshUserList();
			refreshall();
		</script>
		
	</body>

</html>

<!DOCTYPE html>
<html>
	<?php $men = 1; include "header.html"; ?>
	
							<li><a href="#" class="ADa rightli"><h4 id="AD"><span>Active Directory</span></h4></a></li>
							<li><a href="#" class="UnLina rightli"><h4 id="UnLin"><span>Unix/Linux users</span></h4></a></li>
							<li><a href="#" class="Futurea rightli"><h4 id="Future"><span> .........Future</span></h4></a></li>
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
		<script src="jquery/jquery.js"></script>
		<script src="jquery-ui/jquery-ui.js"></script>
		<script src="jquery/jquery.datetimepicker.js"></script>
		<script src="Bootstrap/js/bootstrap.min.js"></script>
		<script src="InitColor.js"></script>
		<script>
			function refresh() {
				
				$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$("#statusarea").val(data);
					});
			}	;
			function refreshUserList() {
				$.post("./pump.php", { req:"UnixListUsers", name:$("NA").val() }, function (data1){
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
			setInterval('refresh()', 1000); // Loop every 1000 milliseconds (i.e. 1 second)
			setInterval('refreshUserList()', 30000); // Loop every 10000 milliseconds (i.e. 1 second)
			refreshUserList();
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".AD").show(); };});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/linux.png')").text("Linux/Unix"); $(".UnLin").show();};});
			$("#Future").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/future.png')").text("Future"); $(".Future").show();};});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			$("#UnixAddUser").click( function (){ $.post("./pump.php", { req:"UnixAddUser", name:$("#User").val(), passwd:$("#UserPass").val() }, function (data){
				 refreshUserList(); 
				 });
			});
			$("#UnixDelUser").click( function (){ $.post("./pump.php", { req:"UnixDelUser", name:$("#UserList option:selected").val() }, function (data){
				 refreshUserList(); 
				 });
			});
			
		</script>
			 <?php  include "footer.php"; ?>
	</body>

</html>

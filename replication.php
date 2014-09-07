<!DOCTYPE html>
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
		<script src="jquery/jquery.js"></script>
		<script src="jquery-ui/jquery-ui.js"></script>
		<script src="jquery/jquery.datetimepicker.js"></script>
		<script src="Bootstrap/js/bootstrap.min.js"></script>
		<script>
		
			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".DiskGroups").hide(); $(".SnapShots").hide(); 
			$("#DiskGroups").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); $(".DiskGroups").show(); };});
			$("#SnapShots").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/snapshot.png')").text("SnapShots"); $(".SnapShots").show();};});
			$(".finish").click(function (){ config = 1; $(".DiskGroups").hide(); $(".SnapShots").hide();});
			
			$("#DTime").datetimepicker({step: 15});
			$("#STime").datetimepicker({step: 15});$("#Hour").datetimepicker({ datepicker: false, format:'H'});
			$("#SMinute").datetimepicker({step: 15});$("#Minute").datetimepicker({ datepicker: false, format:'i', step:2});
			$("#SWeek").datetimepicker({step: 15});
			
			$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
			$("#Once").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Onceset").show();
			});
			$("#Hourly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();$("#SWeek").datetimepicker("hide");
				$("#Hourlyset").show();
			});
			$("#Minutely").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();$("#SWeek").datetimepicker("hide");
				$("#Minutelyset").show();
			});
			$("#Weekly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Weeklyset").show();
			})
			
		</script>

	</body>

</html>

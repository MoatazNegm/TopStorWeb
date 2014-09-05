<!DOCTYPE html>
<html>
	<?php $men=2; include "header.html"; ?>
	
							<li><a href="#" class="SSa rightli"><h4 id="SS"><span>Services Status</span></h4></a></li>
							<li><a href="#" class="Logsa rightli"><h4 id="Logs"><span>Logs</span></h4></a></li>
						</ul>
						<?php include "SS.php" ?>
						<?php include "Logs.php" ?>
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
		<script>
			var config = 1;
			$(".SS").hide(); $(".Logs").hide(); 
			$("#SS").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/SS.png')").text("Service Status"); $(".SS").show(); };});
			$("#Logs").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/logs.png')").text("Logs"); $(".Logs").show();};});
			$(".finish").click(function (){ config = 1; $(".SS").hide(); $(".Logs").hide();});
						
			var d1 = [];
			for (var i = 0; i < 14; i += 0.5) {
				d1.push([i, Math.sin(i)]);
			};
			
			$.plot("#placeholder", [{
			data: d1,
			lines: { show: true, fill: false }
		}]);

	

		</script>
 
	</body>

</html>

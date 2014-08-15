<!DOCTYPE html>
<html>
	<?php include "header.html"; ?>
	<body>

	<?php include "menu.php?men=1"; ?> 	
<!------------  NAV Bar --------------->
		<div class="container-fluid">
			<div class="row">
				<div class="img-logo ">
					<div class="col-sm-3">
						<a class="pull-left logoimg" href="#">
							<img src="img/logo2.png" height="200" width="200" class="img-responsive"> 
						</a>
					</div>
					<div class="col-sm-6">
						<h1 class="text-center maintext"><strong>Flex Storage</strong></h1>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="">
					<?php $men = 1; include "menu.php"; ?> 
					<div class="col-sm-11 rightPane">
						<ul>
							<li><a href="#" class="ADa"><h4 id="AD"><span>Active Directory</span></h4></a></li>
							<li><a href="#" class="UnLina"><h4 id="UnLin"><span>Unix/Linux users</span></h4></a></li>
							<li><a href="#" class="Futurea"><h4 id="Future"><span> .........Future</span></h4></a></li>
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

		<script src="jquery/jquery.js"></script>
		<script src="jquery-ui/jquery-ui.js"></script>
		<script src="jquery/jquery.datetimepicker.js"></script>
		<script src="Bootstrap/js/bootstrap.min.js"></script>
		<script>
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".AD").show(); };});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/linux.png')").text("Linux/Unix"); $(".UnLin").show();};});
			$("#Future").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/future.png')").text("Future"); $(".Future").show();};});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			
		</script>

	</body>

</html>

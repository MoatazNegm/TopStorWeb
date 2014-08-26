<!DOCTYPE html>
<html>
	<?php include "header.html"; ?>
		<body class="" >

	<div class="colorize" id="body" Data-id="body" Data-textcolor="No" Data-background="yes" Data-border="No" >
<!------------  NAV Bar --------------->
		<div class="container-fluid ">
			<div class="row colorize" id="caption" Data-id="caption" Data-textcolor="no" Data-background="yes" Data-border="no">
				<div class="img-logo ">
					<div class="col-sm-3">
						<a class="pull-left logoimg " href="#">
							<img src="img/logo2.png" height="200" width="200" class="img-responsive"> 
						</a>
					</div>
					<div class="col-sm-6">
						<h1 class="text-center maintext colorize" id="Title" Data-id="Title" Data-textcolor="yes" Data-background="no" Data-border="no" ><strong>	<?php echo " Flex Storage"; ?></strong></h1>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="" >
					<div ><?php $men = 6; include "menu.php"; ?> 
					</div>	
					
					<div class="col-sm-11 rightPane " id="rightPane" >
					
						<ul class=""  >
							<li><a id="List" href="#" ><h4  class="colorize" Data-id="List" Data-textcolor="yes" Data-background="no" Data-border="no"id="colorizethis"><span> Colorize List</span></h4></a></li>
							<li><a href="#" class="ADa "><h4 id="AD"><span>Active Directory</span></h4></a></li>
							<li><a   href="#" class="UnLina"><h4 id="UnLin"><span>Unix/Linux users</span></h4></a></li>
							<li><a href="#" class="Futurea"><h4 id="Future"><span> .........Future</span></h4></a></li>
						</ul>
						<ul  > 
							<li ><a class="colorize " Data-id="rightPane" Data-textcolor="no" Data-background="yes" Data-border="no" href="#" ><h4 id="AD"><span>Colorize RightPane</span></h4></a></li>
							
						</ul>
					
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
		
		
		
	
		<script>
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".AD").show(); };});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/linux.png')").text("Linux/Unix"); $(".UnLin").show();};});
			$("#Future").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/future.png')").text("Future"); $(".Future").show();};});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			
		</script>
		 <?php include "colorize.php"; ?>
		 <?php include "InitColor.php";?>
		 <script> console.log("$('"+"dkdk"+"').css('background-color',"+"'dslks'"+");");</script>
			
	</body>

</html>

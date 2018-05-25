<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
?>
<html class="bodydiv">

	<?php $men=7;include "header3.html"; ?>

							<li><a href="#" class="ADa rightli"><h4 id="AD"><span>Active Directory</span></h4></a></li>
							<li><a href="#" class="Logsa righStli"><h4 id="Logs"><span>Logs</span></h4></a></li>
							<li><a href="#" class="CIFSa rightli"><h4 id="CIFS"><span>CIFS</span></h4></a></li>
							
							
							
						</ul>
						<ul class="ullis" > 
							<li><a id="List" href="#" ><h4  class=" colorize rightli" Data-tag=".rightli" Data-id="List" Data-textcolor="yes" Data-background="no" Data-border="no" id="colorizethis"><span> Colorize List</span></h4></a></li>
							<li ><a class="colorize rightli " Data-tag="#rightPane" Data-id="rightPane" Data-textcolor="yes" Data-background="yes" Data-border="yes" href="#" ><h4 ><span>Colorize RightPane</span></h4></a></li>
							<li ><a class="colorize rightli " Data-tag=".leftPane" Data-id="leftPane" Data-textcolor="yes" Data-background="yes" Data-border="yes" href="#" ><h4 ><span>Colorize LeftPane</span></h4></a></li>

							<li ><a class="colorize rightli " Data-tag="li.active a" Data-id="menuActiveElement" Data-textcolor="yes" Data-background="yes" Data-border="yes" href="#" ><h4 ><span>MenuActiveElement</span></h4></a></li>
							
							
							
						</ul>
					

						<?php include "AD.php"; ?>
						<?php include "Logscolor.php" ?>
						<?php include "NFScolor.php"; ?>
						<?php include "SScolorize.php" ?>
					
					</div>
					<div class="col-sm-3 colorpane" id="colorpane" Data-tag="#colorpane" Data-id="colorpane" Data-textcolor="no" Data-background="no" Data-border="no">
						<?php include "colorize.php"; ?>
					</div>
					  
					
								
					
					
				
				</div>
					</div>
			
		

	</div>
	
	<div class=" prefooter colorize"  id="prefooter" Data-tag=".prefooter" Data-id="footer" Data-textcolor="yes" Data-background="yes" Data-border="yes">
				<footer class="footer prefooter colorize" id="footer" Data-tag=".footer" Data-id="footer" Data-textcolor="yes" Data-background="yes" Data-border="yes"> Errors
				</footer>
			</div>
	
	</div>	
		<script src="js/jquery.js"></script>
		<script src="js/jquery-ui.js"></script>
		<script src="js/jquery.datetimepicker.js"></script>
		<script src="js/bootstrap.min.js"></script>
		
		
		
	
		<script>
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();$(".SS").hide();$(".Logs").hide();$(".NFS").hide();$(".Paneloption").hide();$(".finish").hide()
			$("#AD").click(function (){ if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".ullis").hide();$(".finish").show(); $(".AD").show(); };});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/linux.png')"); $(".ullis").hide();$(".finish").show();$(".UnLin").show();};});
			$("#Future").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/future.png')").text("Future");$(".ullis").hide();$(".finish").show(); $(".Future").show();};});
			$("#SS").click(function (){ if(config== 1){ config= 0; $("h2").css("background-image","url('img/SS.png')").text("Service Status");$(".ullis").hide();$(".finish").show();; $(".SS").show();};});
			$("#Logs").click(function (){ if(config== 1){ config= 0; $("h2").css("background-image","url('img/logs.png')").text("Logs"); $(".ullis").hide();$(".finish").show();$(".Logs").show();$("#Voldetails").show();};});
			$("#CIFS").click(function (){ if(config== 1){ config= 0; $("h2").css("background-image","url('img/cifs.png')").text("CIFS"); $(".ullis").hide();$(".finish").show();$(".NFS").show();$("#Vollist").show();};});
			
			$(".finish").click(function (){ config = 1;$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();$(".SS").hide();$(".Logs").hide();$(".NFS").hide(); $(".ullis").show();$(".finish").hide();});
			
			
		</script>
 
			
	</body>

</html>

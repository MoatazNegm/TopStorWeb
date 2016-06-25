<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/ar/Login.php');}
 
?>
<html>

	<?php $men=7;include "header.html"; ?>

							
							<li><a href="#" class="rightli ADa "><h4 id="AD"><span>التوصيل بالوندوز</span></h4></a></li>
							<li><a   href="#" class="rightli UnLina"><h4 id="UnLin"><span>مستخدمي الجهاز</span></h4></a></li>
							<li><a href="#" class="rightli Futurea"><h4 id="Future"><span>خصائص الجهاز</span></h4></a></li>
						</ul>
						<ul  > 
							<li><a id="List" href="#" ><h4  class=" colorize" Data-tag=".rightli" Data-id="List" Data-textcolor="yes" Data-background="no" Data-border="no" id="colorizethis"><span> قائمة التلوين</span></h4></a></li>
							<li ><a class="colorize " Data-tag="#rightPane" Data-id="rightPane" Data-textcolor="no" Data-background="yes" Data-border="no" href="#" ><h4 id="AD"><span>تلوين الجزء الأيسر</span></h4></a></li>
							
							
							
						</ul>
					
						<?php include "AD.php"; ?>
						<?php include "UnLin.php"; ?>
					</div>
					
				</div>
			
		
			
					</div>
	</div>
	<div class=" prefooter colorize"  id="prefooter" Data-tag=".prefooter" Data-id="prefooter" Data-textcolor="yes" Data-background="yes" Data-border="yes">
				<footer class="footer colorize" id="footer" Data-tag=".footer" Data-id="footer" Data-textcolor="yes" Data-background="yes" Data-border="yes"> مشاكل
				</footer>
			</div>
	
	</div>	
		<script src="../js/jquery.js"></script>
		<script src="../js/jquery-ui.js"></script>
		<script src="../js/jquery.datetimepicker.js"></script>
		<script src="../js/bootstrap.min.js"></script>
		
		
		
	
		<script>
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('../img/AD.png')").text("التوصيل بالوندوز"); $(".AD").show(); };});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('../img/linux.png')").text("مستخدمي الجهاز"); $(".UnLin").show();};});
			$("#Future").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('../img/future.png')").text("حصائص الجهاز"); $(".Future").show();};});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			$(".AD").draggable();
			
		</script>
 <?php include "colorize.php"; ?> 
	
		 <script> console.log("$('"+"dkdk"+"').css('background-color',"+"'dslks'"+");");</script>
			
	</body>

</html>

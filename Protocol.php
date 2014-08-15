<!DOCTYPE html>
<html>
	<?php include "header.html"; ?>
	<body>

		
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
					<?php $men = 3; include "menu.php"; ?>
					<div class="col-sm-11 rightPane">
						<ul>
							<li><a href="#" class="CIFSa"><h4 id="CIFS"><span>CIFS</span></h4></a></li>
							<li><a href="#" class="NFSa"><h4 id="NFS"><span>NFS</span></h4></a></li>
							<li><a href="#" class="ISCSIa"><h4 id="ISCSI"><span>ISCSI</span></h4></a></li>
						</ul>
						<?php include "CIFS.php"; ?>
						<?php include "NFS.php"; ?>
						<?php include "ISCSI.php"; ?>
					</div>
				</div>
			</div>
			
		</div>
			
		<div class="row">
			<footer class="footer"> Errors
			</footer>
		</div>



			<!-- Don't touch this! -->

		<script src="jquery/jquery.js"></script>
		<script src="jquery-ui/jquery-ui.js"></script>
		<script src="jquery/jquery.datetimepicker.js"></script>
		<script src="Bootstrap/js/bootstrap.min.js"></script>
    <script class="include" type="text/javascript" src="jqplot/jquery.jqplot.min.js"></script>
<!-- End Don't touch this! -->

<!-- Additional plugins go here -->

    <script class="include" language="javascript" type="text/javascript" src="jqplot/plugins/jqplot.pieRenderer.min.js"></script>


<!-- End additional plugins -->
		<script>
			function plotchart(chart){
				var data = [
					['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
					['Out of home', 16],['Commuting', 7], ['Orientation', 9]
				];
				var plot1 = jQuery.jqplot (chart, [data], 
					{ 
						seriesDefaults: {
							// Make this a pie chart.
							renderer: jQuery.jqplot.PieRenderer, 
							rendererOptions: {
								// Put data labels on the pie slices.
								// By default, labels show the percentage of the slice.
								showDataLabels: true
							}
						}, 
						legend: { show:false, location: 'e'},
						grid: { background: "transparent", borderColor: "transparent", shadow: false }
					}
				);
			}
			
			var config = 1;
			$(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide();
			$("#CIFS").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/cifs.png')").text("CIFS"); $(".CIFS").show(); plotchart('chartCIFS'); };});
			$("#NFS").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/nfs.png')").text("NFS"); $(".NFS").show(); plotchart('chartNFS');};});
			$("#ISCSI").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/iscsi2.png')").text("ISCSI"); $(".ISCSI").show(); plotchart('chartISCSI');};});
			$(".finish").click(function (){ config = 1; $(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide();});
			
		</script>
	<script class="" type="text/javascript">
	
</script>

	</body>

</html>

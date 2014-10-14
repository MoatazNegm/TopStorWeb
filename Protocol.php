<!DOCTYPE html>
<html>
	<?php $men=3;  include "header.html"; ?>
	
							<li><a href="#" class="CIFSa rightli"><h4 id="CIFS"><span>CIFS</span></h4></a></li>
							<li><a href="#" class="NFSa rightli"><h4 id="NFS"><span>NFS</span></h4></a></li>
							<li><a href="#" class="ISCSIa rightli"><h4 id="ISCSI"><span>ISCSI</span></h4></a></li>
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
  </div>


			<!-- Don't touch this! -->

		
    <script class="include" type="text/javascript" src="jqplot/jquery.jqplot.min.js"></script>
<!-- End Don't touch this! -->

<!-- Additional plugins go here -->

    <script class="include" language="javascript" type="text/javascript" src="jqplot/plugins/jqplot.pieRenderer.min.js"></script>


<!-- End additional plugins -->
		<script>
			function volumetable(i,v) {
				var res = i.split("_");
				$("#Volumetable").append('<tr onclick="rowisclicked(this)"><td>'+v+'</td><td>'+res[0]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td></tr>');
			};
			function refreshList(req,listid,fileloc,show) {
				$.post("./pump.php", { req: req, name:"a" }, function (data1){
					$(listid+' option').remove();
					$.get("statuslog.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						
						if(show == 5.5) { 
							$("#Volumetable tr").remove();
							$(listid).append($('<option class=" small" >').text("<<new>>").val("newoption")); $(listid).append($('<option class=" small">').text("<<ALL>>").val("alloption")); 
						 };
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							if(show < 2) { $(listid).append($('<option>').text(i).val(v));}
							else if(show < 10 ){ if (show == 5.5) {  volumetable(i,v);} $(listid).append($('<option>').text(v).val(v)); }
							else if(show < 13) { $(listid).append($('<option>').text(i+":"+v).val(i)); }
							else { $(listid).append($('<option>').text(i).val(i)); }
						});
					});
				});
			};
			function SelectPanelNFS(s) {
				var selection = s;
				if (selection == "o") { selection = $("#Vol option:selected").val(); };
				console.log(selection);
				$(".Paneloption").hide();
				switch(selection) {
				case "newoption" :  $("#createvol").show(); break;
				case "alloption" : $("#Vollist").show(); break;
				};
			};
			
			refreshList("GetPoolVollist","#Vol","Data/Vollist.txt",5.5);
			function rowisclicked(x) {
				//alert("Row index is: " + x.rowIndex);
				$(x).toggleClass("success");
				$(function(){ var a=0; var b=0; var c=0; $("tr.success").each(function(){ a+=parseFloat($(this).children("td:nth-child(2)").text()); b+=parseFloat($(this).children("td:nth-child(3)").text());  c+=parseFloat($(this).children("td:nth-child(4)").text());}); console.log(b); $("#a").text(a.toFixed(2));$("#b").text(b.toFixed(2));$("#c").text(c.toFixed(2));});
				}
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
			$( "#Vol" ).change(function() {
				var selection=$("#Vol option:selected").val();
				SelectPanelNFS(selection);
			});
			SelectPanelNFS("o");
		</script>
	

	</body>

</html>

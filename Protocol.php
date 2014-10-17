<!DOCTYPE html>
<html>
	<?php $men=3;  include "header.html"; ?>
	
							<li><a href="#" class="CIFSa rightli"><h4 id="CIFS"><span>CIFS</span></h4></a></li>
							<li><a href="#" class="NFSa rightli"><h4 id="NFS"><span>NFS</span></h4></a></li>
							<li><a href="#" class="ISCSIa rightli"><h4 id="ISCSI"><span>ISCSI</span></h4></a></li>
						</ul>
						<div id="CIFScode"><?php include "CIFS.php"; ?></div>
						<div id="NFScont"><div id="NfScode"><?php include "NFS.php"; ?></div></div>
						<div id="ISCSIcode"><?php include "ISCSI.php"; ?></div>
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

		
	<script language="javascript" type="text/javascript" src="jqplot/excanvas.js"></script>
	<script language="javascript" type="text/javascript" src="jqplot/jquery.jqplot.min.js"></script>
	<link rel="stylesheet" type="text/css" href="jqplot/jquery.jqplot.css" />
<!-- End Don't touch this! -->

<!-- Additional plugins go here -->

    <script class="include" language="javascript" type="text/javascript" src="jqplot/plugins/jqplot.pieRenderer.min.js"></script>


<!-- End additional plugins -->
		<script>
			var Protocol=0;
			var chartdata = [
					['Heavy ', 12],['Retail', 9], ['Light ', 14], 
					['Outofhome', 16],['Commuting', 7], ['Orientation', 9]
				];
			var voldirty=1;
			var Vollock=0
			function Initclickedprotocol() {
				
				voldirty= 1; config = 0; 
				$("#chartNFS").children().remove(); $("#Volumetable tr").remove();
				$(".New").prop("selected","selected");
				$("#Vollist").hide(); 
				$("#Voldetails").hide();
				$("#createvol").show();
				
			}
			function Voldirtytable() {
				if(Protocol > 0 ){
					
					if (($("#Volumetable tr").length == ($("#Vol2").children().length - 2)) && ($("#chartNFS tr").length == ($("#Vol2").children().length - 2)) ) { ; } else {
						if (chartdata.length > 0) {
							voldirty=0;
							$("#chartNFS").children().remove();
							plotchart('chartNFS',chartdata);
							
							
							console.log("trying to chart");
						$("#Volumetable tr").remove();
						chartdata=[];
						refreshList2("GetPoolVollist","#Volumetable tr","Data/Vollist.txt",20);
						
						}
						
						
					}
				}
			}
			
			function refresh3(textareaid) {
				if(Protocol > 0) {
					$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$(textareaid).val(data);
					});
				}
			}	;
			function volumetable(i,v) {
				var res = i.split("_");
				$("#Volumetable").append('<tr onclick="rowisclicked(this)" ><td class="Volname">'+v+'</td><td>'+res[0]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td></tr>');
				chartdata.push([v,parseFloat(res[0])]);
			};
			function volumetabledetails(i,v) {
				var res = i.split("_");
				$("#Volumedetails > tbody").append('<tr onclick="rowisclicked(this)"><td>'+res[0]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+res[3]+'</td><td>'+res[4]+'</td><td>'+res[5]+'</td><td>'+res[6]+'</td><td>'+res[7]+'</td></tr>');
			};
			function refreshList2(req,listid,filelocfrom,show) {
				if(Protocol > 0) {
					var fileloc=filelocfrom;
					if(Protocol == 1) { fileloc = filelocfrom + "CIFS"; console.log(fileloc);};
					$.post("./pump.php", { req: req, name:"a" }, function (data1){
						//$(listid+' option').remove();
						$.get("statuslog.php", { file: fileloc }, function(data){
							var jdata = jQuery.parseJSON(data);
							counter=0;
							if(show == 3) { $(listid+" option").addClass("deleteit"); }
							if(show == 5.5) { 
								
								$(listid+" option").addClass("deleteit");
								$(listid+" option:nth-child(1)").removeClass("deleteit");
								$(listid+" option:nth-child(2)").removeClass("deleteit");
								//$(listid).append($('<option class=" small" >').text("<<new>>").val("newoption")); $(listid).append($('<option class=" small">').text("<<ALL>>").val("alloption")); 
								counter=2;
							};
							 datacount=0;
							$.each(jdata, function(i,v) {
								counter+=1;
								datacount+=1;
								
								//console.log(fileloc,i,v);
								if(show < 2) { $(listid).append($('<option>').text(i).val(v));}
								else if(show < 10 ){ 
									if ( $(listid+" option:nth-child("+counter+")").text() == v ) { 
										$(listid+" option:nth-child("+counter+")").removeClass("deleteit"); //console.log ("counter= "+counter+" "+v);
									}
									else { 
											voldirty=3; console.log (voldirty+" voldirty"); 
										 $(listid+" option:nth-child("+counter+")").remove();$(listid).append($('<option>').text(v).val(v));
									}
								}
								else if(show < 13) { $(listid).append($('<option>').text(i+":"+v).val(i));  }
								else if( show == 20) { volumetable(i,v);}
									else { $(listid).append($('<option>').text(i).val(i)); }
							});

							if (show < 10 ) { $(listid+" option.deleteit").remove(); if(voldirty==3) { voldirty=1; } }
							
						});
					});
				}
			};
			function SelectPanelNFS(s) {
				var selection = s;
				if (selection == "o") { selection = $("#Vol2 option:selected").val(); };
				//console.log(selection);
				$(".Paneloption").hide();
				switch(selection) {
				case "newoption" :  $("#createvol").show(); break;
				case "alloption" : $("tr.success").removeClass("success");rowisclicked(); $("#Vollist").show(); break;
				default: 
						var fileloc= "Data/Vollist.txt";
						if (Protocol == 1) { fileloc = fileloc + "CIFS" };
						$.get("statuslog.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						$("#Volumedetails > tbody tr").remove();
						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							if( selection == v ) { volumetabledetails(i,v); };
							
						});
						$("#Volumnamedetails").text(selection+" details");
						$("#Voldetails").show();
					});
				};
			};
			
			
			function rowisclicked(x) {
				//alert("Row index is: " + x.rowIndex);
				$(x).toggleClass("success");
				var counter=0;
				$(function(){ var a=0; var b=0; var c=0;  $("tr.success").each(function(){ 
					
					if ($("tr.success").length == 1) { counter=1;  } else { counter=0;  };
					a+=parseFloat($(this).children("td:nth-child(2)").text()); b+=parseFloat($(this).children("td:nth-child(3)").text());  c+=parseFloat($(this).children("td:nth-child(4)").text());});  $("#a").text(a.toFixed(2));$("#b").text(b.toFixed(2));$("#c").text(c.toFixed(2));});
				if( counter == 0 ){  console.log("not 1",+voldirty); $("#disableddiv2").show(); $("#Voldelete").hide();  
				} else {  console.log(" 1") ;$("#Voldelete").show(); $("#disableddiv2").hide(); };
				}
			function plotchart(chart,data){
				
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
						legend: { show:true, location: 'w', marginRight: '5rem', placement: 'outside', border: "none"},
						grid: { background: "transparent", borderColor: "transparent", shadow: false }
					}
				);
			}
			
			var config = 1;
			
			$(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide();
			$("#CIFS").click(function (){ 
				if(config == 1 ) { Protocol=1; 
					Initclickedprotocol();
					$("h2").css("background-image","url('img/cifs.png')").text("CIFS"); $(".NFS").show();
					//plotchart('chartNFS',chartdata);
				};
			});
			$("#NFS").click(function (){
				if(config== 1){  Protocol=2; 
					Initclickedprotocol();
					$("h2").css("background-image","url('img/nfs.png')").text("NFS"); $(".NFS").show();
					//plotchart('chartNFS',chartdata);
				};
			});
			$("#ISCSI").click(function (){  if(config== 1){ Protocol=3; config = 0; $("h2").css("background-image","url('img/iscsi2.png')").text("ISCSI"); $(".ISCSI").show(); plotchart('chartISCSI',chartdata);};});
			$(".finish").click(function (){ Protocol=0; config = 1; $(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide();});
			$( "#Vol2" ).change(function() {
				var selection=$("#Vol2 option:selected").val();
				SelectPanelNFS(selection);
			});
			SelectPanelNFS("o");
			$("#Voldelete").click( function (){ $.post("./pump.php", { req:"VolumeDelete", name:$("#Pool2 option:selected").val()+" "+$("tr.success td.Volname").text() }, function (data){
				 refresh3("#statusarea4"); 
				 });
			});
			$("#Createvol").click( function (){ $.post("./pump.php", { req:"VolumeCreate", name:$("#Pool2 option:selected").val()+" "+" "+$("#Volname").val()+" "+$("#volsize").val() }, function (data){
				 refresh3("#statusarea3"); 
				 });
			});
			
			setInterval('refresh3("#statusarea4")', 1000);
			setInterval('refresh3("#statusarea3")', 1000);
			setInterval('refreshList2("GetPoollist","#Pool2","Data/Poollist.txt",3);', 1000);
			setInterval('Voldirtytable()', 500);
			setInterval('refreshList2("GetPoolVollist","#Vol2","Data/Vollist.txt",5.5);', 1000);
			refreshList2("GetPoollist","#Pool2","Data/Poollist.txt",3);
			refreshList2("GetPoolVollist","#Vol2","Data/Vollist.txt",5.5);
			
			
		</script>
	

	</body>

</html>

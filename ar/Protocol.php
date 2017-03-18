<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/ar/Login.php');}
 
?>
<html>
	<?php $men=3;  include "header.html"; ?>
	
							<li><a href="#" class="CIFSa rightli"><h4 id="CIFS"><span>أقراص ويندوز</span></h4></a></li>
							<li><a href="#" class="NFSa rightli"><h4 id="NFS"><span>أقراص لينكس</span></h4></a></li>
							<li><a href="#" class="ISCSIa rightli"><h4 id="ISCSI"><span>الأقراص المباشرة</span></h4></a></li>
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

		
	<script language="javascript" type="text/javascript" src="../js/excanvas.js"></script>
	<script language="javascript" type="text/javascript" src="../js/jquery.jqplot.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../css/jquery.jqplot.css" />
<!-- End Don't touch this! -->

<!-- Additional plugins go here -->

    <script class="include" language="javascript" type="text/javascript" src="../js/jqplot.pieRenderer.min.js"></script>


<!-- End additional plugins -->
		<script>
			var plotflag = 0;
			var Protocol=0;
			var config = 1;
			var gdata;
			var Vollisttime = "55:55:44";
			var Vollisttimenew = "333:5455:4w344";
			var syscounter2=1000;
			var chartdata = [
					['Heavy ', 12],['Retail', 9], ['Light ', 14], 
					['Outofhome', 16],['Commuting', 7], ['Orientation', 9]
				];
			
			var voldirty=1;
			var Vollock=0;
			var plotb;
			function refreshall() {
				$.get("requestdata3.php", { file: '../Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
				if(Protocol != 0) {
					refreshList2("GetPoolVollist","#Volumetable","../Data/Vollist.txt","Volumes");
					refresh3("#statusarea3");
					//refreshList2("GetPoollist","#Pool2","../Data/Poollist.txt","Pool");
					//Voldirtytable();
				}
				if(syscounter2==1000) { syscounter2=0; } else { syscounter2=syscounter2+1; }
			}
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
					
					if (voldirty == 0 && (($("#Volumetable tr").length == ($("#Vol2").children().length - 2)) && ($("#chartNFS tr").length == ($("#Vol2").children().length - 2))) ) { ; } else {
						if (chartdata.length > 0) {
							voldirty=0;
							$("#chartNFS").children().remove();
							plotchart('chartNFS',chartdata);
							
							
							//console.log("trying to chart");
						$("#Volumetable tr").remove();
						chartdata=[];
						//refreshList2("GetPoolVollist","#Volumetable tr","../Data/Vollist2.txt",20);
						
						}
						
						
					}
				}
			}
			
			function refresh3(textareaid) {
				
					$.get("requestdata2.php", { file: '../Data/'+Protocol+'status.log' }, function(data){
					$(textareaid).val(data);
					});
			
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
				var fileloc=filelocfrom;
				var request=req;
				
				fileloc = filelocfrom ; request= request ; 
				if(syscounter2==1000){$.post("./pump.php", { req: request, name:"a" }); }
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;
					//console.log("Vollisttimenew", objdate,fileloc,"Vollold",Vollisttime);
				});
				if(Vollisttime==Vollisttimenew) { //console.log("traffic not changed"); 
				} else { 
					Vollisttime=Vollisttimenew;
					$.get("requestdata.php", { file: fileloc }, function(data){
						gdata = jQuery.parseJSON(data);
						if(show=="Volumes"){
							//console.log(req,listid,filelocfrom,show);
							$(listid+' option').remove();
							$(listid+' tr').remove();
							$("#Volumedetails tr.variable").remove();
							$("#Vol2 option.variable").remove();
							chartdata=[];
							for (var prot in gdata){
								if(gdata[prot].protocol==Protocol){
									//console.log(gdata[prot].name);
									$("#Vol2").append($('<option class="variable">').text(gdata[prot].name).val(gdata[prot].name));
									$(listid).append('<tr onclick="rowisclicked(this)" ><td class="Volname">'+gdata[prot].name+'</td><td>'+gdata[prot].volsize+'</td><td>'+gdata[prot].volact+'</td><td>'+gdata[prot].usedsnaps+'</td><td>'+gdata[prot].compress+'</td></tr>');
									chartdata.push([gdata[prot].name,parseFloat(gdata[prot].volsize)]);
								}
							}
							if(plotflag > 0 ) {
								plotb.destroy();
								plotchart('chartNFS',chartdata);
							}
						}
					});
	/*					//$(listid).append($('<option>').text(v).val(v);
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
									 //$(listid+" option:nth-child("+counter+")").remove();
									 $(listid).append($('<option>').text(v).val(v));
								}
							}
							else if(show < 13) { $(listid).append($('<option>').text(i+":"+v).val(i));  }
							else if( show == 20) { volumetable(i,v);}
								else { $(listid).append($('<option>').text(i).val(i)); }
						});

						if (show < 10 ) { $(listid+" option.deleteit").remove(); if(voldirty==3) { voldirty=1; } }
						
					});
				}
	*/	
			}
			};
			
			function SelectPanelNFS(s) {
				var selection = s;
				if (selection == "o") { selection = $("#Vol2 option:selected").val(); };
				//console.log(selection);
				$(".Paneloption").hide();
				switch(selection) {
					case "newoption" :  $("#createvol").show(); break;
					case "alloption" : $("tr.success").removeClass("success");rowisclicked(); $("#Vollist").show(); plotchart('chartNFS',chartdata); break;
					default: 
							var fileloc= "../Data/Vollist.txt";
							$("#Volumedetails tbody tr.variable").remove();
							$.get("requestdata.php", { file: fileloc }, function(data){
								var jdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].protocol==Protocol) {
										if(gdata[prot].name==selection){
											$("#Volumedetails tbody").append('<tr onclick="rowisclicked(this)" class="variable" ><td class="Volname">'+gdata[prot].volsize+'</td><td>'+gdata[prot].volact+'</td><td>'+gdata[prot].snaps+'</td><td>'+gdata[prot].used+'</td><td>'+gdata[prot].crdate+'</td><td>'+gdata[prot].free+'</td><td>'+gdata[prot].compress+'</td><td>'+gdata[prot].dedup+'</td></tr>');
											
										}
									}
								}
							});
							$("#Volumnamedetails").text(selection+" details");
							$("#Voldetails").show();
							break;
							
							
				};
				//$("#Volumnamedetails").text(selection+" details");
				//$("#Voldetails").show();
			}

			
			
			function rowisclicked(x) {
				//alert("Row index is: " + x.rowIndex);
				$(x).toggleClass("success");
				var counter=0;
				$(function(){ var a=0; var b=0; var c=0;  $("tr.success").each(function(){ 
					
					if ($("tr.success").length == 1) { counter=1;  } else { counter=0;  };
					a+=parseFloat($(this).children("td:nth-child(2)").text()); b+=parseFloat($(this).children("td:nth-child(3)").text());  c+=parseFloat($(this).children("td:nth-child(4)").text());});  $("#a").text(a.toFixed(2));$("#b").text(b.toFixed(2));$("#c").text(c.toFixed(2));});
				if( counter == 0 ){  $("#disableddiv2").show(); $("#Voldelete").hide();  
				} else { $("#Voldelete").show(); $("#disableddiv2").hide(); };
			}
			function plotchart(chart,data){
				
				 plotb = jQuery.jqplot (chart, [data], 
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
						legend: { show:true, location: 'w', marginLeft: '6rem', placement: 'inside', border: "none"},
						grid: { background: "transparent", borderColor: "transparent", shadow: false }
					}
				);
				plotflag=1;
			}
			
		
			
			$(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide();
			$("#CIFS").click(function (){ 
				if(config == 1 ) {
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].CIFS
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) {
							Protocol="CIFS";
							Vollisttime = "55:55:44";
							Initclickedprotocol();
							$("h2").css("background-image","url('../img/cifs.png')").text("أقراص ويندوز"); $(".NFS").show();
							//plotchart('chartNFS',chartdata);
						}
					});
				};
				refreshall();
			});
			$("#NFS").click(function (){
				if(config== 1){  
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].NFS
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) {
							Protocol="NFS"; 
							Vollisttime = "55:55:44";
							Initclickedprotocol();
							$("h2").css("background-image","url('../img/nfs.png')").text("أقراص لينكس"); $(".NFS").show();
							//plotchart('chartNFS',chartdata);
						}
					});
				};
				refreshall();
			});
			$("#ISCSI").click(function (){  
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].ISCSI
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) {
							Protocol="ISCSI"; config = 0; $("h2").css("background-image","url('../img/iscsi2.png')").text("أقراص مباشرة"); $(".ISCSI").show(); plotchart('chartISCSI',chartdata);
						}
					});
				};
				refreshall()	;
			});
			$(".finish").click(function (){ Protocol=0; config = 1; $(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide();});
			$( "#Vol2" ).change(function() {
				var selection=$("#Vol2 option:selected").val();
				SelectPanelNFS(selection);
			}); 
			SelectPanelNFS("o");
			$("#VoldeleteButton").click( function (){ $.post("./pump.php", { req:"VolumeDelete"+Protocol, name:$("#Pool2 option:selected").val()+" "+$("tr.success td.Volname").text()+" "+Protocol+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 
				 });
			});
			$("#Createvol").click( function (){ var req=""; if(Protocol != 0) { req=Protocol; };$.post("./pump.php", { req:"VolumeCreate"+req, name:$("#Pool2 option:selected").val()+" "+" "+$("#Volname").val()+" "+$("#volsize").val()+"G"+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh3("#statusarea3"); 
				 });
			refreshList2("GetPoolVollist","#Vol2","../Data/Vollist2.txt",5.5);
			});
			$("#refreshb").click(function(){
				refreshall();
			});
			
			//setInterval('refresh3("#statusarea4")', 10000);
			//setInterval('refresh3("#statusarea3")', 10000);
			//setInterval('refreshList2("GetPoollist","#Pool2","../Data/Poollist.txt",3);', 10000);
			//setInterval('Voldirtytable()', 10000);
			setInterval('refreshall()', 500);
			//refreshList2("GetPoollist","#Pool2","../Data/Poollist.txt",3);
			//refreshList2("GetPoolVollist","#Vol2","../Data/Vollist.txt",5.5);
			
			
		</script>
	

	</body>

</html>

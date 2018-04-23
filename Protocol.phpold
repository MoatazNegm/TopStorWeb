<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/des19/Login.php');}
 
?>
<html class="bodydiv">
	<?php $men=3;  include "header.html"; ?>
	
	
							<li><a href="#" class="CIFSa rightli"><h4 id="CIFS"><span>CIFS</span></h4></a></li>
							<li><a href="#" class="NFSa rightli"><h4 id="NFS"><span>NFS</span></h4></a></li>
							<!---- <li><a href="#" class="ISCSIa rightli"><h4 id="ISCSI"><span>ISCSI</span></h4></a></li>  ----->
						</ul>
						
						<div id="CIFScode"><?php include "CIFS.php"; ?></div>
						<div id="NFScont"><div id="NfScode"><?php include "NFS.php"; ?></div></div>
						<div id="ISCSIcode"><?php include "ISCSI.php"; ?></div>
					
					</div>
					
				</div>
				
			</div>
			
		</div>
			
		<div class="row">
			<footer class="footer prefooter"> Errors
			</footer>
		</div>
  </div>


			<!-- Don't touch this! -->

		
	<script language="javascript" type="text/javascript" src="js/excanvas.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery.jqplot.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/jquery.jqplot.css" />
<!-- End Don't touch this! -->

<!-- Additional plugins go here -->

    <script class="include" language="javascript" type="text/javascript" src="js/jqplot.pieRenderer.min.js"></script>


<!-- End additional plugins -->
		<script>
			var pools = [];
			var plotflag = 0;
			var Protocol=0;
			var config = 1;
			var gdata;
			var Vollisttime = 333;
			var Vollisttime2 = 4444;
			var Vollisttimenew = 5555;
			var syscounter2=1000;
			var chartdata = [];
			var voldirty=1;
			var Vollock=0;
			var plotb;
			$(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide();$(".finish").hide();
			function refreshall() {
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
				if(Protocol != 0) {
					refreshList2("GetPoolVollist","#Volumetable","Data/Vollist.txt","Volumes");
					refresh3("#statusarea3");
					ApplySetting(); 
					//refreshList2("GetPoollist","#Pool2","Data/Poollist.txt","Pool");
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
						//refreshList2("GetPoolVollist","#Volumetable tr","Data/Vollist2.txt",20);
						
						}
						
						
					}
				}
			}
			
			function refresh3(textareaid) {
				
					$.get("requestdata2.php", { file: 'Data/'+Protocol+'status.log' }, function(data){
					$(textareaid).val(data);
					});
			
			}	;
			function volumetable(i,v) {
				var res = i.split("_");
				$("#Volumetable").append('<tr class="trow" onclick="rowisclicked(this)" ><td class="Volname tcol">'+v+'</td><td class="tcol">'+res[0]+'</td><td class="tcol">'+res[1]+'</td><td class="tcol">'+res[2]+'</td></tr>');
				chartdata.push([v,parseFloat(res[0])]);
			};
			function volumetabledetails(i,v) {
				var res = i.split("_");
				$("#Volumedetails > tbody").append('<tr class="trow" onclick="rowisclicked(this)"><td class=" tcol">'+res[0]+'</td><td class=" tcol">'+res[1]+'</td><td class=" tcol">'+res[2]+'</td><td class=" tcol">'+res[3]+'</td><td class=" tcol" >'+res[4]+'</td><td class=" tcol">'+res[5]+'</td><td class=" tcol">'+res[6]+'</td><td class=" tcol">'+res[7]+'</td></tr>');
			};
			
			function refreshList2(req,listid,filelocfrom,show) {
				var fileloc=filelocfrom;
				var request=req;
				
				fileloc = filelocfrom ; request= request ; 
			//	if(syscounter2==1000){ }
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;
					//console.log("Vollisttimenew", objdate,fileloc,"Vollold",Vollisttime);
				});
				if(Vollisttime2==Vollisttimenew) { 
					$.post("./pump.php", { req: request, name:"a" });//console.log("traffic not changed"); 
					
				} else { 
					console.log("pool",Vollisttime2,Vollisttimenew);
					Vollisttime2=Vollisttimenew;
					$.get("requestdata.php", { file: fileloc }, function(data){
						gdata = jQuery.parseJSON(data);
						if(show=="Volumes"){
							//console.log(req,listid,filelocfrom,show);
							$(listid+' option').remove();
							$(listid+' tr').remove();
							$("#Volumedetails tr.variable").remove();
							$("#Vol2 option.variable").remove();
							$("#Pool2 option.variable2").remove();
							
							
							chartdata=[];
							pools = [];
							console.log(gdata, chartdata);
							
							for (var prot in gdata){
								
								
									//console.log(gdata[prot].name);
									if ($.inArray(gdata[prot].class,pools) < 0 ) { 
										
										
										pools.push(gdata[prot].class);
										$("#Pool2").append($('<option class="variable2">').text(gdata[prot].Pool).val(gdata[prot].class));
										chartdata.push(gdata[prot].class);
										
										chartdata[gdata[prot].class]=[];
									}
									if(gdata[prot].protocol==Protocol){
									//if ( gdata[prot].Pool == $("#Pool2 option:selected").val() ) {
										$("#Vol2").append($('<option class="variable" >').text(gdata[prot].name).val(gdata[prot].name).addClass(gdata[prot].class));
										
									
									$(listid).append('<tr onclick="rowisclicked(this)" class="variable trow '+gdata[prot].class+'"><td class="Volname tcol">'+gdata[prot].name+'</td><td class="tcol">'+gdata[prot].volsize+'</td><td class="tcol">'+gdata[prot].volact+'</td><td class="tcol">'+gdata[prot].usedsnaps+'</td><td class="tcol">'+gdata[prot].compress+'</td></tr>');
									chartdata[gdata[prot].class].push([gdata[prot].name,parseFloat(gdata[prot].volsize)]);
								}
								//else $("#Pool2").append($('<option class="variable2">').text(gdata[prot].Pool).val(gdata[prot].class));
							}
							$("#Pool2").change()
							pools = [];
							if(plotflag > 0 ) {
								plotb.destroy();
								plotchart('chartNFS',chartdata[$("#Pool2").val()]);
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
				
				$(".Paneloption").hide();
				switch(selection) {
					case "newoption" :  $("#createvol").show(); break;
					case "alloption" : $("tr.success").removeClass("success");rowisclicked(); $("#createvol").hide(); $("#Vollist").show(); 
									 if(plotflag > 0 ) {
										plotb.destroy();
									}
										plotchart('chartNFS',chartdata[$("#Pool2").val()]);
									
									break;
					default:  $("#createvol").hide();
							var fileloc= "Data/Vollist.txt";
							$("#Volumedetails tbody tr.variable").remove();
							$.get("requestdata.php", { file: fileloc }, function(data){
								var jdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].protocol==Protocol) {
										if(gdata[prot].name==selection){
											//f ( gdata[prot].Pool == $("#Pool2 option:selected").val() ) {
												
												$("#Volumedetails tbody").append('<tr onclick="rowisclicked(this)" class="variable trow'+gdata[prot].class+'" ><td class="Volname tcol ">'+gdata[prot].volsize+'</td><td class="tcol">'+gdata[prot].volact+'</td><td class="tcol">'+gdata[prot].usedsnaps+'</td><td class="tcol">'+gdata[prot].useddata+'</td><td class="tcol">'+gdata[prot].crdate+'</td><td class="tcol">'+gdata[prot].available+'</td><td class="tcol">'+gdata[prot].compress+'</td><td class="tcol">'+gdata[prot].dedup+'</td></tr>');
											//}
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
			
		
			
			
			$("#CIFS").click(function (){ 
				if(config == 1 ) {
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].CIFS
							}
						};
							
						if( userpriv=="true" | curuser=="admin" ) {
							Protocol="CIFS";
							Vollisttime = 99999;
							Initclickedprotocol();
							Vollisttime2=32423
							$("h2").css("background-image","url('img/cifs.png')").text("CIFS"); $(".ullis").hide(); $(".finish").show(); $(".NFS").show();
							//plotchart('chartNFS',chartdata);
						}
						else { $("#CIFS").hide(); };
					});
				};
				refreshall();
			});
			$("#NFS").click(function (){
				if(config== 1){  
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
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
							Vollisttime2=5654
							$("h2").css("background-image","url('img/nfs.png')").text("NFS"); $(".ullis").hide();$(".finish").show(); $(".NFS").show();
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
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].ISCSI
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) {
							Protocol="ISCSI"; config = 0; $("h2").css("background-image","url('img/iscsi2.png')").text("ISCSI"); $(".ullis").hide(); $(".finish").show();$(".ISCSI").show(); plotchart('chartISCSI',chartdata);
						}
					});
				};
				refreshall()	;
			});
			$(".finish").click(function (){ Protocol=0; config = 1; $(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide(); $(".finish").hide(); $(".ullis").show();});
			$( "#Vol2" ).change(function() {
				var selection=$("#Vol2 option:selected").val();
				SelectPanelNFS(selection);
			}); 
			$("#Pool2").change(function () {
				var selection=$("#Pool2 option:selected").val();
				//console.log(selection);
				if (selection == "--All--")
					$("#Vol2 option.variable").show();
				else {
					$(".variable").hide();
					$("."+selection).show();
					if(plotflag > 0 ) {
										plotb.destroy();
									}
					plotchart('chartNFS',chartdata[$("#Pool2").val()]);
				}
			});
			SelectPanelNFS("o");
			$("#VoldeleteButton").click( function (){ $.post("./pump.php", { req:"VolumeDelete"+Protocol, name:$("#Pool2 option:selected").val()+" "+$("tr.success td.Volname").text()+" "+Protocol+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 
				 });
			});
			$("#Createvol").click( function (){ var req=""; if(Protocol != 0) { req=Protocol; };$.post("./pump.php", { req:"VolumeCreate"+req, name:$("#Pool2 option:selected").val()+" "+" "+$("#Volname").val()+" "+$("#volsize").val()+"G"+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh3("#statusarea3"); 
				 });
			refreshList2("GetPoolVollist","#Vol2","Data/Vollist.txt",5.5);
			});
			$("#refreshb").click(function(){
				Vollisttime2=345325
				Vollisttime=4523452
				refreshall();
			});
			
			//setInterval('refresh3("#statusarea4")', 10000);
			//setInterval('refresh3("#statusarea3")', 10000);
			//setInterval('refreshList2("GetPoollist","#Pool2","Data/Poollist.txt",3);', 10000);
			//setInterval('Voldirtytable()', 10000);
			setInterval('refreshall()', 500);
			//refreshList2("GetPoollist","#Pool2","Data/Poollist.txt",3);
			//refreshList2("GetPoolVollist","#Vol2","Data/Vollist.txt",5.5);
			function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivcifs="false"; var userprivnfs="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
										userprivcifs=gdata[prot].CIFS;
										userprivnfs=gdata[prot].NFS;
									}
								};
									
								if( userprivcifs =="true") { $("#CIFS").show(); } else { $("#CIFS").hide(); } ; if( userprivnfs =="true") { $("#NFS").show(); } else { $("#NFS").hide(); };;
						});
					}
					$(".ullis").show();
			}
		}
		starting();
		</script>
	

	</body>

</html>

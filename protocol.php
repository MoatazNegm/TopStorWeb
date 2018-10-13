<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pilot</title>
    <!--META TAGS-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="assets/images/Qonly.png">

    <!--BOOTSTRAP CSS STYLE-->
     <link href="assets/css/tether.min.css" rel="stylesheet" type="text/css">   
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!--Font Awesome css-->
    <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!--CUSTOME CSS-->
    <link href="assets/css/main.css" rel="stylesheet" type="text/css">
    <link href="assets/css/jquery.jqplot.min.css" rel="stylesheet" type="text/css">

</head>
<body>
<!--NAVBAR-->
<nav class="navbar">
    <!--<div class="container row">-->
    <div class="col-md-12">
        <a class="navbar-brand" href="index.html"><img src="assets/images/logo.png"></a>
        <ul class="navbar-nav pull-right">
            <li class="nav-item dropdown user-dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span><img src="assets/images/user-icon.png"> </span><?php echo $_SESSION["user"] ?>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item ref" href="#" id="changepassword">Change Password</a>
                    <a class="dropdown-item ref" href="#" id="Login">Logout</a>
                </div>
            </li>
        </ul>
        <!--</div>-->
    </div>
</nav>
<!--MESSAGES-->
<div class="dr-messages">
    <div class="bg-warning">Your changes may be not saved
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-danger">Your changes hasn't been saved
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-success"><div id="texthere"></div>
        <button type="button" id="close-success" style="margin-top: -2.4rem" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>

<!--BODY CONTENT-->
<main class="col-md-12">
    <div class="row">
        <div class="col-md-1 main-menu">
            <ul class="nav flex-column" role="tablist">
                <li class="nav-item accounts">
                    <a class="ref nav-link " id="accounts" href="#" role="tab">
                        <div></div>
                        Accounts</a>
                </li>
                <li class="nav-item status">
                    <a class=" ref nav-link " id="status" href="#" role="tab">
                        <div></div>
                        Status</a>
                </li>
                <li class="nav-item protocol">
                    <a class="ref nav-link active" id="protocol" data-toggle="tab" href="#" role="tab">
                        <div></div>
                        Protocol</a>
                </li>
                <li class="nav-item replication">
                    <a class="nav-link ref" href="#" id="replication" role="tab">
                        <div></div>
                        Replication</a>
                </li>
                <li class="nav-item pools">
                    <a class="ref nav-link" id="pools" href="#" role="tab">
                        <div></div>
                        Pools</a>
                </li>
                <li class="nav-item config">
                    <a class="nav-link ref" href="#" id="config" role="tab">
                        <div></div>
                        Config</a>
                </li>
            </ul>
        </div>
        <div class="col-md-2 second-menu">
            <div class="tab-content">
                <div class="tab-pane active" id="protocol" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li class="nav-item cifs">
                            <a class="nav-link active" data-toggle="tab" href="#cifspane" role="tab">
                                <div></div>
                                <span>CIFS</span></a>
                        </li>
                        <li class="nav-item nfs">
                            <a class="nav-link" data-toggle="tab" href="#nfspane" role="tab">
                                <div></div>
                                <span>NFS</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane active" id="cifspane" role="tabpanel">
                	
                    <div class="col-6 dr-form">
                        <div class="form-group row">
                        	
                            <label class="col-3 col-form-label">Pool</label>
                            <div class="col-5">
                                <select id="Pool2CIFS" class="Pool2 form-control">
                                </select>
                            </div>
                         
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">Volumes</label>
                            <div class="col-5">
                                <select id="Vol2CIFS" class="form-control">
                                    <option class="Complete" value="newoption" >New</option>
                                    <option class="Complete" value="alloption">All</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">Vol name</label>
                            <div class="col-5">
                                <input id="volnameCIFS" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">Size..GB</label>
                            <div class="col-5">
                                <input id="volsizeCIFS" min="1" class="form-control" type="number" value="1">
                            </div>
                        </div>

                        <a href="javascript:createvol()"class="row">
                            <div id="createvolCIFS" type="button" class="createvol btn btn-submit col-5">Create Volume</div>
                        </a>
                    </div>
						  <div  class="" class="col-4 chart"  >
								<div class="" id="chartCIFS" ></div>
						  </div>                  
                    <h1>created volumes:</h1>
                    <div class="row table-responsive">
                        <table class="col-12 table  dr-table-show">
                            <thead>
                            <tr>
                                <th class="" style="padding-left: 2rem; ">Volume Name</th>
                                <th class="text-center">Volume Size(MB)</th>
                                <th class="text-center">Actual size(MB)</th>
                                <th class="text-center">Snaps size(MB)</th>
                                <th class="text-center">Compres ratio(%)</th>
                                <th class="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody id="VolumetableCIFS">
                            <tr style="display: none;">
                                <td class="text-center">p1</td>
                                <td class="text-center">5000MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">70 %</td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane" id="nfspane" role="tabpanel">
                    <div class="col-6 dr-form">
                        <div class="form-group row">
                            <label class="col-3 col-form-label">Pool</label>
                            <div class="col-5">
                                <select id="Pool2NFS" class=" Pool2 form-control">
                                    
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">Volumes</label>
                            <div class="col-5">
                                <select id="Vol2NFS" class="form-control">
                                    <option class="Complete" value="newoption">--New--</option>
                                    <option class="Complete" value="alloption">--All--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">Vol name</label>
                            <div class="col-5">
                                <input id="volnameNFS" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">Size..GB</label>
                            <div class="col-5">
                                <input id="volsizeNFS" class="form-control" min=1 value=1 type="number">
                            </div>
                        </div>
								<a href="javascript:createvol()"class="row">
                            <div id="createvolNFS" type="button" class="createvol btn btn-submit col-5">Create Volume</div>
                        </a>
                        
                    </div>
                    <div  class="" class="col-6 chart"  >
								<div class="" id="chartNFS" ></div>
						  </div>                  
                    <h1>created volumes:</h1>
                    <div class="row table-responsive">
                        <table class="col-12 table  dr-table-show">
                            <thead>
                            <tr>
                                <th class="text-center" style="padding-left: 2rem; ">Volume Name</th>
                                <th class="text-center">Volume Size(MB)</th>
                                <th class="text-center">Actual size(MB)</th>
                                <th class="text-center">Snaps size(MB)</th>
                                <th class="text-center">Compres ratio(%)</th>
                                <th class="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody id="VolumetableNFS">
                            <tr>
                                <td class="">p1</td>
                                <td class="text-center">5000MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">70 %</td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">p1</td>
                                <td class="text-center">5000MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">70 %</td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<form id="Loginref" action="Login.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="changepasswordref" action="changepassword.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="accountsref" action="accounts.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="statusref" action="status.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="protocolref" action="protocol.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="replicationref" action="replication.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="poolsref" action="pools.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="configref" action="config.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>

<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/js/tether.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script language="javascript" type="text/javascript" src="js/jquery.jqplot.min.js"></script>
<script language="javascript" type="text/javascript" src="js/excanvas.js"></script>
<script class="include" language="javascript" type="text/javascript" src="js/jqplot.pieRenderer.min.js"></script>
<!--CUSTOM JS-->
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
			var currentinfo2timenew=0;currentinfo2time=34;
			var olddata="hi";
			var olddiskpool="hihi";
			var jdata="hihihihi"
			var chartdata = [];
			var voldirty=1;
			var Vollock=0;
			var prot="kssl";
                        var pools=[];
			var volumes=[];
			var plotb;
				$(".bg-success").hide();$(".bg-successold").hide();$(".bg-danger").hide();$(".bg-warning").hide();
     function normsize(s){
     var sizeinbytes=parseFloat(s)
     if (s.includes('K')) { sizeinbytes=sizeinbytes/1000 }
     else if (s.includes('M')) { sizeinbytes=sizeinbytes }
     else if (s.includes('G')) { sizeinbytes=sizeinbytes*1000 }
     else if (s.includes('T')) { sizeinbytes=sizeinbytes*1000000 }
     else if (s.includes('P')) { sizeinbytes=sizeinbytes*1000000000 }
     else  { sizeinbytes=sizeinbytes/1000000 }
     return parseInt(sizeinbytes)
     }
 function createvol() { 
  var thepool=$("#Pool2"+prot).val()
  $.post("./pump.php", { req:"VolumeCreate"+prot+".py", name:pools[thepool].name+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G ", passwd:"<?php echo $_SESSION["user"]; ?> "+pools[thepool].host }, function (data){
 });
};
		function voldel() {  
  var thepool=$("#Pool2"+prot).val()
 $.post("./pump.php", { req:"VolumeDelete"+prot+".py", name:pools[thepool].name+" "+arguments[0]+" "+prot+" "+"<?php echo $_SESSION["user"]; ?>", passwd: pools[thepool].host });   }
				function SS(){ 
				
				   var alltabsAcco=0;var alltabsStat=0;var alltabsProt=0;var alltabsRepli=0;var alltabsPool=0;var alltabsUP=0;
				   var userprivAccoAD="false"; var userprivAccoBU="false"; var userprivAccoEr="false";
					var userprivStatSC="false"; var userprivStatLo="false";
					var userprivProtCI="false"; var userprivProtNF="false";
					var userprivRepliPa="false"; var userprivRepliSe="false"; var userprivRepliRe="false";
					var userprivPoolDG="false"; var userprivPoolSS="false";
					var userprivUserPrivileges="false"; var userprivUpload="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					if(curuser!="admin"){
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userprivAccoAD=gdata[prot].Active_Directory; userprivAccoBU=gdata[prot].Box_Users; userprivAccoEr=gdata[prot].Error
								userprivStatSC=gdata[prot].Service_Charts;userprivStatLo=gdata[prot].Logs;
								userprivProtCI=gdata[prot].CIFS; userprivProtNF=gdata[prot].NFS;
								userprivRepliPa=gdata[prot].Partners; userprivRepliRe=gdata[prot].Replication; userprivRepliSe=gdata[prot].Senders;
								userprivPoolDG=gdata[prot].DiskGroups; userprivPoolSS=gdata[prot].SnapShots;
								userprivUserPrivileges=gdata[prot].UserPrivilegesch;userprivUpload=gdata[prot].Uploadch;
								
							}
						};
						if(userprivAccoAD!="true") { $(".activeDirectory").hide(); $("#activeDirectory").hide(); alltabsAcco=1;} 
						if(userprivAccoBU!="true") { $(".boxUsers").hide(); $("#boxUsers").hide(); alltabsAcco=alltabsAcco+1;} 
						if(userprivAccoEr!="true") { $(".boxProperties").hide(); $("#boxProperties").hide(); alltabsAcco=alltabsAcco+1;} 
						if(alltabsAcco==3) { $(".accounts").hide()}
						if(userprivStatSC!="true") { $(".servicestatus").hide(); $("#servicestatus").hide(); alltabsStat=1;} 	else { $(".servicestatus").show(); $("#servicestatus").show();}
						if(userprivStatLo!="true") { $("#Logs").hide(); $("#Logspanel").hide();alltabsStat=alltabsStat+1;}
						if(alltabsStat==2) { $(".status").hide();}
						if(userprivProtCI!="true") { $(".cifs").hide(); $("#cifspane").hide(); alltabsProt=1;} 
						if(userprivProtNF!="true") { $(".nfs").hide(); $("#nfspane").hide(); alltabsProt=alltabsProt+1;}
						if(alltabsProt==2) { $(".protocol").hide()}
						if(userprivRepliPa!="true") { $(".partner").hide(); $("#partner").hide(); alltabsRepli=1;} 
						if(userprivRepliSe!="true") { $(".sender").hide(); $("#sender").hide(); alltabsRepli=alltabsRepli+1;} 
						if(userprivRepliRe!="true") { $(".recive").hide(); $("#receiver").hide(); alltabsRepli=alltabsRepli+1;} 
						if(alltabsRepli==3) { $(".replication").hide()}
						if(userprivPoolDG!="true") { $(".diskGroups").hide(); $("#diskGroups").hide(); alltabsPool=1;} 
						if(userprivPoolSS!="true") { $(".snapshots").hide(); $("#snapshots").hide(); alltabsPool=alltabsPool+1;}
						if(alltabsPool==2) { $(".pools").hide()}
						if(userprivUserPrivileges!="true") { $(".userPrivlliges").hide(); $("#userPrivlliges").hide(); alltabsUP=1;} 
						if(userprivUpload!="true") { $(".firmware").hide(); $("#firmware").hide(); alltabsUP=alltabsUP+1;}
						if(alltabsUP==2) { $(".config").hide()}
					
					});
				};
			};
			function refreshall() {
				if($("#cifspane").hasClass('active'))  { if (prot !="CIFS") { olddiskpool="oldnfs"; pools=[]; $("#Pool2"+prot+" option.variable2").remove(); Vollisttime2="skldjfadks"; prot="CIFS";}};
				if($("#nfspane").hasClass('active') ) { if (prot !="NFS") { olddiskpool="oldcifs"; pools=[]; $("#Pool2"+prot+" option.variable2").remove();prot="NFS"; Vollisttime2="ndfsfsn";}};
				$.get("requestdate.php", { file: 'Data/currentinfo2.log2' }, function(data){
			var objdate = jQuery.parseJSON(data);
			currentinfo2timenew=objdate.timey;
		});
		 		if(currentinfo2timenew!=currentinfo2time) {
		 			currentinfo2time=currentinfo2timenew;
					$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){if(data != '') { 
   $(".bg-success").show();
   $("#texthere").text(data);
   }
 });
					
					}
					refreshList2("GetPoolVollist","#Volumetable"+prot,"Data/Vollist.txt","Volumes");
					//refresh3("#statusarea3");
				if(syscounter2==1000) { syscounter2=0; } else { syscounter2=syscounter2+1; }
			}
			function Initclickedprotocol() {
				
				voldirty= 1; config = 1; 
				$("#chartNFS").children().remove(); $("#Volumetable tr").remove();
				$(".New").prop("selected","selected");
				$("#Vollist").hide(); 
				$("#Voldetails").hide();
				//$("#createvol").show();
				
			}
			
			
			
function refreshList2(req,listid,filelocfrom,show) {
 var fileloc=filelocfrom;
 var request=req;
 var others=0
 fileloc = filelocfrom ; request= request ; 
 $.get("gump2.php", { req: 'hosts', name:'--prefix' }, function(data){
  if(data==olddiskpool) {return;}
  else {
   jdata = jQuery.parseJSON(data)
   if(typeof jdata =='object' ) {
    olddiskpool=data
    releasesel=0
    oldreleasesel=0
    disks=[];
    var k;
    $(".Pool2"+prot+" option").remove();	
    $(listid+" tr").remove();
    disks=[];
    kdata=[];
    pools=[];
    pool=[];
    hosts=[]
    volumes=[]
    snapshots=[]
    chartdata=[]
    if (plotb) {plotb.destroy();}
    p=0
    $.each(jdata,function(k,v){
     hosts.push(jdata[k])
    });
    $.each(hosts,function(r,s){
     hosts[r]['name']=hosts[r]['name'].replace('hosts/','').replace('/current','')
     $('#hostslist').append($('<a class="hostmember" style="display: inline; " href="javascript:hostclick(\''+hosts[r]["name"]+'\')">'+hosts[r]["name"]+'</a>'));	
     $.each(hosts[r]['prop'],function(rr,ss){
      topool=hosts[r]['prop'][rr]
      topool['host']=hosts[r]['name']
      pools.push(topool)
      if (topool.name.includes('free') < 1 ){
       $("#Pool2"+prot).append($('<option class="pool ">').text(topool.name.replace('pdhcp','')).val(rr));
       chartdata.push([topool.name,normsize(topool.alloc)]);
       chartdata.push(['free',normsize(topool.empty)]);
      }
     });
    });
    $.each(pools,function(k,v){
     $('#poollist').append($('<a class="poolmember" style="display: inline; " href="javascript:poolclick(\''+pools[k]["name"]+'\')">'+pools[k]["name"]+'</a>'));	
     pools[k]['alloc']=normsize(pools[k]['alloc'])
     pools[k]['empty']=normsize(pools[k]['empty'])
     pools[k]['size']=normsize(pools[k]['size'])
     $.each(pools[k]["volumes"],function(kk,vv){
      tovol=pools[k]['volumes'][kk]
      volumes.push(tovol) 
      $("#Volumetable"+tovol['prot']).append('<tr onclick="rowisclicked(this)" class="variable trow '+kk+'"><td style="padding-left: 2rem; " class="Volname tcol">'+tovol.name+'</td><td class="text-center tcol">'+normsize(tovol.quota)+'</td><td class="text-center tcol">'+tovol.used+'</td><td class=" text-center tcol">'+tovol.usedbysnapshots+'</td><td class=" text-center tcol">'+tovol.refcompressratio+'</td><td class="text-center"><a href="javascript:voldel(\''+tovol.fullname+'\')"><img src="assets/images/delete.png" alt="can\'t upload delete icon"></a></td></tr>');
     chartdata.push([tovol.name,normsize(tovol.quota)]);
     });
    });
   }
   if (plotb) {plotb.destroy();}
   //plotchart(['chart'+prot,chartdata("#Pool2"+prot+"").val()]);
   //chartdata.push(['free',poolsize]);
   //chartdata.push(['others',others]);
   plotchart('chart'+prot,chartdata);
  }
 });
}
	
			
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
										plotchart('chartNFS',chartdata[$(".Pool2").val()]);
									
									break;
					default:  $("#createvol").hide();
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
 								//diameter: 50,
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
							prot=32423
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
							prot=5654
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
							Protocol="ISCSI"; config = 1; $("h2").css("background-image","url('img/iscsi2.png')").text("ISCSI"); $(".ullis").hide(); $(".finish").show();$(".ISCSI").show(); plotchart('chartISCSI',chartdata);
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
			$(".Pool2").change(function () {
				var selection=$(".Pool2 option:selected").val();//
				//console.log(selection
				if (selection == "--All--")
					$("#Vol2 option.variable").show();
				else {
					$(".variable").hide();
					$("."+selection).show();
					if(plotflag > 0 ) {
										plotb.destroy();
									}
					plotchart('chartNFS',chartdata[$(".Pool2").val()]);
				}
			});
			SelectPanelNFS("o");
			$("#VoldeleteButton").click( function (){ $.post("./pump.php", { req:"VolumeDelete"+prot, name:$(".Pool2"+prot+" option:selected").val()+" "+$("tr.success td.Volname").text()+" "+Protocol+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 
				 });
			});
			$(".createvololdoldold").click(function (){  var req="";$.post("./pump.php", { req:"VolumeCreate"+prot+"", name:$("#Pool2"+prot+" option:selected").val()+" "+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+"<?php echo $_SESSION["user"]; ?>" }, function (data){

				 });
			
			});
			$("#refreshb").click(function(){
				prot=345325
				Vollisttime=4523452
				refreshall();
			});
			
			setInterval('refreshall()', 500);
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
		$("#close-success").click(function() { $(".bg-success").hide(); });

$(".ref").click(function() {
					//console.log("session before","<?php print session_id(); ?>");
					if($(this).attr('id')=="Login")
					{ 
						$.post("sessionout.php",function(data){ 
						document.getElementById('Login'+'ref').submit();
						//console.log("session after",data);
						});
						//console.log("login");
						
					} else {
					document.getElementById($(this).attr('id')+'ref').submit();
					}
		 //console.log($(this).attr('id'));
		});	
		SS();
</script>

</body>
</html>

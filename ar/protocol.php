<!DOCTYPE html>
<?php session_start();
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:Login.php');}

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QuickStor</title>
    <!--META TAGS-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="../assets/images/Qonly.png">

    <!--BOOTSTRAP CSS STYLE-->
     <link href="../assets/css/tether.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!--Font Awesome css-->
    <link href="../assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!--CUSTOME CSS-->
    <link href="../assets/css/main.css" rel="stylesheet" type="text/css">
    	<link rel="stylesheet" type="text/css" href="../css/jquery.jqplot.css" />

</head>
<body>
<!--NAVBAR-->
<nav class="navbar">
    <!--<div class="container row">-->
    <div class="col-md-12">
        <a class="navbar-brand" href="index.html"><img src="../assets/images/logo.png"></a>
        <ul class="navbar-nav pull-right">
            <li class="nav-item dropdown user-dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span><img src="../assets/images/user-icon.png"> </span><?php echo $_SESSION["user"] ?>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item ref" href="#" id="changepassword">كلمة السر</a>
                    <a class="dropdown-item ref" href="#" id="Login">خروج</a>
                </div>
            </li>
        </ul>
        <!--</div>-->
    </div>
</nav>
<!--MESSAGES-->
<div class="dr-messages ">
    <div class="bg-warning">
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-danger">
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-success"><div id="texthere" dir="rtl"></div>
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
                  <a class="ref nav-link " id="accounts" data-toggle="tab" href="#" role="tab">
                      <div></div>
                      الحسابات</a>
              </li>
              <li class="nav-item status">
                  <a class="ref nav-link " id="arstatus" href="#" role="tab">
                      <div></div>
                    الحالة  </a>
              </li>
              <li class="nav-item protocol">
                  <a class=" ref nav-link active" id="protocol" href="#" role="tab">
                      <div></div>
                       المجلدات</a>
              </li>
              <li class="nav-item replication">
                  <a class="nav-link ref" href="#" id="replication" role="tab">
                      <div></div>
                      التوزيع</a>
              </li>
              <li class="nav-item pools">
                  <a class=" ref nav-link" id="pools"  href="#" role="tab">
                      <div></div>
                      الحاويات</a>
              </li>
              <li class="nav-item config">
                  <a class="nav-link ref" href="#" id="config" role="tab">
                      <div></div>
                      الاعدادات</a>
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
                                <span>مجلدات ويندوز</span></a>
                        </li>
                        <li class="nav-item nfs">
                            <a class="nav-link" data-toggle="tab" href="#nfspane" role="tab">
                                <div></div>
                                <span>مجلدات لينكس</span></a>
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

                            <label class="col-3 col-form-label">حاوية</label>
                            <div class="col-5">
                                <select id="Pool2CIFS" class="Pool2 form-control">
                                </select>
                            </div>

                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">مجلدات</label>
                            <div class="col-5">
                                <select id="Vol2CIFS" class="form-control">
                                    <option class="Complete" value="newoption" >جديد</option>
                                    <option class="Complete" value="alloption">الكل</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">اسم المجلد</label>
                            <div class="col-5">
                                <input id="volnameCIFS" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">السعة..GB</label>
                            <div class="col-5">
                                <input id="volsizeCIFS" min="1" class="form-control" type="number" value="1">
                            </div>
                        </div>

                        <a href="javascript:createvol()"class="row">
                            <div id="createvolCIFS" type="button" class="createvol btn btn-submit col-5">إضافة المجلد</div>
                        </a>
                    </div>
						  <div  class="" class="col-4 chart"  >
								<div class="" id="chartCIFS" ></div>
						  </div>
                    <h1 dir="rtl">المجلدات:</h1>
                    <div class="row table-responsive">
                        <table class="col-12 table  dr-table-show">
                            <thead>
                            <tr>
                                <th class="" style="padding-left: 2rem; ">اسم المجلد</th>
                                <th class="text-center">سعة المجلد(MB)</th>
                                <th class="text-center">السعة الفعلية(MB)</th>
                                <th class="text-center">سعة اللقطات(MB)</th>
                                <th class="text-center">نسبة الانضغاط(%)</th>
                                <th class="text-center">حذف</th>
                            </tr>
                            </thead>
                            <tbody id="VolumetableCIFS">
                            <tr>
                                <td class="text-center">p1</td>
                                <td class="text-center">5000MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">70 %</td>
                                <td class="text-center"><a href="#"><img src="../assets/images/delete.png"
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
                            <label class="col-3 col-form-label">حاوية</label>
                            <div class="col-5">
                                <select id="Pool2NFS" class=" Pool2 form-control">

                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">مجلدات</label>
                            <div class="col-5">
                                <select id="Vol2NFS" class="form-control">
                                    <option class="Complete" value="newoption">--جديد--</option>
                                    <option class="Complete" value="alloption">--الكل--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">اسم المجلد</label>
                            <div class="col-5">
                                <input id="volnameNFS" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3 col-form-label">السعة..GB</label>
                            <div class="col-5">
                                <input id="volsizeNFS" class="form-control" min=1 value=1 type="number">
                            </div>
                        </div>
								<a href="javascript:createvol()"class="row">
                            <div id="createvolNFS" type="button" class="createvol btn btn-submit col-5">إضافة مجلد</div>
                        </a>

                    </div>
                    <div  class="" class="col-6 chart"  >
								<div class="" id="chartNFS" ></div>
						  </div>
                    <h1 dir="rtl">المجلدات:</h1>
                    <div class="row table-responsive">
                        <table class="col-12 table  dr-table-show">
                            <thead>
                            <tr>
                                <th class="text-center" style="padding-left: 2rem; ">اسم المجلد</th>
                                <th class="text-center">سعة المجلد(MB)</th>
                                <th class="text-center">السعة الفعلية(MB)</th>
                                <th class="text-center">سعة اللقطات(MB)</th>
                                <th class="text-center">نسبة الانضغاط(%)</th>
                                <th class="text-center">حذف</th>
                            </tr>
                            </thead>
                            <tbody id="VolumetableNFS">
                            <tr>
                                <td class="">p1</td>
                                <td class="text-center">5000MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">70 %</td>
                                <td class="text-center"><a href="#"><img src="../assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">p1</td>
                                <td class="text-center">5000MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">150MB</td>
                                <td class="text-center">70 %</td>
                                <td class="text-center"><a href="#"><img src="../assets/images/delete.png"
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
<form id="arstatusref" action="../arstatus.php" method="post">
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
<script src="../assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="../assets/js/tether.min.js"></script>
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<script language="javascript" type="text/javascript" src="../js/jquery.jqplot.min.js"></script>
<script language="javascript" type="text/javascript" src="../js/excanvas.js"></script>
<script class="include" language="javascript" type="text/javascript" src="../js/jqplot.pieRenderer.min.js"></script>
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
			var currentinfo2timenew=0;currentinfo2time=34
			var olddata="hi"
			var chartdata = [];
			var voldirty=1;
			var Vollock=0;
			var prot="kssl";
			var plotb;
				$(".bg-successold").show();$(".bg-danger").hide();$(".bg-warning").hide();
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
					$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
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
				if($("#cifspane").hasClass('active'))  { if (prot !="CIFS") { olddata="oldnfs"; pools=[]; $("#Pool2"+prot+" option.variable2").remove(); Vollisttime2="skldjfadks"; prot="CIFS";}};
				if($("#nfspane").hasClass('active') ) { if (prot !="NFS") { olddata="oldcifs"; pools=[]; $("#Pool2"+prot+" option.variable2").remove();prot="NFS"; Vollisttime2="ndfsfsn";}};
				$.get("../requestdate.php", { file: '../Data/currentinfo2.log2' }, function(data){
			var objdate = jQuery.parseJSON(data);
			currentinfo2timenew=objdate.timey;
		});
		 		if(currentinfo2timenew!=currentinfo2time) {
		 			currentinfo2time=currentinfo2timenew;
		 			$(".bg-success").show().fadeIn('slow');
					$.get("requestdata3.php", { file: '../Data/currentinfo2.log2' }, function(data){ $("#texthere").text(data);});

					//console.log("loghi")
				}
					refreshList2("GetPoolVollist","#Volumetable"+prot,"Data/Vollist.txt","Volumes");
					//refresh3("#statusarea3");
					//refreshList2("GetPoollist","#Pool2","Data/Poollist.txt","Pool");
					//Voldirtytable();
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


	//		function refresh3(textareaid) {

	//				$.get("requestdata2.php", { file: 'Data/'+Protocol+'status.log' }, function(data){
	//				$(textareaid).val(data);
	//				});

	//		}	;
	//		function volumetable(i,v) {
	//			var res = i.split("_");
	//			$("#Volumetable").append('<tr class="trow" onclick="rowisclicked(this)" ><td style="padding-left: 2rem; " class="Volname tcol" >'+v+'</td><td class="tcol">'+res[0]+'</td><td class="tcol">'+res[1]+'</td><td class="tcol">'+res[2]+'</td></tr>');
	//			chartdata.push([v,parseFloat(res[0])]);
	//		};
	//		function volumetabledetails(i,v) {
	//			var res = i.split("_");
	//			$("#Volumedetails > tbody").append('<tr class="trow" onclick="rowisclicked(this)"><td style="padding-left: 2rem; " class=" tcol">'+res[0]+'</td><td class=" tcol">'+res[1]+'</td><td class=" tcol">'+res[2]+'</td><td class=" tcol">'+res[3]+'</td><td class=" tcol" >'+res[4]+'</td><td class=" tcol">'+res[5]+'</td><td class=" tcol">'+res[6]+'</td><td class=" tcol">'+res[7]+'</td></tr>');
	//		};

			function refreshList2(req,listid,filelocfrom,show) {
				var fileloc=filelocfrom;
				var request=req;
         console.log("fileloc",fileloc)
				fileloc = filelocfrom ; request= request ;
			//	if(syscounter2==1000){ }
				$.get("../requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;
					//console.log("Vollisttimenew", objdate,fileloc,"Vollold",Vollisttime);
				});
				if(Vollisttime2==Vollisttimenew) {
					$.post("../pump.php", { req: request, name:"a" });//console.log("traffic not changed");

				} else {

					Vollisttime2=Vollisttimenew;
					$.get("../requestdata.php", { file: fileloc }, function(data){
						gdata = jQuery.parseJSON(data);
						if(data!=olddata){
							olddata=data
							//console.log(req,listid,filelocfrom,show);
							$(listid+' option').remove();
							$(listid+' tr').remove();
							$("#Volumedetails tr.variable").remove();
							//$("#Vol2"+prot+" option.variable").remove();
							//$("#Pool2"+prot+" option.variable2").remove();


							chartdata=[];
							pools = [];


							for (var proty in gdata){


									//console.log("to push",gdata[proty].class,pools);
									if ($.inArray(gdata[proty].class,pools) < 0 ) {

									pools.push(gdata[proty].class);
									$("#Pool2"+prot).append($('<option class="variable2">').text(gdata[proty].Pool).val(gdata[proty].class));
									chartdata.push(gdata[proty].class);

										chartdata[gdata[proty].class]=[];

									console.log("to push",gdata[proty].class);
										console.log("changed chartdata",chartdata)
									}
									if(gdata[proty].protocol==prot){
									//if ( gdata[prot].Pool == $("#Pool2 option:selected").val() ) {
										//$("#Vol2").append($('<option class="variable" >').text(gdata[prot].name).val(gdata[prot].name).addClass(gdata[prot].class));

									//console.log("to push in chartdata",gdata[proty].name,parseFloat(gdata[proty].volsize),gdata[proty].class,chartdata)
									$(listid).append('<tr onclick="rowisclicked(this)" class="variable trow '+gdata[proty].class+'"><td style="padding-left: 2rem; " class="Volname tcol">'+gdata[proty].name+'</td><td class="text-center tcol">'+gdata[proty].volsize+'</td><td class="text-center tcol">'+gdata[proty].volact+'</td><td class=" text-center tcol">'+gdata[proty].usedsnaps+'</td><td class=" text-center tcol">'+gdata[proty].compress+'</td><td class="text-center"><a href="javascript:voldel(\''+gdata[proty].name+'\')"><img src="../assets/images/delete.png" alt="can\'t upload delete icon"></a></td></tr>');
									chartdata[gdata[proty].class].push([gdata[proty].name,parseFloat(gdata[proty].volsize)]);
								}

								//else $("#Pool2").append($('<option class="variable2">').text(gdata[prot].Pool).val(gdata[prot].class));
							}
							//console.log("tochart",chartdata)
							//$("#Pool2"+prot).change()
							//pools = [];
							//console.log(chartdata);
							if (plotb) {plotb.destroy();}
								plotchart('chart'+prot,chartdata[$("#Pool2"+prot+"").val()]);

					}
					});

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
										plotchart('chartNFS',chartdata[$(".Pool2").val()]);

									break;
					default:  $("#createvol").hide();
							var fileloc= "Data/Vollist.txt";
							$("#Volumedetails tbody tr.variable").remove();
							$.get("../requestdata.php", { file: fileloc }, function(data){
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
					$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
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
							$("h2").css("background-image","url('../img/cifs.png')").text("CIFS"); $(".ullis").hide(); $(".finish").show(); $(".NFS").show();
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
					$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
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
							$("h2").css("background-image","url('../img/nfs.png')").text("NFS"); $(".ullis").hide();$(".finish").show(); $(".NFS").show();
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
					$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].ISCSI
							}
						};

						if( userpriv=="true" | curuser=="admin" ) {
							Protocol="ISCSI"; config = 1; $("h2").css("background-image","url('../img/iscsi2.png')").text("ISCSI"); $(".ullis").hide(); $(".finish").show();$(".ISCSI").show(); plotchart('chartISCSI',chartdata);
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
			$("#VoldeleteButton").click( function (){ $.post("../pump.php", { req:"VolumeDelete"+prot, name:$(".Pool2"+prot+" option:selected").val()+" "+$("tr.success td.Volname").text()+" "+Protocol+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){

				 });
			});
			$(".createvololdoldold").click(function (){  var req="";$.post("../pump.php", { req:"VolumeCreate"+prot+"", name:$("#Pool2"+prot+" option:selected").val()+" "+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+"<?php echo $_SESSION["user"]; ?>" }, function (data){

				 });

			});
			function createvol() {  var req="";$.post("../pump.php", { req:"VolumeCreate"+prot+"", name:$("#Pool2"+prot+" option:selected").val()+" "+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+"<?php echo $_SESSION["user"]; ?>" }, function (data){

				 });

			};
			$("#refreshb").click(function(){
				prot=345325
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
							$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
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
		function voldel() {   $.post("../pump.php", { req:"VolumeDelete"+prot, name:$("#Pool2"+prot+" option:selected").val()+" "+arguments[0]+" "+prot+" "+"<?php echo $_SESSION["user"]; ?>" });   }
$(".ref").click(function() {
					//console.log("session before","<?php print session_id(); ?>");
					if($(this).attr('id')=="Login")
					{
						$.post("../sessionout.php",function(data){
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

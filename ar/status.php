<!DOCTYPE html>
<?php session_start();
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:Login.php');}

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>َQuickStor</title>
    <!--META TAGS-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="../assets/images/Qonly.png">

    <!--BOOTSTRAP CSS STYLE-->
     <link href="../assets/css/tether.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!--Font Awesome css-->
    <link href="../assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link href="../assets/js/chartist-js-develop/dist/chartist.min.css" rel="stylesheet" type="text/css">




    <!--CUSTOME CSS-->
    <link href="../assets/css/main.css" rel="stylesheet" type="text/css">

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
<div class="dr-messages">
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
                    <a class=" ref nav-link " id="accounts" href="#" role="tab">
                        <div></div>
                        الحسابات</a>
                </li>
                <li class="nav-item status">
                    <a class="nav-link ref active" data-toggle="tab" href="#" id="status" role="tab">
                        <div></div>
                        الحالة</a>
                </li>
                <li class="nav-item protocol">
                    <a class="ref nav-link" id="protocol" href="#" role="tab">
                        <div></div>
                        المجلدات</a>
                </li>
                <li class="nav-item replication">
                    <a class="nav-link ref" href="#" id="replication" role="tab">
                        <div></div>
                        التوزيع</a>
                </li>
                <li class="nav-item pools">
                    <a class="ref nav-link" id="pools" href="#" role="tab">
                        <div></div>
                        الحوايات</a>
                </li>
                <li class="nav-item config">
                    <a class="nav-link ref" href="#" id="config" role="tab">
                        <div></div>
                        الإعدادات</a>
                </li>
            </ul>
        </div>
        <div class="col-md-2 second-menu">
            <div class="tab-content">
                <div class="tab-pane active" id="status" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li class="nav-item servicestatus">
                            <a id="sstatus" class="nav-link active" data-toggle="tab" href="#servicestatus" role="tab">
                                <div></div>
                                <span>مراقبة الخدمات</span></a>
                        </li>
                        <li id="Logs" class="nav-item  logs">
                            <a class="nav-link" data-toggle="tab" href="#Logspanel" role="tab">
                                <div></div>
                                <span>السجل</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane active" id="servicestatus" role="tabpanel">
		<?php include "netdata/demo.html" ?>

                </div>
                <div class="tab-pane " id="Logspanel" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-1 col-form-label">التاريخ</label>
                            <div class="col-3" style="padding-left: 0px;">
                                <input id="dater" class="form-control form-control-sm" type="datetime-local" style="font-size: 13px;">
                            </div>
                            <div class="col-3 logs-check">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input msgtype" id="INFO" type="checkbox" value="option1" checked>معلومات
                                    </label>
                                </div>
                                <div class="form-check form-check-inline ">
                                    <label class="form-check-label">
                                        <input id="Warning" class="form-check-input msgtype" type="checkbox" value="option2" checked>تحذير
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input id="Error" class="form-check-input msgtype" type="checkbox" value="option2" checked>أخطاء
                                    </label>
                                </div>
                            </div>
                            <label class="col-1 col-form-label" style="padding-right: 0px; maring-right: -2rem;">خطوط</label>
                            <div class="col-1" style="margin-top: 0.2rem; margin-left: -2.5rem; ">
                                <input id="lines" min="5" max="50" value="10" class="form-control form-control-sm " type="number">
                            </div>
                            <div class="col-2 text-right msgtype" style="margin-top: 0.4rem;">
                                <a href="#"><img src="../assets/images/refresh.png"> </a>
                            </div>
                        </div>
                    </form>
                    <div class="row table-responsive">
                        <table  class="col-12 table  dr-table-show">
                            <thead>
                            <tr class="row">
										  <th class="text-left col-3" style="padding-left: 2rem; ">التاريخا و الوقت</th>
                                <th class="text-center col-2">مستخدم</th>
                                <th class="text-center col-7">تاريخ</th>

                            </tr>
                            </thead>
                            <tbody id="Logdetails">


                            </tbody>
                        </table>
                    </div>
                    <div class="row col-md-12">
                        <div class=" text-right">
                            <a id="pprev" href="#"><img src="../assets/images/previous.png"></a>
                            <a id="pnext" href="#"><img src="../assets/images/next.png"> </a>
                        </div>
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
<script src="../assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="../assets/js/tether.min.js"></script>
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>

//script src="assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="../assets/js/dropzen.js"></script>
<script src="../assets/js/main.js"></script>

<!--CUSTOM JS-->
		<script>
			var msgdata= "no no no";
			var msgs="no data";
			var datalogf = [];
			var betweend = [];
			var plots=[];
			var oldSdatec="1"; var oldEdatec="2";
			var newSdatec="3"; var newEdatec="4";
			var datemod="";
			var plotflag = [];
			var requeststats = 0;
			var config = 1;
			var disktime="23:3434:34534";
			var disktimenew="34543:43543:34";
			var logtime="slkdj"; var logtimenew="34543:43543:34";
			var dl =[[[0,0]],[[0,0]]];
			var plotpls=[[0,0]]; var plotrs; var plotws; var plotsvct; var plotqlen; var plotdl;
			var traffictime = "0";
			var trafficnewtime = traffictime;
			var logstatus=[];
			var logcache=3;
			var obj=[];
			var disksval="hi"
			var dater;
			var liner;
			var dater2;
			var statsdata="initial";
			var page=0;
			var reqpage=0;
			var counter = 1;
			var activepage=0; var lastpage=-1;

			$(".bg-success").show();$(".bg-danger").hide();$(".bg-warning").hide();
 $("#sstatus").click(function(){ NETDATA.unpause(); });
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
			$.get("../requestdatein.php", { file: 'Data/ctr.logupdated' }, function(data){

					var objdate=jQuery.parseJSON(data);

					trafficnewtime=objdate.updated;
					traffictime=trafficnewtime;
				});
			function parse(str) {
									 var weekday= [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ];
									var months = [ "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December" ];
                  	var y = str.substr(0,4),
										m = str.substr(4,2) - 1,
										d = str.substr(6,2);
									var D = new Date(y,m,d);
									//return(D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
									return weekday[D.getDay()]+" "+D.getDate()+"-"+months[D.getMonth()]+"-"+D.getFullYear();
								}

					function infochange() {

				$(".datarow").hide();
				if($("#INFO").is(":checked")) { $(".info").show(); }
				if($("#Warning").is(":checked")) { $(".warning").show(); }
				if($("#Error").is(":checked")) { $(".error").show(); }
			};
	     $(".msgtype").click(function() { topresentlog(); infochange(); });

			var sineRenderer = function() {
				//var data = [[]];
				for (var i=0; i<13; i+=0.5) {
					dl[0].push([i, Math.sin(i)]);
				}

				return dl;
			};
			function searchmsg (strarr,str) {
				for (var j=0; j< strarr.length; j++) {
					if (strarr[j].match(str)) return j;
				};
				return -1;
			};

			$.ajax({
				url : "msgs.txt",
				dataType: "text",
				success : function (data) {

					 msgdata=data;
					msgs=msgdata.split("\n");
						}
				});

			function refreshList(req,listid,fileloc) {
				$.get("../requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					disktimenew=cdata.updated;
				});
				if(disktimenew!=disktime)
				{
					disktime=disktimenew;
					$(listid+' option').remove();
					$.get("../requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
						//console.log(data);

						$.each(jdata, function(i,v) {
						//	console.log(i,k);
							 $(listid).append($('<option>').text(i).val(v));

						});
					});
				}
			};
			$(".SS").hide(); $(".Logs").hide(); $(".finish").hide();
			$("#dater2").change(function(){
				$("#nothing").text("Please wait"); $("#found").hide();
			});
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


			$("#lines").change(function(){
				   topresentlog();updatelogarea(); infochange();

			});

			$("#dater").change(function(){
				   topresentlog(); updatelogarea(); infochange();


			});
			$("#pnext").click(function(){
				var date=new Date($("td.last").text());
				$("#dater").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2)+"T"+("0" + date.getUTCHours()).slice(-2)+":"+("0" +date.getUTCMinutes()).slice(-2)+":"+("0" + date.getUTCSeconds()).slice(-2))
				dater=("0" + (date.getMonth() + 1)).slice(-2)+'/'+("0" + (date.getDate() + 0)).slice(-2)+'/'+date.getFullYear()+"T"+("0" + date.getUTCHours()).slice(-2)+":"+("0" +date.getUTCMinutes()).slice(-2)+":"+("0" + date.getUTCSeconds()).slice(-2)

				dater=$("#dater").val()
					$("#dater").change();

			});
			$("#pprev").click(function(){
				if (activepage > 0 ) { activepage = activepage-1; logstatus[activepage]=50 }

			});
			$("#refresh").click(function(){
				$("#Logdetails tr.datarow").remove();
				activepage=0; page=0; lastpage=-1
				logstatus=[];
				for (var i=0; i<logcache; i+=1) {
						    updatelogarea(20);
								logstatus[i]=10;
								logtime[i]="3434TREYLKTRJ";
							}
			});

			$("#Logs").click(function (){

					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Logs
							}
						};

						if(userpriv=="true" | curuser=="admin" ) {

					   for (var i=0; i<logcache; i+=1) {
						    updatelogarea(i);
								logstatus[i]=10;
							}
					    for (var i=0; i<20; i+=1) {

								plotflag[i]=0;
							}


						    config = 0; $("h2").css("background-image","url('../img/logs.png')").text("Logs"); $(".ullis").hide(); $(".finish").show();$(".Logs").show(); topresentlog();
						}
					});

			});
			$(".finish").click(function (){
				for (var i=0; i<logcache; i+=1) { logstatus[i]=0 } config = 1; $(".SS").hide(); $(".Logs").hide();$(".finish").hide();$(".ullis").show();});
	function refreshall() {

		$.get("requestdata3.php", { file: '../Data/currentinfo2.log2' }, function(data){ $("#texthere").text(data);});
		presentlog();
		counter=counter+1;
		if(counter > 2 ) { topresentlog(); updatelogarea(); infochange(); counter = 1; }
		//refreshList("GetDisklist","#Disks","Data/disklist.txt");

			var date
			if($("#dater2").val() == "") {
				date = new Date
			//	$("#dater2").val(date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + ("0" + (date2.getDate() + 0)).slice(-2))
				$("#dater2").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2) + "T23:59:00")

			}
			var dater2=new Date($("#dater2").val())
			var dater3=dater2.getFullYear() + ("0" + (dater2.getMonth() + 1)).slice(-2) +  ("0" + (dater2.getDate() + 0)).slice(-2)


			chartplease(dater3);




	}
	function topresentlog() {
	var date

			if( $("#dater").val() == "") {
				date = new Date
				$("#dater").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2) + "T23:59:00")
			}
		///dateri=date.getFullYear()+'/' +("0" + (date.getDate() + 0)).slice(-2)+'/'+("0" + (date.getMonth() + 1)).slice(-2)+"T"+("0" + date.getUTCHours()).slice(-2)+":"+("0" +date.getUTCMinutes()).slice(-2)+":"+("0" + date.getUTCSeconds()).slice(-2)
		date=new Date($("#dater").val());
		dater=("0" + (date.getMonth() + 1)).slice(-2)+'/'+("0" + (date.getDate() + 0)).slice(-2)+'/'+date.getFullYear()+"T"+("0" + date.getUTCHours()).slice(-2)+":"+("0" +date.getUTCMinutes()).slice(-2)+":"+("0" + date.getUTCSeconds()).slice(-2)

			liner=$("#lines").val();

			for (var i=0; i< logstatus.length; i+=1) {
			 $.post("../pump.php", { req:"GetLog", name: dater+' '+liner+' '+"<?php echo $_SESSION["user"]; ?>"},function(){});


				updatelogarea();
			presentlog();
			infochange();

				}

			}

	function chartplease(datern) {
		//$.post("requeststats.php", { date: datern, time: 0 });
		$.get("../requestdatein.php", { file: 'Data/ctr.logupdated' }, function(data){

					var objdate=jQuery.parseJSON(data);


					trafficnewtime=objdate.updated;
		});
		if(traffictime == trafficnewtime) { //console.log("traffic not changed");

			if (requeststats==0) {

				$.post("../requeststats.php", { date: datern, time: 0 });

				requeststats=1;

			}
		} else {
			traffictime = trafficnewtime


			$.get("../requestdata.php", { file: 'Data/ctr.log' }, function(data){
				datalogf = jQuery.parseJSON(data);
			 	if (datalogf[0].nothing == 0) {


					$("#nothing").text("Nothing to Display"); $("#found").hide();
				}
				else {

				$("#nothing").text(parse(datern)); $("#found").show();

						var xax=[]; var yax=[];
						//plotpls=[[0,0]];
						plotpls[0] = [0,0];
						for (var i=0; i<50; i++) {
							plotpls[0].push([datalogf[i].time,datalogf[i].cpu]);
							xax.push(datalogf[i].time); yax.push(datalogf[i].cpu);
						}
						plotpls[0].shift(1); plotpls[0].shift(1);
						drawnow("CPU","CPU Utilization %",Math.min.apply(null,yax),Math.max.apply(null,yax),0);
				var xax=[]; var yax=[];
					plotpls[1] = [0,0];
					for (var i=0; i<50; i++) {
					plotpls[1].push([datalogf[i].time,datalogf[i].mem]);
					xax.push(datalogf[i].time); yax.push(datalogf[i].mem);
					}
					plotpls[1].shift(1); plotpls[1].shift(1);
					drawnow("MEM","Memory Used %",Math.min.apply(null,yax),Math.max.apply(null,yax),1);
							var xax=[]; var yax=[];
							plotpls[2] = [0,0];
							for (var i=0; i<50; i++) {
							plotpls[2].push([datalogf[i].time,datalogf[i].nettotkb]);
							xax.push(datalogf[i].time); yax.push(datalogf[i].nettotkb);
							}
							plotpls[2].shift(1); plotpls[2].shift(1);
							drawnow("NET","Network Throughput (Kb)",Math.min.apply(null,yax),Math.max.apply(null,yax),2);
			   var xax=[]; var yax=[];
				plotpls[3] = [0,0];
				for (var i=0; i<50; i++) {
				plotpls[3].push([datalogf[i].time,datalogf[i].deskiops]);
				xax.push(datalogf[i].time); yax.push(datalogf[i].deskiops);
				}
				plotpls[3].shift(1); plotpls[3].shift(1);
				drawnow("DIO","Storage IOPs ",Math.min.apply(null,yax),Math.max.apply(null,yax),3);
							var xax=[]; var yax=[];
							plotpls[4] = [0,0];
							for (var i=0; i<50; i++) {
							plotpls[4].push([datalogf[i].time,datalogf[i].deskthrouput]);
							xax.push(datalogf[i].time); yax.push(datalogf[i].deskthrouput);
							}
							plotpls[4].shift(1); plotpls[4].shift(1);
							drawnow("DTH","Storage Throughput (kb) ",Math.min.apply(null,yax),Math.max.apply(null,yax),4);
							   var xax=[]; var yax=[];
				plotpls[5] = [0,0];
				for (var i=0; i<50; i++) {
				plotpls[5].push([datalogf[i].time,datalogf[i].deskreadpercent]);
				xax.push(datalogf[i].time); yax.push(datalogf[i].deskreadpercent);
				}
				plotpls[5].shift(1); plotpls[5].shift(1);
				drawnow("DRP","Storage read % ",Math.min.apply(null,yax),Math.max.apply(null,yax),5);

		}

			});

		requeststats=0;

	}
}


	function updatelogarea(){

		var tm, splitstime;
		var tm2; var tme, splitstimee;
		var rqpg
		rqpg=liner;
		ii=1;

		$.get("../requestdate.php", { file: 'Data/Logs.logupdated' }, function(data){
			var objdate = jQuery.parseJSON(data);
			logtimenew=objdate.timey;
		});
		if(logtimenew!=logtime ) {
			logtime=logtimenew;
			$.get("../requestdata.php", { file: 'Data/Logs.log'+liner}, function(data){

			obj[ii] = jQuery.parseJSON(data);
			});
		}
	}
	function presentlog() {
		var logarea = "";
		var color;
		config=1;
		var ii=1;

		$("#Logdetails tr.datarow").remove();
		var y="between";
				for (var k in obj[ii]) {
							var objdata=obj[ii][k].data;
							var codes; var msgcode; var jofcode; var themsg; var themsgarr;
							if(typeof obj[ii][k].code != 'undefined'){
								codes=obj[ii][k].code.split("@");
								msgcode=codes[0];
								jofcode=0;
								jofcode=searchmsg(msgs,msgcode);
								//console.log("jofcode",jofcode);
								themsg=msgs[jofcode];
								try { themsgarr=themsg.split(":"); } catch(err) { updatelogarea();}
								codes.push(".");
								objdata=""
								for (i=1; i < themsgarr.length ;i++) {
									 objdata=objdata+themsgarr[i]+" "+codes[i]+" ";
								 }
								//console.log("codes",codes);
								//console.log("themsgarr",themsgarr);
							}
							logarea=logarea+obj[ii][k].Date+" "+obj[ii][k].time+" "+obj[ii][k].msg+": "+objdata+obj[ii][k].code+"\n";
							y="between"
							if (k == 0) { y="first"; };
							if (k == (obj[ii].length-1)) {y="last";};
							if(obj[ii][k].msg == "info") { color="blue"}; if(obj[ii][k].msg == "warning") { color="yellow"}; if(obj[ii][k].msg == "error") { color="red"}
							$("#Logdetails").append('<tr style="padding-left: 2rem; color:'+color+'" class="row datarow '+obj[ii][k].msg+'" ><td style="padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-3 text-left tdlog Volname '+y+' '+obj[ii][k].msg+' " data-toggle="popover" rel="popover" data-trigger="hover" data-container="body"  >' +obj[ii][k].Date+' '+obj[ii][k].time+'</td><td style="margin-left: -1.7rem; padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-2 text-center tdlog '+obj[ii][k].msg+' "  data-content='+objdata+' >'+obj[ii][k].user+'</td><td style="padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-7 text-center tdlog '+obj[ii][k].msg+' "  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >'+objdata+'</td></tr>');


										infochange();



				};

	}



//		$(".datec").datepicker().on("changeDate",function(e){
//					traffictime="44:44:34";
//		});
		$(".timec").change(function(){
					traffictime="44:44:34";
		});
$("#Disks").change(function(){
			traffictime="disk changes";
		});
		$(".traffic").change( function () { traffictime="44:44:34";
			});
		$(".checkboxy").change (function(){ updatelogarea();
			});
		//refreshList("GetDisklist","#Disks","Data/disklist.txt");
		$.post("../pump.php", { req:"GetDisklist", name: "Data/disklist.txt"},function(){});
		setInterval('refreshall()', 500); // Loop every 1000 milliseconds (i.e. 1 second)
		//console.log("<?php print $_REQUEST["idd"]; print session_id(); ?>");

		$('[data-toggle="popover"]').popover({
										html: true,
                    animation: false,
                    content: "TO BE ANNOUNCED",
                    placement: "bottom"


			});


		function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivss="false"; var userprivlogs="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						if (curuser !="admin") {
							$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
										userprivss=gdata[prot].Service_Charts;
										userprivlogs=gdata[prot].Logs;
									}
								};

								if( userprivss =="true") { $("#SS").show(); } else { $("#SS").hide(); } ; if( userprivlogs =="true") { $("#Logs").show(); } else { $("#Logs").hide(); };;
						});
					}
					$(".ullis").show();
			}
		}
		 topresentlog();
		 		$("#close-success").click(function() { $(".bg-success").hide(); });
		SS();
$(".netdata-chart-row").click(function(){ NETDATA.start(); });
		</script>
	<!-----	<script src="../assets/js/main.js"></script>
----->

</body>
</html>

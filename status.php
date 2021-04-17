<!DOCTYPE html>
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

    <link href="assets/js/chartist-js-develop/dist/chartist.min.css" rel="stylesheet" type="text/css">
    
   	
		

    <!--CUSTOME CSS-->
    <link href="assets/css/main.css" rel="stylesheet" type="text/css">
   
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
                    <span><img src="assets/images/user-icon.png"> </span><strong><span id="usrnm">myname</span></strong>
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

    <div class="bg-success" ><div id="texthere"></div>
        <button type="button" id="close-success" style="margin-top: -2.4rem" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-danger" ><div id="redhere"></div>
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
                        Accounts</a>
                </li>
                <li class="nav-item status">
                    <a class="nav-link ref active" data-toggle="tab" href="#" id="status" role="tab">
                        <div></div>
                        Status</a>
                </li>
                <li class="nav-item protocol">
                    <a class="ref nav-link" id="protocol" href="#" role="tab">
                        <div></div>
                        Volumes</a>
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
                <div class="tab-pane active" id="status" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li id="Logs" class="nav-item  active logs">
                            <a class="nav-link" data-toggle="tab" href="#Logspanel" role="tab">
                                <div></div>
                                <span>Logs</span></a>
                        </li>
                        <li class="nav-item servicestatus">
                            <a id="sstatus" class="nav-link " data-toggle="tab" href="#servicestatus" role="tab">
                                <div></div>
                                <span>Service Status</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane " id="servicestatus" role="tabpanel">
                    <div class="row table-responsive">
                        <table  class="col-12 table  dr-table-show">
                            <thead>
                            <tr class="row">
                                <th class="text-left col-3" style="padding-left: 2rem; ">Date and time</th>                                
                                <th class="text-center col-1">Host</th>
                                <th class="text-center col-2">Task</th>
                                <th class="text-center col-6">Status</th>
                            </tr>
                            </thead>
                            <tbody id="Qdetails">
                            </tbody>
                        </table>
                    </div>
 




                </div>
                <div class="tab-pane active" id="Logspanel" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-1 col-form-label">Date</label>
                            <div class="col-3" style="padding-left: 0px;">
                                <input id="dater" class="form-control form-control-sm" type="datetime-local" style="font-size: 13px;">
                            </div>
                            <div class="col-3 logs-check">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input msgtype" id="INFO" type="checkbox" value="option1" checked>Info
                                    </label>
                                </div>
                                <div class="form-check form-check-inline ">
                                    <label class="form-check-label">
                                        <input id="Warning" class="form-check-input msgtype" type="checkbox" value="option2" checked>Warning
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input id="Error" class="form-check-input msgtype" type="checkbox" value="option2" checked>Error
                                    </label>
                                </div>
                            </div>
                            <label class="col-1 col-form-label" style="padding-right: 0px; maring-right: -2rem;">Lines</label>
                            <div class="col-1" style="margin-top: 0.2rem; margin-left: -2.5rem; ">
                                <input id="lines" min="5" max="50" value="10" class="form-control form-control-sm " type="number">
                            </div>
			    <div class="col-2">
			     <select id="levelid" class="form-control">
				<option value=0>detailed</option>
				<option value=1>medium</option>
				<option value=2>brief</option>
                             </select>
                            </div>
                        </div>
                    </form>
                    <div class="row table-responsive">
                        <table  class="col-12 table  dr-table-show">
                            <thead>
                            <tr class="row">
										  <th class="text-left col-3" style="padding-left: 2rem; ">Date and time</th>                                
                                <th class="text-center col-1">User</th>
                                <th class="text-center col-2">Node</th>
                                <th class="text-center col-6">Data</th>
                                
                            </tr>
                            </thead>
                            <tbody id="Logdetails">
                           

                            </tbody>
                        </table>
                    </div>
                    <div class="row col-md-12">
                        <div class=" text-right">
                            <a id="pprev" href="#"><img src="assets/images/previous.png"></a>
                            <a id="pnext" href="#"><img src="assets/images/next.png"> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<form id="Loginref" action="Login.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="changepasswordref" action="changepassword.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="accountsref" action="accounts.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="statusref" action="status.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="protocolref" action="protocol.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="replicationref" action="replication.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="poolsref" action="pools.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="configref" action="config.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>

<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/js/tether.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>

<script src="assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="assets/js/dropzen.js"></script>
<script src="assets/js/main.js"></script>

<!--CUSTOM JS-->
		<script>
			var topresent=0;
			var hosts=[];
			var msgdata= "no no no";
			var msgs="no data";
			var datalogf = [];
 			var oldtexthere='hihihi';
			var betweend = [];
			var plots=[];
			var oldSdatec="1"; var oldEdatec="2";
			var newSdatec="3"; var newEdatec="4";
			var datemod="";
			var oldcurrentinfo="dlafsj";
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
			var neededlevel=1;
			var linerfact=2;
			var dater2;
			var msgtype="";
			var statsdata="initial";
			var themsg2
			var page=0;
			var reqpage=0;
			var timechanged=0;
			var counter = 1;
			var activepage=0; var lastpage=-1;
			var redflag="";
			var propdata='dkfjasdlk'
		        var frsttimeq = 1	
 var myid="<?php echo $_REQUEST['myid'] ?>";
 var myname="<?php echo $_REQUEST['name'] ?>";
 $(".myname").val(myname)
 $("#usrnm").text(myname)
 $(".params").val(myid)
 function updatehosts() {
  $.get("gump2.php", { req: "prop", name:"--prefix"  },function(data){ 
   if(propdata==data){;} else {
    propdata=data
    prop2=$.parseJSON(propdata)
    $.each(prop2,function(r,s){
     prop=$.parseJSON(prop2[r]["prop"].replace('{','{"').replace('}','"}').replace(/:/g,'":"').replace(/,/g,'","'))
     hosts[prop2[r]['name'].replace('prop/','')]=prop.name
     if( prop.configured.includes('yes') < 1 ) { if(redflag.includes('need') >0 ) { redflag=redflag+', Node: '+prop.name+' needs to be configured'; } else { redflag='Node: '+prop.name+' needs to be configured';  }} else { redflag="";};
  });
 }				
});
};


function chkuser(){
	$.get("./pumpy.php", { req:"chkuser2.sh", name:myname+" "+myid+" "+myname},function(data){ 
         var data2=data.replace(" ","").replace('\n','');
	if (myid != data2) { 
		document.getElementById('Login'+'ref').submit();
 	}		;
				});
}
chkuser();

				$(".ref").click(function() {
					if($(this).attr('id')=="Login")
					{ 
						document.getElementById('Login'+'ref').submit();
						
					} else {
					document.getElementById($(this).attr('id')+'ref').submit();
					}
		 //console.log($(this).attr('id'));
		});
			$(".bg-success").hide();$("#texthere").text("welcome to Quickstor interface");$(".bg-danger").hide();$(".bg-warning").hide();
 $("#sstatus").click(function(){ ; });
			$.get("requestdatein.php", { file: 'Data/ctr.logupdated' }, function(data){
				
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
				msgtype=""
				if($("#INFO").is(":checked")) { msgtype=msgtype+"info"; $(".info").show(); }
				if($("#Warning").is(":checked")) { msgtype=msgtype+"warning"; $(".warning").show(); }
				if($("#Error").is(":checked")) { msgtype=msgtype+"error"; $(".error").show(); }
			};
	     $(".msgtype").click(function() { if(topresent==0){topresentlog();}; infochange(); });
			
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
				url : "msgsglobal.txt",
				dataType: "text",
				success : function (data) {
					
					 msgdata=data;
					msgs=msgdata.split("\n");
						}
				});
			
			function refreshList(req,listid,fileloc) {
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					disktimenew=cdata.updated;
				});
				if(disktimenew!=disktime)
				{ 
					disktime=disktimenew;
					$(listid+' option').remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
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
					var curuser=myname;
					if(curuser!="admin"){
					$.get("gump2.php", { req: 'usersinfo/'+curuser, name:"" },function(data){ 
	var gdata=data.split('/')
	gdata.shift(); gdata.shift();
						if(gdata[3].split('-')[1]!="true") { $(".activeDirectory").hide(); $("#activeDirectory").hide(); alltabsAcco=1;} 
						if(gdata[7].split('-')[1]!="true") { $(".boxUsers").hide(); $("#boxUsers").hide(); alltabsAcco=alltabsAcco+1;} 
						if(gdata[10].split('-')[1]!="true") { $(".boxProperties").hide(); $("#boxProperties").hide(); alltabsAcco=alltabsAcco+1;} 
						if(alltabsAcco==3) { $(".accounts").hide()}
						if(gdata[4].split('-')[1]!="true") { $(".servicestatus").hide();frsttimeq = 1; $("#servicestatus").hide(); alltabsStat=1;} 	else { $(".servicestatus").show();frsttimeq=1; $("#servicestatus").show();}
						if(gdata[8].split('-')[1]!="true") { $("#Logs").hide(); $("#Logspanel").hide();alltabsStat=alltabsStat+1;}
						if(alltabsStat==2) { $(".status").hide();}
						if(gdata[11].split('-')[1]!="true") { $(".cifs").hide(); $("#cifspane").hide(); alltabsProt=1;$(".Home").hide(); $("#Homespane").hide();} 
						if(gdata[5].split('-')[1]!="true") { $(".nfs").hide(); $("#nfspane").hide(); alltabsProt=alltabsProt+1;}
						if(alltabsProt==2) { $(".protocol").hide()}
						if(gdata[15].split('-')[1]!="true") { $(".partner").hide(); $("#partner").hide(); alltabsRepli=1;} 
						if(gdata[14].split('-')[1]!="true") { $(".sender").hide(); $("#sender").hide(); alltabsRepli=alltabsRepli+1;} 
						if(gdata[13].split('-')[1]!="true") { $(".recive").hide(); $("#receiver").hide(); alltabsRepli=alltabsRepli+1;} 
						if(alltabsRepli==3) { $(".replication").hide()}
						if(gdata[12].split('-')[1]!="true") { $(".diskGroups").hide(); $("#diskGroups").hide(); alltabsPool=1;} 
						if(gdata[6].split('-')[1]!="true") { $(".snapshots").hide(); $("#snapshots").hide(); alltabsPool=alltabsPool+1;}
						if(alltabsPool==2) { $(".pools").hide()}
						if(gdata[9].split('-')[1]!="true") { $(".userPrivlliges").hide(); $("#userPrivlliges").hide(); alltabsUP=1;} 
						if(gdata[16].split('-')[1]!="true") { $(".firmware").hide(); $("#firmware").hide(); alltabsUP=alltabsUP+1;}
						if(alltabsUP==2) { $(".config").hide()}
					
					});
				};
			};
		    
			
			$("#lines").change(function(){
				   if(topresent==0){topresentlog();};updatelogarea(); infochange();
							
			});
			
			$("#dater").change(function(){
				   timechanged=1
				   if(topresent==0){topresentlog();}; updatelogarea(); infochange();
				 
							
			});
			$("#pnext").click(function(){  
				timechanged=1
				linerfact=1
				//dater=$("#dater").val()
				//$("#dater").change();
							
			});
			$("#pprev").click(function(){  
				timechanged=1
				linerfact=-1	
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
					var curuser=myname;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
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
						
							
						    config = 0; $("h2").css("background-image","url('img/logs.png')").text("Logs"); $(".ullis").hide(); $(".finish").show();$(".Logs").show(); if(topresent==0){topresentlog();};
						}
					});
				
			});
			$(".finish").click(function (){ 
				for (var i=0; i<logcache; i+=1) { logstatus[i]=0 } config = 1; $(".SS").hide(); $(".Logs").hide();$(".finish").hide();$(".ullis").show();});
	function refreshall() {
		
		$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){
		if(redflag.includes('need')>0){ $('#redhere').text(redflag); $(".bg-danger").show(); } else { $(".bg-danger").hide(); }
		if(data!=oldcurrentinfo && data != ''){linerfact=-1;oldcurrentinfo=data;  $(".bg-success").fadeIn(800);if(data.includes('zone') > 0) { data=data.split('!').join(':').split('_').join(' ').split('^').join(',');}; $("#texthere").text(data);$(".bg-success").fadeOut(8000);}
	});
		topresentlog();
		counter=counter+1;
		if(counter > 2 ) { if(topresent==0){topresentlog();topresentq();}; updatehosts(); updatelogarea(); infochange(); counter = 1; }
		//refreshList("GetDisklist","#Disks","Data/disklist.txt");
		
			var date
			if($("#dater2").val() == "") { 
				date = new Date
			//	$("#dater2").val(date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + ("0" + (date2.getDate() + 0)).slice(-2))
				$("#dater2").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2) + "T23:59:00") 
		
			} 			
			var dater2=new Date($("#dater2").val())
			var dater3=dater2.getFullYear() + ("0" + (dater2.getMonth() + 1)).slice(-2) +  ("0" + (dater2.getDate() + 0)).slice(-2)
			
			
//			chartplease(dater3);
			
		
		
		
	}
	var data2;
	var datalst =[]
	var reprint=1
        function topresentq(){
	 if($("#servicestatus").hasClass('active')<=0) {return; }
           if(frsttimeq > 0){
            frsttimeq = -1
            color = 'blue'
	    //$("#Qdetails tr.datarow").remove();
            for(r=1; r<11; r++){
	     $("#Qdetails").append('<tr style="padding-left: 3.9rem; color:'+color+'" class="row idatarow" ><td id="td'+r+'1" style="padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-3 text-left tdlog Volnam " data-toggle="popover" rel="popover" data-trigger="hover" data-container="body"  >...</td><td id="td'+r+'2" style="margin-left: -1.2rem; padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-1 text-left tdlog " >...</td><td id="td'+r+'3" style="margin-left: 0rem; padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-2 text-center tdlog" ></td>...<td id="td'+r+'4" style="padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-6 text-center tdlog"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this >...</td></tr>');
            }
           }
         $.get("./pumpy.php", { req:"readq.sh", name:'nothing'},
					function(data){  
                   datalst=data.split('|')
		   //$("#Qdetails tr.datarow").remove();
                   ln = 0
    		   $.each(datalst,function(r,s){
                    ln = r+1
                    color = "blue"
		    dataitems = s.split(' ')
                    $("#td"+ln+"1").text(dataitems[0]+' '+dataitems[1])
                    $("#td"+ln+"2").text(dataitems[2])
                    $("#td"+ln+"3").text(dataitems[3])
                    $("#td"+ln+"4").text(dataitems[4])
		   });
                   for(r=ln+1; r<10; r++){
                    $("#td"+r+"1").text("...")
                    $("#td"+r+"2").text("...")
                    $("#td"+r+"3").text("...")
                    $("#td"+r+"4").text("...")
                   }

 
	 });
        }
	function topresentlog(){
if($("#Logspanel").hasClass('active')<=0) { return ; }
	var date
	topresent=1;
			if( $("#dater").val() == "") { 
				date = new Date
				$("#dater").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2) +"T"+("0" + date.getHours()).slice(-2)+":"+("0" +date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2)) 
			} 		
		if(linerfact==-1) {
				linerfact=2
				date=new Date($("td.first").text());
				var datefullyear;
				datefullyear=date.getFullYear()
				dater=("0" + (date.getMonth() + 1)).slice(-2)+'/'+("0" + (date.getDate() + 0)).slice(-2)+'/'+datefullyear+"T"+("0" + date.getHours()).slice(-2)+":"+("0" +date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2) 	
				$.get("./pumpy.php", { req:"readlog.sh", name:dater+' -'+liner+' '+msgtype+' '+neededlevel+' '+myname},
					function(data){  
					reprint=1;
                                        if (data.includes('readlog')>0) {reprint=0}
					try {
					obj[1]=jQuery.parseJSON(data);
					}
					catch(err) { reprint=0 }
					try{
					date= new Date(obj[1][1].Date+' '+obj[1][1].time);
					}
					catch(err){ //console.log(obj[1]);
						reprint=0;}
			if (reprint==1){
				if(obj[1].length < 11) {
					date = new Date
					$("#dater").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2) +"T"+("0" + date.getHours()).slice(-2)+":"+("0" +date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2)) 

					
				} else { $("#dater").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2) +"T"+("0" + date.getHours()).slice(-2)+":"+("0" +date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2)) 
				};
			}
				});
				
			
				
		}
		if(linerfact==1){
			linerfact=2
				date=new Date($("td.last").text());
				$("#dater").val(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 0)).slice(-2)+"T"+("0" + date.getHours()).slice(-2)+":"+("0" +date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2)) 	
				dater=("0" + (date.l() + 1)).slice(-2)+'/'+("0" + (date.getDate() + 0)).slice(-2)+'/'+date.getFullYear()+"T"+("0" + date.getHours()).slice(-2)+":"+("0" +date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2) 	
				$.get("./pumpy.php", { req:"readlog.sh", name:dater+' '+liner+' '+msgtype+' '+neededlevel+' '+myname},
					function(data){  
					reprint=1;
                                        if (data.includes('readlog')>0) {reprint=0}
					try {
					obj[1]=jQuery.parseJSON(data);
					}
					catch(err) { //console.log(err); 
					reprint=0 }
				});
		}
		if(linerfact==2) {
				
				date=new Date($("#dater").val());		
				var datefullyear;
				datefullyear=date.getFullYear()
				if ( timechanged < 1 ) { datefullyear=date.getFullYear()+1 }
				dater=("0" + (date.getMonth() + 1)).slice(-2)+'/'+("0" + (date.getDate() + 0)).slice(-2)+'/'+datefullyear+"T"+("0" + date.getHours()).slice(-2)+":"+("0" +date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2) 	
				liner=$("#lines").val();
 				
				$.get("./pumpy.php", { req:"readlog.sh", name:dater+' '+liner+' '+msgtype+' '+neededlevel+' '+myname},
					function(data){  
					reprint=1;
                                        if (data.includes('readlog')>0) {reprint=0}
					try {
					obj[1]=jQuery.parseJSON(data);
					}
					catch(err) { //console.log(err); 
					reprint=0 }
				});
			//	updatelogarea();
				
							
				
			
			}
			if(reprint == 1) {
			presentlog();
			infochange();
			topresent=0;
			};
	}
			

	function chartplease(datern) {
		//$.post("requeststats.php", { date: datern, time: 0 });
		$.get("requestdatein.php", { file: 'Data/ctr.logupdated' }, function(data){
				
					var objdate=jQuery.parseJSON(data);
					
					
					trafficnewtime=objdate.updated;
		});
		if(traffictime == trafficnewtime) { //console.log("traffic not changed");
			
			if (requeststats==0) {
				
				$.post("requeststats.php", { date: datern, time: 0 });
				
				requeststats=1;
				
			}
		} else {
			traffictime = trafficnewtime 	
			
			
			$.get("requestdata.php", { file: 'Data/ctr.log' }, function(data){
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
	
	function updatelogarea() {}
	function updatelogarea2(){
		
		var tm, splitstime;
		var tm2; var tme, splitstimee;
		var rqpg
		rqpg=liner;
		ii=1;
  
		$.get("requestdate.php", { file: 'Data/Logs2.log' }, function(data){
			var objdate = jQuery.parseJSON(data);
			logtimenew=objdate.timey;
		});
		if(logtimenew!=logtime ) {
			logtime=logtimenew;			
			$.get("requestdata.php", { file: 'Data/Logs2.log'+liner}, function(data){
			obj[ii] = data
			});
		}
	}
	function presentlog() {
		var logarea = "";
		var color;
		var level;
		config=1;
		var ii=1;
	
		$("#Logdetails tr.datarow").remove();
		var y="between";
				for (var k in obj[ii]) { 
							var objdata=obj[ii][k].data;
							var codes; var msgcode; var jofcode; var themsg; var themsgarr;
							if(typeof obj[ii][k].code != 'undefined' && obj[ii][k].msglevel>=neededlevel){
								codes=obj[ii][k].code.split("@");
								msgcode=codes[0];
								jofcode=0;
								jofcode=searchmsg(msgs,msgcode);
								//console.log("jofcode",jofcode);
								if(jofcode > -1)themsg=msgs[jofcode];
								try { themsgarr=themsg.split(":"); xfrom=themsgarr.indexOf(' from '); if (xfrom > -1) { themsgarr.splice(xfrom,1);} } catch(err) { updatelogarea();}
level=themsgarr[1]
themsgarr.splice(1,1)
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
							if(obj[ii][k].msg == "info") { color="blue"}; if(obj[ii][k].msg == "warning") { color="#cabc55"}; if(obj[ii][k].msg == "error") { color="red"}						
							if(objdata.includes('zone') > 0){objdata1=objdata.split('%')[0];objdata=objdata.split('!').join(':').split('_').join(' ').split('^').join(',')}
							$("#Logdetails").append('<tr style="padding-left: 3.9rem; color:'+color+'" class="row datarow '+obj[ii][k].msg+'" ><td style="padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-3 text-left tdlog Volname '+y+' '+obj[ii][k].msg+' " data-toggle="popover" rel="popover" data-trigger="hover" data-container="body"  >' +obj[ii][k].Date+' '+obj[ii][k].time+'</td><td style="margin-left: -1.2rem; padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-1 text-left tdlog '+obj[ii][k].msg+' "  data-content='+objdata+' >'+obj[ii][k].user+'</td><td style="margin-left: 0rem; padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-2 text-center tdlog'+obj[ii].msg+' " data-content='+objdata+' >'+obj[ii][k].fromhost+':'+hosts[obj[ii][k].fromhost]+'</td><td style="padding-top: 0.1rem; padding-bottom: 0.1rem;" class="col-6 text-center tdlog '+obj[ii][k].msg+' "  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >'+objdata+'</td></tr>');
							
							
										infochange();			
							
						
					
				};
	
	}
	function presentlog2() {
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
							if(obj[ii][k].msg == "info") { color="blue"}; if(obj[ii][k].msg == "warning") { color="#cce11a"}; if(obj[ii][k].msg == "error") { color="red"}						
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
$("#levelid").val(neededlevel)
$("#levelid").change(function(){
  neededlevel=$("#levelid").val()
});
$("#levelid").change()
$("#Disks").change(function(){
			traffictime="disk changes";
		});
		$(".traffic").change( function () { traffictime="44:44:34"; 
			});
		$(".checkboxy").change (function(){ updatelogarea();
			});
		//refreshList("GetDisklist","#Disks","Data/disklist.txt");
		$.post("./pump.php", { req:"GetDisklist", name: "Data/disklist.txt", passwd:myname},function(){});
		setInterval('refreshall()', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
		setInterval('chkuser()', 300000); // Loop every 1000 milliseconds (i.e. 1 second)
		
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
						var curuser=myname;
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user==myname) {
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
		 if(topresent==0){topresentlog();};
		 		$("#close-success").click(function() { $(".bg-success").hide(); });
		SS();
		</script>
	<!-----	<script src="assets/js/main.js"></script>
----->

</body>
</html>

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
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">

        <!--Font Awesome css-->
        <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

        <!--CUSTOME CSS-->
        <link href="assets/css/jquery-ui.min.css" rel="stylesheet" type="text/css">
        <link href="assets/css/main.css" rel="stylesheet" type="text/css">
        <link href="assets/css/bootstrap-select.min.css" rel="stylesheet" type="text/css">
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
           
            <div class="bg-warning">Your changes may be not saved
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="bg-success"><div id="texthere"></div>
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
                        <div class="tab-pane active" id="protocol2" role="tabpanel">
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
                                <li class="nav-item Home">
                                    <a class="nav-link" data-toggle="tab" href="#Homespane" role="tab">
                                        <div></div>
                                        <span>Home</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 main-content">
                    <div class="tab-content ">
                        
                        <div class="tab-pane  row" id="Homespane" role="tabpanel">
                            <div class="col-5 dr-form">
                                <div class="form-group row">
                                    <label class="col-3 col-form-label">Pool</label>
                                    <div class="col-5">
                                        <select id="Pool2Home" class="Pool2 form-control">
                                        </select>
                                    </div>
                                </div>
			    </div> 
                            
                            <div  class="offset-3 col-6"  >
                                <div class="row">
                                    <div class="col-12">
                                    <canvas id="myChartHome" style="max-width: 50rem;">hellomezo</canvas>

                                    </div>
                                </div>
                            </div>
                        
                            <div class="table-responsive  col-12" style='margin-top:-0.7rem;'>
                                <table class="col-12 table table-hover dr-table-show">
                                    <thead>
                                    <tr>
                                        <th class="" style="padding-left: 2rem; ">Volume Name</th>
                                        <th class="text-center">Volume Size(MB)</th>
                                        <th class="text-center">Actual size(MB)</th>
                                        <th class="text-center">Snaps size(MB)</th>
                                        <th class="text-center">Compres ratio(%)</th>
                                        <th class="text-center">IPAddress</th>
                                        <th class="text-center">Subnet</th>
                                        <th class="text-center">Need Update</th>
                                        <th class="text-center">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody id="VolumetableHome">
                                    <tr style="display: none;">
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane row active" id="cifspane" role="tabpanel">
                            <div class="col-5 dr-form">
                                <div class="form-group row">
                                    <label class="col-3 col-form-label">Pool</label>
                                    <div class="col-5">
                                        <select id="Pool2CIFS" class="Pool2 form-control">
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
                                        <label class="col-3 col-form-label">IP Address</label>
                                        <div class="col-4">
                                            <input id="AddressCIFS" class="form-control ip_address" type="text"  >
                                        </div>
                                        <label class="col-2 col-form-label">Subnet</label>
                                        <div class="col-3">
                                            <input class="form-control" type="number" id="SubnetCIFS" min="8" max="32" value="24" step=8>
                                        </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-3 col-form-label">Allowed Groups</label>
                                    <div class="col-5">
                                        <select id="GroupCIFS" title="No One" data-actions-box='true' data-live-search='true' class="selectpicker form-control" multiple>
                                            <option value="hi">grp1</option>
                                            <option value="by" selected>grp2</option>
                                            <option value="ddfka">grp3</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-3 col-form-label">Size..GB</label>
                                    <div class="col-5">
                                        <input id="volsizeCIFS" min="1" class="form-control" type="number" value="1">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <a href="javascript:createvol()"class="col-4">
                                        <div id="createvolCIFS" type="button" class="createvol btn btn-submit">Create Volume
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div  class="col-6"  >
                                <div class="row">
                                    <div class="col-12">
                                    <canvas id="myChartCIFS" style="max-width: 50rem;">hellomezo</canvas>

                                    </div>
                                </div>
                            </div>
                            <div class="col-12 table-responsive "style='margin-top:-0.7rem;'>
                                <table class="col-12 table table-hover dr-table-show">
                                    <thead>
                                    <tr>
                                        <th class="" style="padding-left: 2rem; ">Volume Name</th>
                                        <th class="text-center">Volume Size(MB)</th>
                                        <th class="text-center">Actual size(MB)</th>
                                        <th class="text-center">Snaps size(MB)</th>
                                        <th class="text-center">Compres ratio(%)</th>
                                        <th class="text-center">IPAddress</th>
                                        <th class="text-center">Subnet</th>
                                        <th class="text-center">Allowed Groups</th>
                                        <th class="text-center">Need Update</th>
                                        <th class="text-center">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody id="VolumetableCIFS">
                                    <tr style="display: none;">
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane row" id="nfspane" role="tabpanel">
                            <div class="col-5 dr-form">
                                <div class="form-group row">
                                    <label class="col-3 col-form-label">Pool</label>
                                    <div class="col-5">
                                        <select id="Pool2NFS" class=" Pool2 form-control">
                                            
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
                                    <label class="col-3 col-form-label">IP Address</label>
                                    <div class="col-4">
                                        <input id="AddressNFS" class="form-control ip_address" type="text"  >
                                    </div>
                                    <label class="col-1 col-form-label">Subnet</label>
                                    <div class="col-2">
                                        <input class="form-control" type="number" id="SubnetNFS" min="0" max="32" value="24" step=8>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-3 col-form-label">Allowed Groups</label>
                                    <div class="col-5">
                                        <select id="GroupNFS" data-actions-box="true" data-live-search="true" title="No One" class="selectpicker form-control" multiple>
                            				 <option value="hi">grp1</option>
                            				 <option value="by" selected>grp2</option>
                            				 <option value="ddfka">grp3</option>
                                        </select>
                                    </div>
                    			</div>
                                <div class="form-group row">
                                    <label class="col-3 col-form-label">Size..GB</label>
                                    <div class="col-5">
                                        <input id="volsizeNFS" class="form-control" min=1 value=1 type="number">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <a href="javascript:createvol()"class="col-4">
                                        <div id="createvolNFS" type="button" class="createvol btn btn-submit ">Create Volume</div>
                                    </a>
                                </div>
                            </div>
                            <div  class="col-6"  >
                                <div class="row">
                                    <div class="col-12">
                                    <canvas id="myChartNFS" style="max-width: 50rem;">hellomezo</canvas>

                                    </div>
                                </div>
                            </div>
                            <div class="col-12 table-responsive "style='margin-top:-0.7rem;'>
                                <table class="col-12 table table-hover dr-table-show">
                                    <thead>
                                    <tr>
                                        <th class="text-center" style="padding-left: 2rem; ">Volume Name</th>
                                        <th class="text-center">Volume Size(MB)</th>
                                        <th class="text-center">Actual size(MB)</th>
                                        <th class="text-center">Snaps size(MB)</th>
                                        <th class="text-center">Compres ratio(%)</th>
                                        <th class="text-center">IPAddress</th>
                                        <th class="text-center">Subnet</th>
                                        <th class="text-center">Allowed Groups</th>
                                        <th class="text-center">Need Update</th>
                                        <th class="text-center">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody id="VolumetableNFS">
                                    <tr>
                                    </tr>
                                    </tbody>
                                </table>
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
        <div class="modal " tabindex="-1" id="overlay" role="dialog">
         <div class="modal-dialog modal-dialog-centred" role="document">
          <div class="modal-content">
           <div class="modal-header">
            <h4 class="modal-title text-center">Login TimeOut</h4>
           </div>
           <div class="modal-body">
            <p> please click mouse or press a key to keep logged on</p>
           </div>
          </div>
         </div>
        </div>
        <!--JQUERY SCROPT-->
        <script src="assets/js/popper.min.js"></script>
        <script src="assets/js/Chart.js"></script>
        <script src="assets/js/jquery-3.3.1.min.js"></script>
        <script src="assets/js/jquery-ui.min.js"></script>

        <!--BOOTSTRAP SCRIPT-->
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/js/bootstrap-select.min.js"></script>
        <!--CUSTOM JS-->
        <script>
        	var pools = [];
        	var dblrefresh=false;
        	var plotflag = 0;
        	var Protocol=0;
        	var config = 1;
        	var gdata;
        	var Vollisttime = 333;
        	var Vollisttime2 = 4444;
        	var Vollisttimenew = 5555;
        	var syscounter2=1000;
        	var oldcurrentinfo="dkasjf";
        	var olddata="hi";
        	var olddiskpool="hihi";
        	var jdata="hihihihi"
        	var grpolddata="hihihihi"
        	var chartdata1 = {};
        	var chartdata2 = {};
        	var datachart1 = [];
        	var datachart2 = [];
        	var voldirty=1;
        	var Vollock=0;
        	var prot="kssl";
        	var myChart='1';
            var pools=[];
        	var volumes=[];
        	var allgroups;
        	var plotb;
            var mydate;
            var wait1=0;
            var wait2=0
            var oldvoldata;
            var oldvoldataraw='dkfjdk';
            var selvalues={};
            var myidhash;
            var redflag="";
            var propdata="dkaf";
            var mytimer;
            var mymodal;
            var idletill=480000;
            var modaltill=idletill-120000
            var myid="<?php echo $_REQUEST['myid'] ?>";
            myidhash=myid;
            var myname="<?php echo $_REQUEST['name'] ?>";
            $(".bg-success").hide();$(".bg-successold").hide();$(".bg-danger").hide();$(".bg-warning").hide();
            $(".myname").val(myname)
            $("#usrnm").text(myname)
            $(".params").val(myid);
            $(".selectpicker").selectpicker()
            //$("#overlay").modal('show');
            function timeron() {
                mytimer=setTimeout(function() { 
                document.getElementById('Login'+'ref').submit();
                	},idletill);
                mymodal=setTimeout(function() { 
                $("#overlay").modal('show')
                },modaltill);
            }
            timeron();
            
            function timerrst() { clearTimeout(mytimer); clearTimeout(mymodal);$("#overlay").modal('hide'); timeron(); }
            
            function chkuser() {
        		$.get("./pumpy.php", { req:"chkuser2.sh", name:myname+" "+myid+" "+myname},function(data){ 
                    var data2=data.replace(" ","").replace('\n','');
                    if (myid != data2) { 
                	document.getElementById('Login'+'ref').submit();
                	}		;
        		});
            };
            chkuser();
        	
            $("html").click(function(){
                mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser();myidhash=mydate; } timerrst();
            });
        	
            $("html").keypress(function(){mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser(); myidhash=mydate;};timerrst();
            });
        	
            function normsize(s){
                var sizeinbytes=parseFloat(s)
                if (s.includes('K')) { sizeinbytes=sizeinbytes/1000 }
                else if (s.includes('M')) { sizeinbytes=sizeinbytes }
                else if (s.includes('G')) { sizeinbytes=sizeinbytes*1000 }
                else if (s.includes('T')) { sizeinbytes=sizeinbytes*1000000 }
                else if (s.includes('P')) { sizeinbytes=sizeinbytes*1000000000 }
                else  { sizeinbytes=sizeinbytes/1000000 }
                return parseFloat(sizeinbytes)
            }
         
            function createvol() { 
                var thepool=$("#Pool2"+prot).val()
                var Groupprot="NoUser"
                if($("#Group"+prot).val()!=""){
                    Groupprot=$("#Group"+prot).val().toString()
                }
                $.post("./pump.php", { req:"VolumeCreate"+prot+".py", name:pools[thepool].name+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+Groupprot, passwd:$("#Address"+prot).val().toString()+" "+$("#Subnet"+prot).val().toString()+" "+myname+" "+pools[thepool].host+" "+myname }, function (data){
                });
            };
        	
        	function voldel() {  
                var thepool=$("#Pool2"+prot).val()
                $.post("./pump.php", { req:"VolumeDelete"+prot+".py", name:pools[thepool].name+" "+arguments[0]+" "+prot+" "+myname, passwd: pools[thepool].host+" "+myname 
                });   
            }
        	
        	function SS(){ 
        	   var alltabsAcco=0;var alltabsStat=0;var alltabsProt=0;var alltabsRepli=0;var alltabsPool=0;var alltabsUP=0;
        		var curuser=myname;
        		if(curuser!="admin"){
                    $.get("gump2.php", { req: 'usersinfo/'+curuser, name:"" },function(data){ 
                        var gdata=data.split('/')
                        gdata.shift(); gdata.shift();
                        if(gdata[3].split('-')[1]!="true") { $(".activeDirectory").hide(); $("#activeDirectory").hide(); alltabsAcco=1;
                        } 
                    	if(gdata[7].split('-')[1]!="true") { $(".boxUsers").hide(); $("#boxUsers").hide(); alltabsAcco=alltabsAcco+1;
                        } 
                    	if(gdata[10].split('-')[1]!="true") { $(".boxProperties").hide(); $("#boxProperties").hide(); alltabsAcco=alltabsAcco+1;} 
        				if(alltabsAcco==3) { $(".accounts").hide()}
        				if(gdata[4].split('-')[1]!="true") { $(".servicestatus").hide(); $("#servicestatus").hide(); alltabsStat=1;} 	else { $(".servicestatus").show(); $("#servicestatus").show();}
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
            SS();

        	function refreshgroups() {
            	var jdata;
            	$.get("gump2.php", { req: 'usersigroup', name:'--prefix' }, function(grpdata){
                	if(grpdata==grpolddata) { return; }
                	grpolddata=grpdata
                	jdata = jQuery.parseJSON(grpdata);
                	allgroups=jdata;
                	$("#Group"+prot+" option").remove();
                	var selected=$("#Group"+prot).val();
                	$(".selectpicker").selectpicker("refresh");
                	var username="dkfj"
                    if (selected.includes('Everyone')>0){ 
                    	$("#Group"+prot).append("<option value='Everyone' selected>Everyone</option>");
                    } else {
                    	$("#Group"+prot).append("<option value='Everyone'>Everyone</option>");
                    }  
                	$.each(jdata, function(k,v){
                    	username=jdata[k]['name'].replace('usersigroup/','')
                        if (username != "Everyone" ) {
                            if (selected.includes(username)>0){ 
                            	$("#Group"+prot).append("<option value='"+username+"' selected>"+username+"</option>");
                            } else {
                            	$("#Group"+prot).append("<option value='"+username+"'>"+username+"</option>");
                            }  
                        }
                		$(".selectpicker").selectpicker("refresh");
                    });
                });
            }

            function refreshselect(){
                $.each($('[id^=selvol]'),function(e,v) {
                    var k;
                    for (k in selvalues){
                        if ( k.includes('change') > 0 )  { continue; }
                        if (this.id.includes(k)> 0) {
                            if( selvalues[k+'change']==0) { 
                                if(selvalues[k].toString()!=$('#'+k).val().toString()+$('#'+k+'ip').val().toString()+$('#'+k+'sub').val().toString()) {
                                    $('#btn'+k).show()
                                    selvalues[k+'change']= 1
                                }
                            } else {
                                if(selvalues[k].toString()==$('#'+k).val().toString()+$('#'+k+'ip').val().toString()+$('#'+k+'sub').val().toString()) {
                                $('#btn'+k).hide();
                                selvalues[k+'change']=0;
                                } 
                            }
                        }
                    };
                });
            }
        	
            function refreshall() {
            	refreshgroups();
            	refreshselect();
                if($("#cifspane").hasClass('active'))  { if (prot !="CIFS") { grpolddata='dkjffdk';olddiskpool="oldnfs"; pools=[]; $("#Pool2"+prot+" option.variable2").remove(); $(".variable2").remove(); Vollisttime2="skldjfadks"; prot="CIFS";}};
                if($("#Homespane").hasClass('active'))  { if (prot !="Home") { olddiskpool="old"; pools=[]; $("#Pool2"+prot+" option.variable2").remove(); $(".variable2").remove(); Vollisttime2="skldjfadks"; prot="Home";}};
                if($("#nfspane").hasClass('active') ) { if (prot !="NFS") { grpolddata='dkfaljf';olddiskpool="oldcifs"; pools=[]; $("#Pool2"+prot+" option.variable2").remove();prot="NFS"; Vollisttime2="ndfsfsn";}};
                $.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){
                    if(redflag.includes('need')>0){ $('#redhere').text(redflag); $(".bg-danger").show(); } else { $(".bg-danger").hide(); }
                    if(data!=oldcurrentinfo && data != ''){linerfact=-1;oldcurrentinfo=data;  $(".bg-success").fadeIn(800); $("#texthere").text(data);$(".bg-success").fadeOut(8000);}
                });
        		refreshList2("GetPoolVollist","#Volumetable"+prot,"Data/Vollist.txt","Volumes");
            		//refresh3("#statusarea3");
            	if(syscounter2==1000) { syscounter2=0; } else { syscounter2=syscounter2+1; }
            }
            setInterval('refreshall()', 500);

        	function Initclickedprotocol() {
                voldirty= 1; config = 1; 
        		$("#chartNFS").children().remove(); $("#Volumetable tr").remove();
        		$(".New").prop("selected","selected");
        		$("#Vollist").hide(); 
        		$("#Voldetails").hide();
        		//$("#createvol").show();
            }
        			
            function updatehosts() {
                $.get("gump2.php", { req: "prop", name:"--prefix"  },function(data){ 
                    if(propdata==data){;} else {
                        propdata=data
                        prop2=$.parseJSON(propdata)
                        $.each(prop2,function(r,s){
                         prop=$.parseJSON(prop2[r]["prop"].replace('{','{"').replace('}','"}').replace(/:/g,'":"').replace(/,/g,'","'))
                         if( prop.configured.includes('yes') < 1) { if(redflag.includes('need') >0 ) { redflag=redflag+', Node: '+prop.name+' needs to be configured'; } else { redflag='Node: '+prop.name+' needs to be configured';  }} else { redflag=""; };
                        });
                    }				
                });
            };

            function refreshList2(req,listid,filelocfrom,show) {
                var fileloc=filelocfrom;
                var request=req;
                var others=0
                if (typeof(allgroups) == 'undefined' ) {
                    return;
                }
                if(wait1 > 0 && wait2 > 0 ){ dblrefresh=false; wait1=0; wait=0; $(".volgrps option").hide();$(".volgrps .filter-option-inner").css("font-size","0.8rem");}
                if (dblrefresh==false) { dblrefresh=true;}
                else {return; }
                fileloc = filelocfrom ; request= request ; 
                $.get("gump2.php", { req: 'vol', name:'--prefix' }, function(data){
                    wait1=1
                    if(data!=oldvoldataraw){
                        jdata = jQuery.parseJSON(data)
                        if(typeof jdata =='object' ) {
                            oldvoldataraw=data
                            oldvoldata=jdata
                            olddiskpool='change' 
                        }
                    }
                });
                updatehosts();
                $.get("gump2.php", { req: 'hosts', name:'--prefix' }, function(data){
                    if(data!=olddiskpool){ 
                        jdata = jQuery.parseJSON(data)
                        if(typeof jdata =='object' ) {
                            olddiskpool=data
                            releasesel=0
                            oldreleasesel=0
                            disks=[];
                            var k;
                            $(".variable2").remove();	
                            $(listid+" tr").remove();
                            disks=[];
                            kdata=[];
                            pools=[];
                            pool=[];
                            hosts=[]
                            volumes=[]
                            snapshots=[]
                            datachart1=[]
                            datachart2=[]
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
                                    if (topool.name.includes('ree') < 1 ){
					poolslen = pools.length
                                        pools.push(topool)
                                        topoolname=topool.name.replace('pdhcp','')
					chartdata1[poolslen]=[]
					chartdata2[poolslen]=[]
                                        $("#Pool2"+prot).append($('<option class="pool variable2" >').val(poolslen).text(topoolname));
                                        chartdata1[poolslen].push('free');
                                        chartdata2[poolslen].push(normsize(topool.empty));
                                    }
                                });
                            });
                            $.each(pools,function(k,v){
                                $('#poollist').append($('<a class="poolmember" style="display: inline; " href="javascript:poolclick(\''+pools[k]["name"]+'\')">'+pools[k]["name"]+'</a>'));
                                pools[k]['alloc']=normsize(pools[k]['alloc'])
                                pools[k]['empty']=normsize(pools[k]['empty'])
                             //pools[k]['size']=normsize(pools[k]['size'])
                                pools[k]['size']=normsize(pools[k]['available'])+normsize(pools[k]['used'])
                                $.each(pools[k]["volumes"],function(kk,vv){
                                    tovol=pools[k]['volumes'][kk]
                                    tovol.group=tovol.name
                                    var oldvoldataname="";
                                    $.each(oldvoldata,function(s,r){
                                        oldvoldataname=oldvoldata[s]['name'].split('/')[oldvoldata[s]['name'].split('/').length-1]
                                        if (oldvoldataname==tovol.name) {
                                            if (oldvoldata[s].name.includes('CIFS')> 0 || oldvoldata[s].name.includes('Home')> 0){
                                                tovol.group=oldvoldata[s].prop.split('/')[4]
                                            } else { 
                                            if (oldvoldata[s].name.includes('NFS')> 0 ){
                                                tovol.group=oldvoldata[s].prop.split('/')[8]
                                            }  
                                        }
                                    }
                                });
                                ip=""; subnet=""; 
                                var oldvoldataname="";
                                $.each(oldvoldata,function(r,s){
                                    oldvoldataname=oldvoldata[r]['name'].split('/')[oldvoldata[r]['name'].split('/').length-1]
                                    if(oldvoldataname==tovol.name){
                                        if(prot.includes('NFS')>0 && oldvoldata[r]["name"].split('/')[1]=="NFS") {
                                            subnet=oldvoldata[r]['prop'].split('/')[10]
                                            ip=oldvoldata[r]['prop'].split('/')[9]
                                        }
                                        if((prot.includes('CIFS')>0 && oldvoldata[r]["name"].split('/')[1]=="CIFS") || (prot.includes('Home')>0 && oldvoldata[r]["name"].split('/')[1]=="Home")) {
                                            subnet=oldvoldata[r]['prop'].split('/')[8]
                                            ip=oldvoldata[r]['prop'].split('/')[7]
                                        }
                                    }
                                });
                                volumes.push(tovol) 
                                txtname=tovol.name.split('_').slice(0,-1).join('_')
                                if (txtname=="") { txtname=tovol.name; }
                                if(prot.includes('CIFS') > 0 || prot.includes('NFS') > 0  || prot.includes('Home') > 0) {
                                    if(prot.includes('Home') > 0) { hidden='hidden';} else { hidden='';}
				    tovolpool=tovol.pool.replace('pdhcp','')
                                    $("#Volumetable"+tovol['prot']).append('<tr ionclick="rowisclicked(this)" class="variable variable2 trow '+tovolpool+' 0"><td style="padding-left: 2rem; " class="Volname tcol" val="'+tovol.name+'">'+txtname+'</td><td class="text-center tcol" id="qta'+tovol.name+'" value="'+tovol.quota+'">'+normsize(tovol.quota)+'</td><td class="text-center tcol">'+tovol.used+'</td><td class=" text-center tcol">'+tovol.usedbysnapshots+'</td><td class=" text-center tcol">'+tovol.refcompressratio+'</td><td class=" tcol"><input class="form-control ip_address" type="text" id="selvol'+tovol.name+'ip" value="'+ip+'"></td><td class=" tcol"><input class="form-control" type="number" id="selvol'+tovol.name+'sub" value="'+subnet+'"style="padding-left:3px; padding-right:3px;" min="8" max="32"value="24" step=8></td><td style="padding-top: 12px; padding-bottom: 5px;" '+hidden+'><select onclick="tdisclicked(this)" id="selvol'+tovol.name+'" title="No One" data-container="body" data-actions-box="true" data-live-search="true" data-width="auto" class="selectpicker volgrps '+tovol.name+' " multiple></select></td><td><button onclick="selbtnclicked('+"'"+tovol.pool+"','"+tovol.host+"',this"+')" id="btnselvol'+tovol.name+'" type="button" class="btn btn-primary" >update</button></td><td class="text-center"><a href="javascript:voldel(\''+tovol.fullname+'\')"><img src="assets/images/delete.png" alt="cannot upload delete icon"></a></td></tr>');
                                        $("#btnselvol"+tovol.name).hide();
                                        usergrp="Everyone"
                                        if(tovol.group.includes("Everyone") > 0) {

                                            $("."+tovol.name).append("<option class='"+usergrp.replace(',','')+"' value='"+usergrp+"' selected>"+usergrp+"</option>");
                                        } else {
                                			$("."+tovol.name).append("<option class='smalloption' value='"+usergrp+"'>"+usergrp+"</option>");
                                        }
                                        $.each(allgroups, function(g,gg){
                                            usergrp=allgroups[g]['name'].replace('usersigroup/','')
                                            if(usergrp!="Everyone") {
                                                if (tovol.group==usergrp ){ 
                                            		$("."+tovol.name).append("<option class='"+usergrp.replace(',','')+"' value='"+usergrp+"' selected>"+usergrp+"</option>");
                                                } else {
                                            		$("."+tovol.name).append("<option class='smalloption' value='"+usergrp+"'>"+usergrp+"</option>");
                                                }
                                            }
                                            $("."+tovol.name).selectpicker("refresh");
                                        });
                                        tovol.group=tovol.group.split(',')
                                        $("#selvol"+tovol.name).val(tovol.group);
                                        $("#selvol"+tovol.name).selectpicker("refresh");
                                        selvalues['selvol'+tovol.name]=$('#selvol'+tovol.name).val()+$('#selvol'+tovol.name+'ip').val()+$('#selvol'+tovol.name+'sub').val()
                                        selvalues['selvol'+tovol.name+'change']=0
				 console.log('hi1')
                                    } else {
                                        $("#Volumetable"+tovol['prot']).append('<tr ionclick="rowisclicked(this)" class="variable variable2 trow '+kk+'"><td style="padding-left: 2rem; " class="Volname tcol">'+tovol.name+'</td><td class="text-center tcol" id="qta'+tovol.name+'" value="'+tovol.quota+'">'+normsize(tovol.quota)+'</td><td class="text-center tcol">'+tovol.used+'</td><td class=" text-center tcol">'+tovol.usedbysnapshots+'</td><td class=" text-center tcol">'+tovol.refcompressratio+'</td><td class=" tcol"><input class="form-control ip_address" type="text" id="selvol'+tovol.name+'ip" value="'+ip+'"></td><td class=" tcol"><input class="form-control" type="number" id="selvol'+tovol.name+'sub" value="'+subnet+'"style="padding-left:3px; padding-right:3px;" min="8" max="32"value="24" step=8></td><td class="text-center"><a href="javascript:voldel(\''+tovol.fullname+'\')"><img src="assets/images/delete.png" alt="cannot upload delete icon"></a></td></tr>');
                                        $("#selvol"+tovol.name).val(tovol.group);
                                        //$("#selvol"+tovol.name).selectpicker("refresh");
                                        selvalues['selvol'+tovol.name]=tovol.name+$('#selvol'+tovol.name+'ip').val()+$('#selvol'+tovol.name+'sub').val()
                                        selvalues['selvol'+tovol.name+'change']=0
         

                                    }
				    console.log('poolsnow',pools)
				    tovolpool=tovol.pool.replace('pdhcp','')
                                    //chartdata1[tovolpool].push(tovol.name);
                                    //chartdata2[tovolpool].push(normsize(tovol.quota));
                                });
                            });
                        };
                	$.each(pools, function(s,t){
                		$.each(t.volumes, function(ss,tt){
                                	chartdata1[s].push(tt.name);
                                	chartdata2[s].push(normsize(tt.quota));
				});
                        });
                        if (myChart!='1') {myChart.destroy();}
        		//plotchart('chartNFS',chartdata1[$(".Pool2").val()],chartdata2[$(".Pool2").val()]);
			$(".Pool2").change();
                    }
                    wait2=1
                });
            }

        	function SelectPanelNFS(s) {
        		var selection ="s";
        		if (selection == "o") { selection = $('#Vol2 option:selected').val(); };
        		$(".Paneloption").hide();
        		switch(selection) {
        			case "newoption" :  $("#createvol").show(); break;
                	case "alloption" : $("tr.success").removeClass("success");rowisclicked(); $("#createvol").hide(); $("#Vollist").show(); 
        			//plotchart('chartNFS',chartdata1[$(".Pool2").val()],chartdata2[$(".Pool2").val()]);
            			break;
        			default:  $("#createvol").hide();
        				break;
        		};
        		//$("#Volumnamedetails").text(selection+" details");
        		//$("#Voldetails").show();
        	}
            SelectPanelNFS("o");

        	function rowisclicked(x) {
        		//alert("Row index is: " + x.rowIndex);
        		$(x).toggleClass("success");
        		var counter=0;
        		$(function(){ var a=0; var b=0; var c=0;  $("tr.success").each(function(){ 	
            		if ($("tr.success").length == 1) { counter=1;  } else { counter=0;  };
            		a+=parseFloat($(this).children("td:nth-child(2)").text()); b+=parseFloat($(this).children("td:nth-child(3)").text());  c+=parseFloat($(this).children("td:nth-child(4)").text());});  $("#a").text(a.toFixed(2));$("#b").text(b.toFixed(2));$("#c").text(c.toFixed(2));
                });
            	if( counter == 0 ){  $("#disableddiv2").show(); $("#Voldelete").hide();  
        		} else { $("#Voldelete").show(); $("#disableddiv2").hide(); };
        	}
            	
            function plotchart(chart,data1,data2){
                var ctx= document.getElementById("myChart"+prot).getContext('2d');
                myChart = new Chart(ctx, {
                    type: 'pie',
                    titel: 'sizes',
                    data: {
                        labels: data1,
                        datasets: [{
                            data: data2,
                            backgroundColor: [ 
                                'rgba(255,99,132)',
                                'rgba(54,162,235',
                                'rgba(255,206,86)',
                                'rgba(75,192,192)',
                                'rgba(153,102,255)',
                                'rgba(255,159,64)',
                            ]
                        }]
                    }
                });
        	}
        		
        	function plotchart2(chart,data){
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
                });
                plotflag=1;
        	}
        	
            function selbtnclicked(thepool,thehost,x){
                $.post("./pump.php", { req:"VolumeChange"+prot+".py", name:thepool+" "+x.id.replace('btnselvol','')+" "+prot+" "+$("#qta"+x.id.replace('btnselvol','')).val()+" nogroup"+$("#"+x.id.replace('btn','')).val().toString()+" "+$("#"+x.id.replace('btn','')+"ip").val().toString()+" "+$("#"+x.id.replace('btn','')+"sub").val().toString()+" "+myname, passwd: thehost+" "+myname });

        	};	
        	
        	$("#CIFS").click(function (){ 
        		if(config == 1 ) {
        			var userpriv="false";
        			var curuser=myname;
        			$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
        				var gdata = jQuery.parseJSON(data);
        				for (var prot in gdata){
        					if(gdata[prot].user==myname) {
        						userpriv=gdata[prot].CIFS
        					}
        				};
        					
        				if( userpriv=="true" | curuser=="admin" ) {
        					Protocol="CIFS";
        					Vollisttime = 99999;
        					Initclickedprotocol();
        					prot=32423
        					$("h2").css("background-image","url('img/cifs.png')").text("CIFS"); $(".ullis").hide(); $(".finish").show(); $(".NFS").show();
        				}
        				else { $("#CIFS").hide(); };
        			});
        		};
        		refreshall();
        	});
        	
        	$("#NFS").click(function (){
        		if(config== 1){  
        			var userpriv="false";
        			var curuser=myname;
        			$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
        				var gdata = jQuery.parseJSON(data);
        				for (var prot in gdata){
        					if(gdata[prot].user==myname) {
        						userpriv=gdata[prot].NFS
        					}
        				};
        			
        				if( userpriv=="true" | curuser=="admin" ) {
        					Protocol="NFS"; 
        					Vollisttime = "55:55:44";
        					Initclickedprotocol();
        					prot=5654
        					$("h2").css("background-image","url('img/nfs.png')").text("NFS"); $(".ullis").hide();$(".finish").show(); $(".NFS").show();
        				}
        			});
        		};
        		refreshall();
        	});
        		
        	$("#ISCSI").click(function (){  
        		if(config== 1){ 
        			var userpriv="false";
        			var curuser=myname;
        			$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
        				var gdata = jQuery.parseJSON(data);
        				for (var prot in gdata){
        					if(gdata[prot].user==myname) {
        						userpriv=gdata[prot].ISCSI
        					}
        				};
        			
        				if( userpriv=="true" | curuser=="admin" ) {
        					Protocol="ISCSI"; config = 1; $("h2").css("background-image","url('img/iscsi2.png')").text("ISCSI"); $(".ullis").hide(); $(".finish").show();$(".ISCSI").show();
        				//plotchart('chartISCSI',chartdata1[$(".Pool2").val()],chartdata2[$(".Pool2").val()]);
        				}
        			});
        		};
        		refreshall()	;
        	});
        	
        	$(".finish").click(function (){ Protocol=0; config = 1; $(".CIFS").hide(); $(".NFS").hide(); $(".ISCSI").hide(); $(".finish").hide(); $(".ullis").show();
            });

        	$( "#Vol2" ).change(function() {
        		var selection=$("#Vol2 option:selected").val();
        		SelectPanelNFS(selection);
        	}); 
        		
            $(".Pool2").change(function () {
        		var selection=$(".Pool2 option:selected").val();//
        		if (selection == "--All--")
        			$("#Vol2 option.variable").show();
        		else {
        			$(".variable").hide();
        			$("."+selection).show();
        			if(plotflag > 0 ) {
        				plotb.destroy();
        			}
        			plotchart('chartNFS',chartdata1[selection],chartdata2[selection]);
				console.log('slection',selection)
				$(".trow").hide()
				$("."+selection).show();
        		}
        	});
        	
        	$("#VoldeleteButton").click( function (){ $.post("./pump.php", { req:"VolumeDelete"+prot, name:$(".Pool2"+prot+" option:selected").val()+" "+$("tr.success td.Volname").text()+" "+Protocol+" "+myname}, function (data){
        		 
        		 });
        	});

        	$(".createvololdoldold").click(function (){  var req="";$.post("./pump.php", { req:"VolumeCreate"+prot+"", name:$("#Pool2"+prot+" option:selected").val()+" "+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+$("#Group"+prot).val().toString()+" "+myname }, function (data){

        		 });
        	});

        	$("#refreshb").click(function(){
        		prot=345325
        		Vollisttime=4523452
        		refreshall();
        	});

        	function starting() {
        		$(".ullis").hide();
        		if(config == 1 ) {
            		var userprivcifs="false"; var userprivnfs="false";
        			var curuser=myname;
        			if (curuser !="admin") {
        				$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
        					var gdata = jQuery.parseJSON(data);
        					for (var prot in gdata){
        						if(gdata[prot].user==myname) {
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
        		if($(this).attr('id')=="Login")
        		{ 
        			document.getElementById('Login'+'ref').submit();
        			
        		} else {
            		document.getElementById($(this).attr('id')+'ref').submit();
        		}
        	});	
        		
        </script>

    </body>
</html>

<!DOCTYPE html>
<?php
if( $_FILES['file']['name'] != "" )
{

    move_uploaded_file( $_FILES['file']['tmp_name'], "Data/".$_FILES['file']['name']); 
					switch ($_FILES['file']['error']) {
						case UPLOAD_ERR_OK:
								$message = "File uplodaded successfully";
								break;
            case UPLOAD_ERR_INI_SIZE:
                $message = "The uploaded file exceeds the upload_max_filesize directive in php.ini";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $message = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
                break;
            case UPLOAD_ERR_PARTIAL:
                $message = "The uploaded file was only partially uploaded";
                break;
            case UPLOAD_ERR_NO_FILE:
                $message = "No file was uploaded";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                $message = "Missing a temporary folder";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                $message = "Failed to write file to disk";
                break;
            case UPLOAD_ERR_EXTENSION:
                $message = "File upload stopped by extension";
                break;

            default:
                $message = "Unknown upload error";
                break;
				
        }   
       
        

}
else
{
    
    $message = "No file specified !";
    
}
$myfile = fopen("Data/fileupload.txt", "w");
fwrite($myfile, $message);
fclose($myfile);
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
    <div class="bg-warning" hidden>Your changes may be not saved
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
                    <a class="ref nav-link " id="status" href="#" role="tab">
                        <div></div>
                        Status</a>
                </li>
                <li class="nav-item protocol">
                    <a class="ref nav-link" id="protocol" href="#" role="tab">
                        <div></div>
                        Volumes</a>
                </li>
                <li class="nav-item replication">
                    <a class="nav-link ref" data-toggle="tab" id="replication" href="#" role="tab">
                        <div></div>
                        Replication</a>
                </li>
                <li class="nav-item pools">
 						 <a class="ref nav-link " id="pools" data-toggle="tab" href="#" role="tab">                  
                        <div></div>
                        Pools</a>
                </li>
                <li class="nav-item config">
                    <a class="nav-link ref active " href="#" id="config" role="tab">
                        <div></div>
                        Config</a>
                </li>
            </ul>
        </div>
        <div class="col-md-2 second-menu">
            <div class="tab-content">
                <div class="tab-pane active" id="config" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li class="nav-item userPrivlliges">
                            <a class="nav-link active" data-toggle="tab" href="#userPrivlliges" role="tab">
                                <div></div>
                                <span>User
                                Privileges</span></a>
                        </li>

                        <li class="nav-item firmware">
                            <a class="nav-link" data-toggle="tab" href="#firmware" role="tab">
                                <div></div>
                                <span> Upgrade</span></a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane active" id="userPrivlliges" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">User</label>
                            <div class="col-5">
                                <select id="UserList"class="form-control">
                                   
                                </select>
                            </div>
                        </div>
                        <div class="form-group justify-content-md-center user-privillages-border">
                            <div class="col-md-12">
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Active_Directory" type="checkbox" class="form-check-input checkboxy">
                                            Active Directory
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Service_Charts" value="info" type="checkbox" class="form-check-input checkboxy">
                                            Service Charts
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="NFS" type="checkbox" value="info" class="form-check-input checkboxy">
                                            NFS
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="SnapShots" value="info" type="checkbox" class="form-check-input checkboxy">
                                            SnapShots
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Box_Users" value="Warning" type="checkbox" class="form-check-input checkboxy">
                                            Box Users
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Logs" value="Warning" type="checkbox" class="form-check-input checkboxy">
                                            Logs
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="UserPrivilegesch" value="UserPrivileges" type="checkbox" class="form-check-input checkboxy">
                                            User Privileges
                                        </label>
                                    </div>
                                </div>
				<div class="col-md-2">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Cluster" value="Cluster" type="checkbox" class="form-check-input checkboxy">
					    Cluster nodes
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-12">
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Error" value="Error" type="checkbox" class="form-check-input checkboxy">
                                            Box Properties
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="CIFS" value="Error"type="checkbox" class="form-check-input checkboxy">
                                            CIFS
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="DiskGroups" value="DiskGroups" type="checkbox" class="form-check-input checkboxy" >
                                            Disk Groups
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Partners" value="Partners" type="checkbox" class="form-check-input checkboxy">
                                            Partners
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Senders" value="Senders" type="checkbox" class="form-check-input checkboxy">
                                            Senders
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3" hidden>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="checkbox" id="Proxylic" value="Proxylic" class="form-check-input hiddencheckbox">
                                            Proxy License
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Replication" value="Replication" type="checkbox" class="form-check-input checkboxy">
                                            Replication
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="Uploadch" type="checkbox" class="form-check-input checkboxy" value="Upload">
                                            Firmware
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <button id="SubmitPriv" type="button" class="btn btn-submit col-3" style="cursor: pointer;">Submit</button>
                        </div>
                    </form>
                </div>
                <div class="tab-pane " id="firmware" role="tabpanel">
                	  <div class="firmwarestatus">
                	  <div class="form-group row" style="margin-left: 1rem;"><label class="col-6 ">Software version:</label><strong id="soft">hi</strong></div>
                	  <div class="form-group row" style="margin-left: 1rem;"><label class="col-5 ">Available versions:</label><div class="col-3"><select size="3" id="softs" class="form-control"></select></div>
  <button type="button" id="ApplyAvailable" class="btn btn-submit col-3" style="margin-top: 0px; cursor: pointer;">Apply</button>
 </div>
                	  <div class="form-group row" style="margin-left: 1rem;"><label class="col-3 ">Apply from url:</label><div class="col-5"><input id="urlapp" class="form-control" type="text"></div>
<button type="button" id="Applyurl" class="btn btn-submit col-3" style="margin-top:0px; cursor: pointer;">Apply</button>
</div>

                	  </div>
                    <div class=" upload-drop-zone clickthis" id="drop-zone"style="cursor: pointer;">
                    	
								<div class=" col-sm-12" id="previews">
							
									<div class="dz-message">Pls. add or drag file here</div>
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
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/js/tether.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script src="js/dropzone.js"></script>

<!--CUSTOM JS-->
<script src="assets/js/main.js"></script>
<script>
			var needupdate=1
			var redflag="";
 			var oldtexthere='hihihi';
			var proptime="55:55:55";
			var proptimenew="33:333:33";
			var oldcurrentinfo="";
			var olddata=0;
			var kdata=[]
			var jdata=[]
			var ggdata=[];
			var DNS=1;
			var whichul=0;
			var upresult=0;
 var mydate;
 var myidhash;
 var mytimer;
 var mymodal;
 var propdata="dkajf;";
 var idletill=480000;
 var modaltill=idletill-120000
 var myid="<?php echo $_REQUEST['myid'] ?>";
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";
 $(".myname").val(myname)
 $("#usrnm").text(myname)
 $(".params").val(myid);
//$("#overlay").modal('show');
function updatehosts() {
  $.get("gump2.php", { req: "prop", name:"--prefix"  },function(data){ 
   if(propdata==data){;} else {
    propdata=data
    prop2=$.parseJSON(propdata)
    $.each(prop2,function(r,s){
     prop=$.parseJSON(prop2[r]["prop"].replace('{','{"').replace('}','"}').replace(/:/g,'":"').replace(/,/g,'","'))
     //hostsname[prop2[r]['name'].replace('prop/','')]=prop.name
     //$("#"+prop2[r]["name"].replace('prop/','')).text(prop2[r]["name"].replace('prop/','')+":"+prop.name)
     if( prop.configured.includes('yes') < 1) { if(redflag.includes('need') >0 ) { redflag=redflag+', Node: '+prop.name+' needs to be configured'; } else { redflag='Node: '+prop.name+' needs to be configured';  }} else {redflag =""; };
    });
   }
  });
 }				


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
mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser();myidhash=mydate; } timerrst();});
				$("html").keypress(function(){mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser(); myidhash=mydate;};timerrst();});
			$(".bg-success").hide();$(".bg-danger").hide();$(".bg-warning").hide();	
			$(".ref").click(function() {
					if($(this).attr('id')=="Login")
					{ 
						document.getElementById('Login'+'ref').submit();
						
					} else {
					document.getElementById($(this).attr('id')+'ref').submit();
					}
		});	
		function SS(){ 
				
				   var alltabsAcco=0;var alltabsStat=0;var alltabsProt=0;var alltabsRepli=0;var alltabsPool=0;var alltabsUP=0;
					var curuser=myname;
					if(curuser!="admin"){
					$.get("gump2.php", { req: 'usersinfo/'+curuser, name:"" },function(data){ 
	console.log('ss-user',data.split('/'));
	var gdata=data.split('/')
	gdata.shift(); gdata.shift();
						if(gdata[3].split('-')[1]!="true") { $(".activeDirectory").hide(); $("#activeDirectory").hide(); alltabsAcco=1;} 
						if(gdata[7].split('-')[1]!="true") { $(".boxUsers").hide(); $("#boxUsers").hide(); alltabsAcco=alltabsAcco+1;} 
						if(gdata[10].split('-')[1]!="true") { $(".boxProperties").hide(); $("#boxProperties").hide(); alltabsAcco=alltabsAcco+1;} 
						if(alltabsAcco==3) { console.log('hi');$(".accounts").hide()}
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
						if(gdata[17].split('-')[1]!="true") { $(".Cluster").hide(); $("#Cluster").hide(); alltabsPool=alltabsPool+1;}
						if(alltabsPool==2) { $(".pools").hide()}
						if(gdata[9].split('-')[1]!="true") { $(".userPrivlliges").hide(); $("#userPrivlliges").hide(); alltabsUP=1;} 
						if(gdata[16].split('-')[1]!="true") { $(".firmware").hide(); $("#firmware").hide(); alltabsUP=alltabsUP+1;}
						if(alltabsUP==2) { $(".config").hide()}
					
					});
				};
			};
			function starting() {
				$(".ullis").hide();
				
						var userprivUserPrivileges="false"; var userprivColourize="false";var userprivUpload="false";
						var curuser=myname;
						
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user==myname) {
										userprivUserPrivileges=gdata[prot].UserPrivilegesch;
										userprivColourize=gdata[prot].Colourizech;
										userprivUpload=gdata[prot].Uploadch;
									}
								};
									
								if( userprivUserPrivileges =="true") { $("#UserPrivileges").show(); } else { $("#UserPrivileges").hide(); } ; if( userprivColourize =="true") { $("#Colourize").show(); } else { $("#Colourize").hide(); };;
								if( userprivUpload =="true") { $("#Upload").show(); } else { $("#Upload").hide(); }
						});
					}
					$(".ullis").show();
			
		}
			
			$(".UserPrivileges").hide();$(".Upload").hide();$(".ullis").show();$(".finish").hide();
			$(".finish").click(function (){ whichul = 0; $(".checkboxy").each(function(){ $(this).prop("checked",false)});
																				$(".UserPrivileges").hide(); $(".Upload").hide();$(".ullis").show();$(".finish").hide();});
			$("#UserPrivileges").click(function (){  
				if(whichul==0) {
					var userpriv="false";
						var curuser=myname;
						whichul="#UserPrivileges";
						$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
							var gdata = jQuery.parseJSON(data);
							for (var prot in gdata){
								if(gdata[prot].user==myname) {
									userpriv=gdata[prot].UserPrivilegesch
								}
							};
						
						if( userpriv=="true" | curuser=="admin" ) {
							$("h2").css("background-image","url('img/Priv.png')").text("User Privileges");  $("option.variable").remove(); proptime="44:33233:22";$(".ullis").hide();$(".finish").show(); $(".UserPrivileges").show();refreshall();
						}
					});
				}
			});
			$("#Upload").click(function () {
				if(whichul == 0) {
					var userpriv="false";
					var curuser=myname;
					whichul="#Upload";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
								userpriv=gdata[prot].Uploadch
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) {
							$("h2").css("background-image","url('img/Uploadfirmware.png')").text("Upgrade System S/W");
							$(".dz-preview").remove(); $("#previews").show(); droppls.enable();
							$("div.dz-message").text("Please, add or drag file here");
							$(".ullis").hide();$(".finish").show();$(".Upload").show();
						}
					});
				}
				
				});
			$("#Colourize").click(function (){   
				if(whichul==0) {
					var userpriv="false";
					var curuser=myname;
					whichul="#Colourize";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
								userpriv=gdata[prot].Colourizech
							}
						};
					
					if( userpriv=="true" | curuser=="admin" ) {
						
						
						$("#iddcolor").val("<?php $men=7; ?>");
						$("#Colorpls").submit();
	//					$("h2").css("background-image","url('img/Priv.png')").text("User Privileges");  $("option.variable").remove(); proptime="44:333:22";; $(".UserPrivileges").show();refreshall();
					}
					});
					}
			});
			
			
			function refreshall() {
				DNS=1;
		$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){
		if(redflag.includes('need')>0){ $('#redhere').text(redflag); $(".bg-danger").show(); } else { $(".bg-danger").hide(); }
		if(data!=oldcurrentinfo && data != ''){linerfact=-1;oldcurrentinfo=data;  $(".bg-success").fadeIn(800); $("#texthere").text(data);$(".bg-success").fadeOut(8000);}
	});						
SS();
updatehosts();
				$.get("requestversion.php",function(data){
				 $("#soft").text(data)					
				});
				
				$.get("gump2.php", { req: 'usersinfo', name:'--prefix' }, function(data){
					if(data==olddata) { return; }
					olddata=data
					jdata = jQuery.parseJSON(data);
					kdata = []
					$.each(jdata,function(kk,vv){
					var user={};
					var userprop=jdata[kk]['prop'].split('/');
user['name']=jdata[kk]['name'].replace("usersinfo/",'')
$.each(userprop,function(k,v){
 if (userprop[k].includes('-') > 0) {
  user[userprop[k].split('-')[0]]=userprop[k].split('-')[1]
 }
});
					kdata.push(user)
							
					});
					var currentuser=$("#UserList option:selected").text()
					var selected="";
					$("#UserList option").remove();

					$.each(kdata, function(k,v){
if(currentuser==kdata[k]['name']){ selected='selected'} else { selected="" }
							$("#UserList").append($("<option class='dontdelete'"+selected+">").text(kdata[k]['name']).val(k));
					});	
	$("#UserList").change();
				});
				
			}
			
			$("#SubmitPriv").click( function (){ 
				sm="user"+"_"+$("#UserList option:selected").text()+"/";
				$(".checkboxy").each(function (){ sm=sm+$(this).attr('id')+"-"+$(this).prop('checked')+"/";});
				$.post("./pump.php", { req:"Priv", name:sm+myname }, function (data){
		});
	 });
		$("#UserList").change(function(){
				$(".checkboxy").each(function(){ $(this).prop("checked",false)});
		$.each(kdata[$("#UserList").val()], function(k,v){
		  if (v=='true'){
		   $("#"+k).prop("checked",true);
		  } else {
		   $("#"+k).prop("checked",false);
		  }
	});	
});
			setInterval('refreshall()', 2000);
			//refreshUserList();
			refreshall();
 
		
			

	
			var droppls = new Dropzone("#drop-zone",{ url: "upload.php",
			previewsContainer: '#previews',
			uploadMultiple: false,
			maxFilesize: 500,
			clickable: ".clickthis"
			});
			droppls.on("success", function(file,msg) { 
				upresult="success";
				droppls.disable();
				$.post("./pump.php", { req:"GenPatch", name:file.name+" "+myname});
				$(".dz-success-mark").show();$(".dz-error-mark").hide();
				$("div.dz-message").text("File is uploaded.. please, allow some minutes for upgrade");
				
			});
			droppls.on("error", function(file,msg) { 
				upresult="error";
				droppls.disable();
				$("div.dz-message").text("Problem uploading the file");
				$(".dz-success-mark").hide();$(".dz-error-mark").show();
				
			});
			
			
			$.get("requestversionall.php", { file: 'Data/userpriv.txt' }, function(data){ 
							var seloption ="";
							var ggdata=data.split(',');
							$.each(ggdata,function(i){ if(ggdata[i] !="") seloption ='<option value="'+ggdata[i]+'">'+ggdata[i]+'</option>'+seloption});
							$("#softs").append(seloption);
			});
			$("#close-success").click(function() { $(".bg-success").hide(); });
			SS();
$("#ApplyAvailable").click(function(){
				$.post("./pump.php", { req:"ApplyFw", name:$("#softs").val()+" "+myname});
 
});
$("#Applyurl").click(function(){
  console.log("Applyurl");
				$.post("./pump.php", { req:"Applyurl", name:$("#urlapp").val()+" "+myname});
});
		
	</script>
</body>
</html>

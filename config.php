<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
?>
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
    <div class="bg-warning" hidden>Your changes may be not saved
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-danger" hidden>Your changes hasn't been saved
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
                    <a class="ref nav-link " id="status" href="#" role="tab">
                        <div></div>
                        Status</a>
                </li>
                <li class="nav-item protocol">
                    <a class="ref nav-link" id="protocol" href="#" role="tab">
                        <div></div>
                        Protocol</a>
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
                                
                                <div class="col-md-2">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input id="UserPrivilegesch" value="UserPrivileges" type="checkbox" class="form-check-input checkboxy">
                                            User Privileges
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
<script src="js/dropzone.js"></script>

<!--CUSTOM JS-->
<script src="assets/js/main.js"></script>
<script>
			var needupdate=1
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
			$(".bg-success").show();$(".bg-danger").hide();$(".bg-warning").hide();	
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
			function starting() {
				$(".ullis").hide();
				
						var userprivUserPrivileges="false"; var userprivColourize="false";var userprivUpload="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
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
						var curuser="<?php echo $_SESSION["user"] ?>";
						whichul="#UserPrivileges";
						$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
							var gdata = jQuery.parseJSON(data);
							for (var prot in gdata){
								if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
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
					var curuser="<?php echo $_SESSION["user"] ?>";
					whichul="#Upload";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
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
					var curuser="<?php echo $_SESSION["user"] ?>";
					whichul="#Colourize";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Colourizech
							}
						};
					
					if( userpriv=="true" | curuser=="admin" ) {
						
						
						$("#iddcolor").val("<?php $men=7; echo session_id() ?>");
						$("#Colorpls").submit();
	//					$("h2").css("background-image","url('img/Priv.png')").text("User Privileges");  $("option.variable").remove(); proptime="44:333:22";; $(".UserPrivileges").show();refreshall();
					}
					});
					}
			});
			
			
			function refreshall() {
				DNS=1;
								
				//$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ if(data!=oldcurrentinfo){oldcurrentinfo=data;  $(".dr-messages").show();$(".bg-success").show(); $("#texthere").text(data);}});
//SS();
				//refresh2('Privstatus');
				
				$.get("gump.php", { req: 'run', name:'--prefix' }, function(data){
					if(data==olddata) { return; }
					olddata=data
					
					jdata = jQuery.parseJSON(data);
					kdata = []
					$.each(jdata,function(kk,vv){
					kdata.push(jdata[kk].replace("['",'').replace("]'",'').replace("'",'').split(',')[0].split('/'))
					});
					$("#UserList option").remove();

					$.each(kdata, function(k,v){
											
						if ( kdata[k].indexOf("user") > 0 ) {
								//userid=jdata[k].replace("[",'').replace("']",'').replace("'",'').replace(' ','').split(',')[1].replace("'",'')
							username=kdata[k][kdata[k].indexOf("user")+1].replace("'",'').replace(' ','')
							$("#UserList").append($("<option class='dontdelete'>").text(username).val(username));
						}
						//$.each(kdata,function(k,v){ 
											
						if (kdata[k].indexOf('hostfw') > 0 ) {
							var fwlist=jdata[k].replace("[",'').replace("']",'').replace("'",'').replace(' ','').split(',')[1].replace("'",'').split('/')
							console.log('fwlist',fwlist)
							$("#soft").text(fwlist[0])					
						}
			
						//});
					});	
					$.each(kdata, function(k,v){
						if ( kdata[k].indexOf("userpriv") > 0 ) {
							
							
							/// KDATA should be : [ 'dhcpxxx,'host',priv,'username','ActiveDirectory;WaterMark;.....']
							if( kdata[k][kdata[k].indexOf("userpriv")+1].replace("'",'').replace(' ','') ==$("#UserList option:selected").val()) {
								
							var privvalue=jdata[k].replace("[",'').replace("']",'').replace("'",'').replace(' ','').split(',')[1].replace("'",'').split('/')
							var privindex=kdata[k][kdata[k].indexOf("userpriv")+2].replace("'",'').replace(' ','').split(';')
							
							$.each(privindex, function(k,v){  if(privvalue[k]=="true") { $("#"+privindex[k]).prop('checked',true); console.log(privindex[k],privvalue[k]);}});
		
							}
						
						
						}
					});
				});
				
			}
			function refresh2(textareaid) {
				
				$.get("requestdata2.php", { file: 'Data/'+textareaid+'.log' }, function(data){
					$('#'+textareaid).val(data);
					});
			}	;
			
			$("#SubmitPriv").click( function (){ 
				console.log("hi")
				sm="user"+" "+$("#UserList option:selected").val()+" ";
				$(".checkboxy").each(function (){ sm=sm+$(this).attr('id')+" "+$(this).prop('checked')+" ";});
				$.post("./pump.php", { req:"Priv", name:sm+" "+"administrator "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 //refresh2("#statusarea2");
		});
	 });
			$("#UserList").change(function(){
				$(".checkboxy").each(function(){ $(this).prop("checked",false)});
				$.each(kdata, function(k,v){
					if ( kdata[k].indexOf("userpriv") > 0 ) {
						
						
						/// KDATA should be : [ 'dhcpxxx,'host',priv,'username','ActiveDirectory;WaterMark;.....']
						if( kdata[k][kdata[k].indexOf("userpriv")+1].replace("'",'').replace(' ','') ==$("#UserList option:selected").val()) {
							
						var privvalue=jdata[k].replace("[",'').replace("']",'').replace("'",'').replace(' ','').split(',')[1].replace("'",'').split('/')
						var privindex=kdata[k][kdata[k].indexOf("userpriv")+2].replace("'",'').replace(' ','').split(';')
						
						$.each(privindex, function(k,v){  if(privvalue[k]=="true") { $("#"+privindex[k]).prop('checked',true); console.log(privindex[k],privvalue[k]);}});
	
						}
					
					
					}
				});
				//proptime="44:54333:232";
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
				//console.log("file",file,"name",file.name,"path",file.mozFullPath);
				$.post("./pump.php", { req:"GenPatch", name:file.name+" <?php echo $_SESSION["user"]; ?>"});
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
							 console.log("gdataall ",data)
			});
			$("#close-success").click(function() { $(".bg-success").hide(); });
		//	SS();
$("#ApplyAvailable").click(function(){
				$.post("./pump.php", { req:"ApplyFw", name:$("#softs").val()+" <?php echo $_SESSION["user"]; ?>"});
 
});
$("#Applyurl").click(function(){
  console.log("Applyurl");
				$.post("./pump.php", { req:"Applyurl", name:$("#urlapp").val()+" <?php echo $_SESSION["user"]; ?>"});
});
		
	</script>
</body>
</html>

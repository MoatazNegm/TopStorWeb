<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
?>
<html lang="en">
<?php session_start(); ?>
    <meta charset="UTF-8">
    <title>Pilot</title>
    <!--META TAGS-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="assets/images/Qonly.png">

<head>
    <!--BOOTSTRAP CSS STYLE-->
    <link href="assets/css/tether.min.css" rel="stylesheet" type="text/css">    
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <!--Font Awesome css-->
    <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!--CUSTOME CSS-->
    <link href="assets/css/main.css" rel="stylesheet" type="text/css">
</head>
<body>
	<form  id="userpassform" type="hidden" method="post" action="userpass.php">
			<input type="hidden" id="idduserpass" name="idd">
				<input type="hidden" value="Submit">
		</form>	
<!--NAVBAR-->
<nav class="navbar">
    <!--<div class="container row">-->
    <div class="col-md-12">
        <a class="navbar-brand" href="index.html"><img src="assets/images/logo.png"></a>
        <ul class="navbar-nav pull-right">
            <li class="nav-item dropdown user-dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span><img src="assets/images/user-icon.png"> </span>Admin
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="changepassword.html">Change Password</a>
                    <a class="dropdown-item" href="Login.php">Logout</a>
                </div>
            </li>
        </ul>
        <!--</div>-->
    </div>
</nav>
<!--MESSAGES-->
<div class="dr-messages ">
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
    <div class="bg-success">Your changes has been saved
        <button type="button" class="close" aria-label="Close">
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
                    <a class="ref nav-link active" id="accounts" data-toggle="tab" href="#" role="tab">
                        <div></div>
                        Accounts</a>
                </li>
                <li class="nav-item status">
                    <a class="ref nav-link " id="status" href="#" role="tab">
                        <div></div>
                        Status</a>
                </li>
                <li class="nav-item protocol">
                    <a class=" ref nav-link" id="protocol" href="#" role="tab">
                        <div></div>
                        Protocol</a>
                </li>
                <li class="nav-item replication">
                    <a class="nav-link" href="replication.php" role="tab">
                        <div></div>
                        Replication</a>
                </li>
                <li class="nav-item pools">
                    <a class="nav-link" href="pools.php" role="tab">
                        <div></div>
                        Pools</a>
                </li>
                <li class="nav-item config">
                    <a class="nav-link" href="config.php" role="tab">
                        <div></div>
                        Config</a>
                </li>
            </ul>
        </div>
        <div class="col-md-2 second-menu">
            <div class="tab-content">
                <div class="tab-pane active" id="accounts" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li class="nav-item activeDirectory ">
                            <a class="nav-link active" data-toggle="tab" href="#activeDirectory" role="tab">
                                <div></div>
                                <span>Active Directory</span></a>
                        </li>
                        <li id="navUnLin" class="nav-item boxUsers">
                            <a class="nav-link" data-toggle="tab" href="#boxUsers" role="tab">
                                <div></div>
                                <span>Box users</span></a>
                        </li>
                        <li id="navboxProperties" class="nav-item boxProperties">
                            <a class="nav-link" data-toggle="tab" href="#boxProperties" role="tab">
                                <div></div>
                                <span>Box properties</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--BODY CONTENT-->
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane active" id="activeDirectory" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Domain/Workgroup</label>
                            <div class="col-5">
                                <input id="DomName" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">DC server</label>
                            <div class="col-5">
                                <input id="DCserver" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Administrator</label>
                            <div class="col-5">
                                <input id="Admin" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Passwored</label>
                            <div class="col-5">
                                <input id="Pass" class="form-control" type="password">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Type</label>
                            <div class="col-5">
                                <select id="Domtype" class="form-control">
                                    <option>Domain</option>
                                    <option>WorkGroup</option>
                                </select>
                            </div>
                        </div>
                        <div class="">
                            <button type="button" id="ADsubmit" class="btn btn-submit col-3">Joint Domain</button>
                        </div>
                    </form>
                </div>
                <div class="tab-pane Unlin " id="boxUsers" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">User</label>
                            <div class="col-5">
                                <input id="User" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Password</label>
                            <div class="col-5">
                                <input id="UserPass" class="form-control" type="password">
                            </div>
                        </div>
                        <div class="">
                            <button id="UnixAddUser" type="button" class="btn btn-submit col-3">Add User</button>
                        </div>
                    </form>
                    <h1>Users List:</h1>
                    <div class=" table-responsive">
                        <table class="col-5 table  dr-table-show">
                            <thead>
                            <tr>
                                <th class="col-4">user</th>
                                <th class="text-center">Change Password</th>
                                <th class="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody  id="UserList">
                            <tr>
                                <td class="col-4">John Doe</td>
                                <td class="text-center"><a href="#" data-toggle="modal" data-target="#userEditing"><img src="assets/images/edit.png"
                                                                         alt="can't upload edit icon"></a></td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-4">John Doe</td>
                                <td class="text-center"><a href="#" data-toggle="modal" data-target="#userEditing"><img src="assets/images/edit.png"
                                                                         alt="can't upload edit icon"></a></td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane Future" id="boxProperties" role="tabpanel"> 
                 
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">BoxName</label>
                            <div class="col-5">
                                <input id="BoxName" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">IP Address</label>
                            <div class="col-5">
                                <input id="IPAddress" class="form-control ip_address" type="text"  placeholder="xxx.xxx.xxx.xxx">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Gateway</label>
                            <div class="col-5">
                                <input id="Gateway" class="form-control ip_address" type="text" placeholder="xxx.xxx.xxx.xxx">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">DNS</label>
                            <div class="col-5">
                                <input id="DNS" class="form-control ip_address" type="text" placeholder="xxx.xxx.xxx.xxx">
                            </div>
                        </div>
                        <div class="">
                            <button id="DNSsubmit" type="button" class="btn btn-submit col-3">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
<div class="modal fade" id="userEditing" tabindex="-1" role="dialog" aria-labelledby="userEditing" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title " id="exampleModalLabel">Edit User Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="dr-form">
                     <div class="form-group row">
                        <label class="col-3 col-form-label">Password</label>
                        <div class="col-9">
                            <input id="chpass"class="form-control" type="password">
                        </div>
                    </div>
                    <div class="text-right">
                        <button type="button" class="btn btn-submit ChPass col-5"  data-dismiss="modal" aria-label="Close">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="userEditing2" tabindex="-1" role="dialog" aria-labelledby="userEditing" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title " id="exampleModalLabel">Edit User Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="dr-form">
                    <div class="form-group row">
                        <label class="col-3 col-form-label">User</label>
                        <div class="col-9">
                            <input class="form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-3 col-form-label">Password</label>
                        <div class="col-9">
                            <input class="form-control" type="password">
                        </div>
                    </div>
                    <div class="text-right">
                        <button type="button" class="btn btn-submit col-5"  data-dismiss="modal" aria-label="Close">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
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
<form id="Poolsref" action="Pools.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="configref" action="config.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >

<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/js/tether.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script src="assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="assets/js/dropzen.js"></script>
<script src="assets/js/jquery.mask.min.js"></script>

<!--CUSTOM JS-->
<script src="assets/js/main.js"></script>

<!--MODAL-->
<!--userEditing-->

<!-- Modal -->
		<script>
			var refresherprop=2;
			var refresheruser=2;
			var userpass="hi";
			var proptime="55:55:55";
			var proptimenew="33:333:33";
			var DNS=1;
				$(".ref").click(function() {
		document.getElementById($(this).attr('id')+'ref').submit();
		 //console.log($(this).attr('id')+'ref');
		});
			$("#userpass").click(function (){   
			$("#idduserpass").val("<?php  echo session_id() ?>");
			$("#userpassform").submit();
			})

			$(".bg-success").hide();$(".bg-danger").hide();$(".bg-warning").hide();
			function updateprop() {
				if (refresherprop > 0) { $.post("./pump.php", { req:"HostgetIPs", name:"a" });}				
				if (refresherprop > 0) {  	
				$.get("requestdate.php", { file: 'Data/Hostprop.txt' },function(data){ 
						var jdata=jQuery.parseJSON(data);
						proptimenew=jdata.timey;
					});
				
				if(proptimenew===proptime){;} else {
					$.get("requestdata.php", { file: 'Data/Hostprop.txt' },function(data){ 
						var jdata=jQuery.parseJSON(data);
						$("#BoxName").val(jdata.name); $("#IPAddress").val(jdata.addr); $("#Gateway").val(jdata.rout);
						$("#DNS").val(jdata.dns);
						
						proptime=proptimenew;
						refresherprop=refresherprop-1;
					});
				}
			 }
			}
			function refreshall() {
				DNS=1;
				
					updateprop();
					refreshUserList();
					
				//	$.get("requestdata2.php", { file: 'Data/HostManualconfigstatus.log' }, function(data){ $(".bg-success").text(data);});
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("bg-success").text(data);});
			//	console.log("AD is visible : " , $(".AD").is(":visible"));
				if($(".AD").is(":visible"))
				{
					$.get("requestdata2.php", { file: 'Data/DomainChangestatus.log' }, function(data){ $("#ADstatus").val(data);});
				}
				else if($(".Future").is(":visible"))
				{

//					updateprop();
//					$.get("requestdata2.php", { file: 'Data/HostManualconfigstatus.log' }, function(data){ $(".bg-success").text(data);});
					
				}
				else if($(".UnLin").is(":visible"))
				{		
				refreshUserList()		
					$.get("requestdata2.php", { file: 'Data/Usersstatus.log' }, function(data){ $("#UnLinstatus").val(data);});
					refreshUserList();
				}
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $(".bg-success").show();$(".bg-success").text(data);});
			}
			function refresh4(request,field) {
				if(DNS > 0) {
					$.get("requestdata.php", { file: 'Data/'+request+'.log' }, function(data){
					$(field).val(data);
				if(request=="network") {
					if (data==1) {
						$("#network").val(1);  
					} else { 
						$("#network").val(2);
					}; 
					$("#network").change();
				}
	//				if(request=="network") { $("#network").val(data); $("#network").change(); }
	//				console.log(field,request,data,$("#network").val());
					});
					
				}
			}	
						
			function refresh() {
				
				$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$("#statusarea").val(data);
					});
			}	;
			function refreshUserList(){
				var jdata;
				if(refresheruser > 0){
					$.post("./pump.php", { req:"UnixListUsers", name:"a" }); 
						refresheruser=refresheruser-1
					$.get("requestdata.php", { file: 'Data/listusers.txt' }, function(data){
						jdata = jQuery.parseJSON(data);
						$("#UserList tr").remove(); 
						for(var key in jdata){ 
							if(jdata[key] == "o") {  
  								$("#UserList").append('<tr class="dontdelete" > ><td class="col-4">'+key+'</td><td class="text-center"><a href="javascript:userPassword(\''+key+'\')" ><img src="assets/images/edit.png" alt="cannott upload edit icon"></a></td><td class="text-center"><a class="UnixDelUser" val="'+key+'" href="javascript:auserdel(\''+key+'\')" ><img  src="assets/images/delete.png" alt="cannott upload delete icon"></a></td></tr>');
							}
						}
					});
				}
			}
			function refreshUserListold() {
				var jdata;
				if(refresheruser > 0){
					$.post("./pump.php", { req:"UnixListUsers", name:"a" }); 
					refresheruser=refresheruser-1
					$.get("requestdata.php", { file: 'Data/listusers.txt' }, function(data){
						jdata = jQuery.parseJSON(data);
						if(Number($("#UserList tr").length)+1 > 0 ) {
							$("#UserList tr").each(function (i,v) { 
								for(var key in jdata){ 
									if (key == this.value) {
										 $(this).toggleClass("dontdelete"); jdata[key]="inin"; 
										 
									} else {
										if(jdata[key] == "o") {  
  											$("#UserList").append('<tr class="dontdelete" > ><td class="col-4">'+key+'</td><td class="text-center"><a href="#" data-toggle="modal" data-target="#userEditing"><img src="assets/images/edit.png" alt="cannott upload edit icon"></a></td><td class="text-center"><a href="#"><img src="assets/images/delete.png" alt="cannott upload delete icon"></a></td></tr>');
											console.log("hi",key)											
						 }
										;
									} 
								}
							});
						}	
					
									
					for (var key in jdata ) { 
						
//						if(jdata[key] == "o") {  
 // 											$("#UserList").append('<tr class="dontdelete" > ><td class="col-4">'+key+'</td><td class="text-center"><a href="#" data-toggle="modal" data-target="#userEditing"><img src="assets/images/edit.png" alt="cannott upload edit icon"></a></td><td class="text-center"><a href="#"><img src="assets/images/delete.png" alt="cannott upload delete icon"></a></td></tr>');
//<td class="text-center"><a href="#" data-toggle="modal" data-target="#userEditing"><img src="assets/images/edit.png" alt="cannott upload edit icon"></a></td>
//<td class="text-center"><a href="#"><img src="assets/images/delete.png" alt="cannott upload delete icon"></a></td></tr>');							
//			console.log("hi",key)											
//						}
					}				
				});							;
					$("#UserList tr").not(".dontdelete").remove();
					
					
				}		
			};
//			setInterval('refresh()', 1000); // Loop every 1000 milliseconds (i.e. 1 second)
//			setInterval('refreshUserList()', 5000); // Loop every 10000 milliseconds (i.e. 1 second)
			//refreshUserList();
			var config = 1;
			
			$("#AD").click(function (){ 
				if(config == 1 ) { 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Active_Directory
								
							}
						};
						if( userpriv=="true" | curuser=="admin" ) {
							config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".ullis").hide(); $(".finish").show();$(".AD").show(); 
							$.get("requestdata.php", { file: 'Data/DomName.txt' },function(data){ $("#DomName").val(data);});
							$.get("requestdata.php", { file: 'Data/Domtype.txt' },function(data){ $("#Domtype").val(data);});
							$.get("requestdata.php", { file: 'Data/DCserver.txt' },function(data){ $("#DCserver").val(data);});
						}
					});
				};
			});
			$("#navUnLin").click(function (){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Box_Users
							}
						};
					
						if(userpriv=="true" | curuser=="admin" ) {
							refresheruser=2
							refreshUserList();
						}
					});
				
			});
			$("#navboxProperties").click(function (){ 				
				
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].Error
							}
						};
					
						if (userpriv=="true" | curuser=="admin") { 
							proptime="55:55:55";
							
							refresherprop=2;
							updateprop(); 
						}
					});
				 
			});
		
			$("#UnixAddUser").click( function (){ $.post("./pump.php", { req:"UnixAddUser", name:$("#User").val(), passwd:$("#UserPass").val()+" "+"<?php echo $_SESSION["user"]; ?>"}, function (data){
				 //refreshUserList(); 
				 refresheruser=3
				 });
			});
			$("a.UnixDelUser").click(function (e){ e.preventDefault(); $.post("./pump.php", { req:"UnixDelUser", name:$(this).val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 //refreshUserList();
				 console.log("hi", $(this).val());
				 refresheruser=3 
				 });
			});
			
			function auserdel(){ $.post("./pump.php", { req:"UnixDelUser", name:arguments[0]+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 //refreshUserList();
				 console.log("hi", arguments[0]);
				 refresheruser=3 
				 });
			};
			function userPassword(){ userpass=arguments[0];  $("#userEditing").modal('show') };
			function changePassword(){ $.post("./pump.php", { req:"UnixChangePass", name:"'"+userpass+"'", passwd:arguments[0]+" "+"<?php echo $_SESSION["user"]; ?>"}, function (data){});
				refresheruser=1;			
			};


				$(".ChPass").click(function (){ $.post("./pump.php",{ req:"UnixChangePass", name:$("#chpass").val(), passwd:"'"+userpass+"'"+" "+"<?php echo $_SESSION["user"]; ?>"}, function (data){});
				refresheruser=1;
				
			});

			$("#network").change( function () {
					var value= $("#network").val();
					switch(value) {
						case "2" : $(".IPAddress").hide(); $(".Gateway").hide(); break;
						case "1" : $(".IPAddress").show(); $(".Gateway").show(); break;
					}
			});
			$("#DNSsubmit").click(function (){ 
				//$("form").validator("validate");
						$.post("./pump.php", { req:"HostManualconfig", name:$("#BoxName").val()+" "+$("#IPAddress").val()+" "+$("#Gateway").val()+" "+$("#DNS").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
						setTimeout(function(){ refresherprop=4},3000);					
						
						
			});
			$("#ADsubmit").click( function() {
				if($("#Domtype").val()=="Domain") {
					$.post("./pump.php", { req:"DomainChange", name:$("#DomName").val()+" "+$("#Admin").val()+" "+"\""+$("#Pass").val()+"\""+" "+$("#DCserver").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
				} 
				else {
					$.post("./pump.php", { req:"DomainChangeWorkgrp", name:$("#DomName").val()+" "+$("#Admin").val()+" "+"\""+$("#Pass").val()+"\""+" "+$("#DCserver").val()+" "+"<?php echo $_SESSION["user"]; ?>" });
				} 
			});
			refreshall();
			function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivad="false"; var userprivunlin="false"; var userprivfuture="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
										userprivad=gdata[prot].Active_Directory;
										userprivunlin=gdata[prot].Box_Users;
										userprivfuture=gdata[prot].Error;
									}
								};
									
								if( userprivad =="true") { $("#AD").show(); } else { $("#AD").hide(); } ; if( userprivunlin =="true") { $("#UnLin").show(); } else { $("#UnLin").hide(); };if( userprivfuture =="true") { $("#Future").show(); } else { $("#Future").hide(); };;
						});
					}
					$(".ullis").show();
			}
		}
		starting();
			
		setInterval('refreshall()',500);
		</script>

</body>
</html>
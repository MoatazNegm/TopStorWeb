<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Change Password </title>
    <!--META TAGS-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="assets/images/Qonly.png">

    <!--BOOTSTRAP CSS STYLE-->
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!--Font Awesome css-->
    <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link href="assets/js/chartist-js-develop/dist/chartist.min.css" rel="stylesheet" type="text/css">

    <!--CUSTOME CSS-->
    <link href="assets/css/main.css" rel="stylesheet" type="text/css">
    <link href="assets/css/login.css" rel="stylesheet" type="text/css">
</head>
<body>

<main>

    <nav class="navbar">
        <div class="col-md-12">
            <a class="navbar-brand" href="Login.php"><img src="assets/images/logo.png"></a>
            <ul class="navbar-nav pull-right">
                <li class="nav-item dropdown user-dropdown">
                    <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span><img src="assets/images/en-flag.png"> </span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#"><img src="assets/images/ar-flag.png" class="img-fluid"></a>
                    </div>
                </li>
            </ul>
            <!--</div>-->
        </div>
    </nav>

    <section>
        <div>
            <h1 class="text-center">Change Password of user <span id="myname"></span> </h1>
            <div class="col-md-4 offset-md-4">
                <form class="dr-form">
                    <div class="form-group  ">
                        <label class="">Password</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon "><img src="assets/images/password-icon.png"></div>
                            <input id="userPassword1" type="password" class="form-control passin">
                        </div>
                    </div>
                    <div class="form-group  ">
                        <label class="">confirm Password</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon"><img src="assets/images/password-icon.png"></div>
                            <input id="userPassword" type="password" class="form-control passin">
                        </div>
                    </div>
                    <button type="submit"id="change" style="cursor: pointer;" class="btn btn-submit col-md-8 offset-md-2">Submit</button>
                </form>
            </div>
        </div>
    </section>
<form id="Loginref" action="Login.php" method="post" style="display: none;">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
</main>
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
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script>
		var passcheck="22:333:33";
		var passchecknew="323:3443:34"
		var passchanged=0;
 var mydate;
 var myidhash;
 var mytimer;
 var mymodal;
 var idletill=480000;
 var modaltill=idletill-120000
 var myid="<?php echo $_REQUEST['myid'] ?>";
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";
 $(".myname").val(myname)
 $("#usrnm").text(myname)
 $(".params").val(myid);
//$("#overlay").modal('show');
function timeron() {
 mytimer=setTimeout(function() { 
	document.getElementById('Login'+'ref').submit();
	console.log('timout');
		},idletill);
 mymodal=setTimeout(function() { 
	console.log('modaltimeout');
	$("#overlay").modal('show')
		},modaltill);
}
timeron();
function timerrst() { clearTimeout(mytimer); clearTimeout(mymodal);$("#overlay").modal('hide'); timeron(); }
function chkuser() {
			$.get("./pumpy.php", { req:"chkuser2.sh", name:myname+" "+myid},function(data){ 
         var data2=data.replace(" ","").replace('\n','');
	if (myid != data2) { 
	   console.log('username',myname)
           console.log('myid,data2',myid,'and',data2)
		document.getElementById('Login'+'ref').submit();
 	}		;
				});
};
chkuser();
				$("html").click(function(){
mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser();myidhash=mydate;console.log(myidhash); } timerrst();});
				$("html").keypress(function(){mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser(); myidhash=mydate;};timerrst();});
		$(document).keypress(
			function(event){
				if(event.which == '13') {
					event.preventDefault();
				}
			});
		function refreshall(){
			$.get("requestdatein.php", { file: "Data/userpass.txtupdated" }, function(data){
				var objdate = jQuery.parseJSON(data);
				passchecknew=objdate.updated;
			});
			if(passchanged==1 && passchecknew != passcheck) { $("#logagain").submit(); }
			else  {  passcheck=passchecknew; }
		}
 $("#head2").text("Change "+myname+" Password");
 $("#wrong").show(); $("#change").hide();$("#changed").hide();
 $(".passin").keyup(function(){
	 
	 if($("#userPassword1").val() != $("#userPassword").val()|| $("#userPassword1").val() =="") {
	 	$("#userPassword1").addClass("NotComplete"); $("#userPassword").addClass("NotComplete");
		$("#wrong").show(); $("#change").hide();
	 }
	 else {
		 $("#wrong").hide(); $("#change").show();
	 }
	});
 $("#change").click(function() {
	 var passchecknew="34:433:43534";
	 $.post("./pump.php", { req:"UnixChangePass", name:"'"+$("#userPassword1").val()+"'", passwd:myname+" "+myname}, function (data){});
	 passchanged=1;
	 $("#change").hide(); $("#changed").show();
	 
	});
	 setInterval('refreshall()', 1000);

</script>

</body>
</html>

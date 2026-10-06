<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>دخول</title>
    <!--META TAGS-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="../assets/images/Qonly.png">

    <!--BOOTSTRAP CSS STYLE-->
    <link href="../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!--Font Awesome css-->
    <link href="../assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link href="../assets/js/chartist-js-develop/dist/chartist.min.css" rel="stylesheet" type="text/css">

    <!--CUSTOME CSS-->
    <link href="../assets/css/main.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/login.css" rel="stylesheet" type="text/css">
</head>
<body>
<main>
    <nav class="navbar">
        <div class="col-md-12">
            <a class="navbar-brand" href="index.html"><img src="../assets/images/logo.png"></a>
            <ul class="navbar-nav pull-right">
                <li class="nav-item dropdown user-dropdown">
                    <a class="nav-link dropdown-toggle" href="Login.php" id="navbarDropdownMenuLink"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span><img src="../assets/images/ar-flag.png"> </span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="../Login.php"><img src="../assets/images/en-flag.png" class="img-fluid"></a>
                    </div>
                </li>
            </ul>
            <!--</div>-->
        </div>
    </nav>

    <section>
        <div>
            <h1 class="text-center">محاولة الدخول</h1>
            <div class="col-md-4 offset-md-4">
                <form action="Login2.php" method="post" class="dr-form">
                    <div class="form-group">
                        <label class="">الاسم</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon"><img src="../assets/images/user-login.png"></div>
                            <input name="userName2" type="text" class="form-control" value="<?php echo $_POST["userName"] ?>" disabled>

                        </div>
                    </div>
                    <div class="form-group  ">
                        <label class="">كلمة السر</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon"><img src="../assets/images/password-icon.png"></div>
                            <input name="userPassword" type="password" class="form-control"disabled >
                        </div>
                    </div>
                    <button type="submit" id="wait"  class="btn btn-submit col-md-8 offset-md-2" disabled>... نرجو الانتظار قليلاً</button>
                </form>
            </div>
        </div>
    </section>
</main>
<?php
 $usern=$_POST["userName"];
 $passwd=$_POST["userPassword"];
 $isuser="../Data/isuser.txt";
 $timeone=filemtime($isuser);
 shell_exec("../pump.sh "."UnixPrepUser"." ".$usern."chk ".$passwd);
 session_start();

 if($usern === "mezo") { ;} else { ;}
  if( $_REQUEST["idd"] != session_id()) {  header('Location:Login.php');}

 if (empty($_SESSION['count'])) {
   $_SESSION['count'] = 1;
} else {
   $_SESSION['count']++;
}
 //session_commit();

?>
<form id="accounts" action="accounts.php" method="post">
	<input type="hidden" name="idd" value="<?php session_regenerate_id(); $_SESSION["user"]=$_POST["userName"]; session_commit();print session_id();?>" >
</form>

<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="../assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<script>
	var nochange=2;

	function loopingauth() {
		if( nochange > 1 ) {

			$.post("../pump.php", { req: "UnixChkUser", name:"<?php echo $usern ?>"+" chk "+"<?php echo $passwd ?>" }, function (data1){
				$.get("requestdata.php", { file: '../Data/isuser.txt' }, function(data){
					var objdate = jQuery.parseJSON(data);
					var isuser=objdate.name;
					var isok=objdate.status;
					nochange=nochange+1;
					if (isuser==="<?php print $usern ?>" && isok == "ok" ) {

						$("#state").val("OK");
						//console.log("<?php print session_id();?>");
						document.getElementById('accounts').submit();
					} else {
						//console.log("<?php print $usern ?>"," | ", isuser);
						if( nochange > 10 ) {window.location = "Login.php";}
					};

				});
			});
		}
	}
	setInterval('loopingauth()', 500)



</script>
</body>
</html>

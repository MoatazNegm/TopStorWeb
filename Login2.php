<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
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
            <a class="navbar-brand" href="index.html"><img src="assets/images/logo.png"></a>
            <ul class="navbar-nav pull-right">
                <li class="nav-item dropdown user-dropdown">
                    <a class="nav-link dropdown-toggle" href="Login.php" id="navbarDropdownMenuLink"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span><img src="assets/images/en-flag.png"> </span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="./ar/Login.php"><img src="assets/images/ar-flag.png" class="img-fluid"></a>
                    </div>
                </li>
            </ul>
            <!--</div>-->
        </div>
    </nav>

    <section>
        <div>
            <h1 class="text-center">Logging in </h1>
            <div class="col-md-4 offset-md-4">
                <form action="Login2.php" method="post" class="dr-form">
                    <div class="form-group">
                        <label class="">Username</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon"><img src="assets/images/user-login.png"></div>
                            <input name="userName2" type="text" class="form-control" value="<?php echo $_POST["userName"] ?>" disabled>
                            
                        </div>
                    </div>
                    <div class="form-group  ">
                        <label class="">Password</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon"><img src="assets/images/password-icon.png"></div>
                            <input name="userPassword" type="password" class="form-control"disabled >
                        </div>
                    </div>
                    <button type="submit" id="wait"  class="btn btn-submit col-md-8 offset-md-2" disabled>Please wait...</button>
                </form>
            </div>
        </div>
    </section>
</main>
<?php 
 $usern=$_POST["userName"];
 $passwd=$_POST["userPassword"];
 shell_exec("./pump.sh "."UnixPrepUser"." ".$usern."chk ".$passwd." ".$usern);
?>
<form id="accounts" action="accounts.php" method="post">
 <input class='' type="hidden" name='name' value="<?php echo $usern ; ?>" >
 <input class='params' type="hidden" name="myid" value=1>
</form>

<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script>
console.log('name','<?php echo $usern ?>');
	
	function loopingauth() { 
			$.get("./pumpy.php", { req:"chkuser.py", name:"<?php echo $usern ?>"+" chk "+"<?php echo $passwd ?>"+" "+"<?php echo $usern ?>"},function(data){ console.log('usertoken',data);
			var data2=data
			if (data.includes('command')> 0 ) { data2='hi' };
			if (data2.length > 7 ) {
						$(".params").val(data2.replace(' ','').replace('\n',''));
			document.getElementById('accounts').submit();
					} else {
			window.location = "/Login.php";
					};
					
			});
		}
//	setInterval('loopingauth()', 500)
  loopingauth();
	
	
			
</script>
</body>
</html>

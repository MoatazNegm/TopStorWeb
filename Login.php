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
            <h1 class="text-center">Member Login</h1>
            <div class="col-md-4 offset-md-4">
                <form action="Login2.php" method="post" class="dr-form">
                    <div class="form-group">
                        <label class="">Username</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-prepend"><img src="assets/images/user-login.png"></div>
                            <input name="userName" type="text" class="form-control">
                            <input type="hidden" name="idd" value=0 >
                        </div>
                    </div>
                    <div class="form-group  ">
                        <label class="">Password</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-prepend"><img src="assets/images/password-icon.png"></div>
                            <input name="userPassword" type="password" class="form-control">
                        </div>
                    </div>
                    <button type="submit" id="logpls"  class="btn btn-submit col-md-8 offset-md-2">Login</button>
                </form>
            </div>
        </div>
    </section>
</main>
<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>

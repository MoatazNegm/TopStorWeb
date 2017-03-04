<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
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
                    <a class="dropdown-item" href="login.html">Logout</a>
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
    <div class="bg-danger">Your changes hasn't been saved
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
                    <a class="nav-link" href="replication.html" role="tab">
                        <div></div>
                        Replication</a>
                </li>
                <li class="nav-item pools">
                    <a class="ref nav-link active" id="pools" data-toggle="tab" href="#" role="tab">
                        <div></div>
                        Pools</a>
                </li>
                <li class="nav-item config">
                    <a class="nav-link" href="#" role="tab">
                        <div></div>
                        Config</a>
                </li>
            </ul>
        </div>
        <div class="col-md-2 second-menu">
            <div class="tab-content">
                <div class="tab-pane active" id="pools" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li class="nav-item diskGroups">
                            <a id="diskGroupspane" class="nav-link active" data-toggle="tab" href="#diskGroups" role="tab">
                                <div></div>
                                <span>Disk Groups</span></a>
                        </li>
                        <li class="nav-item snapshots">
                            <a id="snapshotspane" class="nav-link" data-toggle="tab" href="#snapshots" role="tab">
                                <div></div>
                                <span>SnapShots</span></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane active" id="diskGroups" role="tabpanel">
                    <div id="diskimg">
                       
                    </div>
                    <h1>Disk Groups:</h1>
                    <div id="requesttable" class="row table-responsive">
                        <table class="col-12 table  dr-table-show">
                            <thead>
                            <tr>
                                <th class="text-center">Select</th>
                                <th class="text-center">Name</th>
                                <th class="text-center">Usable Space</th>
                                <th class="text-center">Create</th>
                                <th class="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody id="DG">
                               <tr  style="font-size: 2rem; background: grey;height: 5rem; text-align: center;">
                                <td class="text-center ">
                                    <div> Running Pool </div>
                                </td>
                                <td class="text-center">p1</td>
                                <td class="text-center">20G</td>
                                <td class="text-center"><a href="#"><img
                                        src="assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                              	</td>
                            	</tr>

                            <tr>
                                <td class="text-center ">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">RAID 10</td>
                                <td class="text-center">97.9GB</td>
                                <td class="text-center"><a href="#"><img
                                        src="assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">RAID 10</td>
                                <td class="text-center">97.9GB</td>
                                <td class="text-center"><a href="#"><img
                                        src="assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">RAID 10</td>
                                <td class="text-center">97.9GB</td>
                                <td class="text-center"><a href="#"><img
                                        src="assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                
                </div>
                <div class="tab-pane " id="snapshots" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Pool</label>
                            <div class="col-5">
                                <select class="form-control">
                                    <option>p1</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Vols</label>
                            <div class="col-5">
                                <select class="form-control">
                                    <option>cifs</option>
                                    <option>nfs</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">To</label>
                            <div class="col-5">
                                <select class="form-control">
                                    <option>255.255.255.1</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Period</label>
                            <div class="col-5">
                                <ul class="nav nav-pills" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#snapshotsOnce" role="tab">Once</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#snapshotsHourly"
                                           role="tab">Hourly</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#snapshotsMinutely" role="tab">Minutely</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#snapshotsWeekly"
                                           role="tab">Weekly</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row tab-content">
                            <div class="tab-pane active" id="snapshotsOnce" role="tabpanel">
                                <label class="col-2 col-form-label">Snap name</label>
                                <div class="col-5">
                                    <input class="form-control" type="text">
                                </div>
                                <br>
                                <div class="margin-top col-md-12">
                                    <button type="submit" class="btn btn-submit col-3">find snapshot</button>
                                </div>
                                <h1 class="col-md-12">Snapshots Period: Once</h1>
                                <div class="row table-responsive">
                                    <table class="col-12 table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">pool</th>
                                            <th class="text-center">vols</th>
                                            <th class="text-center">From</th>
                                            <th class="text-center">Delete</th>
                                            <th class="text-center">RollBack</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane " id="snapshotsHourly" role="tabpanel">
                                <label class="col-2 col-form-label">Snap min</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <label class="col-1 col-form-label">Every..hrs</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <label class="col-1 col-form-label">Keep</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <div class="margin-top col-md-12">
                                    <button type="submit" class="btn btn-submit col-3">find SnapShot</button>
                                </div>
                                <h1 class="col-md-12">Snapshots Period: Hourly</h1>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">pool</th>
                                            <th class="text-center">vols</th>
                                            <th class="text-center">To</th>
                                            <th class="text-center">Delete</th>
                                            <th class="text-center">RollBack</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">Snap min</th>
                                            <th class="text-center">every.hr</th>
                                            <th class="text-center">Keep</th>
                                            <th class="text-center">Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">Snap1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">keep1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Snap1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">keep1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="tab-pane" id="snapshotsMinutely" role="tabpanel">
                                <label class="col-2 col-form-label">Snap name</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <label class="col-1 col-form-label">Keep</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <div class="margin-top col-md-12">
                                    <button type="submit" class="btn btn-submit col-3">find SnapShot</button>
                                </div>
                                <h1 class="col-md-12">Snapshots Period: Minutely</h1>

                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">pool</th>
                                            <th class="text-center">vols</th>
                                            <th class="text-center">To</th>
                                            <th class="text-center">Delete</th>
                                            <th class="text-center">RollBack</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">Snap name</th>
                                            <th class="text-center">Keep</th>
                                            <th class="text-center">Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">Snap name</td>
                                            <td class="text-center">Keep</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Snap1</td>
                                            <td class="text-center">keep1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="tab-pane" id="snapshotsWeekly" role="tabpanel">
                                <label class="col-2 col-form-label">Snap min</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <label class="col-1 col-form-label">Every..hrs</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <label class="col-1 col-form-label">Keep</label>
                                <div class="col-2">
                                    <input class="form-control" type="number">
                                </div>
                                <div class="margin-top col-md-12">
                                    <button type="submit" class="btn btn-submit col-3">find SnapShot</button>
                                </div>
                                <h1 class="col-md-12">Snapshots Period: Weekly</h1>

                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">pool</th>
                                            <th class="text-center">vols</th>
                                            <th class="text-center">To</th>
                                            <th class="text-center">Delete</th>
                                            <th class="text-center">RollBack</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">p1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">255.255.255.1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                            <td class="text-center"><a href="#"><img src="assets/images/return.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">Snap name</th>
                                            <th class="text-center">every.hr</th>
                                            <th class="text-center">Keep</th>
                                            <th class="text-center">Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">Snap1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">keep1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Snap1</td>
                                            <td class="text-center">nfs1</td>
                                            <td class="text-center">keep1</td>
                                            <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                                     alt="can't upload delete icon"></a>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <!--<div>-->
                            <!--<button type="submit" class="btn btn-danger btn-rollback  col-3">rollback to snapshots-->
                            <!--</button>-->
                        <!--</div>-->
                    </form>
                </div>

            </div>
        </div>
    </div>
</main>
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

<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/js/tether.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>

<script src="assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="assets/js/dropzen.js"></script>

<!--CUSTOM JS-->
<script>

			var Vollisttime="44:333:222";
			var Vollisttime2="44:333:222";
			var times= { "snaps":"30:43:433", "periods":"30:43:433" };
			var requiredtime={ "snaps":"33==:433", "periods":"30==erwe:43:433" }
			var Vollisttimenew="23:434:34543";
			var status=0;
			var panesel="hifirst";
			var syscounter=10;
			var syscounter2=1000;
			var disks=[];
			var pools=[];
		$(".ref").click(function() {
		document.getElementById($(this).attr('id')+'ref').submit();
		 //console.log($(this).attr('id')+'ref');
		});		
		
		
			$(".bg-success").show();$(".bg-danger").hide();$(".bg-warning").hide();
			
			$("#deletePool").hide();$("#submitdiskgroup").hide();$(".finish").hide();$("#SnapshotCreatediv").hide();
			
			function refreshList3(request,listid,fileloc) {
				if(syscounter2==1000) { $.post("./pump.php", { req: request, name:"a" }); }
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;

				});
				if(Vollisttime==Vollisttimenew) { 
				} else { 
					Vollisttime=Vollisttimenew;
					
					$(listid+" option.vvariable").remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var gdata = jQuery.parseJSON(data);
						$(listid+" option.vvariable").remove();
						$("#Pool option.variable2").remove();
						chartdata=[];
						for (var prot in gdata){
							if ($.inArray(gdata[prot].Pool,pools) < 0 ) {
										pools.push(gdata[prot].Pool);
										$("#Pool").append($('<option class="variable2">').text(gdata[prot].uPool).val(gdata[prot].class));
										chartdata.push(gdata[prot].class);
										//chartdata[gdata[prot].class]=[];
							}
							$(listid).append($('<option class="vvariable '+gdata[prot].class+'">').text(gdata[prot].name).val(gdata[prot].name));
							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
						
						}
						$("#Pool").change()
							pools = [];
					});
				}
			};

			function snaponce(txtin,but,altbut){
				
						var chars=$(txtin).val().length;
						
						if ( chars < 3 ) {  $(but).show();
												 $(altbut).hide();
						} else 					{	$(but).hide();
												 $(altbut).show();
						};
			};
			
			function refreshall() { //check pool status
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("#texthere").text(data);});
				if($("#diskGroupspane").hasClass('active'))  { if (panesel !="diskgroup") { Vollisttime2="skldjfadks"; panesel="diskgroup";}};
				if($("#snapshotspane").hasClass('active'))  { if (panesel !="snapshot") { Vollisttime2="skldjfadks"; panesel="snapshot";}};
				if (panesel == "diskgroup") 
				if(syscounter2==1000){ }
				$.get("requestdatein.php", { file: "Data/disklist.txtupdated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;
					//console.log("Vollisttimenew", objdate,fileloc,"Vollold",Vollisttime);
				});
				if(Vollisttime2==Vollisttimenew) { 
					$.post("./pump.php", { req: "GetDisklist", name:"a" });//console.log("traffic not changed"); 
					
				} else { 
					Vollisttime2=Vollisttimenew;
					$.get("requestdata.php", { file: "Data/disklist.txt" },function(data){
						var jdata = jQuery.parseJSON(data);
						disks=[];
						var k;
						 $(".disk-image").remove();	
						for (var disk in jdata){
							disks.push(jdata[disk].id)
							k=jdata[disk].id;
							disks[jdata[disk].id]=[]
							disks[jdata[disk].id]["name"]=jdata[disk].name;
							disks[jdata[disk].id]["host"]=jdata[disk].host;
							disks[jdata[disk].id]["pool"]=jdata[disk].pool;
							disks[jdata[disk].id]["size"]=jdata[disk].size;
							disks[jdata[disk].id]["poolsize"]=jdata[disk].poolsize;
							disks[jdata[disk].id]["grouptype"]=jdata[disk].grouptype;
							disks[jdata[disk].id]["InGroupDisk1"]=jdata[disk].InGroupDisk1;
							disks[jdata[disk].id]["InGroupDisk2"]=jdata[disk].InGroupDisk2;
							$("#diskimg").append('<a id="'+k+'" href="javascript:diskclick(\''+k+'\')"> <img class="img-fluid disk-image disk'+k+'" src="assets/images/disk-image.png" alt="can\'t upload disk images"></a>')
							disks[k]["selected"]=0;						
						}
					});
				}
				if(status==1) { //DiskGroup
					diskgetsize('Data/disksize.txt','#size',"#count","#onedisk");
					status=3;
					refresh2("DGstatus");	
				}
				if(status=="snaps"){ //snapshots
					refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
					refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt","snaps","snaps");
					refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods","periods");
					$("#Vol").change(); 
					if(syscounter == 10) {
					
					
					
					syscounter=0;
					}
				syscounter++;
				refresh2("Snapsstatus");	
				}
				if(syscounter2==1000) { syscounter2=0; } else { syscounter2=syscounter2+1; }
			}
				
			function diskclick(id) { 
			  var selectingdisks;
					$(".disk"+id).toggleClass("SelectedFree"); 
					if($(".disk"+id).hasClass("SelectedFree")) {
						disks[id]["selected"]=1;
						if(disks[id]["grouptype"]!="free") {
							for (k in disks) {
								if (k != id) {
									if(disks[k]["grouptype"]!="free"){
										disks[k]["selected"]=0;
										$(".disk"+k).removeClass("SelectedFree");
									}
								}
							}				
						}
					} else { disks[id]["selected"]=0; }
					if(disks[id]["grouptype"]!="free") {
						selectingdisks=disks[id]["InGroupDisk1"]
						while(selectingdisks != "notavailable") {
						
							selectingdisks=toggleDiskselect(selectingdisks,disks[id]["selected"],"InGroupDisk1");
						}
						selectingdisks=disks[id]["InGroupDisk2"]
						while(selectingdisks != "notavailable") {
						
							selectingdisks=toggleDiskselect(selectingdisks,disks[id]["selected"],"InGroupDisk2");
						}
					}						
			};
			function toggleDiskselect(dd,sel,nextd) {
				var nextdisk="notavailable"
				for (k in disks){
				
				  if (disks[k]["name"]==dd) {
					if(sel==1){ 
						$(".disk"+k).addClass("SelectedFree"); disks[k]["selected"]=1; nextdisk=disks[k][nextd]
					 } else {
					 
					 	$(".disk"+k).removeClass("SelectedFree"); disks[k]["selected"]=0; nextdisk=disks[k][nextd]
					 }	
				  }
				}
				return nextdisk;
			}
			
			function refreshList(req,listid,fileloc,showtime,update) {
				if(syscounter2==1000){$.post("./pump.php", { req: req, name:"a" }, function (data1){});};
					$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					requiredtime[showtime]=objdate.updated;
				
				});
				
				if(times[showtime]==requiredtime[showtime]) { 
				} 
				else { 
					times[showtime]=requiredtime[showtime];
					//$(listid+" tr.variable").remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						
						var gdata = jQuery.parseJSON(data);
						
						$("."+update).remove();

						for (var prot in gdata){
							
								if( showtime=="snaps" ) {
									//$(listid).append($('<option class="variable">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));	
								$(listid).append($('<option class="variable '+update+' '+gdata[prot].pool+' '+gdata[prot].father+'">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								$("#Vol").change();	
							}
							if (showtime=="periods") {
								    
									switch (gdata[prot].period) {
									//	case "hourly": $("#Hourlylist").append($('<option class="variable">').text('Every:'+gdata[prot].t3+"hrs At:"+gdata[prot].t2+ "mins Keep:"+ gdata[prot].t1+"snaps").val("hourly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3));	 break;
									//	case "Minutely": $("#Minutelylist").append($('<option class="variable">').text('Every:'+gdata[prot].t2+"mins Keep:"+gdata[prot].t1+"snaps").val("Minutely."+gdata[prot].t1+"."+gdata[prot].t2));	 break;
									//	case "Weekly" : $("#Weeklylist").append($('<option class="variable">').text('Every:'+gdata[prot].t4+" At:"+gdata[prot].t2+":"+gdata[prot].t3+" Keep:"+gdata[prot].t1+"snaps").val("Weekly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3+"."+gdata[prot].t4));	 break;
									//switch (gdata[prot].period) {
										case "hourly": $("#Hourlylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'">').text('Every:'+gdata[prot].t3+"hrs At:"+gdata[prot].t2+ "mins Keep:"+ gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;
										case "Minutely": $("#Minutelylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'">').text('Every:'+gdata[prot].t2+"mins Keep:"+gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;
										case "Weekly" : $("#Weeklylist").append($('<option class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'">').text('Every:'+gdata[prot].t4+" At:"+gdata[prot].t2+":"+gdata[prot].t3+" Keep:"+gdata[prot].t1+"snaps").val(gdata[prot].stamp));	 break;

									
										
								}
							
							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
							}
						}
					});
				
				};
			};
			function refresh2(textareaid) {
				
				$.get("requestdata2.php", { file: 'Data/'+textareaid+'.log' }, function(data){
					$('#'+textareaid).val(data);
					});
			}	;
			//setInterval('refresh2("DGstatus")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refresh2("Snapsstatus")', 2000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt",12)', 10000); // Loop every 1000 milliseconds (i.e. 1 second)
			//setInterval('refreshList("GetPoolHourlylist","#Hourlylist","Data/Hourlylist.txt",5)', 10000); // Loop every 1 second
			//setInterval('refreshList("GetPoolMinutelylist","#Minutelylist","Data/Minutelylist.txt",5)', 10000); // Loop every 1 second
			//setInterval('refreshList("GetPoolWeeklylist","#Weeklylist","Data/Weeklylist.txt",5)', 10000); // Loop every 1 second
			
			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".DiskGroups").hide(); $(".SnapShots").hide(); 
			$("#DiskGroups").click(function (){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};
				
					if( userpriv=="true" | curuser=="admin" ) { 
					 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show(); 
					}
				});
			});
			$("#SnapShots").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].SnapShots
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="snaps"; $("h2").css("background-image","url('img/snapshot.png')").text("SnapShots");  $("option.variable").remove(); Vollisttime="44:333:22";times= { "snaps":"30:43:433", "periods":"30:43:433" }; $(".ullis").hide();$(".finish").show();$(".SnapShots").show();
							 $("#Vol").change();
						}
					});
				};
			});
			
			$(".finish").click(function (){ config = 1; status=0; $(".DiskGroups").hide(); $(".SnapShots").hide(); $(".ullis").show();$(".finish").hide()});
			
			
			
			$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
			$("#Once").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Onceset").show(); snaponce("#Oncename","#disableddiv","#SnapshotCreatediv");
			});
			$("#Hourly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Hourlyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Minutely").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Minutelyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Weekly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Weeklyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Vol").change(function() {
				//Vollisttime="44:333:222";
				var poolsel=$("#Pool option:selected").text();
				var volsel=$("#Vol option:selected").val();
				//times= { "snaps":"30:43:433", "periods":"30:43:433" };
				$(".variable").hide();
				if(status=="snaps")
				$("."+poolsel+"."+volsel).show();
					
				//$(" tr.variable").remove();
				
			});
			$("#Pool").change(function () {
				
				var selection=$("#Pool option:selected").val();
				
				$('#Vol option.'+selection+':first').prop('selected', true);
				$(".vvariable").hide();
				$(".vvariable."+selection).show();
					
					$('#Vol').change();
		/*			if(plotflag > 0 ) {
										plotb.destroy();
									}
					plotchart('chartNFS',chartdata[$("#Pool2").val()]);
		*/
				
		
			});
		function diskgetsize(fileloc,spanid1,spanid2,spanid3) {
			$.post("./pump.php", { req:"DiskSize", name:fileloc }, function(data1){
				$.get("requestdata.php", { file: fileloc }, function(data){
					var jdata = jQuery.parseJSON(data);
					$(spanid1).text(jdata.size);$(spanid2).text(jdata.count);$(spanid3).text(jdata.onedisk);
					$("#R10").text(jdata.R10);$("#R5").text(jdata.R5);$("#R6").text(jdata.R6);
					
				});
					
			});
		};
				
		
		//refreshList("GetPoollist","#Pool","Data/Poollist.txt",3);
		//refreshList2("GetPoolVollist","#Vol","Data/Vollist2.txt","Volumes");

		$("#submitdiskgroup").click( function (){ $.post("./pump.php", { req:"DGsetPool", name:$('input[name=Raidselect]:checked').val()+" "+$('input[name=Raidselect]:checked').attr("id")+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("DGstatus");
		});
	 });
	 
		$("#deletePool").click( function (){ $.post("./pump.php", { req:"DGdestroyPool"+" "+"<?php echo $_SESSION["user"]; ?>" });
		});

			
		$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotDelete", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		$("#RollbackSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotRollback", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});	
		$("#DeleteHourly").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Hourlylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		$("#DeleteMinutely").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Minutelylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		$("#DeleteWeekly").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Weeklylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		$("#SnapshotCreate").click( function (){ 
				var period=$('input[name=Period]:checked').val();
				
				var oper="";
				switch(period) {
					case "Once" : oper = $("#Oncename").val();  break;
					case "Hourly": oper = $("#Sminute").val()+" "+$("#Hour").val()+" "+$("#KeepHourly").val(); break;
					case "Minutely": oper = $("#Minute").val()+" "+$("#KeepMinutely").val(); break;
					case "Weekly" : oper = $("#Stime").val()+" "+$("#Week").val()+" "+$("#KeepWeekly").val(); break;
				}
				oper =oper+" "+$("#Pool option:selected").val()+" "+$("#Vol option:selected").val();
				
				$.post("./pump.php", { req:"SnapshotCreate"+period, name: oper+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			});
		
		$("#Oncename").keyup(function(){
				snaponce("#Oncename","#disableddiv","#SnapshotCreatediv");
		});
			
//			$("#Stime").timepicker({
//								appendWidgetTo: 'body',
 //               minuteStep: 1,
//								showMeridian: false,////

//            });
            
			setInterval("refreshall()",500);
			refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
			refreshList("GetSnaplist","#Snaplist","Data/listsnaps.txt","snaps","snaps");
			refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods","periods");
			$.post("./pump.php", { req: "GetPoolperiodlist", name:"a" });
			$.post("./pump.php", { req: "GetPoolVollist", name:"a" });
			$.post("./pump.php", { req: "GetSnaplist", name:"a" });
			function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivDiskGroups="false"; var userprivSnapShots="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
										userprivDiskGroups=gdata[prot].DiskGroups;
										userprivSnapShots=gdata[prot].SnapShots;
									}
								};
									
								if( userprivDiskGroups =="true") { $("#DiskGroups").show(); } else { $("#DiskGroups").hide(); } ; if( userprivSnapShots =="true") { $("#SnapShots").show(); } else { $("#SnapShots").hide(); };;
						});
					}
					$(".ullis").show();
			}
		}
				$("#close-success").click(function() { $(".bg-success").hide(); });
		</script>


</body>
</html>
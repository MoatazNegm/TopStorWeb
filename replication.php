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
    	<link rel="stylesheet" href="css/jquery.jqplot.css">
   

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
                        Volumes</a>
                </li>
                <li class="nav-item replication">
                    <a class="nav-link ref active" data-toggle="tab" id="replication" href="#" role="tab">
                        <div></div>
                        Replication</a>
                </li>
                <li class="nav-item pools">
 						 <a class="ref nav-link " id="pools" data-toggle="tab" href="#" role="tab">                  
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
                <div class="tab-pane active" id="replication" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li class="nav-item partner ">
                            <a class="nav-link active" data-toggle="tab" href="#partner" role="tab">
                                <div></div>
                                <span>Partner</span></a>
                        </li>
                        <li class="nav-item sender">
                            <a class="nav-link" data-toggle="tab" href="#sender" role="tab">
                                <div></div>
                                <span>Sender</span></a>
                        </li>
                        <li class="nav-item recive">
                            <a class="nav-link" data-toggle="tab" href="#receiver" role="tab">
                                <div></div>
                                <span>Receivers</span></a>
                        </li>
                        <li class="nav-item proxyliscence" hidden>
                            <a class="nav-link" data-toggle="tab" href="#proxyliscence" role="tab">
                                <div></div>
                                <span>Replication Alias</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane active" id="partner" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Partner type</label>
                            <div class="col-5">
                                <select id="type"class="form-control">
                                    <option>Sender</option>
                                    <option>receiver</option>
                                    <option>DualWay</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Partner address</label>
                            <div class="col-5">
                                <input id="Partn" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row" hidden>
                            <label class="col-2 col-form-label">Proxy</label>
                            <div class="col-5">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">
                                </label>
                            </div>
                        </div>

                        <div class="">
                         <a href="javascript:AddPartner()" class="" >
                         	<div id="AddPartner"type="button" class="btn btn-submit col-3">Add Partner</div>
                         </a>
                            
                        </div>
                    </form>
                    <h1>Partner List:</h1>
                    <div class="row table-responsive">
                        <table class="col-12 table dr-table-show">
                            <thead>
                            <tr>
                                <th class="text-center">Partner</th>
                                <th class="text-center">Type</th>
                                <th class="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody id="Partnerlist">
                            <tr hidden>
                                <td class="text-center">10.2.1.2.2</td>
                                <td class="text-center">Sender</td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane " id="sender" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Pool</label>
                            <div class="col-5">
                                <select  id="Poolsend" class="form-control">
                                 
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Volume</label>
                            <div class="col-5">
                                <select id="Volsend"  class="form-control">
                                  
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">From</label>
                            <div class="col-5">
                                <select  id="partnercsend" class="form-control">
                                  
                                </select>
                            </div>
                        </div>
                    </form>
                    <h1>Sender List:</h1>
                    <div class="row table-responsive">
                        <table class="col-12 table dr-table-show">
                            <thead>
                            <tr>
                                <th class="text-center">Name</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">From</th>
                                <th class="text-center">Delete</th>
                                <th class="text-center">Rollback</th>
                            </tr>
                            </thead>
                            <tbody id="Senderslist">
                            <tr hidden>
                                <td class="text-center">p1</td>
                                <td class="text-center">nfs1</td>
                                <td class="text-center">255.255.255.1</td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                           

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane " id="receiver" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Pool</label>
                            <div class="col-5">
                                <select id="Poolrec" class="form-control">
                                   
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Volume</label>
                            <div class="col-5">
                                <select id="Volrec" class="form-control">
                                   
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">To</label>
                            <div class="col-5">
                                <select id="partnercrec"  class="form-control">
                                   
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
                                    <input id="Oncename"  class="form-control" type="text">
                                </div>
                                <br>
                                <div class="margin-top col-md-12">
                                <a id="goodname" href="javascript:SnapshotCreate()" class="" >
                                    <div id="oncecreate" type="button" class="btn btn-submit col-3 ">create snapshot</div>
                                </a>
                                <div id="shortname" href="#" class="" >
                                    <div id="" type="button" class="btn ">snapshot name is short</div>
                                </div>
                                </div>
                                <h1 class="col-md-12">Current Snapshots for this volume</h1>
                                <div class="row table-responsive">
                                    <table class="col-12 table dr-table-show">
                                        <thead>
                                        <tr>
                                <th class="text-center">Name</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">To</th>
                                <th class="text-center">Delete</th>
                                <th class="text-center">Rollback</th>
                                        </tr>
                                        </thead>
                                        <tbody class="Snaplist">
                                   

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane " id="snapshotsHourly" role="tabpanel">
                                <label class="col-2 col-form-label">Snap min</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="Sminute" min="0" max="59" value="0">
                                </div>
                                <label class="col-1 col-form-label">Every..hrs</label>
                                <div class="col-2">
                                    <input class="form-control" type="number" id="Hour" min="1" max="24" value="1">
                                </div>
                                <label class="col-1 col-form-label">Keep</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="KeepHourly" min="1" value="1">
                                </div>
                                <div class="margin-top col-md-12">
                                	 <a  href="javascript:SnapshotCreate()" class="" >
                                    <div type="button" class="btn btn-submit SnapshotCreate col-3">Create SnapShot period</div>
                                  </a>
                                </div>
                                <h1 class="col-md-12">Snapshot schedule : Hourly</h1>
                                <div class="row table-responsive">                                
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">Every (hrs)</th>
                                            <th class="text-center">At (minutes)</th>
                                            <th class="text-center">Keep (snapshots)</th>
                                            <th class="text-center">Identifier</th>
                                            <th class="text-center">Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody id="Hourlylist">
                                       

                                        </tbody>
                                    </table>
                                </div>
											 <h1 class="col-md-12">Current snapshots for this volume</h1>                              
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                <th class="text-center">Name</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">To</th>
                                <th class="text-center">Delete</th>
                                <th class="text-center">Rollback</th>
                                        </tr>
                                        </thead>
                                        <tbody class="Snaplist">
                                      

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="tab-pane" id="snapshotsMinutely" role="tabpanel">
                                <label class="col-2 col-form-label">Every Minute</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="Minute" min="1" max="59" value="1">
                                </div>
                                <label class="col-1 col-form-label">Keep</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="KeepMinutely" mi="1" value="1">
                                </div>
                                <div class="margin-top col-md-12">
                                	 <a  href="javascript:SnapshotCreate()" class="" >
                                    <div type="button" class="btn btn-submit SnapshotCreate col-3">Create SnapShot period</div>
                                  </a>
                                </div>
                                <h1 class="col-md-12">Snapshots Period: Minutely</h1>
										
                                <div class="row table-responsive">										
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">Every (minutes)</th>
                                            <th class="text-center">Keep (snapshots)</th>
                                            <th class="text-center">Identifier</th>
                                            <th class="text-center">Delete</th>

                                        </tr>
                                        </thead>
                                        <tbody id="Minutelylist">
                                       

                                        </tbody>
                                    </table>
                                </div>
											  <h1 class="col-md-12">current snapshots for volume</h1>                              
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                <th class="text-center">Name</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">To</th>
                                <th class="text-center">Delete</th>
                                <th class="text-center">Rollback</th>
                                        </tr>
                                        </thead>
                                        <tbody class="Snaplist">
                                      
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="tab-pane" id="snapshotsWeekly" role="tabpanel">
                                <label class="col-2 col-form-label">Snap min</label>
                                <div class="col-2">
                                    <input  id="Stime" class="form-control" type="time" min="00:00" max="23:59" value="00:00">
                                </div>
                                <label class="col-2 col-form-label">Every Day of Week</label>
                                <div class="col-2">
                                    <select id="Week" class="form-control">
                                    	<option value="Sat">Saturday</option><option value="Sun">Sunday</option><option value="Mon">Monday</option><option value="Tue">Tuesday</option><option value="Wed">Wednesday</option><option value="Thu">Thursday</option><option value="Fri">Friday</option>
												</select>                               
                                </div>
                                <label class="col-1 col-form-label">Keep</label>
                                <div class="col-2">
                                    <input class="form-control" type="number" min="1" id="KeepWeekly" value="1">
                                </div>
                               
                                <div class="margin-top col-md-12">
                                	 <a  href="javascript:SnapshotCreate()" class="" >
                                    <div type="button" class="btn btn-submit SnapshotCreate col-3">Create SnapShot period</div>
                                  </a>
                                </div>
                                <h1 class="col-md-12">Snapshots Period: Weekly</h1>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center">time(hh:mm)</th>
                                            <th class="text-center">Week day</th>
                                            <th class="text-center">Keep (snapshots)</th>
                                            <th class="text-center">Identifier</th>
                                            <th class="text-center">Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody id="Weeklylist">
                                      
                                        </tbody>
                                    </table>
                                </div>
										  <h1 class="col-md-12">Current snapshots for this volume</h1>                               
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                <th class="text-center">Name</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">To</th>
                                <th class="text-center">Delete</th>
                                <th class="text-center">Rollback</th>
                                        </tr>
                                        </thead>                                       
                                        <tbody class="Snaplist">
                                       
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
                <div class="tab-pane " id="proxyliscence" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row" hidden>
                            <label class="col-2 col-form-label">License</label>
                            <div class="col-5">
                                <input class="form-control" type="text">
                            </div>
                            <button type="submit" class="btn btn-proxy col-md-2">Add License</button>
                        </div>
                        <div class="form-group row" hidden>
                            <label class="col-2 col-form-label">Proxy</label>
                            <div class="col-5">
                                <input class="form-control" type="text">
                            </div>
                            <a  href="javascript:AddAlias()" class="" >
                                   
                              <div type="button" class="btn btn-proxy col-md-2">Add Proxy</div>

                            </a>
                            
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Alias</label>
                            <div class="col-5">
                                <input id="Alias" class="form-control" type="text">
                            </div>
                            <button type="submit" class="btn btn-proxy col-md-2">Add Alias</button>
                        </div>

                    </form>
                    <div class="col-md-12 dr-two-tables">
                        <div class="col-md-3 table-responsive">

                            <table class=" table dr-table-show">
                                <thead>
                                <tr>
                                    <th class="text-center">Liscence</th>
                                    <th class="text-center">Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-center">iwiwiw2</td>
                                    <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                             alt="can't upload delete icon"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center">iwiwiw2</td>
                                    <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                             alt="can't upload delete icon"></a>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-4 table-responsive">
                            <table class=" table dr-table-show">
                                <thead>
                                <tr>
                                    <th class="text-center">Proxy</th>
                                    <th class="text-center">Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-center">ec2-52-88-255-207.us-west-2</td>
                                    <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                             alt="can't upload delete icon"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center">ec2-52-88-255-207.us-west-2</td>
                                    <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                             alt="can't upload delete icon"></a>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-3 table-responsive">
                            <table class=" table dr-table-show">
                                <thead>
                                <tr>
                                    <th class="text-center">Alias</th>
                                    <th class="text-center">Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-center">1032_8</td>
                                    <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                             alt="can't upload delete icon"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center">1032_8</td>
                                    <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                             alt="can't upload delete icon"></a>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
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

//<script src="assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="assets/js/dropzen.js"></script>
<script src='js/jquery.jqplot.min.js'></script>
<script src='js/excanvas.min.js'></script>
<script src="js/jqplot.dateAxisRenderer.min.js"></script>

<!--CUSTOM JS-->
<script src="assets/js/main.js"></script>
		<script src="js/bootstrap-timepicker.js"></script>
		
		<script>
		
			var Vollisttime2="44:333:222";
			var partner="44:333:222";
			var partnernew="44:d3243:erw22"
			var replival= { "receiver":"33=fgsssdf=:43", "periods":"30==ergrwe:43:43", "sender":"43534ss:46dfd:4563", "Proxy":"3242ew35s34rwe" };
			var replivalnew={ "receiver":"33==:433", "periods":"30==erwe:43:433", "sender":"43534:456356:4563" , "Proxy":"3242ewrwe"};
			var Vollisttime="44:333:ss222";
			var times= { "receiver":"33==s:43", "periods":"30==erwe:s43:43", "sender":"43534:46s:4563" };
			var requiredtime={ "receiver":"33==:s433", "periods":"30==erwe:s43:433", "sender":"43534:45s6356:4563" };
			var Vollisttimenew="23:434s:34543";
			var partnerrefresh=0;
			var listupdated=[];
			var partnerrefreshrec=0;
			var oldcurrentinfo='dklfjd';
			var snapsel="";
			var pools = [];
			var status=0;
			var syscounter=10;
			var syscounter2=1000;
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
		$(".bg-success").hide();$(".bg-danger").hide();$(".bg-warning").hide();	
		$(".ref").click(function() {
					if($(this).attr('id')=="Login")
					{ 
						document.getElementById('Login'+'ref').submit();
						
					} else {
					document.getElementById($(this).attr('id')+'ref').submit();
					}
		 //console.log($(this).attr('id'));
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
						if(alltabsPool==2) { $(".pools").hide()}
						if(gdata[9].split('-')[1]!="true") { $(".userPrivlliges").hide(); $("#userPrivlliges").hide(); alltabsUP=1;} 
						if(gdata[16].split('-')[1]!="true") { $(".firmware").hide(); $("#firmware").hide(); alltabsUP=alltabsUP+1;}
						if(alltabsUP==2) { $(".config").hide()}
					
					});
				};
			};

			$("#deletePool").hide();$("#submitdiskgroup").hide();$("#passphrase").hide();$(".finish").hide();$("#SnapshotCreatediv").hide();
			

			function snaponce(txtin,but,altbut,comp){
				
						var chars=$(txtin).val().length;
						
						if ( chars < 3 ) {  $(but).show();$(comp).addClass("NotComplete")
												 $(altbut).hide();
						} else 					{	$(but).hide();
												 $(altbut).show();$(comp).removeClass("NotComplete")
						};
			};
			function refreshPartnerlist(listid,fileloc) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					partnernew=cdata.updated;
				});
				
				if(partnernew!=partner)
				{ 
					partner=partnernew;
					$(listid+' tr').remove();
					$(".partnervariable").remove();
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);

						
						$.each(jdata, function(i,v) {

							if(v.proxy=="true") {
							// $(listid).append($('<option>').text(v.name+" : "+v.type+" partner through proxy").val(v.name)); 
								$(listid).append("<tr><td class='text-center'>"+v.name+"</td><td class='text-center'>"+v.type+"</td><td class='text-center'><a href='javascript:DelPartner(\""+v.name+"\")'><img src='assets/images/delete.png' alt='can\'t upload delete icon'></a></td></tr>")
							} else {
								$(listid).append("<tr><td class='text-center'>"+v.name+"</td><td class='text-center'>"+v.type+"</td><td class='text-center'><a href='javascript:DelPartner(\""+v.name+"\")'><img src='assets/images/delete.png' alt='can\'t upload delete icon'></a></td></tr>")
							}
							if(status=="Senders"){ if(v.type=="Sender") {$("#partnercsend").append($('<option class="partnervariable">').text(v.name).val(v.name)); }}
							if(status=="Receivers"){ if(v.type=="Receiver") {$("#partnercrec").append($('<option class="partnervariable">').text(v.name).val(v.name)); }}
						});
					});
				}
			};

			function refreshProxy(listid,fileloc,showtime,listid2,listid3) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					replivalnew[showtime]=cdata.updated;
				});
			
				
				if(replival[showtime] != replivalnew[showtime])
				{ 
					
					replival[showtime]=replivalnew[showtime];

					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
					
						
						$.each(jdata, function(i,v) {
						 $('#'+listid).val(v[listid]); 
						 $('#'+listid2).val(v[listid2]);
						 $('#'+listid3).val(v[listid3]);
						});
					});
				}
			};

			
			function refreshReplicatelist(listid,fileloc,showtime,way) {
				
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var cdata=jQuery.parseJSON(data);
					replivalnew[showtime]=cdata.updated;
				});
				
				
				if(replival[showtime] != replivalnew[showtime])
				{ 
					
					replival[showtime]=replivalnew[showtime];
					$(listid+' option').remove();
					
					$.get("requestdata.php", { file: fileloc }, function(data){
						var jdata = jQuery.parseJSON(data);
					
						
						$.each(jdata, function(i,v) {

						if (v.type == way || v.type=="DualWay")
							 $(listid).append($('<option>').text(v.name).val(v.name)); 
					
						});
					});
				}
			};

			function refreshall() { //check pool status
		$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){
		if(data!=oldcurrentinfo && data != ''){linerfact=-1;oldcurrentinfo=data;  $(".bg-success").fadeIn(800); $("#texthere").text(data);$(".bg-success").fadeOut(8000);}
	});
				refreshPartnerlist("#Partnerlist","Data/Partnerslist.txt");
				if($("#partner").hasClass("active") && status !="Partners") {
					 status="Partners";
				//	$.get("requestdata2.php", { file: 'Data/Partnersstatus.log' }, function(data){ $("#Partnersstatus").val(data);});
					//refreshPartnerlist("#Partnerlist","Data/Partnerslist.txt");
				};
				if($(".Replicate").is(":visible")) {
					$.get("requestdata2.php", { file: 'Data/Replicatestatus.log' }, function(data){ $("#Replicatestatus").val(data);});
					refreshReplicatelist("#Partner","Data/Partnerslist.txt","receiver","receiver");
				};
				if($("#sender").hasClass("active") && status !="Senders") {
					
					  status="Senders";
					  partner="checkpartners";
					  listupdated["Volsend"]="newlist"
				//	$.get("requestdata2.php", { file: 'Data/Replicatestatus.log' }, function(data){ $("#Sendersstatus").val(data);});
					//refreshReplicatelist("#Partnersend","Data/Partnerslist.txt","sender","sender");
				};
				if($("#receiver").hasClass("active") && status !="Receivers") {
					
					  status="Receivers";
					 partner="checkpartners";
					  snaponce("#Oncename","#shortname","#goodname","#Oncename");
					  listupdated["Volrec"]="newlist"
				//	$.get("requestdata2.php", { file: 'Data/Replicatestatus.log' }, function(data){ $("#Sendersstatus").val(data);});
					//refreshReplicatelist("#Partnersend","Data/Partnerslist.txt","sender","sender");
				};
				if($(".Proxy").is(":visible")) {
					$.get("requestdata2.php", { file: 'Data/Proxystatus.log' }, function(data){ $("#Proxystatus").val(data);});
					
					
				};
				
			
				if(status==3) { 
					
					$.get("requestdata.php", { file: "Data/poolstatus.txt" },function(data){
						var jdata = jQuery.parseJSON(data);	
						if(jdata.status=="ok") {
							$("#"+jdata.raid).attr("checked","checked");
							$(".radiocontrol").attr("disabled",true);
							$("#deletePool").show();$("#submitdiskgroup").hide();
						} else {
							$(".radiocontrol").attr("disabled",false);
							$("#deletePool").hide();$("#submitdiskgroup").show();
						}
						status=1;
					});
				}
				if(status=="Receivers"){ //Replicate
					
					refreshList2("GetPoolVollist","#Volrec","Data/Vollist.txt","Volrec");
					refreshList4("GetSnaplist",".Snaplist","Data/listsnaps.txt","receiver","#Volrec","listsnaps");
					if(partnerrefreshrec==0) { Partnerrecchange();}
					refreshList4("RemoteGetPoolperiodlist","#all","Data/Remoteperiodlist.txt","periods","#Volrec","periods");
					if($("#snapshotsOnce").hasClass('active'))  { ;if (snapsel !="Once") {times["receiver"]="hithihi"; syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Once";}};
					if($("#snapshotsHourly").hasClass('active'))  { ;if (snapsel !="Hourly") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Hourly";}};
					if($("#snapshotsMinutely").hasClass('active'))  { ;if (snapsel !="Minutely") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Minutely";}};
					if($("#snapshotsWeekly").hasClass('active'))  { ;if (snapsel !="Weekly") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Weekly";}};			
					$("#Partner").change(); 
				}
				if(status=="Senders"){ //Replicate
					refreshList2("GetPoolVollist","#Volsend","Data/Vollist.txt","Volsend");
					refreshList4("GetSnaplist","#Senderslist","Data/listsnaps.txt","sender","#Volsend","listsnaps");
					if(partnerrefresh==0) { Partnersendchange();}
				
					
				
				}
			    
				if(syscounter2==1000) { syscounter2=0; ; } else { syscounter2=syscounter2+1; }
			}
				
			
	function refreshList4(req,listid,fileloc,showtime,voll,update) {
				if ($.inArray(update,listupdated) < 0 ) {
										listupdated.push(update);
										listupdated[update]="hello first time"
							} 
				if(syscounter2==1000){$.post("./pump.php", { req: req, name:"a" }, function (data1){});};
					$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					requiredtime[showtime]=objdate.updated;
					
				});
				if(requiredtime[showtime] != listupdated[update]) {  
					
					listupdated[update]=requiredtime[showtime];
					//$(listid+" tr.variable").remove();
					
					$.get("requestdata.php", { file: fileloc }, function(data){
						
						var gdata = jQuery.parseJSON(data);
						
						$("."+update).remove();
						$(".variable"+"."+update).remove();
						
						;
						
						for (var prot in gdata){
					
								
								if(showtime =="receiver") {
									var receiver=gdata[prot].receiver;
									receiver=receiver.replace(/\./g,"");
									$(listid).append('<tr class="variable '+update+' '+gdata[prot].class+' '+gdata[prot].father+' '+receiver+' '+'"><td class="text-center">'+gdata[prot].onlyname+"</td><td class='text-center'>"+gdata[prot].creation+ " "+ gdata[prot].time+"</td><td class='text-center'>"+gdata[prot].name+'</td><td class="text-center"><a href="javascript:SnapshotDelete(\''+gdata[prot].name+'\')"><img src="assets/images/delete.png"</td><td class="text-center"><a href="javascript:SnapshotRollback(\''+gdata[prot].name+'\')"><img src="assets/images/return.png" alt="can\'t upload delete icon"></a></td></tr>');
									$("."+update).hide();
									}
								if(showtime=="sender") {
									var sender=gdata[prot].sender;
									sender=sender.replace(/\./g,"");
										$(listid).append('<tr class="variable '+update+' '+gdata[prot].class+' '+gdata[prot].father+' '+sender+' '+'"><td class="text-center">'+gdata[prot].onlyname+"</td><td class='text-center'>"+gdata[prot].creation+ " "+ gdata[prot].time+"</td><td class='text-center'>"+gdata[prot].name+'</td><td class="text-center"><a href="javascript:SnapshotDelete(\''+gdata[prot].name+'\')"><img src="assets/images/delete.png"</td><td class="text-center"><a href="javascript:SnapshotRollback(\''+gdata[prot].name+'\')"><img src="assets/images/return.png" alt="can\'t upload delete icon"></a></td></tr>');
									$("."+update).hide();
								//	$(listid).append($('<option class="variable '+update+' '+gdata[prot].pool+' '+gdata[prot].father+' '+sender+' '+'">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								}

								if (showtime=="periods" ) {
									
									var partner=gdata[prot].partner;
									console.log("partner",partner,gdata);
									partner=partner.replace(/\./g,"");
									
									switch (gdata[prot].period) {
										case "hourly": $("#Hourlylist").append('<tr class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+partner+' "><td class="text-center">'+gdata[prot].t3+"</td><td class='text-center'>"+gdata[prot].t2+ "</td><td class='text-center'>"+ gdata[prot].t1+"</td><td class='text-center'>"+gdata[prot].stamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+gdata[prot].stamp+"\")'><img src='assets/images/delete.png'</td></tr>");	 break;
										case "Minutely": $("#Minutelylist").append('<tr class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+partner+'"><td class="text-center">'+gdata[prot].t2+"</td><td class='text-center'>"+gdata[prot].t1+"</td><td class='text-center'>"+gdata[prot].stamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+gdata[prot].stamp+"\")'><img src='assets/images/delete.png'</td></tr>");	 break;
										case "Weekly" : $("#Weeklylist").append('<tr class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+partner+'"><td class="text-center">'+gdata[prot].t4+"</td><td class='text-center'>"+gdata[prot].t2+":"+gdata[prot].t3+"</td><td class='text-center'>"+gdata[prot].t1+"</td><td class='text-center'>"+gdata[prot].stamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+gdata[prot].stamp+"\")'><img src='assets/images/delete.png'</td></tr>");	 break;
									}
								}
									
							;//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
							
						}
						;
					});
					//if (showtime == "sender" ) { Partnersendchange() } else { Partnerrecchange() }	
				};
				
			};
				function refresh2(textareaid) {
				
				$.get("statuslog.php", { file: 'Data/'+textareaid+'.log' }, function(data){
					$('#'+textareaid).val(data);
					});
			}	;
		
			
			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".Partners").hide(); $(".Replicate").hide(); $(".Sendersc").hide();$(".Proxy").hide();$(".finish").hide();
			$("#Partners").click(function (){
				var userpriv="false";
				
					var curuser=myname;
				$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user==myname) {
							userpriv=gdata[prot].Partners
						}
					};
				
					if( userpriv=="true" | curuser=="admin" ) { 
					 config= 0; $("h2").css("background-image","url('img/Partners.png')").text("Partners"); status="Partners"; $(".ullis").hide();$(".finish").show(); $(".Partners").show(); partner="2432334";
					}
				});
			});
			$("#Receiver").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser=myname;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
								userpriv=gdata[prot].Replication
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="Receivers"; $("h2").css("background-image","url('img/receivers.png')").text("Replicate");  $("option.variable").remove(); Vollisttime="44:3133:22";times= { "receiver":"331==:433", "periods":"30==erwe1:43:43", "sender":"435341:456356:563"};$(".ullis").hide(); $(".finish").show(); $(".Replicate").show();replival={ "receiver":"33=1=:433", "periods":"30==e1rwe:43:43", "sender":"435341:456356:563", "Proxy":"32442ewrwe"};
						}
					});
				};
			});
			$("#Senders").click(function (){ 
				if(config== 1){ 
					var userpriv="false";
					var curuser=myname;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
								userpriv=gdata[prot].Senders
							}
						};
					
						if( userpriv=="true" | curuser=="admin" ) { 
							config = 0; status="Senders"; $("h2").css("background-image","url('img/senders.png')").text("Senders");  $("option.variable").remove(); ;times= { "receiver":"33=e33", "periods":"30==erwe3e:433", "sender":"43534:456:45e63" };$(".ullis").hide();$(".finish").show(); $(".Sendersc").show();replival={ "receiver":"33==e:433", "periods":"30==erwe:e43:43", "sender":"43534:4e56356:563", "Proxy":"3242ewr5we"};Vollisttime="44:333:sedfsd";
						}
					});
				};
			});
			$("#Proxy").click(function (){ 
							if(config== 1){
								 
								var userpriv="false";
					var curuser=myname;
								$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
									var gdata = jQuery.parseJSON(data);
									for (var prot in gdata){
										if(gdata[prot].user==myname) {
											userpriv=gdata[prot].Proxylic
										}
									};
								
									if( userpriv=="true" | curuser=="admin" ) { 
										config = 0; status="Proxy"; $("h2").css("background-image","url('img/senders.png')").text("Proxy License");  $("option.variable").remove(); ;times= { "receiver":"33=f33", "periods":"30==erwe3:4f33", "sender":"43534:456:4563" };$(".ullis").hide();$(".finish").show(); $(".Proxy").show();replival={ "receiver":"33==:4f33", "periods":"30==erwe:4f3:43", "sender":"43534:456f356:563", "Proxy":"3242efwrwe"};Vollisttime="44:333:sdfsd";
										refreshProxy("License","Data/Proxylist.txt","Proxy","Proxyurl","Alias");
									}
								});
							};
						});

			$(".finish").click(function (){ 
				config = 1; status=0; $(".Partners").hide(); $(".Replicate").hide(); $(".Sendersc").hide();$(".ullis").show();$(".finish").hide(); $(".Proxy").hide()});
			
			
			
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
				var selection=$("#Vol option:selected").val();
					$('#Partner option.'+selection+':first').prop('selected', true);
					$('#Partner').change();
				
				//$(" tr.variable").remove();
				
			});
			$("#Pool").change(function () {
				var selection=$("#Pool option:selected").val();
				$(".pvariable").hide();
				$(".vvariable").hide();
				$("."+selection).show();
				$('#Vol option.'+selection+':first').prop('selected', true);
				$('#Vol').change();
				//$('#Volsend').change();
		
			});
			$("#Poolsend").change(function () {
				var selection=$("#Poolsend option:selected").val();
				$(".pvariable").hide();
				$(".vvariable").hide();
				$("."+selection).show();
				$('#Volsend option.'+selection+':first').prop('selected', true);
				$('#Volsend').change();
				//$('#Volsend').change();
		
			});
			$("#Poolrec").change(function () {
				var selection=$("#Poolrec option:selected").val();
				$(".pvariable").hide();
				$(".vvariable").hide();
				$("."+selection).show();
				$('#Volrec option.'+selection+':first').prop('selected', true);
				$('#Volrec').change();
				//$('#Volsend').change();
		
			});
			$("#Volsend").change(function() {
				//Vollisttime="44:333:222";
				//var selection=$("#Volsend option:selected").val();
					//$('#Partnersend option.'+selection+':first').prop('selected', true);
					Partnersendchange();
				
			});
			$("#Volrec").change(function() {
				//Vollisttime="44:333:222";
				var selection=$("#Volrec option:selected").val();
					//$('#Partnersend option.'+selection+':first').prop('selected', true);
					Partnerrecchange();
				
			});
			$("#Partner").change(function() {
				var selection=$("#Partner option:selected").val();
				selection=selection.replace(/\./g,"");
				//Vollisttime="44:333:222";
				//times= { "snaps":"3df33", "periods":"30==e43:467833", "sender":"435ddf34:46:4563" };
				$(".variable").hide();
				$("."+$("#Vol").val()+"."+$("#Pool option:selected").text()+"."+selection).show();
			
				//	$("."+selection+"."+$("#Vol").val()+"."+$("#Pool").val()).show();
					
					
					//$(" tr.variable").remove();
				
			});	
			$("#partnercsend").change(function(){ Partnersendchange();});
			function Partnersendchange() {
				var selection1="hiall";
				selection1=$("#partnercsend").val()
				var selection="nopoolvolumeorpartner";
					$(".variable").hide();
			
				if($("#Volsend").val()!=null && $("#Poolsend").val()!=null && selection1 !=null){
					partnerrefresh=1;
				selection=selection1.replace(/\./g,""); 
				$("."+selection+"."+$("#Volsend").val()+"."+$("#Poolsend").val()).show();
				console.log("volsend",$("#Volsend").val())
			} else { partnerrefresh=0;listupdated["Volsend"]= "updateme"
			}
			};	
			$("#partnercrec").change(function(){ Partnerrecchange();});
			function Partnerrecchange() {
				var selection1="hiall";
				selection1=$("#partnercrec").val()
				var selection="nopoolvolumeorpartner";
				
				$(".variable").hide();
				
				if($("#Volrec").val()!=null && $("#Poolrec").val()!=null && selection1 !=null){
					partnerrefreshrec=1;
				selection=selection1.replace(/\./g,""); 
				$("."+selection+"."+$("#Volrec").val()).show();
				console.log("."+selection+"."+$("#Volrec").val()+".")
				} else { partnerrefreshrec=0;listupdated["Volrec"]= "updateme"
			}
				
			}
		
		$("#Proxy").change(function() { if($("#Proxy").is(":checked") == true ) {
				$.get("requestport.php", function(data){
					$("#Port").val(data); 
			  });
				$("#passphrase").show(); 
				} else {$("#passphrase").hide(); $("#Port").val("<?php echo rand(15000,16000) ?>");} 
			});
		function AddPartner(){ $.post("./pump.php", { req:"PartnerAdd", name:$('#Partn').val()+" "+$('#type').val()+" "+$("#Proxy").is(":checked")+" "+$("#Pass").val()+" "+$("#Port").val()+" "+myname });
	 };
	 
		$("#AddLicense").click( function (){ $.post("./pump.php", { req:"LicenseAdd", name:$('#License').val()+" "+myname });
	 });

		$("#AddProxy").click( function (){ $.post("./pump.php", { req:"ProxyAdd", name:$('#Proxyurl').val()+" "+myname });
	 });
	 function AddAlias(){ $.post("./pump.php", { req:"AliasAdd", name:$('#Alias').val()+" "+myname });
	 };

		$("#DelPartner").click( function (){ $.post("./pump.php", { req:"PartnerDel", name:$("#Partnerlist").val()+" "+myname });
		});
		
		function DelPartner(k){ $.post("./pump.php", { req:"PartnerDel", name:k+" "+myname });
		};

			
		$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotDelete", name:$("#Pool").val()+" "+$("#Replicatelist option:selected").val()+" "+myname }, function (data){
				 });
			});
		$("#DeleteSnapshotsend").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotDelete", name:$("#Pool").val()+" "+$("#Senderslist option:selected").val()+" "+myname}, function (data){
				 });
			});
		
		$("#RollbackSnapshotsend").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotRollback", name:$("#Pool").val()+" "+$("#Senderslist option:selected").val()+" "+myname }, function (data){
				 
				 });
			});	
		$("#RollbackSnapshot").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotRollback", name:$("#Pool").val()+" "+$("#Replicatelist option:selected").val()+" "+myname}, function (data){
				 
				 });
			});	

		$("#DeleteHourly").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotPeriodDelete", name:$("#Hourlylist option:selected").val()+" "+myname }, function (data){
				 refresh2("Replicatestatus"); 
				 });
			});
		$("#DeleteMinutely").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotPeriodDelete", name:$("#Minutelylist option:selected").val()+" "+myname }, function (data){
				 refresh2("Replicatestatus"); 
				 });
			});
		$("#DeleteWeekly").click( function (){ $.post("./pump.php", { req:"RemoteSnapShotPeriodDelete", name:$("#Weeklylist option:selected").val()+" "+myname }, function (data){
				 refresh2("Replicatestatus"); 
				 });
			});
		function SnapshotCreate(){ 
				var period=$('input[name=Period]:checked').val();
				
				var oper="";
				switch(snapsel) {
					case "Once" : oper = $("#Oncename").val();  break;
					case "Hourly": oper = $("#Sminute").val()+" "+$("#Hour").val()+" "+$("#KeepHourly").val(); break;
					case "Minutely": oper = $("#Minute").val()+" "+$("#KeepMinutely").val(); break;
					case "Weekly" : oper = $("#Stime").val()+" "+$("#Week").val()+" "+$("#KeepWeekly").val(); break;
				}
				oper =oper+" "+$("#Poolrec").val()+" "+$("#Volrec").val();
				console.log("period",oper,$("#partnercrec").val(),snapsel)
				
				$.post("./pump.php", { req:"RemoteSnapshotCreate"+snapsel, name: oper+" "+$("#partnercrec").val()+" "+myname }, function (data){
				 refresh2("Snapsstatus"); 
				 });
			};
		
		$("#Oncename").keyup(function(){
				snaponce("#Oncename","#disableddiv","#SnapshotCreatediv");
		});
			
			
            function SnapshotDelete(k){console.log("highere",k); $.post("./pump.php", { req:"SnapShotDelete", name:$("#Poolsend").val()+" "+k+" "+myname }, function (data){
				 status="refresh"	
				 });
		};
		function SnapshotRollback(k){ $.post("./pump.php", { req:"SnapShotRollback", name:$("#Poolsend").val()+" "+k+" "+myname }, function (data){
				 status="refresh"	
				 });
			};	

            function refreshList2(req,listid,fileloc,update) {
				
				var request=req;
				if ($.inArray(update,listupdated) < 0 ) {
										listupdated.push(update);
										listupdated[update]="hello first time"
							} 
				
				 
				if(syscounter2==1000){$.post("./pump.php", { req: request, name:"a" }); }
				$.get("requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;
					
				});
				if(listupdated[update] != Vollisttimenew) { 
					listupdated[update]=Vollisttimenew;
					$.get("requestdata.php", { file: fileloc }, function(data){
						var gdata = jQuery.parseJSON(data);
							partnerrefresh=0;
							partnerrefreshrec=0;
							$(listid+' option').remove();
							$(listid+' tr').remove();
							$(".pvariable").remove();
							$(".variable2").remove();
							$(".variable2send").remove();
							$(".variable2rec").remove();
							chartdata=[];
							for (var prot in gdata){

									if ($.inArray(gdata[prot].Pool,pools) < 0 ) {
										pools.push(gdata[prot].Pool);
										$("#Pool").append($('<option class="variable2">').text(gdata[prot].uPool).val(gdata[prot].uPool));
										$("#Poolsend").append($('<option class="variable2send">').text(gdata[prot].uPool).val(gdata[prot].class));
										$("#Poolrec").append($('<option class="variable2rec">').text(gdata[prot].uPool).val(gdata[prot].class));
										
									}
									
									
									
									$(listid).append($('<option class="pvariable '+gdata[prot].class+'" >').text(gdata[prot].name).val(gdata[prot].name));
									
								}
							
							
							pools = [];

						});
					if (listid == "Volsend" ) { $("#Poolsend").change() } else { $("#Poolrec").change() }	;
				};
		
			}
			function SnapshotPeriodDelete(k){ $.post("./pump.php", { req:"RemoteSnapShotPeriodDelete", name:k+" "+myname}, function (data){
				 partnerrefresh=0;
				 });
			};
			function SnapshotCreate2(){ 
				var period=$('input[name=Period]:checked').val();
				
				var oper="";
				switch(snapsel) {
					case "Once" : oper = $("#Oncename").val();  break;
					case "Hourly": oper = $("#Sminute").val()+" "+$("#Hour").val()+" "+$("#KeepHourly").val(); break;
					case "Minutely": oper = $("#Minute").val()+" "+$("#KeepMinutely").val(); break;
					case "Weekly" : oper = $("#Stime").val()+" "+$("#Week option:selected").val()+" "+$("#KeepWeekly").val(); break;
				}
				oper =oper+" "+$("#Pool option:selected").val()+" "+$("#Vol option:selected").val();
				console.log(oper,snapsel);
				$.post("./pump.php", { req:"SnapshotCreate"+snapsel, name: oper+" "+myname }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();	
				 });
			};
		
		$("#Oncename").keyup(function(){
				snaponce("#Oncename","#shortname","#goodname","#Oncename.form-control");
		});
		$("#Stime").change(function() {
			if($("#Stime").val()=="") {
				$("#Stime").addClass("NotComplete");
			} else {
				$("#Stime").removeClass("NotComplete");	
			}
			
			
		});
		
		$("#Oncename").keyup(function(){
				snaponce("#Oncename","#shortname","#goodname","#Oncename.form-control");
		});
		$("#Stime").change(function() {
			if($("#Stime").val()=="") {
				$("#Stime").addClass("NotComplete");
			} else {
				$("#Stime").removeClass("NotComplete");	
			}
			
			
		});
		

			setInterval("refreshall()",500);
			$.post("./pump.php", { req:"Partnerslist" });
			//$.post("./pump.php", { req: "GetPoolperiodlist", name:"a" });
			$.post("./pump.php", { req: "GetPoolVollist", name:"a" });
			$.post("./pump.php", { req: "GetSnaplist", name:"a" });
			function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivPartners="false"; var userprivReplicate="false";var userprivSenders="false"; var userprivProxy="false";
					var curuser=myname;
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user==myname) {
										userprivPartners=gdata[prot].Partners;
										userprivReplicate=gdata[prot].Replication;
										userprivSenders=gdata[prot].Senders;
										userprivProxy=gdata[prot].Proxylic;
										
									}
								};
									
								if( userprivPartners =="true") { $("#Partners").show(); } else { $("#Partners").hide(); } ; if( userprivReplicate =="true") { $("#Replicate").show(); } else { $("#Replicate").hide(); };;
								if( userprivSenders =="true") { $("#Senders").show(); } else { $("#Senders").hide(); }; if( userprivProxy =="true") { $("#Proxy").show(); } else { $("#Proxy").hide(); };
						});
					}
					$(".ullis").show();
			}
		}
		$("#close-success").click(function() { $(".bg-success").hide(); });
		SS();
		</script>

</body>
</html>

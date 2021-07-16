<!DOCTYPE html>
<html lang="en">
<?php ?>
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
    <link href="assets/css/bootstrap-select.min.css" rel="stylesheet" type="text/css">
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
                    <span><img src="assets/images/user-icon.png"> </span><strong><span id="usrnm">myname</span></strong>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item ref" href="#" id="pass">Change Password</a>
                    <a class="dropdown-item ref" href="#" id="Login">Logout</a>
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
                    <a class="ref nav-link ref active" id="accounts" data-toggle="tab" href="#" role="tab">
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
                        Volumes</a>
                </li>
                <li class="nav-item replication">
                    <a class="nav-link ref" href="#" id="replication" role="tab">
                        <div></div>
                        Replication</a>
                </li>
                <li class="nav-item pools">
                    <a class=" ref nav-link" id="pools"  href="#" role="tab">
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
                                <span>User Accounts</span></a>
                        </li>
                        <li id="navUnGrp" class="nav-item boxGroups">
                            <a class="nav-link" data-toggle="tab" href="#boxGroups" role="tab">
                                <div></div>
                                <span>Group Accounts</span></a>
                        </li>
                        <li id="navboxProperties" class="nav-item boxProperties">
                            <a class="nav-link" data-toggle="tab" href="#boxProperties" role="tab">
                                <div></div>
                                <span>System properties</span></a>
                        </li>
			<li id="navCluster" class="nav-item Cluster">
                            <a class="nav-link" data-toggle="tab" href="#Cluster" role="tab">
                                <div></div>
                                <span>Cluster nodes</span></a>
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
                            <button type="button" id="ADsubmit" class="btn btn-submit col-3" style="cursor: pointer;">Join Domain</button>
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
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Home Pool</label>
                            <div class="col-2">
				<select id="UserVol" class="form-control">
				 <option value='NoHome'>----</option>
				</select>
                            </div>
                                <label class="col-1 col-form-label">Size(GB)</label>
                            <div class="col-1">
                                <input id="volsize" min="1" class="form-control" type="number" value="1">
                            </div>
                        </div>
			<div class="form-group row">
                            <label class="col-2 col-form-label"> HomeAddress</label>
                            <div class="col-2">
                                <input id="HomeAddress" class="form-control ip_address" type="text"  value="196.172.8.20">
                            </div>
                            <label class="col-1 col-form-label">Subnet</label>
                            <div class="col-1">
                                <input id="HomeSubnet" class="form-control" type="number"  min="0" max="32" value="24" step=8>
                            </div>
                       </div>
                        <div class="form-group row">
                        	
                            <label class="col-2 col-form-label">Allowed Groups</label>
                            <div class="col-5">
                                <select id="Usergroups" title="No Group" data-actions-box="true" data-live-search="true" class="form-control selectpicker grp" data-size="3" multiple>
				 <option value="hi">grp1</option>
				 <option value="by" >grp2</option>
				 <option value="ddfka">grp3</option>
                                </select>
                            </div>
                         
                        </div>
 
                        <div class="">
                            <button id="UnixAddUser" type="button" class="btn btn-submit col-3" style="cursor: pointer;">Add User</button>
                        </div>
                    </form>
                    <h1>Users List:</h1>
                    <div class=" table-responsive">
                        <table class=" table  dr-table-show">
                            <thead>
                            <tr>
                                <th style="width:25%;">User Name</th>
                                <th style="width: 10%;">Home Pool</th>
                                <th style="width: 5%;">Quota</th>
                                <th style="width:25%;">Users in Group</th>
                                <th class="text-center" style="width: 20%">Need Update</th>
                                <th style="width: 5%;">Change Password</th>
                                <th style="width: 5%;" class="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody  id="UserList">
                            <tr>
                                <td class="col-2"></td>
                                <td class="text-center"><a href="#" data-toggle="modal" data-target="#userEditing"><img src="assets/images/edit.png"
                                                                         alt="can't upload edit icon"></a></td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-2"></td>
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
                <div class="tab-pane Ungroup " id="boxGroups" role="tabpanel">
                    <form class="dr-form" role="form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Group</label>
                            <div class="col-5">
                                <input id="Group" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group row">
                        	
                            <label class="col-2 col-form-label">Allowed Users</label>
                            <div class="col-5">
                                <select id="Groupusers" title="No User" data-actions-box="true" data-live-search="true" class="form-control selectpicker grp" data-size="3" multiple>
				 <option value="hi">grp1</option>
				 <option value="by" >grp2</option>
				 <option value="ddfka">grp3</option>
                                </select>
                            </div>
                         
                        </div>
 
                        <div class="form-group row">
                            <button id="UnixAddGroup" type="button" class="btn btn-submit col-3" style="cursor: pointer;">Add Group</button>
                        </div>
                    </form>
                    <h1>Group List:</h1>
                    <div class=" table-responsive">
                        <table class="table  dr-table-show">
                            <thead>
                            <tr>
                                <th style="width:25%;">Group Name</th>
                                <th style="width:25%;">Users in Group</th>
                                <th class="text-center" style="width: 20%">Need Update</th>
                                <th style="width: 15%;" class="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody  id="GroupList">
                            <tr>
                                <td class="col-2"></td>
                                <td class="text-center"><a href="#"><img src="assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
		<div class="tab-pane Future" id="Cluster" role="tabpanel"> 


            <div class="chec-radioc">
            	<div class="pzc row" style='margin-bottom: 1rem; margin-top: 1rem;'>
            		<div class='col-12'>           			
                        <h3><strong>Running Nodes</strong></h3>
            		</div>	
                </div>
            	<div class='row' id='Rhosts' style="padding-left: 1rem;">
            		<a id="s1" class='rhosts col-2'>
                        <img style="margin-bottom: 3.4rem;"  class="server" src="assets/images/Server1-On.png" />
                        <p id="ps1" class="psize">Server1</p>
                    </a>
                </div>
                <div  class="row" >
                    <button disabled  type="button" id="RhostForget" href="javascript:rhostforget()" style="margin-bottom: 1rem; margin-top: 1rem;cursor: pointer;"class="btn btn-warning offset-3 col-6" >Forget selected Host
                    </button>

                </div>
                <div class='row'>
                    <div class='col-12'>
                        <hr></hr>
                    </div>
                </div>
                <div class="pzc row" style='margin-bottom: 2rem; margin-top: 1rem;'>
                    <div class='col-12'>                    
                        <h3><strong>Discovered Nodes</strong></h3>
                    </div> 
                </div> 
                <div class='row' id='Dhosts' style="padding-left: 1rem;">
                    <a class='dhosts col-2'>
                        <img style="margin-bottom: 3.4rem;"  class="server" src="assets/images/Server1-On.png" />
                        <p id="ps1" class="psize">Server1</p>
                    </a>
                </div>
                <div  class="row" >
                    <button   disabled type="button" id="DhostAdd"  style="margin-bottom: 1rem; margin-top: 1rem;cursor: pointer;"class="btn btn-warning offset-3 col-6" >Add discovered Host
                    </button>
                </div>
            </div>
		</div>
                 
                <div class="tab-pane Future" id="boxProperties" role="tabpanel"> 
                 
                    <form class="dr-form">
                        <div id="hostlist" class="form-group row">
                        </div>
                        <div class="form-group row">
                            
                            <label class="form-check-label col-form-label-lg col-4" >
                                &nbsp <strong>Can join a running cluster</strong><div style="font-size: 0.8rem; margin-top: -1.5rem;color: red"><br >(will ignore cluster configuration and will reboot)</div>
                            </label>
                            <div class="form-check  col-5" >
                                <input class="form-check-input form-control-lg " type="checkbox" value="no" id="isconfigured" style="transform: scale(2.5);">
                                
                            </div>
                        </div>
                        <div class="form-group row">
			
                            <label class="col-2 col-form-label">Unit Name</label>
                            <div class="col-5">
                                <input id="BoxName" class="form-control" type="text">
                            </div>
                           
                            <div class="alert alert-dismissible alert-info col-2" style="max-width:13.5%;margin-bottom:0;">
                                <strong id="cBoxName">...</strong>
                            </div>
                          
                            
                        </div>
                       
                        
                        <div class="form-group row">
                            <label class="col-2 col-form-label"> Unit Address<div style="font-size: 0.8rem; margin-top: -1.5rem;color: red"><br >(will reboot)</div></label>
                            <div class="col-2">
                                <input id="IPAddress" class="form-control ip_address" type="text"  >
                            </div>
                            <label class="col-1 col-form-label">Subnet</label>
                            <div class="col-2">
                                <input class="form-control" type="number" id="Subnet" min="0" max="32" value="24" step=8>
                            </div>
                            <div class="alert alert-dismissible alert-info col-2" style="max-width:13.5%;margin-bottom:0;">
                  <strong id="cIPAddress">...</strong><strong>/</strong><strong id="cSubnet"></strong>
                      </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Cluster Management Address</label>
                            <div class="col-2">
                                <input id="Mgmt" class="form-control ip_address" type="text"  >
                            </div>
                            <label class="col-1 col-form-label">Subnet</label>
                            <div class="col-2">
                                <input class="form-control" type="number" id="MgmtSub" min="8" max="32" value="24" step=8>
                            </div>
                            <div class="alert alert-dismissible alert-info col-2" style="max-width:13.5%;margin-bottom:0;">
                  <strong id="cMgmt">...</strong>
                      </div>
                        </div>
                          <div class="form-group row">
                            <label class="col-2 col-form-label">Time Zone</label>
                            <div class="col-4">
<select id="TZ" class="form-control">
	<option city='0' timeZoneId="-1" value="-100"> Change if needed </option> 
	<option city='Chatham' timeZoneId="1" gmtAdjustment="GMT-12:00" useDaylightTime="0" value="-12">(GMT-12:00) International Date Line West</option>
	<option city='Midway' timeZoneId="2" gmtAdjustment="GMT-11:00" useDaylightTime="0" value="-11">(GMT-11:00) Midway Island, Samoa</option>
	<option city='kirit' timeZoneId="3" gmtAdjustment="GMT-10:00" useDaylightTime="0" value="-10">(GMT-10:00) Hawaii</option>
	<option city='Gambier' timeZoneId="4" gmtAdjustment="GMT-09:00" useDaylightTime="1" value="-9">(GMT-09:00) Alaska</option>
	<option city='Anchorage' timeZoneId="5" gmtAdjustment="GMT-08:00" useDaylightTime="1" value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
	<option city='Tijuana' timeZoneId="6" gmtAdjustment="GMT-08:00" useDaylightTime="1" value="-8">(GMT-08:00) Tijuana, Baja California</option>
	<option city='Whitehorse' timeZoneId="7" gmtAdjustment="GMT-07:00" useDaylightTime="0" value="-7">(GMT-07:00) Arizona</option>
	<option city='Whitehorse' timeZoneId="8" gmtAdjustment="GMT-07:00" useDaylightTime="1" value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
	<option city='Whitehorse' timeZoneId="9" gmtAdjustment="GMT-07:00" useDaylightTime="1" value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
	<option city='Yello' timeZoneId="10" gmtAdjustment="GMT-06:00" useDaylightTime="0" value="-6">(GMT-06:00) Central America</option>
	<option city='Yello' timeZoneId="11" gmtAdjustment="GMT-06:00" useDaylightTime="1" value="-6">(GMT-06:00) Central Time (US & Canada)</option>
	<option city='Yello' timeZoneId="12" gmtAdjustment="GMT-06:00" useDaylightTime="1" value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
<option city='Yello' timeZoneId="13" gmtAdjustment="GMT-06:00" useDaylightTime="0" value="-6">(GMT-06:00) Saskatchewan</option>
<option city='Lima' timeZoneId="14" gmtAdjustment="GMT-05:00" useDaylightTime="0" value="-5">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
	<option city='Lima' timeZoneId="15" gmtAdjustment="GMT-05:00" useDaylightTime="1" value="-5">(GMT-05:00) Eastern Time (US & Canada)</option>
	<option city='Lima' timeZoneId="16" gmtAdjustment="GMT-05:00" useDaylightTime="1" value="-5">(GMT-05:00) Indiana (East)</option>
	<option city='Detro' timeZoneId="17" gmtAdjustment="GMT-04:00" useDaylightTime="1" value="-4">(GMT-04:00) Atlantic Time (Canada)</option>
	<option city='Detro' timeZoneId="18" gmtAdjustment="GMT-04:00" useDaylightTime="0" value="-4">(GMT-04:00) Caracas, La Paz</option>
	<option city='Detro' timeZoneId="19" gmtAdjustment="GMT-04:00" useDaylightTime="0" value="-4">(GMT-04:00) Manaus</option>
	<option city='Detro' timeZoneId="20" gmtAdjustment="GMT-04:00" useDaylightTime="1" value="-4">(GMT-04:00) Santiago</option>
	<option city='Buen' timeZoneId="22" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Brasilia</option>
	<option city='Buen' timeZoneId="23" gmtAdjustment="GMT-03:00" useDaylightTime="0" value="-3">(GMT-03:00) Buenos Aires, Georgetown</option>
	<option city='Buen' timeZoneId="24" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Greenland</option>
	<option city='Buen' timeZoneId="25" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Montevideo</option>
	<option city='Verde' timeZoneId="27" gmtAdjustment="GMT-01:00" useDaylightTime="0" value="-1">(GMT-01:00) Cape Verde Is.</option>
	<option city='Verde' timeZoneId="28" gmtAdjustment="GMT-01:00" useDaylightTime="1" value="-1">(GMT-01:00) Azores</option>
	<option city='Casa' timeZoneId="29" gmtAdjustment="GMT+00:00" useDaylightTime="0" value="0">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
	<option city='Casa' timeZoneId="30" gmtAdjustment="GMT+00:00" useDaylightTime="1" value="0">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
	<option city='Berl' timeZoneId="31" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
	<option city='Berl' timeZoneId="32" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
	<option city='Berl' timeZoneId="33" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
	<option city='Berl' timeZoneId="34" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
	<option city='Berl' timeZoneId="35" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) West Central Africa</option>
	<option city='Amman' timeZoneId="36" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Amman</option>
	<option city='Amman' timeZoneId="37" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
	<option city='Amman' timeZoneId="38" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Beirut</option>
	<option city='Amman' timeZoneId="39" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Cairo</option>
	<option city='Amman' timeZoneId="40" gmtAdjustment="GMT+02:00" useDaylightTime="0" value="2">(GMT+02:00) Harare, Pretoria</option>
	<option city='Amman' timeZoneId="41" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
	<option city='Amman' timeZoneId="42" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Jerusalem</option>
	<option city='Amman' timeZoneId="43" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Minsk</option>
	<option city='Amman' timeZoneId="44" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Windhoek</option>
	<option city='Kuw' timeZoneId="45" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
	<option city='Kuw' timeZoneId="46" gmtAdjustment="GMT+03:00" useDaylightTime="1" value="3">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
	<option city='Kuw' timeZoneId="47" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Nairobi</option>
	<option city='Kuw' timeZoneId="48" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Tbilisi</option>
	<option city='Tehr' timeZoneId="49" gmtAdjustment="GMT+03:30" useDaylightTime="1" value="3.5">(GMT+03:30) Tehran</option>
	<option city='Dubai' timeZoneId="50" gmtAdjustment="GMT+04:00" useDaylightTime="0" value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
	<option city='Dubai' timeZoneId="51" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Baku</option>
	<option city='Dubai' timeZoneId="52" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Yerevan</option>
	<option city='Kab' timeZoneId="53" gmtAdjustment="GMT+04:30" useDaylightTime="0" value="4.5">(GMT+04:30) Kabul</option>
	<option city='Yekat' timeZoneId="54" gmtAdjustment="GMT+05:00" useDaylightTime="1" value="5">(GMT+05:00) Yekaterinburg</option>
	<option city='Yekat' timeZoneId="55" gmtAdjustment="GMT+05:00" useDaylightTime="0" value="5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
	<option city='Kol' timeZoneId="56" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
	<option city='Kol' timeZoneId="57" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
	<option city='Kath' timeZoneId="58" gmtAdjustment="GMT+05:45" useDaylightTime="0" value="5.75">(GMT+05:45) Kathmandu</option>
	<option city='Almat' timeZoneId="59" gmtAdjustment="GMT+06:00" useDaylightTime="1" value="6">(GMT+06:00) Almaty, Novosibirsk</option>
	<option city='Almat' timeZoneId="60" gmtAdjustment="GMT+06:00" useDaylightTime="0" value="6">(GMT+06:00) Astana, Dhaka</option>
	<option city='Yan' timeZoneId="61" gmtAdjustment="GMT+06:30" useDaylightTime="0" value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
	<option city='Jak' timeZoneId="62" gmtAdjustment="GMT+07:00" useDaylightTime="0" value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
	<option city='Jak' timeZoneId="63" gmtAdjustment="GMT+07:00" useDaylightTime="1" value="7">(GMT+07:00) Krasnoyarsk</option>
	<option city='Hong' timeZoneId="64" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
	<option city='Hong' timeZoneId="65" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Kuala Lumpur, Singapore</option>
	<option city='Hong' timeZoneId="66" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
	<option city='Hong' timeZoneId="67" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Perth</option>
	<option city='Hong' timeZoneId="68" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Taipei</option>
	<option city='Tok' timeZoneId="69" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
	<option city='Tok' timeZoneId="70" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Seoul</option>
	<option city='Tok' timeZoneId="71" gmtAdjustment="GMT+09:00" useDaylightTime="1" value="9">(GMT+09:00) Yakutsk</option>
	<option city='Adel' timeZoneId="72" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Adelaide</option>
	<option city='Adel' timeZoneId="73" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Darwin</option>
	<option city='Bris' timeZoneId="74" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Brisbane</option>
	<option city='Bris' timeZoneId="75" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Canberra, Melbourne, Sydney</option>
	<option city='Bris' timeZoneId="76" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Hobart</option>
	<option city='Bris' timeZoneId="77" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Guam, Port Moresby</option>
	<option city='Bris' timeZoneId="78" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Vladivostok</option>
	<option city='Mag' timeZoneId="79" gmtAdjustment="GMT+11:00" useDaylightTime="1" value="11">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
	<option city='Auc' timeZoneId="80" gmtAdjustment="GMT+12:00" useDaylightTime="1" value="12">(GMT+12:00) Auckland, Wellington</option>
	<option city='Auc' timeZoneId="81" gmtAdjustment="GMT+12:00" useDaylightTime="0" value="12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
</select>
                            </div>
  			    <div class="col-1">
			    </div>
                            <div class="alert alert-dismissible alert-info col-3" style="max-width:13.5%;margin-bottom:0;">
                  <strong id="cTZ">...</strong>
                      </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Time-Server(NTP)</label>
                            <div class="col-4">
                                <input id="NTP" class="form-control " type="text"  >
                            </div>
              			    <div class="col-1">
            			    </div>
                            <div class="alert alert-dismissible alert-info col-2"  style="max-width: 13.5%;margin-bottom:0;">
                                <strong id="cNTP">...</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">Gateway</label>
                            <div class="col-2">
                                <input id="GW" class="form-control ip_address" type="text" >
                            </div>
          			    <div class="col-3">
        			    </div>
                        <div class="alert alert-dismissible alert-info col-2" style="max-width:13.5%; margin-bottom:0;">
                            <strong id="cGW">...</strong>
                        </div>
                        </div>
                        <div class="row">
                            <button  id="DNSsubmit" type="button" style="cursor: pointer;"class="btn btn-submit col-3" >Submit
			    </button>
                            <button hidden id="wait" type="button" class="btn btn-submit col-12 ">
                            </button>
                            <div class="load-wrapp col-12">    
			     <div class="load-7 ">
                              <div class="square-holder" >
				<div class="square"></div>
			       </div>
			     </div>
                            </div>
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
                       <button type="button" id="ChPasssubmit" class="btn btn-submit ChPass col-5"  data-dismiss="modal" aria-label="Close">Save</button>
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
<form id="Loginref" action="Login.php" method="post">
 <input class='myname' type="hidden" name='name' value="hi" >
 <input class='params' type="hidden" name="myid" value=1>
</form>
<form id="passref" action="changepassword.php" method="post">
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
<!--JQUERY SCROPT-->
<script src="assets/js/popper.min.js"></script>
<script src="assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="assets/js/tether.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script src="assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="assets/js/dropzen.js"></script>
<script src="assets/js/jquery.mask.min.js"></script>
<script src="js/bootstrap-timepicker.js"></script>
<script src="assets/js/bootstrap-select.min.js"></script>

<!--CUSTOM JS-->
<script src="assets/js/main.js"></script>

<!--MODAL-->
<!--userEditing-->
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
<!-- Modal -->
		<script>
			var refresherprop=2;
			var refresheruser=2;
			var userpass="hi";
			var proptime="55:55:55";
			var olddata=0;
			var propdata='hi';
            var oldproprdata="dakfj";
			var proptimenew="33:333:33";
			var prop={};
			var prop2={};
			var selprop=0
			var hostips={} 
			var DNS=1;
			var oldcurrentinfo='dlkfajsdl;';
 var redflag="";
 var mydate;
 var tempvar;
 var allusers;
 var allgroups;
 var selvalues={};
 var grpolddata;
 var myidhash;
 var mytimer;
 var mymodal;
 var cgrp={};
 var cuser={};
 var userlistflag=0;
 var userdata="dksfj";
 var olduserdata="ksksksks";
 var voldata='hihihi';
 var oldvoldata='n;nolnlnn';
 var volumes={'NoHome': 'NoHome'};
 var idletill=480000;
 var oldhdata="dkd";
 var oldpdata="dkedfd";
 var oldddata="dkjlf";
 var oldrdata="kfld";
 var selhosts="";
 var seldhosts="";
 var modaltill=idletill-120000
 var myid="<?php echo $_REQUEST['myid'] ?>";
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";
 $(".myname").val(myname)
 $(".selectpicker").selectpicker()
 $("#usrnm").text(myname)
 $(".params").val(myid);
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
mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser();myidhash=mydate; } timerrst();});
				$("html").keypress(function(){mydate=new Date(); mydate=mydate.getTime(); if(mydate-myidhash > modaltill) { chkuser(); myidhash=mydate;};timerrst();});
				$(".ref").click(function() {
					if($(this).attr('id')=="Login")
					{ 
						document.getElementById('Login'+'ref').submit();
						
					} else {
					document.getElementById($(this).attr('id')+'ref').submit();
					}
		});
var tmpgdata;
		function SS(){ 
				
				   var alltabsAcco=0;var alltabsStat=0;var alltabsProt=0;var alltabsRepli=0;var alltabsPool=0;var alltabsUP=0;
					var curuser=myname;
					if(curuser!="admin"){
					$.get("gump2.php", { req: 'usersinfo/'+curuser, name:"" },function(data){ 
	var gdata=data.split('/')
	gdata.shift(); gdata.shift();
	tmpgdata=gdata;
	console.log('hi');
						if(gdata[3].split('-')[1]!="true") { $(".activeDirectory").hide(); $("#activeDirectory").hide(); alltabsAcco=1;} 
						if(gdata[7].split('-')[1]!="true") { $(".boxGroups").hide();$("#boxGroups").hide();$(".boxUsers").hide(); $("#boxUsers").hide(); alltabsAcco=alltabsAcco+1;} 
						if(gdata[11].split('-')[1]!="true") { $(".boxProperties").hide(); $("#boxProperties").hide(); alltabsAcco=alltabsAcco+1;} 
						if(alltabsAcco==4) { $(".accounts").hide()}
						if(gdata[4].split('-')[1]!="true") { $(".servicestatus").hide(); $("#servicestatus").hide(); alltabsStat=1;} 	else { $(".servicestatus").show(); $("#servicestatus").show();}
						if(gdata[8].split('-')[1]!="true") { $("#Logs").hide(); $("#Logspanel").hide();alltabsStat=alltabsStat+1;}
						if(alltabsStat==2) { $(".status").hide();}
						if(gdata[12].split('-')[1]!="true") { $(".cifs").hide(); $("#cifspane").hide(); alltabsProt=1;$(".Home").hide(); $("#Homespane").hide();} 
						if(gdata[5].split('-')[1]!="true") { $(".nfs").hide(); $("#nfspane").hide(); alltabsProt=alltabsProt+1;}
						if(alltabsProt==2) { $(".protocol").hide()}
						if(gdata[16].split('-')[1]!="true") { $(".partner").hide(); $("#partner").hide(); alltabsRepli=1;} 
						if(gdata[15].split('-')[1]!="true") { $(".sender").hide(); $("#sender").hide(); alltabsRepli=alltabsRepli+1;} 
						if(gdata[14].split('-')[1]!="true") { $(".recive").hide(); $("#receiver").hide(); alltabsRepli=alltabsRepli+1;} 
						if(alltabsRepli==3) { $(".replication").hide()}
						if(gdata[13].split('-')[1]!="true") { $(".diskGroups").hide(); $("#diskGroups").hide(); alltabsPool=1;} 
						if(gdata[6].split('-')[1]!="true") { $(".snapshots").hide(); $("#snapshots").hide(); alltabsPool=alltabsPool+1;}
						if(alltabsPool==2) { $(".pools").hide()}
						if(gdata[9].split('-')[1]!="true") { $(".userPrivlliges").hide(); $("#userPrivlliges").hide(); alltabsUP=1;} 
						if(gdata[17].split('-')[1]!="true") { $(".firmware").hide(); $("#firmware").hide(); alltabsUP=alltabsUP+1;}
						if(gdata[10].split('-')[1]!="true") { $(".Cluster").hide(); $("#Cluster").hide(); alltabsAcco=alltabsAcco+1;}
						if(alltabsUP==2) { $(".config").hide()}
					
					});
				};
			};
		
			$("#userpass").click(function (){   
			$("#idduserpass").val("<?php  echo 'hi'?>");
			$("#userpassform").submit();
			});

			$(".bg-success").hide();$(".bg-danger").hide();$(".bg-warning").hide();
 function updateprop() {
  $.get("gump2.php", { req: "prop", name:"--prefix"  },function(data){
  $.get("gump2.php", { req: "ready", name:"--prefix"  },function(rdata){ 
    if(propdata==data && oldproprdata==rdata){;} else {
        propdata=data
        oldproprdata=rdata;
        
        prop2=$.parseJSON(data)
        $("#hostlist a").remove();
        $.each(prop2,function(r,s){
            prop=$.parseJSON(prop2[r]["prop"].replace('{','{"').replace('}','"}').replace(/:/g,'":"').replace(/,/g,'","'))
            prop2[r]['name']=prop2[r]['name'].replace('prop/','')
            if(rdata.includes(prop2[r]['name'])) {
                if( prop.configured.includes('yes') < 1) { 
                    $("#isconfigured").prop('checked',true);
                    if(redflag.includes('need') >0 ) { 
                    redflag=redflag+', Node: '+prop.name+' needs to be configured'; 
                    } else { 
                        redflag='Node: '+prop.name+' needs to be configured';  
                    }
                } else { 
                    $("#isconfigured").prop('checked',false);
                    redflag=""; 
                };
                prop=$.parseJSON(prop2[r]["prop"].replace('{','{"').replace('}','"}').replace(/:/g,'":"').replace(/,/g,'","'))
                img='Server1-On.png'
                $('#hostlist').append($('<a class="col-3 hostmember text-center"  href="javascript:hostclick(\''+prop2[r]["id"]+'\')">'+prop["name"]+'<img class="img-responsive server '+prop2[r]["id"]+'" style="object-fit:cover; max-width:250%;max-height:250%; height: auto; margin-bottom: 3.4rem;"  class="server" src="assets/images/'+img+'" /><p class="psize" style="color:green;">'+prop["name"]+'</p></a>'));	
                hostclick(selprop)
            }
        });
    }
  })
  });
  if (refresherprop > 0) { 
   $.post("./pump.php", { req:"HostgetIPs.py", name:myname, passwd:"" });
   refresherprop=-5
  }				
  $("#cBoxName").text(prop["name"]); $("#cIPAddress").text(prop.addr); $("#cGateway").text(prop.rout);
  //$("#cdns1").text(prop.dns);
  $("#cNTP").text(prop.ntp);
  $("#cGW").text(prop.gw);
  try {
	$("#cTZ").text(prop.tz.split('%')[1].split('!').join(':').split('_').join(' ').split('^').join(','));
  }
  catch {;}
  $("#cSubnet").text(prop.addrsubnet);
  $("#cMgmt").text(prop.mgmtip+'/'+prop.mgmtsubnet);
  if(propdata.includes('dataip')) {
   $("#cDataIP").text(prop.dataip+'/'+prop.dataipsubnet);
  }
  proptime=proptimenew;
  refresherprop=refresherprop+1;
 }
function refreshselect(){
 return;
 $.each(cgrp,function(k,v){
  if( v.toString() != $("#sel"+k).val().toString()) {
   $("#btnsel"+k).show();
  } else {
   $("#btnsel"+k).hide();
  }
 });
 return
 $.each($('[id^=sel]'),function(e,v) {
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

 function refreshusers() {
   var jdata;
   $.get("gump2.php", { req: 'usersinfo', name:"--prefix" },function(userdata){ 
    if(userdata==olduserdata) { return; }
    olduserdata=userdata
    userlistflag=1;
    jdata = jQuery.parseJSON(userdata);
    allusers=jdata;
    $("#Groupusers option").remove();
    var username="dkfj"
    $.each(jdata, function(k,v){
     username=jdata[k]['name'].replace('usersinfo/','')
     if (username!='NoUser'){
     $("#Groupusers ").append("<option value='"+username+"' >"+username+"</option>");
     }
    });
    $("#Groupusers").selectpicker("refresh");
   });
}
 function refreshgroups() {
  var jdata;
  $.get("gump2.php", { req: 'usersigroup', name:'--prefix' }, function(grpdata){
   if(grpdata==grpolddata) { return; }
   grpolddata=grpdata
   jdata = jQuery.parseJSON(grpdata);
   allgroups=jdata;
   userlistflag=1;
   $("#Usergroups option").remove();
   var grpname="dkfj"
   $.each(jdata, function(k,v){
    grpname=jdata[k]['name'].replace('usersigroup/','')
    if (grpname!="Everyone") {
     $("#Usergroups ").append("<option value='"+grpname+"' >"+grpname+"</option>");
    }
   });
   $("#Usersgroup").selectpicker("refresh");
  });
 }
    
    function refreshhosts() {
        var jdata;
        $.get("gump2.php", { req: 'ready', name:'--prefix' }, function(rdata){
            $.get("gump2.php", { req: 'possible', name:'--prefix' }, function(pdata){
                $.get("gump2.php", { req: 'alias', name:'--prefix' }, function(hdata){
                    if(oldrdata==rdata && oldpdata==pdata && oldhdata==hdata) {return;}
                    oldpdata=pdata;
                    oldrdata=rdata;
                    oldhdata=hdata;
                    propdata="dkfajd";
                    oldproprdata="dfk;d";
                    jpdata = jQuery.parseJSON(pdata)
                    jdata = jQuery.parseJSON(hdata);
                    allhosts=jdata;
                    hostlistflag=1;
                    $("#Rhosts .rhosts").remove();
                    var hname="dkfj";
                    col=12/(jdata.length-jpdata.length);
                    $.each(jdata, function(k,v){
                        hname=jdata[k]['name'].replace('alias/','')
                        hip=jdata[k]['prop']
                        if(pdata.includes(hname) < 1){
                            if(rdata.includes(hname) > 0) { img='Server1-On.png';} else { img='Server1-Off.png'};
                            $("#Rhosts").append('<div id="mem'+hname+'" class="rhosts col-'+col+'"><a  href="javascript:memberclick(\''+hname+'\')"><img class="img-responsive server" style="object-fit:cover; max-width:250%;max-height:250%; height: auto; margin-bottom: 3.4rem;"  class="server" src="assets/images/'+img+'" /><p class="psize" style="color:green;">'+hname+':'+hip+'</p></a></div>')
                        }
                    });                

                });
            });
        });
    }

    function refreshdhosts() {
        var jdata;
        $.get("gump2.php", { req: 'possible', name:'--prefix' }, function(ddata){
            if(oldddata==ddata) { return; }
            oldddata=ddata;
            propdata="dsafkj;"
            oldproprdata="dfkdk";
            oldpdata='dfdkjdf';
            oldrdata='dfaksdjkf';
            oldhdata='dfaksdljf;';
            jdata= jQuery.parseJSON(ddata);
            $("#Dhosts .dhosts").remove();
            var hname="dkfj";
            col=12/(2*jdata.length);
            $.each(jdata,function(r,s){
                hname=jdata[r]['name'].replace('possible','');
                hip=jdata[r]['prop'];
                img='Server1-On.png';
                $("#Dhosts").append('<div id="dem'+hname+'" class="dhosts col-'+col+'"><a  href="javascript:demberclick(\''+hname+'\')"><img class="img-responsive server" style="object-fit:cover; max-width:250%;max-height:250%; height: auto; margin-bottom: 3.4rem;"  class="server" src="assets/images/'+img+'" /><p class="psize" style="color:green;">'+hname+':'+hip+'</p></a></div>');
                
            });
        });
    }
			function refreshall() {
				DNS=1;
      if (typeof(allgroups)=="object" && typeof(allusers)=="object" && userlistflag==1 ){
        userlistflag=0
	refreshUserList();
      }
      if (typeof(allgroups)=="object" && typeof(allusers)=="object" && userlistflag==0 ){
     refreshselect();
        }
                updateprop();
				refreshusers();
				refreshgroups();
                refreshdhosts();
				refreshhosts();
		$.get("gump2.php", { req: "pools/", name:"--prefix"  },function(voldata){
			if(voldata!=oldvoldata)
			{
			  cvol=$("#UserVol").val()
			  $(".volume").remove()
 			  volumes={'NoHome': 'NoHome'};
			    oldvoldata=voldata
			jvol = jQuery.parseJSON(voldata);
$.each(jvol,function(k,v){
 vol=jvol[k].name.split('/')[1]
 volumes[vol]=jvol[k].prop
 if( cvol==vol) {selected='selected';} else {selected='';}
 $("#UserVol").append($('<option class="volume " '+selected+'>').text(vol).val(vol));
			});
			}		
	});
					
				$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ $("bg-success").text(data);});
				if($(".AD").is(":visible"))
				{
					$.get("requestdata2.php", { file: 'Data/DomainChangestatus.log' }, function(data){ $("#ADstatus").val(data);});
				}
				if($(".Future").is(":visible"))
				{
;
//					updateprop();
//					$.get("requestdata2.php", { file: 'Data/HostManualconfigstatus.log' }, function(data){ $(".bg-success").text(data);});
					
				}
		$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){
		if(redflag.includes('need')>0){ $('#redhere').text(redflag); $(".bg-danger").show(); } else { $(".bg-danger").hide(); }
		if(data!=oldcurrentinfo && data != ''){linerfact=-1;oldcurrentinfo=data;  $(".bg-success").fadeIn(800);if(data.includes('zone') > 0) { data=data.split('!').join(':').split('_').join(' ').split('^').join(',');}; $("#texthere").text(data);$(".bg-success").fadeOut(8000);}
	});
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
					});
					
				}
			}	
						
			function refresh() {
				
				$.get("statuslog.php", { file: 'Data/status.log' }, function(data){
					$("#statusarea").val(data);
					});
			}	;
 function refreshUserList(){
 
  if (typeof(allgroups)=="undefined" || typeof(allusers)=="undefined"){
   return
  }
  var jdata;
  $("#UserList tr").remove();
  $.each(allusers, function(k,v){
   username=allusers[k]['name'].replace('usersinfo/','')
   usersize=allusers[k]['prop'].split('/')[3]
   userpool=allusers[k]['prop'].split('/')[1]
   if (username!='NoUser') { 
    $("#UserList").append('<tr class="dontdelete" > ><td style="width:25%;">'+username+'</td><td style="width:25%;">'+userpool+'</td><td style="width:20%;">'+usersize+'</td><td style="width:25%;"><select style="width: 100%;" onclick="tdisclicked(this)" id="sel'+username+'" title="No Group" data-container="body" data-width="auto" class="'+username+' selectpicker "  multiple data-actions-box="true" data-live-search="true"></select></td><td><button onclick="selbtnclickeduser(this)" id="btnsel'+username+'" type="button" class="btn btn-primary" >update</button></td><td style="width: 15%;" class="text-center"><a href="javascript:userPassword(\''+username+'\')" ><img src="assets/images/edit.png" alt="cannott upload edit icon"></a></td><td style="width: 15%;" class="text-center"><a class="UnixDelUser" val="'+username+'" href="javascript:auserdel(\''+username+'\')" ><img  src="assets/images/delete.png" alt="cannott upload delete icon"></a></td></tr>');
    $("#btnsel"+username).hide();
    cgrp[username]=[]
    $.each(allgroups, function(k,v){
     evgroup=allgroups[k]['prop'].split('/')[2]
     grpname=allgroups[k]['name'].replace('usersigroup/','')
     selected='';
     if (evgroup.includes(username) > 0) {
      var selected='selected'
      cgrp[username].push(grpname)
     }
     if(grpname!='Everyone') {
      $("#sel"+username).append("<option value='"+grpname+"' "+selected+">"+grpname+"</option>");
     }
    });
    $("button").css("height","2.3rem");
    $(".dropdown").css("width","100%");
    $('#sel'+username).on('changed.bs.select',function(e,c,iss,pv){
     if (cgrp[this.id.replace('sel','')].toString()==$('#'+this.id).val()) {
      $('#btn'+this.id).hide();
     } else {
      $("#btn"+this.id).show();
     }
    
     if (cgrp[this.id.replace('sel','')].length==0 && $('#'+this.id).val()==null) {
      $('#btn'+this.id).hide();
     }
    });
   }
  });
  $(".selectpicker").selectpicker("refresh");
  $("#GroupList tr").remove();
  $.each(allgroups, function(k,v){
   username=allgroups[k]['name'].replace('usersigroup/','')
   grpuserlist=allgroups[k]['prop'].split('/')[2]
   if (username!='Everyone'){
    $("#GroupList").append('<tr class="dontdelete" > <td style="width:25%;">'+username+'</td><td style="width:25%;"><select style="width: 100%;" onclick="tdisclicked(this)" id="sel'+username+'" title="No User" data-container="body" data-width="auto" class="'+username+' selectpicker grp" multiple data-actions-box="true" data-live-search="true"></select></td><td class="text-center" style="width: 20%;"><button onclick="selbtnclickedgroup(this)" id="btnsel'+username+'" type="button" class="btn btn-primary" >update</button></td><td style="width: 15%;" class="text-center"><a class="UnixDelGroup" val="'+username+'" href="javascript:agroupdel(\''+username+'\')" ><img  src="assets/images/delete.png" alt="cannott upload delete icon"></a></td></tr>');
    $("#btnsel"+username).hide();
    cuser[username]=[]
    $.each(allusers, function(k,v){
     evuser=allusers[k]['name'].replace('usersinfo/','')
     selected='';
     if (grpuserlist.includes(evuser) > 0) {
      var selected='selected'
      cuser[username].push(evuser)
     }
     if(evuser!='NoUser'){
      $("#sel"+username).append("<option value='"+evuser+"' "+selected+">"+evuser+"</option>");
     }
    });
    $("button").css("height","2.3rem");
    $(".dropdown").css("width","100%");
    $('#sel'+username).on('changed.bs.select',function(e,c,iss,pv){
     if (cuser[this.id.replace('sel','')].toString()==$('#'+this.id).val()) {
      $('#btn'+this.id).hide();
     } else {
      $("#btn"+this.id).show();
     }
     if (cuser[this.id.replace('sel','')].length==0 && $('#'+this.id).val()==null) {
      $('#btn'+this.id).hide();
     }
    });
   }
  });
  $(".selectpicker").selectpicker("refresh");
 }
      function selbtnclickedgroup(x){
                           var Groupusers='NoUser';
                           if($("#"+x.id.replace('btn','')).val()!=null){
                             Groupusers=$("#"+x.id.replace('btn','')).val().toString()
                           }
 
 $.post("./pump.php", { req:"UnixChangeGroup", name:x.id.replace('btnsel',''), passwd:'users'+Groupusers+" "+myname });

			};	
      function selbtnclickeduser(x){
 $.post("./pump.php", { req:"UnixChangeUser", name:x.id.replace('btnsel',''), passwd:'groups'+$("#"+x.id.replace('btn','')).val()+" "+myname });

			};	
		
			var config = 1;
			function hostclick(r){
                $(".server").removeClass("SelectedFree");
                $("."+r).addClass("SelectedFree");
                prop=$.parseJSON(prop2[r]["prop"].replace('{','{"').replace('}','"}').replace(/:/g,'":"').replace(/,/g,'","'))
                selprop=r
                currenthost=prop["name"];
                if(prop.configured.includes('yes') < 1)
                    $("#isconfigured").prop('checked',true);
                else
                  $("#isconfigured").prop('checked',false);  
                $("#isconfigured").val(prop.configured);
                $("#cBoxName").text(prop["name"]); $("#cIPAddress").text(prop.addr); $("#cGateway").text(prop.rout);
                //$("#cdns1").text(prop.dns);
                $("#cSubnet").text(prop.addrsubnet);
                $("#cMgmt").text(prop.mgmtip+'/'+prop.mgmtsubnet);
			}
			$("#AD").click(function (){ 
				if(config == 1 ) { 
					var userpriv="false";
					var curuser=myname;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
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
			$("#navCluster").click(function (){ 
					var userpriv="false";
					var curuser=myname;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						tmpgdata=gdata;
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
								userpriv=gdata[prot].Cluster
							}
						};
					
						if(userpriv=="true" | curuser=="admin" ) {
							refresheruser=2
						}
					});
				
			});

			$("#navUnLin").click(function (){ 
					var userpriv="false";
					var curuser=myname;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
								userpriv=gdata[prot].Box_Users
							}
						};
					
						if(userpriv=="true" | curuser=="admin" ) {
							refresheruser=2
						}
					});
				
			});
			$("#navboxProperties").click(function (){ 				
				
					var userpriv="false";
					var curuser=myname;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==myname) {
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
		
			$("#UnixAddUser").click( function (){ $.post("./pump.php", { req:"UnixAddUser", name:$("#User").val()+' '+$("#UserVol").val()+' groups'+$("#Usergroups").val(), passwd:$("#UserPass").val()+" "+$("#volsize").val()+"G "+"Home/"+$("#HomeAddress").val()+'/'+$("#HomeSubnet").val()+" "+volumes[$("#UserVol").val()]+" "+myname}, function (data){
				 refresheruser=3
				 });
			});
			$("a.UnixDelUser").click(function (e){ e.preventDefault(); $.post("./pump.php", { req:"UnixDelUser", name:$(this).val()+" "+myname, passwd:"" }, function (data){
				 refresheruser=3 
				 });
			});
			
			function auserdel(){ $.post("./pump.php", { req:"UnixDelUser", name:arguments[0]+" "+myname, passwd:"" }, function (data){
				 refresheruser=3 
				 });
			};
			$("#UnixAddGroup").click( function (){ 
                           var Groupusers='NoUser';
                           if($("#Groupusers").val()!=null){
                             Groupusers=$("#Groupusers").val().toString()
                           }
                           $.post("./pump.php", { req:"UnixAddGroup", name:$("#Group").val()+" users"+Groupusers, passwd:myname}, function (data){
				 refresheruser=3
				 });
			});
			$("a.UnixDelGroup").click(function (e){ e.preventDefault(); $.post("./pump.php", { req:"UnixDelGroup", name:$(this).val()+" "+myname, passwd:"" }, function (data){
				 refresheruser=3 
				 });
			});
			
			function agroupdel(){ $.post("./pump.php", { req:"UnixDelGroup", name:arguments[0]+" "+myname, passwd:"" }, function (data){
				 refresheruser=3 
				 });
			};
			function userPassword(){ userpass=arguments[0];  $("#userEditing").modal('show') ;}
                        $("#iChPasssubmit").click(function(){
			changePassword(mypass)
			});
			function changePassword(){ $.post("./pump.php", { req:"UnixChangePass", name:"'"+userpass+"'", passwd:arguments[0]+" "+myname}, function (data){});
				refresheruser=1;			
			};


				$(".ChPass").click(function (){ 
				$.post("./pump.php",{ req:"UnixChangePass", name:"'"+$("#chpass").val()+"'", passwd:userpass+" "+myname});
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
				if($("#BoxName").val().length > 3) {
					hostips['name']=$("#BoxName").val(); $("#BoxName").removeClass("NotComplete"); 
				}
				else {
                    if($("#BoxName").val().length > 0)
                        $("#BoxName").addClass("NotComplete")
        		}
                hostips['hostname']=prop2[selprop]['name']
				if($("#IPAddress").val().length > 3) { hostips['addr']=$("#IPAddress").val(); hostips['addrsubnet']=$("#Subnet").val(); }
				if($("#Mgmt").val().length > 3) { hostips['mgmtip']=$("#Mgmt").val(); hostips['mgmtsubnet']=$("#MgmtSub").val();}
				//if($("#dns1").val().length > 3) hostips['dns']=$("#dns1").val();
				//if($("#DataIP").val().length > 3){ hostips['dataip']=$("#DataIP").val(); hostips['dataipsubnet']=$("#DataSub").val();}
				if($("#NTP").val().length > 3){ hostips['ntp']=$("#NTP").val()}
				if($("#GW").val().length > 3){ hostips['gw']=$("#GW").val()}
				if($("#TZ").val() != "-100" ){
                    hostips['tz']=$("#TZ option:selected").attr('city')+'%'+$("#TZ option:selected").text().split(' ').join('_').split(',').join('^').split(':').join('!');
                }
		if ($("#isconfigured").prop("checked")){
		 if ($("#isconfigured").val().includes('yes')> 0){
		  hostips['configured']='no'
		 } else {
		  hostips['configured']=$("#isconfigured").val()
		 }
		} else {
		 hostips['configured']='yes'
		}
                console.log(hostips);
				$.post("./pump.php", { req:"HostManualconfig.py", name:JSON.stringify(hostips), passwd:myname });
				setTimeout(function(){ refresherprop=4},3000);					
						
						
			});
			$("#ADsubmit").click( function() {
				if($("#Domtype").val()=="Domain") {
					$.post("./pump.php", { req:"DomainChange", name:$("#DomName").val()+" "+$("#Admin").val()+" "+"\""+$("#Pass").val()+"\""+" "+$("#DCserver").val()+" "+myname, passwd:"" });
				} 
				else {
					$.post("./pump.php", { req:"DomainChangeWorkgrp", name:$("#DomName").val()+" "+$("#Admin").val()+" "+"\""+$("#Pass").val()+"\""+" "+$("#DCserver").val()+" "+myname, passwd:"" });
				} 
			});
			
			function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivad="false"; var userprivunlin="false"; var userprivfuture="false";
						var curuser=myname;
						if (curuser !="admin") {
							$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user==myname) {
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
	
	 $('[id^=nav]').click(function(e){
	  $(".dropdown").css("width","100%");
          $("button").css("height","2.3rem");
	 });		
		setInterval('refreshall()',5000);
				$("#close-success").click(function() { $(".bg-success").hide(); });
				$("#userpass").click(function (){   
					$("#idduserpass").val("<?php  echo 'hi' ?>");
					$("#userpassform").submit();
	
				});
        $("#RhostForget").on('click',function() {
            console.log('selhosts',selhosts)
            
            $.post("./pump.php", { req:"Evacuate.py", name:selhosts, passwd: myname });
        });

        $("#DhostAdd").on('click',function() {

            $.post("./pump.php", { req:"AddHost.py", name:seldhosts, passwd: myname });
        });

        function memberclick(name) {
            if($('#mem'+name+' a .server').hasClass("SelectedFreered") > 0 ) {
                $('#mem'+name+' a .server').removeClass("SelectedFreered");
                selhosts="";
                $("#RhostForget").attr('disabled',true);
            } else {
                $(".rhosts a .server").removeClass("SelectedFreered");
                $('#mem'+name+' a .server').addClass("SelectedFreered"); 
                selhosts=name;
                $("#RhostForget").attr('disabled',false);
            }       
        }

        function demberclick(name) {
            if($('#dem'+name+' a .server').hasClass("SelectedFree") > 0 ) {
                $('#dem'+name+' a .server').removeClass("SelectedFree");
                seldhosts="";
                $("#DhostAdd").attr('disabled',true);
            } else {
                $(".dhosts a .server").removeClass("SelectedFree");
                $('#dem'+name+' a .server').addClass("SelectedFree"); 
                seldhosts=name;
                $("#DhostAdd").attr('disabled',false);
            }       
        }
   $.post("./pump.php", { req:"HostgetIPs.py", name:'hi', passwd:"" });
				SS();
    	</script>

    </body>
</html>

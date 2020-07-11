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
<a class="navbar-brand" href="#"><img src="assets/images/logo.png"></a>
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
				<a class="nav-link ref" href="#" id="replication" role="tab">
			<div></div>
			Replication</a>
		</li>
		<li class="nav-item pools">
				<a class="ref nav-link active" id="pools" data-toggle="tab" href="#" role="tab">
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
   <div class="container">
    <div class="row">
		   <div id="hostslist" class="" style="margin-top: 0.4rem;">
		   </div>
    </div>
    <div class="row">
		   <div id="poollist" class="row " style="margin-top: 0.4rem;">
		   </div>
    </div>
   </div>
		 <div class="container ">
			 <div id="poollist2" class="row" >
		<!--بداية العنوان الرئيسي الاول -->
     <div class="col-lg-6 col-md-6 poolmember "style="border-right:  2px solid rgb(24, 81, 130);">
      <h4 style="    padding-left: 5%;">Disk Grops</h4>
      <section class="text-center">
       <div class="container">
        <div class="row">
         <div class="col-lg-3 col-sm-6 a412">
          <div>
           <img class="img412" src="assets/images/disk-image.png" />
           <h6>40 G</h6>
          </div>
							  </div>
					   </div>
       </div>
      </section>
     </div>
    </div>
   </div>
		 <div id="poollist3" class="container ">
		 	<div class="row poolmember">
     <div class="col-lg-6 col-md-6 "  style="
     border-bottom: 2px solid rgb(24, 81, 130);
     border-right: 2px solid rgb(24, 81, 130);
     border-left: 2px solid rgb(24, 81, 130);
     border-top: 2px solid rgb(24, 81, 130);
     ">
      <h4 style="padding-left: 5%;">Disk Sico </h4>
      <section class="text-center">
       <div class="container">
        <div class="row">
         <div class="col-lg-3 col-sm-6 a413">
          <div>
           <img class="img412" src="assets/images/disk-image.png" />
           <h6>40 G</h6>
          </div>
         </div>
         <div class="col-lg-3 col-sm-6 a413">
          <div>
           <img class="img412" src="assets/images/disk-image.png" />
           <h6>40 G</h6>
          </div>
         </div>
        </div>
       </div>
      </section>
     </div>
    </div>
   </div>
   <div class="container">
    <div class="row">
				 <div style="display: inline-flex; " class='col-12' id="diskimg">
				 </div>
     <div class="row poolmember">
      <div class="col-12">
				   <h1 id="poolmsg" style="margin-top:0.5rem;">No pool is created... Please create a pool by selecting disks </h1>
				   <h2 id="poolstate"></h2>
      </div>
     </div>
    </div>
   </div>
				<div style="display: inline-flex; " id="freeimg">
				</div>
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
							<tr id="Pooldelete" style="font-size: 2rem; background: lightgrey;height: 12rem; text-align: center;">
				<td class="text-center poolcrdel ">
						<div  class="poolcrdel"> Running Pool </div>
				</td>
				<td id="poolname" class="poolcrdel text-center">p1</td>
				<td id="poolsize" class="poolcrdel text-center">20G</td>
							<td></td>
				<td  class="poolcrdel" ><a href="javascript:pooldelete()"><div type="button"  class=" btn btn-danger ">Delete Pool</div></a></td>
				</tr>
										<tr id="Poolcreate" style="font-size: 2rem; background: lightgrey;height: 12rem; text-align: center;">
				<td class="text-center poolcrdel ">
						<div  class="poolcrdel"> Running Pool </div>
				</td>
				<td id="poolname" class="poolcrdel text-center">p1</td>
				<td id="crpoolsize" class="poolcrdel text-center">20G</td>
				<td  class="poolcrdel"><a  href="javascript:poolcreatesingle()"><div type="button" class=" btn btn-submit ">Create Pool</div></a></td>
											<td></td>                              
				</tr>

					<tr id="Addspare">
				<td class="text-center ">
						<input type="radio" class="form-check-input" name="diskRadios" checked="checked">
				</td>
				<td class="text-center">Spare</td>
				<td class="text-center"></td>
				<td class="text-center"><a href="javascript:pooladdspare()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>
					<tr id="Addreadcache">
				<td class="text-center ">
						<input type="radio" class="form-check-input" name="diskRadios" checked="checked">
				</td>
				<td class="text-center">read cache</td>
				<td class="text-center"></td>
				<td class="text-center"><a href="javascript:pooladdcache()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>
					<tr id="Addwritecache">
				<td class="text-center ">
						<input type="radio" class="form-check-input" name="diskRadios" checked="checked">
				</td>
				<td class="text-center">Read Write Cache</td>
				<td class="text-center"></td>
				<td class="text-center"><a href="javascript:pooladdlog()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>

					<tr id="Delspecial">
				<td class="text-center ">
						<input type="radio" class="form-check-input" name="diskRadios" checked="checked">
				</td>
				<td id="typeofdisk" class="text-center">role</td>
				<td class="text-center"></td>
				<td class="text-center"><div href="#">remove it</div>
				</td>
				<td class="text-center"><a href="javascript:pooldelspecial()"><img src="assets/images/delete.png"
										alt="can't upload delete icon"></a>
				</td>
					</tr>
					<tr id="mirror">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Mirror</td>
				<td id="Mirrorsize" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:poolcreatemirror()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>

					<tr id="Addmirror">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">add mirrored pair of disks</td>
				<td id="Addmirrorsize" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:pooladdmirror()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>
					<tr id="Attachmirrored">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">add mirrored disk</td>
				<td id="Attachmirroredsize" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:poolattachemirror()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>
					<tr id="striped">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">striped(no redundancy)</td>
				<td id="Stripesize" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:poolcreatestripe()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>

					<tr id="raid-SingleRed">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Single Redundancy</td>
				<td id="SingleRed" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:poolcreateraidsingle()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>
					<tr id="addraid-SingleRed">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Single Redundancy</td>
				<td id="addSingleRed" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:pooladdraidsingle()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>
					<tr id="addraid-DualRed">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Dual-Redundancy</td>
				<td id="addDualRed" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:pooladdraiddual()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>
						</tr>
						<tr id="addraid-TripleRed">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Triple-Redundancy</td>
				<td id="addtripleraid" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:pooladdraidtriple()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>
						</tr>
						<tr id="raid-DualRed">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Dual-Redundancy</td>
				<td id="DualRed" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:poolcreateraiddual()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>
						</tr>
						<tr id="raid-TripleRed">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Triple-Redundancy</td>
				<td id="tripleraid" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:poolcreateraidtriple()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>
						</tr>
						<tr id="Addstriped">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">Add to existing stripe(no redundancy)</td>
				<td id="Addstripedsize" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="javascript:pooladdstripe()"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>

					</tr>
						<tr id="splitmirror">
				<td class="text-center poolcrdel">
						<input type="radio" class=" form-check-input" name="diskRadios">
				</td>
				<td class="text-center poolcrdel ">Split Mirror</td>
				<td id="MirrorSize" class="sizgb poolcrdel text-center">97.9GB</td>
				<td class="text-center poolcrdel "><a href="#"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>
				<td class="text-center"><a href="#"><div type="button" class=" btn btn-submit" >Split Mirror<div></a>
				</td>
					</tr>
					<tr id="readcache">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">read only cache</td>
				<td class="text-center" class="sizegb text-center">97.9GB</td>
				<td class="text-center"><a href="#"><img
					src="assets/images/plus-symbol-in-a-rounded-black-square.png"
					alt="can't upload Create icon"></a>
				</td>
				<td class="text-center"><a href="#"><img src="assets/images/delete.png"
										alt="can't upload delete icon"></a>
				</td>
					</tr>
						</tr>
					<tr id="readwritecache">
				<td class="text-center">
						<input type="radio" class="form-check-input" name="diskRadios">
				</td>
				<td class="text-center">read/write mirrored cache</td>
				<td class="text-center" class="sizegb text-center">97.9GB</td>
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
				<select id="Pool" class="form-control">

				</select>
					</div>
			</div>
			<div class="form-group row">
					<label class="col-2 col-form-label">Vols</label>
					<div class="col-5">
				<select id="Vol" class="form-control">

				</select>
					</div>
			</div>
			<div class="form-group row" hidden>
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
						<input id="Oncename"  class="form-control" type="text">
				</div>
				<br>
				<div class="margin-top col-md-12">
				<a id="goodname" href="javascript:SnapshotCreate()" class="" >
						<div id="oncecreate" type="button" class="btn btn-submit col-3">create snapshot</div>
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
						<th class="text-center">date</th>
							<th class="text-center">time</th>

							<th class="text-center">name</th>
							<th class="text-center">size</th>
								<th class="text-center">compression</th>
							<th class="text-center">Delete</th>
							<th class="text-center">RollBack</th>
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
						<th class="text-center">date</th>
							<th class="text-center">time</th>

							<th class="text-center">pool</th>
							<th class="text-center">vol</th>
								<th class="text-center">name</th>
							<th class="text-center">Delete</th>
							<th class="text-center">RollBack</th>
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
						<th class="text-center">date</th>
							<th class="text-center">time</th>

							<th class="text-center">pool</th>
							<th class="text-center">vol</th>
								<th class="text-center">name</th>
							<th class="text-center">Delete</th>
							<th class="text-center">RollBack</th>
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
						<th class="text-center">date</th>
							<th class="text-center">time</th>

							<th class="text-center">pool</th>
							<th class="text-center">vol</th>
								<th class="text-center">name</th>
							<th class="text-center">Delete</th>
							<th class="text-center">RollBack</th>
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

<script src="assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="assets/js/dropzen.js"></script>

<!--CUSTOM JS-->
<script>

var redflag="";
var Vollisttime="44:333:222";
var Vollisttime2="44:333:222";
var times= { "snaps":"30:43:433", "periods":"30:43:433" };
var requiredtime={ "snaps":"33==:433", "periods":"30==erwe:43:433" }
var Vollisttimenew="23:434:34543";
var status=0;
var olddata=[];
var panesel="hifirst";
var snapsel="hihi";
var oldsnapsel='nononon';
var syscounter=10;
var syscounter2=1000;
var getdisk=0;
var runningpool=0;
var runningroup=0;
var dd=[];
var raids=[]
	var olddiskpool=0;
var oldcurrentinfo="";
var disks=[];
var pools=[];
var selecteddisks=[];
var dcomp=[];
var volumes=[];
var snapshots=[];
var snapperiod=[];
var pool='dkjfdldas';
var currenthost='hihi';
var currentpool='hihihiA';
var icurrentpool=-1;
var jdata;
var poolcount=0
var gdata;
var raids=[];
var hosts=[];
var poolsel='0'
	var	volsel='0'
	var releasesel=0;
var oldreleasesel=0;
var ddk;
var minspace; var maxspace;
var ppoolstate="na";
 var mydate;
 var myidhash;
 var mytimer;
 var mymodal;
 var idletill=480000;
 var modaltill=idletill-120000
 var myid="<?php echo $_REQUEST['myid'] ?>";
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";
 var hostsname={};
 var propdata='dlkafjd;'
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
     hostsname[prop2[r]['name'].replace('prop/','')]=prop.name
     $("#"+prop2[r]["name"].replace('prop/','')).text(prop2[r]["name"].replace('prop/','')+":"+prop.name)
     if( prop.configured.includes('yes') < 1) { if(redflag.includes('need') >0 ) { redflag=redflag+', Node: '+prop.name+' needs to be configured'; } else { redflag='Node: '+prop.name+' needs to be configured';  }} else { redflag=""; };
    });
   }
  });
 }				


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
			$.get("./pumpy.php", { req:"chkuser2.sh", name:myname+" "+myid+" "+myname},function(data){ 
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
function normsize(s){
	var sizeinbytes=parseFloat(s)
		if (s.includes('K')) { sizeinbytes=sizeinbytes/1000000 }
		else if (s.includes('M')) { sizeinbytes=sizeinbytes/1000 }
		else if (s.includes('G')) { sizeinbytes=sizeinbytes }
		else if (s.includes('T')) { sizeinbytes=sizeinbytes*1000 }
		else if (s.includes('P')) { sizeinbytes=sizeinbytes*1000000 }
		else  { sizeinbytes=sizeinbytes/1000000 }
			return parseInt(sizeinbytes)
}
$(".ref").click(function() {

	if($(this).attr('id')=="Login")
	{ 
			document.getElementById('Login'+'ref').submit();


	} else {
		document.getElementById($(this).attr('id')+'ref').submit();
	}

});	


$(".bg-success").hide();$(".bg-danger").hide();$(".bg-warning").hide();
$("#DG tr").hide();
$("#deletePool").hide();$("#submitdiskgroup").hide();$(".finish").hide();$("#SnapshotCreatediv").hide();
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

function snaponce(txtin,but,altbut,comp){

	var chars=$(txtin).val().length;

	if ( chars < 3 ) {  $(but).show();$(comp).addClass("NotComplete")
		$(altbut).hide();
	} else 					{	$(but).hide();
	$(altbut).show();$(comp).removeClass("NotComplete")
	};
};


function refreshall() { //check pool status
	$.get("requestdata3.php", { file: 'Data/currentinfo2.log2' }, function(data){ 
		if(redflag.includes('need')>0){ $('#redhere').text(redflag); $(".bg-danger").show(); } else { $(".bg-danger").hide(); }
		if(data!=oldcurrentinfo && data != ''){oldcurrentinfo=data;  $(".bg-success").fadeIn(800); $("#texthere").text(data);$(".bg-success").fadeOut(8000);}
	});
						updatehosts()
	if($("#diskGroupspane").hasClass('active'))  { 
		if (panesel !="diskgroup") { 
			olddiskpool="kdajfd"; syscounter2=1000; Vollisttime2="skldjfadks"; panesel="diskgroup";
		}
	};
	if($("#snapshotspane").hasClass('active')) { 
		if (panesel !="snapshot") { 
			olddiskpool="ldksfj";syscounter2=1000; Vollisttime2="skldjfadks"; panesel="snapshot"; snaponce("#Oncename","#shortname","#goodname","#Oncename");
		}
	};
        if($("#snapshotsHourly").hasClass('active') > 0 ) { snapsel='Hourly';}
        else if($("#snapshotsOnce").hasClass('active') > 0) { snapsel='Once' }
        else if($("#snapshotsMinutely").hasClass('active') > 0) { snapsel='Minutely' }
        else if($("#snapshotsWeekly").hasClass('active') > 0) { snapsel='Weekly' }
        if (oldsnapsel!=snapsel){
	 oldsnapsel=snapsel
	$(".snapperiod").hide()
	$(".snapperiod."+snapsel+"."+$("#Vol").val()).show()
	}

	change=0
		$.get("gump2.php", { req: "hosts", name:"--prefix"  },function(data){
			if(data==olddiskpool) {return;}
			else {
				jdata = jQuery.parseJSON(data)
					if(typeof jdata =='object' ) {
						$("#DG tr").hide(); 
						olddiskpool=data
							releasesel=0
							oldreleasesel=0
							disks=[];
						cvol=$("#Vol").val()
						cpool=$("#Pool").val()
						var k;
						$("#poollist2 div").remove();
						$("#poollist3 div").remove();
						$(".disk-image").remove();	
						$("#diskimg").html('');
						$("#freeimg").html('');
						$('.hostmember').remove()
						$('.poolfree').remove()
						$('.poolmember').remove()
						$("#Vol option.volume").remove();
						$("#Pool option.pool").remove();
						$(".Snaplist td").remove()
						$(".snapperiod").remove()
						oldsnapsel='change'
						
						disks=[];
						kdata=[];
						pools=[];
						hosts=[];
						volumes=[];
						snapshots=[];
						snapperiod=[];
							//currenthost='hohoho'
							//currentpool='na'
						p=0
						$.each(jdata,function(k,v){
							hosts.push(jdata[k])
						});
						$.each(hosts,function(r,s){
							hosts[r]['name']=hosts[r]['name'].replace('hosts/','').replace('/current','')
								$('#hostslist').append($('<a id="'+hosts[r]["name"]+'" class="hostmember col-4" href="javascript:hostclick(\''+hosts[r]["name"]+'\')">'+hostsname[hosts[r].name]+'</a>'));	console.log('hosts',hostsname[hosts[r]["name"]],hosts[r]["name"],r)
							$.each(hosts[r]['prop'],function(rr,ss){
								topool=hosts[r]['prop'][rr]
									topool['host']=hosts[r]['name']
									pools.push(topool)
									if (topool.name.includes('ree') < 1 ){
 if(topool.name==cpool){ selected='selected';} else {selected='';};
 $("#Pool").append($('<option class="pool "'+selected+'>').text(topool.name).val(topool.name));

									}
							});
						});
					 pooldiv=0
						$.each(pools,function(k,v){
							if(!pools[k]['name'].includes('pree')) {pooldiv=pooldiv+1}
						});
						if( pooldiv < 1) pooldiv=12;
						else pooldiv=Math.floor(12/pooldiv);
						$('#poollist3').append($( 
 			  '<div class="row poolfree">'
      +'<div class="col  "  style="'
      +'border-bottom: 2px solid rgb(24, 81, 130);'
      +'border-right: 2px solid rgb(24, 81, 130);'
      +'border-left: 2px solid rgb(24, 81, 130);'
      +'border-top: 2px solid rgb(24, 81, 130);'
						+'margin-top: -0.08rem;'
      +'">'
      +'<a href="javascript:poolclick(\'pree\',1)"><h7 style="padding-left: 5%;">Free Disks </h7></a>'
      +'<a class="float-right" href="javascript:diskrefresh()"><span class="fa fa-refresh" style="padding-left: 5%;"></span></a>'
      +'<section class="text-center">'
      +' <div  class="container">'
						+'    <div id="freeimg2" class="row">'
      +'    </div>'
      +' </div>'
      +'</section>'
      +'</div>'
      +'</div>'
      +'</div>'
  				));
						if(pooldiv < 2 ) { pooldiv=2 } 
						poolcount=0
						var pooltop
						$.each(pools,function(k,v){
							if(pools[k]['name'].includes('pdhcp')){
								poolcount=poolcount+1
        if(poolcount < 6) { pooltop='' }
								else { pooltop='border-top: 1px solid rgb(24,81,130);' }
						  $('#poollist2').append(
 						'<div id="'+pools[k]['name']+'" class="col-lg-'+pooldiv+' col-md-'+pooldiv+' "style="border-right:  1px solid rgb(24, 81, 130); border-left: 1px solid rgb(24,81,130);border-bottom: 1px solid rgb(24, 81, 130); margin: -0.04rem; '+pooltop+'"></div>'
						  );
							}
						});
						$.each(pools,function(k,v){
							if(pools[k]['name'].includes('pdhcp')){
								thename=pools[k]['name'].replace('pdchp','')+':'+k
							 $('#'+pools[k]['name']).append( 
       '<a href="javascript:poolclick(\''+pools[k]["name"]+'\','+k+')"><h7 style="padding-left: 5%;">'+thename.replace('pdhcp','')+'</h7></a>'
       +'<section class="text-center">'
       +' <div class="container">'
       +'  <div id="diskimg2_'+k+'" class="row">'
       +'  </div>'
       +' </div>'
       +' </section>'
       +'</div>'
       +'</div>'
       +'</div>'
 					 );
						 }
							pools[k]['alloc']=normsize(pools[k]['alloc'])
							pools[k]['empty']=normsize(pools[k]['empty'])
							pools[k]['size']=normsize(pools[k]['used'])+normsize(pools[k]['available'])
							$.each(pools[k]["volumes"],function(kk,vv){
								tovol=pools[k]['volumes'][kk]
								volumes.push(tovol) 
 if(tovol.name==cvol){ selected='selected';} else {selected='';};
 $("#Vol").append($('<option class="volume '+tovol.pool+'" '+selected+'>').text(tovol.name).val(tovol.name));
							 $.each(tovol["snapperiod"],function(kkk,vvv){
      snapperiod.push(tovol["snapperiod"][kkk])
 lash=tovol["snapperiod"][kkk][1].split("%")
 lash0=tovol["snapperiod"][kkk][0].split("/")
 ppool=lash0[1]
 pvol=lash0[2]
 pstamp=lash0[3]
 info=lash[7].split('.')
 if (info[0].includes("hourly") > 0){
  at=info[2]; every=info[3]; keep=info[1] 
  $("#Hourlylist").append('<tr class=" snapperiod Hourly '+ppool+' '+pvol+' '+pstamp+'"><td class="text-center">'+every+"</td><td class='text-center'>"+at+ "</td><td class='text-center'>"+keep+"</td><td class='text-center'>"+pstamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+pstamp+"\")'><img src='assets/images/delete.png'</td></tr>");
 }
 if (info[0].includes("inutely") > 0){
   every=info[2]; keep=info[1] 
  $("#Minutelylist").append('<tr class=" snapperiod  Minutely '+ppool+' '+pvol+' '+pstamp+'"><td class="text-center">'+every+"</td><td class='text-center'>"+keep+"</td><td class='text-center'>"+pstamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+pstamp+"\")'><img src='assets/images/delete.png'</td></tr>");
 }
 console.log('info0',info[0])
 if (info[0].includes("eekly") > 0){
  minhr=info[2]+":"+info[3] ; every=info[4]; keep=info[1]; 
  $("#Weeklylist").append('<tr class=" snapperiod Weekly '+ppool+' '+pvol+' '+pstamp+'"><td class="text-center">'+minhr+"</td><td class='text-center'>"+every+ "</td><td class='text-center'>"+keep+"</td><td class='text-center'>"+pstamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+pstamp+"\")'><img src='assets/images/delete.png'</td></tr>");
 }
});
							 $.each(tovol["snapshots"],function(kkk,vvv){
									tosnap=tovol["snapshots"][kkk]
									snapshots.push(tosnap)
									$(".Snaplist").append('<tr class="snapshot '+tovol.name+'"><td class="text-center">'+tosnap.creation+"</td><td class='text-center'>"+tosnap.time+"</td><td class='text-center'>"+tosnap.name+"</td><td class='text-center'>"+tosnap.quota+"</td><td class='text-center'>"+tosnap.refcompressratio+'</td><td class="text-center"><a href="javascript:SnapshotDelete(\''+tosnap.name+'\')"><img src="assets/images/delete.png"</td><td class="text-center"><a href="javascript:SnapshotRollback(\''+tosnap.name+'\')"><img src="assets/images/return.png" alt="can\'t upload delete icon"></a></td></tr>');
							 });
						 });
$(".snapshot").hide()
$(".snapshot."+$("#Vol").val()).show()
$(".snapperiod").hide()
$(".snapperiod."+snapsel+$("#Vol").val()).show()
						 $.each(pools[k]["raidlist"],function(kk,vv){
								toraids=pools[k]["raidlist"][kk]
								toraids.pool=pools[k]["name"]
								raids.push(toraids)
								$.each(pools[k]["raidlist"][kk]["disklist"], function(kkk,vvv){
									thedisk=pools[k]["raidlist"][kk]["disklist"][kkk]
									dskstatus=thedisk['status']
									dskchange=thedisk['changeop']
									$.each(disks,function(r,v){
										if (disks[r]['status']!='free' && disks[r]['status']!='busy' && disks[r]['name']==thedisk['name']) {  dskstatus='busy' }
										if (disks[r]['name']==thedisk['name'] && dskstatus!='busy' && dskstatus!='free') {  disks[r]['status']='busy' }
									});
									disks.push({"id":kkk,
										"pool":pools[k]["name"],
										"poolid":k,
										"groupst":pools[k]["raidlist"][kk]["status"],
										"status":dskstatus,
										"changeop":dskchange,
										"grouptype":pools[k]["raidlist"][kk]["name"],
										"fromhost":thedisk["host"],
										"host":pools[k]["host"],
										"name":thedisk["name"],
										"size":normsize(thedisk["size"]),
	"selected":'0' 
									});
								});
							});
						});



					}
			}
			kdata=[]
			var diskdiv2
			var diskcount=0
			var diskpoolcount={}
			var rowcount={}
			$.each(disks,function(kk,vv){
					if(disks[kk].pool in diskpoolcount){
					 diskpoolcount[disks[kk].pool]=diskpoolcount[disks[kk].pool]+1;

				 }	else {
						diskpoolcount[disks[kk].pool]=60
						rowcount[disks[kk].pool]=0
					}
				if (disks[kk].pool=='pree' ){
					diskdiv='freeimg'
					diskdiv2='freeimg2'
				}
				else {
					diskdiv='diskimg'
					diskdiv2='diskimg2_'
				}
				diskimg='disk-image'
					if(disks[kk].groupst.includes('DEGRADE')) { diskimg='DEGRADED' }
						if(disks[kk]["changeop"].includes('Remove') || disks[kk]["name"].includes("'-'") || disks[kk]["status"].includes("OFFLINE") || disks[kk]["status"].includes("FAULT") ) { clickdisk=''; imgf='invaliddisk.png" style="height:4.7rem; width:3.3rem;"' 
						}
						//else { clickdisk="javascript:diskclick('"+kk+"')"; clickdisk="href="+clickdisk; imgf="disk-image.png"; imgf="invaliddisk.png" 
						else { clickdisk="javascript:diskclick('"+kk+"')"; clickdisk="href="+clickdisk; imgf="disk-image.png";  
						}	
				  if(disks[kk]["status"].includes("busy")){ clickdisk=''; }
				   var poolid=''
							var col=1
				  if(diskdiv2.includes('disk'))
						{ 
							poolid=disks[kk]['poolid'];
							col=poolcount;
						}
				  $("#"+diskdiv2+poolid).append(
      '<div id="disk'+disks[kk].pool+'" class="col-'+col+' disks '+disks[kk]['host']+' '+disks[kk]['pool']+' '+disks[kk]['status']+' '+disks[kk]['changeop']+'">'
      +'   <div class="">'
						/*      +'   <div class="a413">' */
      +'  <a id="'+kk+'" '+clickdisk+'>'
      +'     <img class="img412 '+diskimg+' disk'+kk+'" src="assets/images/'+imgf+'" />'
      +'  <p class="psize">'+disks[kk]["size"]+'</p></a><p class="pimage">disk'+kk+'</p><p class="pimage p'+disks[kk]["status"]+'">'+disks[kk]["status"]+'</p><p class="pimage">'+disks[kk]["grouptype"]+'</p><p class="pimage">'+disks[kk]["fromhost"]+'</p>'
      +'  </a>'
      +'    </div>'
					 );
				disks[kk]["selected"]=0;	
			});
			$(".poolmember").hide()
				$("."+currenthost).show()
				$(".disks").hide()
				$(".disks."+currenthost+"."+currentpool).show()
				$(".disks.free."+currenthost).show()
				$(".disks.free").show()
				$(".busy").hide()
				setstatus();
			if(ppoolstate.indexOf("DEGRADE") >=0) { 
				$("#poolstate").text("Pool is DEGRADED") ; $("#poolstate").removeClass("poolOnline");$("#poolstate").addClass("poolDegrade")
			}
			else { 
				$("#poolstate").text("Pool is online");
				$("#poolstate").removeClass("poolDegrade"); $("#poolstate").addClass("poolOnline"); 
			}
			if(ppoolstate.indexOf("na") >=0) { $("#poolstate").text("") }
				if (panesel == "snapshot") {
					if($("#snapshotsOnce").hasClass('active'))  { ;if (snapsel !="Once") {times["snaps"]="hithihi"; syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Once";
					}};
					if($("#snapshotsHourly").hasClass('active'))  { ;if (snapsel !="Hourly") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Hourly";
					}};
					if($("#snapshotsMinutely").hasClass('active'))  { ;if (snapsel !="Minutely") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Minutely";}};
					if($("#snapshotsWeekly").hasClass('active'))  { ;if (snapsel !="Weekly") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Weekly";}};				
				}
		});
}

function setstatus() {
	runningpool=0;
	for (k in disks) {
		nclass=disks[k].grouptype
			if(disks[k].grouptype.includes("mirror") ) {nclass="mirror"}
				if(disks[k].grouptype.includes("stripe") ) {nclass="stripe"}
					if(disks[k].grouptype.includes("raidz1") ) {nclass="raid1"}
						if(disks[k].grouptype.includes("raidz2") ) {nclass="raid2"}
							if(disks[k].grouptype.includes("raidz3") ) {nclass="raid3"}
								if(disks[k].grouptype.includes("spare") ) {nclass="spares"}
									if(disks[k].grouptype.includes("log") ) {nclass="log"}
										if(disks[k].grouptype.includes("cache") ) {nclass="cache"}
											$(".disk"+k).addClass(nclass)
											if(disks[k].grouptype.includes("stripe")==true ) {
												$("#poolmsg").text("Pool p1 is running on disk: "+k); $("#poolsize").text(parseFloat(pools["size"]))
													$("#Pooldelete").show();
											}
	}
	setaction();
}		
function setaction() {
	selecteddisks=[]
		dd=[]
		console.log('hi')
		dd.push({'grouptype':'hi'})
		$.each(disks, function(k,v){
			if(disks[k]['selected'] > 0) {
				selecteddisks.push(disks[k]);
				dd.push(disks[k])
			}
		});
	$("#DG tr").hide();
	dcomp=[]
		$.each(dd,function(k,v){
			if(dd[k].grouptype.includes('mirror') > 0 ) { dcomp.push('mirror')};
			if(dd[k].grouptype.includes('stripe') > 0 ) { dcomp.push('stripe')}
			if(dd[k].grouptype.includes('free') > 0 ) { dcomp.push('free')}
				if(dd[k].grouptype.includes('spare') > 0 ) { dcomp.push('special'); $("#typeofdisk").text('spare') }
					if(dd[k].grouptype.includes('cache') > 0 ) { dcomp.push('special'); $("#typeofdisk").text('cache') }
						if(dd[k].grouptype.includes('logs') > 0 ) { dcomp.push('special'); $("#typeofdisk").text('logs') }
		});
	switch (dd.length-1){
	case 0: break;
	// if only one disk 
	case 1:
		switch (dcomp[0]) {
			// if only free with a pool exists
		case 'free':
			if (currentpool!='pree') {
				$("#Addreadcache").show()
					$("#Addwritecache").show()
					$("#Addspare").show()
			}
			// if only free with no pool exists
			else { 
				$("#Poolcreate").show()
					$("#poolmsg").text("Pool p1 with no redundancy can be created from disk : "+dd["1"].id+" please choose below to create it"); $("#crpoolsize").text(parseFloat(dd["1"].size)+"GB")
			}
			break;
			// if only spare with a pool exists
		case 'special':
			$("#Delspecial").show()
				break;
		}
		break;
		// if only two disks 
		case 2:
			switch (dcomp[0]+dcomp[1]) {
				// if free + free and pool exists 
			case 'freefree':
				if (currentpool!='pree') {
					$("#Addmirrorsize").text(parseFloat(Math.min(dd[1].size,dd[2].size)+pools[icurrentpool].size));
					$("#Addmirror").show()
				}
				// if free + free and no pool exists 
				else {
					$("#Mirrorsize").text(parseFloat(dd[1].size+dd[2].size));
					$("#mirror").show()
				}
				break; 
				// if free + mirror 
				//    case 'mirrorfree':
				//     $("#Attachmirrored").show()
				//    break;
				// if free + stripe 
			case 'stripefree':
				$("#Addstripedsize").text(parseFloat(pools[icurrentpool].size+dd[2].size));
				$("#Addstriped").show()
					if(dd[1].size <= dd[2].size){
						$("#Attachmirroredsize").text(parseFloat(pools[icurrentpool].size));
						$("#Attachmirrored").show()
					}
				break;
			}  
			break;
			// if 3 disks 
			case 3:
				mi=[]
					switch (dcomp[0]+dcomp[1]+dcomp[2]) {
						// if free + free +free and pool exists 
					case 'freefreefree':
						$.each(dd,function(k,v) { if (k>0){ mi.push(dd[k].size) }});
						if (currentpool!='pree' ) {
							$("#addSingleRed").text(parseFloat(pools[icurrentpool].size+(mi.length-1)*Math.min.apply(Math,mi)));
							$("#addraid-SingleRed").show()
						}
						// if free + free +free and no pool exists 
						else {
							$("#SingleRed").text(parseFloat((mi.length-1)*Math.min.apply(Math,mi)));
							$("#raid-SingleRed").show()
						}
						break; 
					}
				break;   
				//  if 4 or more disks 
					default:
						allfree=1
							$.each(dcomp,function(k,v){
								if (dcomp[k]!='free'){
									allfree=0
								}
							});
						mi=[]
							$.each(dd,function(k,v) { if (k>0){ mi.push(dd[k].size) }});
						switch (allfree) {
							// if free + free +free+free and pool exists 
						case 1:
							if (currentpool!='pree') {
								$("#addSingleRed").text(parseFloat(pools[icurrentpool].size+(mi.length-1)*Math.min.apply(Math,mi)));
								$("#addraid-SingleRed").show()
									$("#addDualRed").text(parseFloat(pools[icurrentpool].size+(mi.length-2)*Math.min.apply(Math,mi)));
								$("#addraid-DualRed").show()
							}
							// if free + free +free+free and no pool exists 
							else {
								$("#SingleRed").text(parseFloat((mi.length-1)*Math.min.apply(Math,mi)));
								$("#raid-SingleRed").show()
									$("#DualRed").text(parseFloat((mi.length-2)*Math.min.apply(Math,mi)));
								$("#raid-DualRed").show()
							}
							break; 
						}
						break;
	} 
} 

function setaction2()	{
	var freedisk=0;
	var possiblenotstripe=0;
	var foundselected=0;
	var selectingdisks;
	var selectingdisks2;
	var poolmsg="";
	var diskid=0;
	runningpool=0; 	
	runningroup="";
	dd=[];

	for (k in disks) {
		if(k >= 0 ) {
			if(disks[k].selected==1 && (disks[k].group==-1 || disks[k].grouptype.includes("spare") >=0 || disks[k].grouptype.includes("cache") >=0 || disks[k].grouptype.includes("log")) >=0) {
				foundselected=1
					possiblenotstripe=possiblenotstripe+1; dd[possiblenotstripe]=disks[k];

			}
			if(disks[k].group != -1){ 
				runningpool=pools["name"];
				selectingdisks=disks[k].grouptype;
				if(selectingdisks=="cache"){ selectingdisks="read cache"}
				if(selectingdisks=="log"){ selectingdisks="read/write cache"}
					runningroup=runningroup+selectingdisks

			}
		}
		for(k in dd) { 
			if(k >= 0) {

				if(dd[k].grouptype.includes("spare") == true || dd[k]["grouptype"].includes("cache")==true || dd[k]["grouptype"].includes("log") ==true) {foundselected=-1;  }
			}
		}
	}
	if(foundselected==-1) { 
		$("#DG tr").hide();
		if(possiblenotstripe==1) { 

			$("#poolmsg").text("remove the "+dd["1"].grouptype.replace("'",'')+" disk"+dd["1"].id);
			selectingdisks="spare"
				if(dd["1"].grouptype.includes("cache")){selectingdisks="read cache"}
					if(dd["1"].grouptype.includes("log")){selectingdisks="read/write cache"}
						$("#Delspecial").show();$("#typeofdisk").text(selectingdisks);

		}
	}
	if(possiblenotstripe > 0 && foundselected==1)  {

		$("#DG tr").hide();
		if(possiblenotstripe==1 && runningpool==0) {
			$("#poolmsg").text("Pool p1 with no redundancy can be created from disk : "+dd["1"].id+" please choose below to create it"); $("#crpoolsize").text(parseFloat(dd["1"].size)+"GB")
				$("#Poolcreate").show();

		}
		if(possiblenotstripe==2 && runningpool==0) {
			$("#poolmsg").text("Pool p1 with mirrored disks: disk"+dd["1"].id+", disk"+dd["2"].id+"  can be created. please choose below"); $("#crpoolsize").text(parseFloat(dd["1"].size)+"GB")
				$("#mirror").show(); $("#striped").show()
				$("#Stripesize").text((parseInt(dd["1"].size)+parseInt(dd["2"].size))+"GB");
			$("#Mirrorsize").text(parseFloat(dd["1"].size)+"GB");
			if (parseInt(dd["1"].size) > parseInt(dd["2"].size)) {$("#Mirrorsize").text(dd["2"].size+"GB"); }

		}
		if(possiblenotstripe==3 && runningpool==0) {
			$("#poolmsg").text("Pool p1 with one disk redundancy or no redundancy using disk"+dd["1"].id+", disk"+dd["2"].id+", disk"+dd["3"].id+"  can be created. please choose below"); $("#crpoolsize").text(dd["1"].size+"GB")
				$("#raid-SingleRed").show(); $("#striped").show();
			minspace=parseInt(dd["1"].size); maxspace=0;
			for(ddk in dd){
				if (ddk >= 0) {
					if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}	
						maxspace=maxspace+parseInt(dd[ddk].size)	

				}

			}
			$("#SingleRed").text((minspace*2)+"GB"); $("#Stripesize").text(maxspace+"GB")
		}
		if(possiblenotstripe==4 && runningpool==0) {
			poolsmg="Pool p1 with : one/dual disk redundancy or no redunancy using disk";
			//$("#poolmsg").text("Pool p1 with : one disk redundancy/dual disk or no redunancy using disk"+dd["1"].id+", disk"+dd["2"].id+", disk"+dd["3"].id+"  can be created. please choose below"); $("#crpoolsize").text(dd["1"].size+"GB")
			$("#raid-SingleRed").show(),$("#raid-DualRed").show();$("#striped").show();
			diskcount=0;
			minspace=parseInt(dd["1"].size)
				maxspace=0;
			for(ddk in dd){
				if (ddk >= 0) {
					poolsmg=poolsmg+dd[ddk].id+", disk"
						if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}	
							maxspace=maxspace+parseInt(dd[ddk].size)			
							diskcount=diskcount+1;	

				}
			}
			selectingdisks=poolsmg
				$("#poolmsg").text(selectingdisks+" can be created. please choose below");
			$("#SingleRed").text((minspace*(diskcount-1))+"GB");$("#Stripesize").text(maxspace+"GB"); $("#dualraid").text(minspace*(diskcount-2)+"GB")
		}
		if(possiblenotstripe>4 && runningpool==0) {
			poolsmg="Pool p1 with : one/dual/triple disk redundancy or no redunancy using disk";
			//$("#poolmsg").text("Pool p1 with : one disk redundancy/dual disk or no redunancy using disk"+dd["1"].id+", disk"+dd["2"].id+", disk"+dd["3"].id+"  can be created. please choose below"); $("#crpoolsize").text(dd["1"].size+"GB")
			$("#raid-SingleRed").show(),$("#raid-DualRed").show(); $("#raid-TripleRed").show();$("#striped").show();
			diskcount=0;
			minspace=parseInt(dd["1"].size)
				maxspace=0;
			for(ddk in dd){
				if (ddk >= 0) {
					poolsmg=poolsmg+dd[ddk].id+", disk"
						if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}	
							maxspace=maxspace+parseInt(dd[ddk].size)			
							diskcount=diskcount+1;

				}
			}
			selectingdisks=poolsmg
				$("#poolmsg").text(selectingdisks+" can be created. please choose below");
			$("#SingleRed").text((minspace*(diskcount-1))+"GB");$("#Stripesize").text(maxspace+"GB"); $("#dualraid").text(minspace*(diskcount-2)+"GB");$("#tripleraid").text(minspace*(diskcount-3)+"GB")
		}
		if(possiblenotstripe==1 && runningpool!=0) {
			var sparevalid;
			if(dd[possiblenotstripe].grouptype.indexOf(" ") >=0 ){
				maxspace=parseInt(dd["1"].size.replace('GB','').replace('TB','000'));
				minspace=parseInt(dd["1"].size.replace('GB','').replace('TB','000'))

					var sparevalid=0;					
				for(ddk in disks){
					if(disks[ddk].grouptype!=" " && ddk >= 0){
						maxspace=maxspace+parseInt(disks[ddk].size.replace('GB','').replace('TB','000'))
							if(parseInt(dd["1"].size) >= parseInt(disks[ddk].size) ) { sparevalid=1;}							
						if (parseFloat(pools["size"])<=minspace) { minspace=parseFloat(pools["size"]); } else { minspace=0;}
						if(disks[ddk].grouptype.includes("mirror") ==true || disks[ddk].grouptype.includes("stripe")==true) {dd["2"]=disks[ddk]}

					}
				}	
				if(runningroup.includes('stripe') ){
					poolmsg="Pool p1 can be expanded by adding disk"+dd["1"].id+" (no redundancy) or mirrored. please select from below"
						$("#poolmsg").text(poolmsg);
					$("#Addstriped").show(); $("#Addreadcache").show(); $("#Addwritecache").show()
						$("#Addstripedsize").text(maxspace+"GB"); if(minspace > 0) {$("#Attachmirrored").show(); $("#Attachmirroredsize").text(minspace+"GB")};

				}
				if(runningroup.includes('mirror')  && minspace > 0) {
					poolmsg="Pool p1 can be more redundant by adding disk"+dd["1"].id+"  mirrored. please select from below"
						$("#poolmsg").text(poolmsg);
					$("#Attachmirrored").show(); $("#Attachmirroredsize").text(minspace+"GB");
					if(sparevalid==1) { $("#Addspare").show();}
					$("#Addreadcache").show(); $("#Addwritecache").show()

				}
				if(runningroup.includes('stripe') !=true) {
					poolmsg="Pool p1 performance can be increased by adding cache using disk"+dd["1"].id+"please select from below"
						if(sparevalid==1) { $("#Addspare").show();poolmsg="Pool p1 performance or recoverability can be increased by adding cache or spare using disk"+dd["1"].id+"please select from below"}
							$("#Addreadcache").show(); $("#Addwritecache").show()

				}
			}
		}
		if(possiblenotstripe>1 && runningpool!=0) {
			selectingdisks4=0;
			maxspace=0
				for(ddk in disks){
					if(disks[ddk].grouptype!=" " && ddk >= 0){
						maxspace=maxspace+parseInt(disks[ddk].size)
							minspace=parseInt(pool.size);
					}
				}	
			if(runningroup.includes('stripe') ){
				poolmsg="Pool p1 can be expanded by adding disk"
					for(ddk in dd) { if(ddk >= 0){ maxspace=maxspace+parseInt(dd[ddk].size);poolmsg=poolmsg+dd[ddk].id+", "}}
						$("#poolmsg").text(poolmsg.slice(0,-2)+" (no redundancy)  please select from below");
				$("#Addstriped").show();$("#Addreadcache").show();$("#Addwritecache").show()
					$("#AddStripesize").text(maxspace+"GB"); 
			}
			if(runningroup.includes('stripe') !=true  && possiblenotstripe==2) {
				maxspace=parseInt(dd["1"].size);
				poolmsg="Pool p1 can be expanded by adding a pair of mirrored disks using disks: "
					for(ddk in dd) { 
						if(ddk >= 0){ 
							if(parseInt(dd[ddk].size) <= maxspace){ 
								maxspace=parseInt(dd[ddk].size) 
							}
							poolmsg=poolmsg+dd[ddk].id+", "

						}
					}
				minspace=minspace+maxspace;
				$("#poolmsg").text(poolmsg.slice(0,-2)+" (no redundancy)  please select from below");
				$("#Addmirror").show();
				$("#Addmirrorsize").text("GB"); 

			}
			if(runningroup.includes('stripe') !=true && possiblenotstripe==3) {
				poolmsg="Pool p1 can be expanded by adding a single redunancy group of disks using disk "
					minspace=parseInt(dd["1"].size); maxspace=0;
				for(ddk in dd){
					if (ddk >= 0) {
						if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}	
							poolmsg=poolmsg+dd[ddk].id+", ";	

					}
				}
				for(ddk in disks) { if(disks[ddk].group!= -1){ maxspace=parseInt(disks[ddk].size)}}
					$("#addraid-SingleRed").show();
				$("#poolmsg").text(poolmsg.slice(0,-2)+" please select from below");
				$("#addSingleRed").text((maxspace+(minspace*2))+"GB"); 

			}
			if(runningroup.includes('stripe') !=true && possiblenotstripe==4) {
				poolmsg="Pool p1 can be expanded by adding a single/Dual redundancy group of disks using disk "
					minspace=parseInt(dd["1"].size); maxspace=0;
				for(ddk in dd){
					if (ddk >= 0) {
						if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}	
							poolmsg=poolmsg+dd[ddk].id+", ";

					}
				}
				for(ddk in disks) { if(disks[ddk].group!=-1){ maxspace=parseInt(pools["size"])}}
					$("#addraid-SingleRed").show();$("#addraid-DualRed").show();
				$("#poolmsg").text(poolmsg.slice(0,-2)+" please select from below");
				$("#addSingleRed").text((maxspace+(minspace*3))+"GB"); $("#adddualraid").text((maxspace+(minspace*2))+"GB");

			}
			if(runningroup.includes('stripe') != true && possiblenotstripe>4) {
				poolmsg="Pool p1 can be expanded by adding a single/Dual or Triple redunancy group of disks using disk "
					minspace=parseInt(dd["1"].size); maxspace=0;
				var diskcount=0;
				for(ddk in dd){
					if (ddk >= 0) {
						if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}	
							diskcount=diskcount+1;
						poolmsg=poolmsg+dd[ddk].id+", ";

					}
				}
				for(ddk in disks) { if(disks[ddk].group != -1){ maxspace=parseInt(pools['size'])}}
					$("#addraid-SingleRed").show();$("#addraid-DualRed").show();$("#addraid-TripleRed").show();
				$("#poolmsg").text(poolmsg.slice(0,-2)+" please select from below");
				$("#addSingleRed").text((maxspace+(minspace*(diskcount-1)))+"GB"); $("#adddualraid").text((maxspace+(minspace*(diskcount-2)))+"GB"); $("#addtripleraid").text((maxspace+(minspace*(diskcount-3)))+"GB"); 

			}
		}
	}
	if((possiblenotstripe==0 ) && runningpool!=0) { 
		$("#DG tr").hide(); $("#Pooldelete").show();
		for (id in disks) {
			if(disks[id]["group"]!= -1 ) {
				selectingdisks2=disks[id].grouptype;
				if(selectingdisks2=="cache"){ selectingdisks2="read cache"}
				if(selectingdisks2=="log"){ selectingdisks2="read/write cache"}

					selectingdisks=disks[id]["grouptype"]
					diskid=toggleDiskselect(selectingdisks,2,"inpool");

				selectingdisks=toggleDiskselect(selectingdisks,disks[id]["selected"],"Inpool");
			}

		}
		dp=[]
			dp.push("hi")
			selectingdisks="Pool consists of Disks: ,"

			for (id in disks ) {
				if(disks[id]["group"]!= -1 && dp.indexOf(disks[id]["id"]) < 0) {

					dp.push(disks[id]["id"])
						for (k in disks ) {
							if (disks[id]["group"]==disks[k]["group"]) {
								selectingdisks=selectingdisks.slice(0,-1)+', '+disks[k]["id"]+')'
									dp.push(disks[k]["id"])

							}

						}
					selectingdisks=selectingdisks.slice(0,-1)+" in "+disks[id]['grouptype'].split('-')[0].replace("'",'')+','
						$("#poolsize").text(parseFloat(pools["size"]));
					$(".disk"+id).addClass(disks[id].grouptype);

				}				
				selectingdisks2=selectingdisks.slice(0,-1).replace("raid1","single disk redundancy"); 
				var selectingdisks3=selectingdisks2.replace("raid2","dual disk redundancy"); 
				var selectingdisks4=selectingdisks3.replace("raid3","triple disk redundancy");
				$("#poolmsg").text(selectingdisks4);
			}
		if(possiblenotstripe==0 && runningpool==0) { $("#DG tr").hide(); $("#poolmsg").text("No pool is created... Please create a pool by selecting disks")};
	}
}
function hostclick(name) {
	currenthost=name;
	$(".SelectedFree").removeClass("SelectedFree")
		$.each(disks,function(k,v){ disks[k]["selected"]=0 });
	dcomp=[]
		$("#DG tr").hide()
		$('.disks').hide()
		$('.disks.free').show()
		$('.poolmember').hide()
		$('.poolmember.'+name).show()
		$('.disks.'+currenthost).show()
}
function poolclick(name,k) {
	currentpool=name;
	icurrentpool=k;
	pool=name
		$(".SelectedFree").removeClass("SelectedFree")
		$.each(disks,function(k,v){ disks[k]["selected"]=0 });
	dcomp=[]
		$("#DG tr").hide()
		$('.disks').hide()
		$('.disks.'+currenthost).show()
		$('.disks.'+currenthost+'.pree').show()
		$('.disks.busy').hide()
		if (name != 'pree'){
			$("#poolname").text(currentpool)
				$("#poolsize").text(pools[icurrentpool].size)
				$("#Pooldelete").show();
		}
}
function diskclick(id) { 
	var selectingdisks;
	syscounter2=800
		$(".disk"+id).toggleClass("SelectedFree"); 
	if($(".disk"+id).hasClass("SelectedFree")) {
		disks[id]["selected"]=1;
	} else { disks[id]["selected"]=0; 	}
	setaction();
}

function toggleDiskselect(ddd,sel,webclass) {
	var nextdisk="notavailable"

		for (k in disks){

			if (disks[k]["group"]==ddd) {
				if(sel==1){ 
					$(".disk"+k).addClass(webclass); disks[k]["selected"]=1;
				} 
				if(sel==0) {

					$(".disk"+k).removeClass(webclass); disks[k]["selected"]=0;
				}
			} 
		}
}

function refresh2(textareaid) {

	$.get("requestdata2.php", { file: 'Data/'+textareaid+'.log' }, function(data){
		$('#'+textareaid).val(data);
	});
}	;


var config = 1;
$("[class*='xdsoft']").hide();
$(".DiskGroups").hide(); $(".SnapShots").hide(); 
function diskrefresh(){
			$.post("./pump.php", { req: "Diskrefresh.py", name:"refresh "+" "+myname});
};
function pooladdlog(){
	var userpriv="false";
	var curuser=myname;
	$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
		var gdata = jQuery.parseJSON(data);
		for (var prot in gdata){
			if(gdata[prot].user==myname) {
				userpriv=gdata[prot].DiskGroups
			}
		};

		if(userpriv=="true" | curuser=="admin" ) { 

			//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
			$.post("./pump.php", { req: "DGsetPool.py", name:"addlog " + myname+" "+dd[1].host+" "+dd[1].name+" "+dd[1].id, passwd:currentpool+' '+currenthost});
			syscounter2=980;  

		}
	});
};
function pooladdcache(){
	var userpriv="false";
	var curuser=myname;
	$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
		var gdata = jQuery.parseJSON(data);
		for (var prot in gdata){
			if(gdata[prot].user==myname) {
				userpriv=gdata[prot].DiskGroups
			}
		};

		if(userpriv=="true" | curuser=="admin" ) { 

			//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
			$.post("./pump.php", { req: "DGsetPool.py", name:"addcache " +myname+" "+dd[1].host+" "+dd[1].name+" "+dd[1].id , passwd:currentpool+' '+currenthost});
			syscounter2=980;  

		}
	});
};
function pooladdspare(){
	var userpriv="false";
	var curuser=myname;
	$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
		var gdata = jQuery.parseJSON(data);
		for (var prot in gdata){
			if(gdata[prot].user==myname) {
				userpriv=gdata[prot].DiskGroups
			}
		};

		if(userpriv=="true" | curuser=="admin" ) { 

			$.post("./pump.php", { req: "DGsetPool.py", name:"addspare " + myname+" "+dd[1].host+" "+dd[1].name+" "+dd[1].id+" ", passwd: currentpool+' '+currenthost});
			syscounter2=980;  

		}
	});
};

function pooldelspecial(){
	var userpriv="false";
	var curuser=myname;
	$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
		var gdata = jQuery.parseJSON(data);
		for (var prot in gdata){
			if(gdata[prot].user==myname) {
				userpriv=gdata[prot].DiskGroups
			}
		};

		if(userpriv=="true" | curuser=="admin" ) { 

			$.post("./pump.php", { req: "DGsetPool.py", name:"delspecial " + myname+" "+dd[1].host+" "+dd[1].name+" "+dd[1].id, passwd:pool+' '+currenthost});
			syscounter2=0;  

		}
	});
};
function poolcreatesingle(){
	var userpriv="false";
	var curuser=myname;
 if(userpriv=="true" | curuser=="admin" ) { 

			$.post("./pump.php", { req: "DGsetPool.py", name:"Single " + myname+" "+dd[1].host+" "+dd[1].name+" "+dd[1].id,passwd:"nopool"+' '+myname+" "+currenthost});
			syscounter2=980;  

 }
};
function pooladdraidtriple(){
	var userpriv="false";
	var curuser=myname;
	$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
		var gdata = jQuery.parseJSON(data);
		for (var prot in gdata){
			if(gdata[prot].user==myname) {
				userpriv=gdata[prot].DiskGroups
			}
		};

		if(userpriv=="true" | curuser=="admin" ) { 
			var stripeset=dd["1"].host+" "
				for(var k in dd) {
					if(k >= 0){
						stripeset=stripeset+dd[k].name+" "
							stripeset=stripeset+dd[k].name+":"+dd[k].id+" "					 
					}		
				}

			//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
			$.post("./pump.php", { req: "DGsetPool.py", name:"addparity3 " + myname+" "+stripeset,passwd:currentpool+' '+currenthost});

			syscounter2=980;  

		}
	});


}
function poolcreateraidtriple(){
	var userpriv="false";
	var curuser=myname;
	$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
		var gdata = jQuery.parseJSON(data);
		for (var prot in gdata){
			if(gdata[prot].user==myname) {
				userpriv=gdata[prot].DiskGroups
			}
		};

		if(userpriv=="true" | curuser=="admin" ) { 
			var stripeset=dd["1"].host+" "
				for(var k in dd) {
					if(k >= 0){
						stripeset=stripeset+dd[k].name+":"+dd[k].id+" "
					}		
				}

			//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
			$.post("./pump.php", { req: "DGsetPool.py", name:"parity3 " + myname+" "+stripeset,passwd:"nopool"+' '+currenthost });

			syscounter2=980;  

		}
	});


}
function pooladdraiddual(){
	var userpriv="false";
	var curuser=myname;
			var stripeset=dd["1"].host+" "
				for(var k in dd) {
					if(k > 0){
						stripeset=stripeset+dd[k].name+":"+dd[k].id+" "		
					}		
				}
			$.post("./pump.php", { req: "DGsetPool.py", name:"addparity2 " + myname+" "+stripeset,passwd:currentpool+' '+currenthost});

			syscounter2=980;  

}
function poolcreateraiddual(){
	var userpriv="false";
	var curuser=myname;
			var stripeset=dd["1"].host+" "
				for(var k in dd) {
					if(k > 0){
						stripeset=stripeset+dd[k].name+":"+dd[k].id+" "
					}		
				}

			$.post("./pump.php", { req: "DGsetPool.py", name:"parity2 " + myname+" "+stripeset,passwd:"nopool" +' '+currenthost});

			syscounter2=980;  


}
function pooladdraidsingle(){
	var userpriv="false";
	var curuser=myname;
			var stripeset=dd["1"].host+" "
				for(var k in dd) {
					if(k > 0){
						stripeset=stripeset+dd[k].name+":"+dd[k].id+" "		
					}		
				}

			$.post("./pump.php", { req: "DGsetPool.py", name:"addparity " + myname+" "+stripeset,passwd:currentpool+' '+currenthost });

			syscounter2=980;  

}
function poolcreateraidsingle(){
	var userpriv="false";
	var curuser=myname;
			var stripeset=dd["1"].host+" "
				for(var k in dd) {
					if(k > 0){
						stripeset=stripeset+dd[k].name+":"+dd[k].id+" "		
					}		
				}
console.log('raidsingle')
			$.post("./pump.php", { req: "DGsetPool.py", name:"parity " + myname+" "+stripeset,passwd:"nopool "+currenthost });

			syscounter2=980;  

}
function pooladdstripe(){
	var userpriv="false";
	var curuser=myname;
			$.post("./pump.php", { req: "DGsetPool.py", name:"add " +myname+' '+currenthost+' '+dd[2].name+' '+dd[2].id,passwd:currentpool+' '+currenthost+" "+myname });

			syscounter2=980;  

};
function poolcreatestripe(){
	var userpriv="false";
	var curuser=myname;
			var stripeset=dd["1"].host+" "
				$.each(dd,function(k,v) {
					if(k >0){
						stripeset=stripeset+dd[k].name+":"+dd[k].id+" "			
					}
				});

			$.post("./pump.php", { req: "DGsetPool.py", name:"stripeset " + myname+" "+stripeset,passwd:"nopool"+' '+currenthost+" "+myname });

			syscounter2=980;  

};
function pooladdmirror(){

	var userpriv="false";
	var curuser=myname;
			$.post("./pump.php", { req: "DGsetPool.py", name:"addmirror " + myname+" "+dd["1"].host+" "+dd["1"].name+":"+dd["1"].id+" "+dd["2"].name+":"+dd["2"].id, passwd:currentpool+' '+currenthost+" "+myname});

			syscounter2=980;  

}
function poolattachemirror(){

	var userpriv="false";
	var curuser=myname;
			$.post("./pump.php", { req: "DGsetPool.py", name:"attachmirror " + myname+" "+dd["1"].host+" "+dd["1"].name+" "+dd["1"].id+" "+dd["2"].name+" "+dd["2"].id, passwd:currentpool+' '+currenthost+" "+myname});

			syscounter2=980;  
}
function poolcreatemirror() {
	var userpriv="false";
	var curuser=myname;
			$.post("./pump.php", { req: "DGsetPool.py", name:"mirror " + myname+" "+dd[1].host+" "+dd[1].name+":"+dd[1].id+" "+dd[2].name+":"+dd[2].id, passwd: "nopool"+' '+currenthost+" "+myname});

              console.log('hi',dd[1].name,dd[1].id,dd[2].name,dd[2].id,currenthost)
			syscounter2=980;  

}
$("#SnapShots").click(function (){ 
	if(config== 1){ 
		var userpriv="false";
		var curuser=myname;
				config = 0; status="snaps"; $("h2").css("background-image","url('img/snapshot.png')").text("SnapShots"); Vollisttime="44:333:22";times= { "snaps":"30:43:433", "periods":"30:43:433" }; $(".ullis").hide();$(".finish").show();$(".SnapShots").show();
				$("#Vol").change();
			}
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
	var selection=$("#Vol option:selected").val();
	$(".snapshot").hide();
	$(".snapperiod").hide();
	//	$("#Snapshot").prop("selectedIndex",'-1');
	$(".snapshot."+selection).show();
	$(".snapperiod."+snapsel+'.'+selection).show();
	//$('#Vol option.'+selection+':first').prop('selected', true);

});


$("#Pool").change(function () {

	var selection=$("#Pool option:selected").val();

	$(".volume").hide();
	$("#Vol").prop("selectedIndex",'-1');
	$(".volume."+selection).show();
	$('#Vol option.'+selection+':first').prop('selected', true);
	$("#Vol").change();
		/*			if(plotflag > 0 ) {
			plotb.destroy();
									}
					plotchart('chartNFS',chartdata[$("#Pool2").val()]);
			*/


});
function diskgetsize(fileloc,spanid1,spanid2,spanid3) {
	$.post("./pump.php", { req:"DiskSize", name:fileloc, passwd:myname }, function(data1){
		$.get("requestdata.php", { file: fileloc }, function(data){
			var jdata = jQuery.parseJSON(data);
			$(spanid1).text(jdata.size);$(spanid2).text(jdata.count);$(spanid3).text(jdata.onedisk);
			$("#R10").text(jdata.R10);$("#R5").text(jdata.R5);$("#R6").text(jdata.R6);

		});

	});
};



$("#submitdiskgroup").click( function (){ $.post("./pump.php", { req:"DGsetPool.py", name:$('input[name=Raidselect]:checked').val()+" "+$('input[name=Raidselect]:checked').attr("id")+" "+myname, passwd:"hihihihi"+currenthost+" "+myname }, function (data){
	refresh2("DGstatus");
});
});

function pooldelete(){
	var userpriv="false";
	var curuser=myname;
	console.log('starting',userpriv,myname)
 if(userpriv=="true" | curuser=="admin" ) { 
	console.log('runing',currentpool,myname,currenthost)

	$.post("./pump.php", { req:"DGdestroyPool.py ", name:currentpool+" "+myname, passwd:currenthost+" "+myname });
        console.log('hi')

	syscounter2=980
 };
};


$("#DeleteSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotDelete", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+myname ,passwd:"myname" }, function (data){
i//	refresh2("Snapsstatus"); $("#Vol").change();	
});
});
$("#RollbackSnapshot").click( function (){ $.post("./pump.php", { req:"SnapShotRollback", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+myname , passwd: "hihihi" }, function (data){
//	refresh2("Snapsstatus"); $("#Vol").change();	
});
});	
function SnapshotDelete(k){ 
console.log($("#Pool").val(),k,myname,'hihihi')
	$.post("./pump.php", { req:"SnapShotDelete.py", name:$("#Pool").val()+" "+" "+$("#Vol").val()+" "+k, passwd:myname }, function (data){
//	refresh2("Snapsstatus"); $("#Vol").change();	
});
};
function SnapshotRollback(k){ 
  console.log($("#Pool").val(),k,myname,'hihihi')
 $.post("./pump.php", { req:"SnapShotRollback.py ", name:$("#Pool").val()+" "+$("#Vol").val()+" "+k , passwd:"myname"}, function (data){
//	refresh2("Snapsstatus"); $("#Vol").change();	
});
};	
function SnapshotPeriodDelete(k){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:k,passwd:myname }, function (data){
//	refresh2("Snapsstatus"); $("#Vol").change();	
});
};
$("#DeleteMinutely").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Minutelylist option:selected").val(), passwd:myname }, function (data){
	refresh2("Snapsstatus"); $("#Vol").change();	
});
});
$("#DeleteWeekly").click( function (){ $.post("./pump.php", { req:"SnapShotPeriodDelete", name:$("#Weeklylist option:selected").val(), passwd:myname }, function (data){
	refresh2("Snapsstatus"); $("#Vol").change();	
});
});
function SnapshotCreate(){ 
	var period=$('input[name=Period]:checked').val();

	var oper="";
	switch(snapsel) {
	case "Once" : oper = $("#Oncename").val();  break;
	case "Hourly": oper = $("#Sminute").val()+" "+$("#Hour").val()+" "+$("#KeepHourly").val(); break;
	case "Minutely": oper = $("#Minute").val()+" "+$("#KeepMinutely").val(); break;
	case "Weekly" : oper = $("#Stime").val()+" "+$("#Week option:selected").val()+" "+$("#KeepWeekly").val(); break;
}
oper =$("#Pool option:selected").val()+" "+$("#Vol option:selected").val()+" "+oper
console.log(snapsel,oper+" "+myname)
$.post("./pump.php", { req:"SnapshotCreate.py "+snapsel, name: oper, passwd:myname }, function (data){
//	refresh2("Snapsstatus"); $("#Vol").change();	
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


//			$("#Stime").timepicker({
//								appendWidgetTo: 'body',
//               minuteStep: 1,
//								showMeridian: false,////

//            });

setInterval("refreshall()",500);
//refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
//refreshList("GetSnaplist",".Snaplist","Data/listsnaps.txt","snaps","snaps");
//refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods","periods");
$.post("./pump.php", { req: "GetPoolperiodlist", name:"a",passwd:"hihihihi" });
$.post("./pump.php", { req: "GetPoolVollist", name:"a",passwd:"hihihi" });
$.post("./pump.php", { req: "GetSnaplist", name:"a",passwd:"hihihihi" });
function starting() {
	$(".ullis").hide();
	if(config == 1 ) {
		var userprivDiskGroups="false"; var userprivSnapShots="false";
		var curuser=myname;
		if (curuser !="admin") {
			$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
				var gdata = jQuery.parseJSON(data);
				for (var prot in gdata){
					if(gdata[prot].user==myname) {
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
SS();
		</script>


</body>
</html>

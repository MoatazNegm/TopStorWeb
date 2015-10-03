<!DOCTYPE html>
<html>
	<?php include "header.html"; ?>
	<body>

		
<!------------  NAV Bar --------------->
		<div class="container-fluid">
			<div class="row">
				<div class="img-logo ">
					<div class="col-sm-3">
						<a class="pull-left logoimg" href="#">
							<img src="img/logo2.png" height="200" width="200" class="img-responsive"> 
						</a>
					</div>
					<div class="col-sm-6">
						<h1 class="text-center maintext"><strong>Flex Storage</strong></h1>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="">
					<?php $men = 4; include "menu.php"; ?>
					<div class="col-sm-11 rightPane">
						<ul>
							<li><a href="#" disabled="disabled"><h4 id="AD"><span>Active Directory</span></h4></a></li>
							<li><a href="#"><h4 id="UnLin"><span>Unix/Linux users</span></h4></a></li>
							<li><a href="#"><h4 id="Future"><span> .........Future</span></h4></a></li>
						</ul>

						<div class="row AD">
							<div class=" col-sm-offset-1 col-sm-10">
								
									<div class="box ">
										<div class="row">
											<h2 class="configTitle">Active Directory</h2>
										</div>									
										<form class="form-horizontal " role="form">
											<div class="row">
												<div class="  col-sm-4 ">
													<div class=" form-group row">
														<label  for="DomWork" class="col-sm-5 control-label">Domain/Workgroup</label>
														<div class=" col-sm-6">
															<input type="text" id="DomWork" class="form-control " placeholder="Dom/workgroup">
														</div>
													</div>
													<div class=" form-group row ">
														<label  for="Admin" class="col-sm-5 control-label">Administrator</label>
														<div class=" col-sm-6">
															<input type="text" id="Admin" class="form-control " placeholder="Admin name">
														</div>
													</div>
													<div class=" form-group row ">
														<label  for="Pass" class="col-sm-5 control-label">Passwored</label>
														<div class=" col-sm-6">
															<input type="password" id="Pass" class="form-control " placeholder="Admin password">
														</div>
													</div>
												</div>
												<div class="  col-sm-2">
													<div class="form-group row">
														<label  for="type" class="control-label col-sm-3 ">Type</label>
														<div class="col-sm-9">
															<select id="type"  class="form-control">
																<option value="Domain" selected >Domain</option>
																<option value="Workgroup"  >Workgroup</option>
															</select>
														</div>
													</div>
													<div class="form-group row">
														<div class="row">
															<button type="button" class="btn btn-default col-sm-offset-3 col-sm-7 submitb" data-toggle="tooltip" data-placement="top" title="submit values">Submit</button>
														</div>
													</div>
												</div>
												<div class=" col-sm-6">
													<div class=" form-group row">
														<div class=" col-sm-12">
															<textarea class="form-control" rows="3"></textarea>
														</div>
														<div class="row">
															<button type="button" class="btn btn-default col-sm-offset-3 col-sm-7 finish" data-toggle="tooltip" data-placement="bottom" title="close window">Finish</button>
														</div>
													</div>
												</div>
											</div>
											
											
										 
										</form>
										
									</div>				
							</div>
						</div>
						
						<div class="row UnLin">
							<div class=" col-sm-offset-1 col-sm-10">
								
									<div class="box ">
										<div class="row">
											<h2 class="configTitle"></h2>
										</div>									
										<form class="form-horizontal " role="form">
											<div class="row">
												<div class="  col-sm-4 ">
													<div class=" form-group row">
														<label  for="User" class="col-sm-5 control-label">User</label>
														<div class=" col-sm-6">
															<input type="text" id="User" class="form-control " placeholder="user name">
														</div>
													</div>
													<div class=" form-group row ">
														<label  for="UserList" class="col-sm-5 control-label"></label>
														<div class=" col-sm-6">
															<textarea rows="3" id="UserList" class="form-control " ></textarea>
														</div>
													</div>
													<div class=" form-group row ">
														<label  for="UserPass" class="col-sm-5 control-label">Passwored</label>
														<div class=" col-sm-6">
															<input type="password" id="UserPass" class="form-control " placeholder="user password">
														</div>
													</div>
												</div>
												<div class="  col-sm-2">
													<div class="form-group row">
														<button type="button" class="btn btn-default  col-sm-10 adduser"  data-toggle="tooltip" data-placement="top" title="add user">Add User</button>
													</div>
													<div class="form-group row">
														<div class="row">
															<button type="button" class="btn btn-default  col-sm-10 "  data-toggle="tooltip" data-placement="top" title="remove user">Remove User</button>
														</div>
													</div>
												</div>
												<div class=" col-sm-6">
													<div class=" form-group row">
														<div class=" col-sm-12">
															<textarea class="form-control" rows="3"></textarea>
														</div>
														<div class="row">
															<button type="button" class="btn btn-default col-sm-offset-3 col-sm-7 finish"  data-toggle="tooltip" data-placement="top" title="close window">Finish</button>
														</div>
													</div>
												</div>
											</div>
											
											
										 
										</form>
										
									</div>				
							</div>
						</div>
						
						<div class="row Future">
							<div class=" col-sm-offset-1 col-sm-10">
								
									<div class="box ">
										<div class="row">
											<h2 class="configTitle"></h2>
										</div>									
										<form class="form-horizontal " role="form">
											<div class="row">
												<div class="  col-sm-4 ">
													<div class=" form-group row">
														<label  for="User" class="col-sm-5 control-label">User</label>
														<div class=" col-sm-6">
															<input type="text" id="User" class="form-control " placeholder="user name">
														</div>
													</div>
													<div class=" form-group row ">
														<label  for="UserList" class="col-sm-5 control-label"></label>
														<div class=" col-sm-6">
															<textarea rows="3" id="UserList" class="form-control " ></textarea>
														</div>
													</div>
													<div class=" form-group row ">
														<label  for="UserPass" class="col-sm-5 control-label">Passwored</label>
														<div class=" col-sm-6">
															<input type="password" id="UserPass" class="form-control " placeholder="user password">
														</div>
													</div>
												</div>
												<div class="  col-sm-2">
													<div class="form-group row">
														<button type="button" class="btn btn-default  col-sm-10 adduser"  data-toggle="tooltip" data-placement="top" title="add user">Add User</button>
													</div>
													<div class="form-group row">
														<div class="row">
															<button type="button" class="btn btn-default  col-sm-10 "  data-toggle="tooltip" data-placement="top" title="remove user">Remove User</button>
														</div>
													</div>
												</div>
												<div class=" col-sm-6">
													<div class=" form-group row">
														<div class=" col-sm-12">
															<textarea class="form-control" rows="3"></textarea>
														</div>
														<div class="row">
															<button type="button" class="btn btn-default col-sm-offset-3 col-sm-7 finish"  data-toggle="tooltip" data-placement="top" title="close window">Finish</button>
														</div>
													</div>
												</div>
											</div>
											
											
										 
										</form>
										
									</div>				
							</div>
						</div>

					</div>
				</div>
			</div>
			
		</div>
			
		<div class="row">
			<footer class="footer"> Errors
			</footer>
		</div>

		<script src="Bootstrap/js/jquery.js"></script>
		<script src="Bootstrap/js/jquery-ui.js"></script>
		<script src="Bootstrap/js/bootstrap.min.js"></script>
		<script>
			var config = 1;
			$(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();
			$("#AD").click(function (){ 
				if(config == 1 ) { config= 0; $("h2").css("background-image","url('img/AD.png')").text("Active Directory"); $(".AD").show(); };});
			$("#UnLin").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/linux.png')").text("Linux/Unix"); $(".UnLin").show();};});
			$("#Future").click(function (){ if(config== 1){ config = 0; $("h2").css("background-image","url('img/future.png')").text("Future"); $(".Future").show();};});
			$(".finish").click(function (){ config = 1; $(".AD").hide(); $(".UnLin").hide(); $(".Future").hide();});
			
		</script>

	</body>

</html>

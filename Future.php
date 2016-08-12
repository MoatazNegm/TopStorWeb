<div class="row Future dialogbox">
	<div class=" col-sm-offset-1 col-sm-10">
		<div class="box ">
			<div class="row">
				<h2 class="configTitle separatortbot" style="margin-top:2px;" >Box Properties</h2>
			</div>									
			<form class="form-horizontal " role="form" data-toggle="validator">
				<div class="row">
					<div class="  col-sm-4 ">
						<div class=" form-group row">
							<label  for="BoxName" class="col-sm-5 control-label">BoxName</label>
							<div class=" col-sm-6">
								<input type="text" id="BoxName" class=" form-control " placeholder="boxname" required>
							</div>
						</div>
						
						
						<div class=" form-group row IPAddress">
							<label  for="IPAddress" class="col-sm-5 control-label">IP Address</label>
							<div class=" col-sm-6">
								<input type="text" id="IPAddress" class="form-control " placeholder="IpAddress" pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" data-error="......invalid ip address" required>
							</div>
						</div>
						
						<div class=" form-group row Gateway ">
							<label  for="Gateway" class="col-sm-5 control-label">Gateway</label>
							<div class=" col-sm-6">
								<input type="text" id="Gateway" class="form-control " placeholder="Gateway" pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" required>
							</div>
							
						
						</div>
						
					</div>
					<div class="  col-sm-3">
						
						<div class=" form-group row DNS">
							<div class="row " >
								<label  for="DNS" class=" col-sm-1 control-label">DNS</label>
								<div class=" col-sm-7">
								<input type="text" id="DNS" class="form-control " pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" placeholder="DNS address" data-error="......invalid ip address" required>
								</div>
							</div> 
							
						</div>
					
						<div class="form-group row">
							<div class="row">
								<button type="button" class="btn btn-default col-sm-offset-2 col-sm-6 submitb" data-toggle="tooltip" data-placement="top" title="submit values" id="DNSsubmit">Submit</button>
							</div>
						</div>
					</div>
					<div class=" col-sm-5">
						<div class=" form-group row">
							<div class=" col-sm-11">
								<textarea id="Futurestatus" class="form-control" rows="3"></textarea>
							</div>
						</div>
						<div class="form-group row">
								<button type="button" class="btn btn-default col-sm-offset-2 col-sm-7 finish" style="margin-top: 0.8rem;" data-toggle="tooltip" data-placement="bottom" title="close window">Finish</button>
						</div>
					</div>
				</div>
			</form>
		</div>				
	</div>
</div>

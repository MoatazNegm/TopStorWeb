<div class="row Future dialogbox">
	<div class=" col-sm-12 boxy colorize " style="height: 42rem; padding: 1rem;">
		<div class="row">
			<h2 class="configTitle separatortbot" style="margin-top:2px;" >Box Properties</h2>
		</div>
		<div class="row">									
			<form class="form-horizontal " style="margin-top: 6rem;" role="form" data-toggle="validator">
				<div class="  col-sm-7">
					<div class=" form-group row">
						<label  for="BoxName" class="col-sm-3 control-label">BoxName</label>
						<div class=" col-sm-4">
							<input type="text" id="BoxName" class=" form-control text-center " placeholder="boxname" required>
						</div>
						<label  for="DNS" class=" col-sm-1 control-label">DNS</label>
						<div class=" col-sm-4">
						<input type="text" id="DNS" class="form-control text-center " pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" placeholder="DNS address" data-error="......invalid ip address" required>
							
						
					</div>
				
					</div>
					<div class=" form-group row IPAddress">
						<label  for="IPAddress" class="col-sm-3 control-label">IP Address</label>
						<div class=" col-sm-4">
							<input type="text" id="IPAddress" class="form-control text-center  " placeholder="IpAddress" pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" data-error="......invalid ip address" required>
						</div>
					</div>
				</div>	
				<div class="  col-sm-5">
					<textarea id="Futurestatus" class="form-control" rows="3"></textarea>
				</div>	
			</form>
		</div>
		<div class="row">
			<form class="form-horizontal " role="form" data-toggle="validator">
				<div class=" Gateway ">
					<div class=" col-sm-7 ">
						<div class=" form-group row ">
							<label  for="Gateway" class="col-sm-3 control-label">Gateway</label>
							<div class=" col-sm-4">
								<input type="text" id="Gateway" class="form-control text-center " placeholder="Gateway" pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" required>
							</div>
						</div>
					</div>
					<div class="col-sm-5">	
						<button type="button" class="btn btn-default form-control " data-toggle="tooltip" data-placement="top" title="submit values" id="DNSsubmit">Submit</button>
					</div>
				</div>
			</form>
		</div>
			</div>
</div>

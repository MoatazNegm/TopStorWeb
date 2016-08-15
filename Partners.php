<div class="row Partners">
	<div class=" boxy colorize "  style="height: 42rem; padding: 1rem;" >
		<div class="row">
			<h2 class="configTitle separatortbot" style="margin-top:2px;" id="SubTitle"></h2>
		</div>
		<div class="row">
			<form class="form-horizontal " role="form" style="margin-top: 6rem;">
				<div class="  col-sm-5 ">
					<div class=" form-group row" >
						<label  for="Partn" class="col-sm-2 control-label">Partner</label>
						<div class=" col-sm-4">
							<input type="text" id="Partn" class="form-control " placeholder="address">
						</div>
						<div class=" col-sm-4">
							<select   id="type" class="form-control" >
								<option>sender</option><option>receiver</option><option>DualWay</option>
							</select>
						</div>
						

					</div>
					<div class="form-group row" >
						<label for="Proxy" class="col-sm-2 control-label" >Proxy</label>
						<div class="col-sm-offset-2 col-sm-2">
							<input type="checkbox" class=" form-control " style="margin-top: 2px;" id="Proxy" value="Proxy">
						</div>
					</div>
					<div id="passphrase"class=" form-group row" >
						<label  for="Pass" class=" col-sm-2 control-label">Passphrase</label>
						<div class=" col-sm-4">
							<input type="text" id="Pass" class="form-control " placeholder="Passphrase">
						</div>
						<label  for="Port" class=" col-sm-2 control-label">Port</label>
						<div class=" col-sm-3">
							<input type="text" id="Port" class="form-control "   disabled>
						</div>
					</div>
				</div>
				<div class="  col-sm-2">
					<div class="form-group row">
						<button id="AddPartner" type="button" class="btn btn-default  col-sm-10 adduser"  data-toggle="tooltip" data-placement="top" title="add partner">Add Partner</button>
					</div>
				</div>
				<div class=" col-sm-5">
					<div class=" form-group row">
						<div class=" col-sm-12">
							<textarea id="Partnersstatus" class="form-control" rows="7"></textarea>
						</div>
						
					</div>
				</div>
			</form>
		</div>
		<div class=" row ">
			<form class="form-horizontal " role="form" >
				<div class="  col-sm-5 ">
					<div class=" form-group row" >
						<label  for="Partnerlist" class="col-sm-2 control-label">List</label>
						<div class=" col-sm-9">
							<select   size="3" id="Partnerlist" class="form-control fonting" ></select>
						</div>
					</div>
				</div>
				<div class="  col-sm-2 ">
					<div class="form-group row">
						<button id="DelPartner" type="button" class="btn btn-default  col-sm-10 "  data-toggle="tooltip" data-placement="top" title="remove Partner">Remove Partner</button>
					</div>
				</div>
			</form>
		</div>
	</div>				
</div>

				


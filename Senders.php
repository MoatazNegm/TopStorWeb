<div class="row Sendersc">
	<div class=" boxy colorize "  style="height: 42rem; padding: 1rem;">
		<div class="row">
			<h2 class="configTitle col-sm-12 separatortbot" style="margin-top:2px;" >Active Directory</h2>
		</div>
		<form class=" form-horizontal"  style="margin-top: 3rem;">								
			<div class="row">
				<div class="  col-sm-12 ">
					<div class="form-group  row">
						<label  for="Poolsend" class="  col-sm-1 control-label  text-center">Pool</label>
						<div class="col-sm-1">
							<select  id="Poolsend" class="  form-control text-center "></select>
						</div>	
						<label  for="Volsend" class=" col-sm-offset-1 col-sm-1 control-label text-center">Vol</label>
						<div class="col-sm-2">
							<select  id="Volsend" class=" form-control text-center">
								<option class="variable text-center">Vol1</option><option class="variable text-center" >Vol2</option>
							</select>
						</div>
					
						<label  for="partnercsend" class=" col-sm-offset-1 col-sm-1 control-label text-center">from</label>
						<div class="col-sm-2 text-center">
							<select  id="partnercsend" class=" form-control text-center"><option>255.255.255.255</option></select>
						</div>
					</div>
				</div>
										</div>
			<div class="row">
				<div class="  col-sm-12 ">
					<div class=" row">
						<div class=" col-sm-offset-7 col-sm-5 " >
							<div class="form-group row">
								<div class=" col-sm-10 ">
									<select   size="5" id="Senderslist" class="form-control  fonting" ></select>
								</div>
							</div>
							<div class="form-group row">
								<div class=" col-sm-10 ">
									<div class="form-group  row">
										<div class="col-sm-offset-1 col-sm-2">
											<button type="button" class="btn btn-default " id="DeleteSnapshotsend" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot">Delete
											</button>
										</div>
										<div class=" col-sm-offset-3 col-sm-5">
											<button type="button" class="btn btn-danger  " id="RollbackSnapshotsend" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot"> Rollback to Snapshot
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="  col-sm-12 ">
					<div class="  row">
						<div class="  col-sm-offset-7 col-sm-5 " >
							<div class=" row">
								<div class=" col-sm-10 ">
									<textarea class="form-control  " id="Sendersstatus" rows="3"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>						
		</form>
	</div>				
</div>
					
						

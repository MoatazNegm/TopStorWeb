<div class="row Replicate">
	<div class=" boxy colorize "  style="height: 42rem; padding: 1rem;">
		<div class="row">
			<h2 class="configTitle col-sm-12  separatortbot" style="margin-top:2px;">Active Directory</h2>
		</div>									
		<form class=" form-horizontal"  style="margin-top: 3rem;">
			<div class="row">
				<div class="  col-sm-12 ">
					<div class="form-group  row">
						<label  for="Pool" class="  col-sm-1 control-label  text-center">Pool</label>
						<div class="col-sm-1">
							<select  id="Pool" class="  form-control text-center "></select>
						</div>	
						<label  for="Vol" class=" col-sm-offset-1 col-sm-1 control-label text-center">Vol</label>
						<div class="col-sm-2">
							<select  id="Vol" class=" form-control text-center">
								<option class="variable text-center">Vol1</option><option class="variable text-center" >Vol2</option>
							</select>
						</div>
					
						<label  for="Partner" class=" col-sm-offset-1 col-sm-1 control-label text-center">To</label>
						<div class="col-sm-2 text-center">
							<select  id="Partner" class=" form-control text-center"><option>255.255.255.255</option></select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div class=" row">
						<div class=" boxoffields col-sm-offset-1 col-sm-1 spacer">
							<span>Period</span>
							<div class="radio">
								<label>
								<input type="radio" name="Period" id="Once" value="Once">Once
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="Period" id="Hourly" value="Hourly">Hourly
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="Period" id="Minutely" value="Minutely">Minutely
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="Period" id="Weekly" value="Weekly">Weekly
								</label>
							</div>
						</div>
						<div class= "  col-sm-5" >
							<form class="form-horizontal  spacer"  role="form">
								<div class="form-group row" id="Onceset" >
									<div class="input-group col-sm-offset-2 col-sm-5 ">
										<label  for="Oncename" class="  control-label ">Snap name </label>
											<input type="text"  id="Oncename" class=" form-control ">
									</div>
									<div class=" col-sm-offset-3" id="disableddiv">
										<button type="button" class="btn btn-default btn-xs   " id="disabled" data-toggle="tooltip" data-placement="bottom" title="TypeSnap" disabled >type snap name
										</button>
									</div>
								</div>
							</form>
							<form role="form" id="Hourlyset">
								<div class=" form-group row ">
									<div class=" col-sm-3">
										<label  for="Sminute" class=" col-sm-offset- control-label">Snap.min</label>
										<input type="number" min="0" max="59" id="Sminute" class="  form-control ">
									</div>
									<div class=" col-sm-3">
										<label  for="Hour" class=" col-sm-offset-2 control-label">Every..hrs</label>
										<input  type="number" min="1" max="23" id="Hour" class="  form-control ">
										
									</div>
									<div class="  col-sm-3">
										<label  for="KeepHourly" class="  control-label">keep:</label>
										<input  type="number" min="1" id="KeepHourly" class="  form-control ">
										</input>
									</div>
										</div>
								<div class="form-group row ">
									<div class="  col-sm-8">
										<select   size="3" id="Hourlylist" class="  separatortop form-control  fonting " ></select>
									</div>
									<button type="button" class="btn btn-default col-sm-offset- col-sm-2 perioddelete" id="DeleteHourly" data-toggle="tooltip" data-placement="bottom" title="DeleteHourly">Delete
									</button>
								</div>
							</form>
									<form role="form" id="Minutelyset">
										<div class=" form-group row ">
											<div class="col-sm-3">
												<label  for="Minute" class=" col-sm-offset- control-label">Every..Min</label>
												<input  type="number" min="1" max="59" id="Minute" class="  form-control ">
												</input>
											</div>
											<div class=" col-sm-3">
												<label  for="KeepMinutely" class=" col-sm-offset- control-label"> keep: </label>
												<input  type="number" min="1" id="KeepMinutely" class="  form-control ">
												</input>
											</div>
										</div>
										<div class="row ">
											<div class="  col-sm-8">
												<select   size="3" id="Minutelylist" class="  separatortop form-control col-sm-4 fonting " ></select>
											</div>
											<button type="button" class="btn btn-default col-sm-offset- col-sm-2 perioddelete" id="DeleteMinutely" data-toggle="tooltip" data-placement="bottom" title="DeleteMinutely">Delete
												</button>
										</div>
									
									</form>
									<form role="form" id="Weeklyset">
										<div class=" form-group row ">
											<div class="col-sm-4  ">
												<label  for="Stime" class=" col-sm-offset- control-label">Snap time:</label>
												<div class="input-group bootstrap-timepicker">
													<input   type="text" id="Stime" class="  form-control "><span class="input-group-addon add-on"><i class="glyphicon glyphicon-time"></i></span>
													</input>
												</div>
											</div>
											<div class="col-sm-3">
												<label  for="Week" class=" col-sm-offset- control-label">Every..Wday</label>
												<select   id="Week" class="  form-control ">
													<option>Sat</option><option>Sun</option><option>Mon</option><option>Tue</option><option>Wed</option><option>Thu</option><option>Fri</option>
												</select>
											</div>
											<div class=" col-sm-3">
												<label  for="KeepWeekly" class=" col-sm-offset- control-label"> keep: </label>
												<input   type="number" min="1" max="25" id="KeepWeekly" class="  form-control ">
												</input>
											</div>
										</div>
										<div class="row ">
											<div class="  col-sm-8">
												<select   size="3" id="Weeklylist" class="  separatortop form-control col-sm-4 fonting " ></select>
											</div>
											<button type="button" class="btn btn-default col-sm-offset- col-sm-2 perioddelete" id="DeleteWeekly" data-toggle="tooltip" data-placement="bottom" title="DeleteWeekly">Delete
												</button>
										</div>
									
									</form>
						</div>
						<div class=" col-sm-5 " >
							<form role="form-horizontal">
								<div class="form-group row">
									<div class=" col-sm-10 ">
							
										<select   size="5" id="Replicatelist" class="form-control  fonting" ></select>
									</div>
								</div>
							</form>
							<form role="form-horizontal">
								<div class="form-group row">
									<div class=" col-sm-10 ">
										<div class="form-group  row">
											<div class="col-sm-2">
												<button type="button" class="btn btn-default " id="DeleteSnapshot" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot">Delete
												</button>
											</div>
											<div class=" col-sm-offset-3 col-sm-5">
												<button type="button" class="btn btn-danger  " id="RollbackSnapshot" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot"> Rollback to Snapshot
												</button>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div class="row">
						<div class=" col-sm-offset-2 col-sm-4">
							<div class=" form-group" id="SnapshotCreatediv">
								<button type="button" class="btn btn-default form-control SnapshotCreate " id="SnapshotCreate" data-toggle="tooltip" data-placement="bottom" title="close window">submit</button>
							</div>
						</div>	
						<div class="  col-sm-offset-1 col-sm-5 " >
							<form role="form-horizontal">
								<div class="form-group row">
									<div class=" col-sm-10 ">
										<textarea class="form-control separatortop " id="Replicatestatus" rows="3"></textarea>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
					
		</form>
	</div>
</div>				
						

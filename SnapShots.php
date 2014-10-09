<div class="row SnapShots">
							<div class=" col-sm-offset-1 col-sm-10">
								<div class="box ">
									<div class="row">
										<h2 class="configTitle col-sm-12">Active Directory</h2>
									</div>									
									<div class="row">
										
										<div class="  col-sm-7 ">
											<div class=" form-group row">
												<label  for="Pool" class=" col-sm-1 control-label">Pool</label>
												<div class=" col-sm-2">
													<select  id="Pool" class="form-control ">
														<option>High</option><option>Low</option>
													</select>
												</div>
											<label  for="Vol" class="col-sm-offset-1 col-sm-1 control-label">Volume</label>
												<div class=" col-sm-3">
													<select  id="Vol" class="form-control ">
														<option>Vol1</option><option>Vol2</option>
													</select>
												</div>
											

											</div>
											<div class=" form-group row"></div>
											<div class="form-group row">
												<div class=" boxoffields col-sm-offset-1 col-sm-2">
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
												<div class= "col-sm-offset-1 col-sm-8">
													<div class=" form-group row " id="Onceset">
														<div class="col-sm-5">
															<button type="submit" class="btn btn-default col-sm-offset-3 col-sm-8 SnapshotCreate" id="OnceNow" data-toggle="tooltip" data-placement="bottom" title="Now"><Strong>Take It Now</Strong>
															</button>
														</div>
													</div>
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
														<div class="row ">
															<div class="  col-sm-8">
																<select   size="3" id="Hourlylist" class="  separatortop form-control col-sm-4  " ></select>
															</div>
															<button type="submit" class="btn btn-default col-sm-offset- col-sm-2 " id="DeleteHourly" data-toggle="tooltip" data-placement="bottom" title="DeleteHourly">Delete
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
																<select   size="3" id="Minutelylist" class="  separatortop form-control col-sm-4  " ></select>
															</div>
															<button type="submit" class="btn btn-default col-sm-offset- col-sm-2 " id="DeleteMinutely" data-toggle="tooltip" data-placement="bottom" title="DeleteMinutely">Delete
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
																<select   size="3" id="Weeklylist" class="  separatortop form-control col-sm-4  " ></select>
															</div>
															<button type="submit" class="btn btn-default col-sm-offset- col-sm-2 " id="DeleteWeekly" data-toggle="tooltip" data-placement="bottom" title="DeleteWeekly">Delete
																</button>
														</div>
													
													</form>
												</div>
											</div>
										</div>
										<div class=" col-sm-5 " >
											<div class="row ">
												<div class=" col-sm-8">
													<select   size="3" id="Snaplist" class="form-control col-sm-4 " ></select>
													
												</div>
												<button type="submit" class="btn btn-default col-sm-offset- col-sm-3 " id="DeleteSnapshot" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot">Delete
												</button>
												
											</div>
												
											
											<div class="row">	
												<div class=" col-sm-11">
													<textarea class="form-control separatortop col-sm-12" id="statusarea3" rows="3"></textarea>
												</div>
											</div>
										</div>
									</div>
										
									<div class=" row">
										<div class=" col-sm-6">
											<div class=" form-group row">
												<button type="submit" class="btn btn-default col-sm-offset-5 col-sm-6 SnapshotCreate " id="SnapshotCreate" data-toggle="tooltip" data-placement="bottom" title="close window">submit</button>
											</div>
										</div>
										
										<div class=" col-sm-6">
											<div class="form-group row ">
													<button type="submit" class="btn btn-default col-sm-offset-3 col-sm-7 finish" data-toggle="tooltip" data-placement="top" title="submit values">Finish</button>
											</div>
										</div>
									</div>
								
							</div>				
						</div>
					
						

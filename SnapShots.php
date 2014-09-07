<div class="row SnapShots">
							<div class=" col-sm-offset-1 col-sm-10">
								<div class="box ">
									<div class="row">
										<h2 class="configTitle">Active Directory</h2>
									</div>									
									<form class="form-horizontal " role="form">
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
												<label  for="Enabled" class="col-sm-offset-1 col-sm-1 control-label">Enabled</label>
													<div class=" col-sm-2">
														<select  id="Enabled" class="form-control ">
															<option>Yes</option><option>No</option>
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
															<label  for="DTime" class=" control-label"> Date and Time</label>
															<div class="row">
																<div class="col-sm-5">
																	<input  id="DTime" class=" col-sm-2 form-control ">
																	</input>
																</div>
															</div>
															
														</div>
														<div id="Hourlyset">
															<div class=" form-group row ">
																<div class="col-sm-4">
																	<label  for="Hour" class=" col-sm-offset-1 control-label"> Start from: </label>
																	<input  id="STime" class="  form-control ">
																	</input>
																</div>
																<div class="col-sm-3">
																	<label  for="STime" class=" col-sm-offset-2 control-label"> Every...hours</label>
																	<input  id="Hour" class="  form-control ">
																	</input>
																</div>
															</div>
														</div>
														<div id="Minutelyset">
															<div class=" form-group row ">
																<div class="col-sm-4">
																	<label  for="SMinute" class=" col-sm-offset-1 control-label"> Start from: </label>
																	<input  id="SMinute" class="  form-control ">
																	</input>
																</div>
																<div class="col-sm-3">
																	<label  for="Minute" class=" col-sm-offset-2 control-label"> Every..Min</label>
																	<input  id="Minute" class="  form-control ">
																	</input>
																</div>
															</div>
														</div>
														<div id="Weeklyset">
															<div class=" form-group row ">
																<div class="col-sm-4">
																	<label  for="SWeek" class=" col-sm-offset-1 control-label"> Start from: </label>
																	<input  id="SWeek" class="  form-control ">
																	</input>
																</div>
																<div class="col-sm-4">
																	<label  for="Week" class=" col-sm-offset-2 control-label"> Every..Wday</label>
																	<select  id="Week" class="  form-control ">
																		<option>Sunday</option><option>Saturday</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class=" col-sm-5">
												<div class=" form-group row">
													<div id="chartCIFS" class="box2" ></div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class=" col-sm-6">
												<div class=" form-group row">
													<button type="submit" class="btn btn-default col-sm-offset-5 col-sm-6 " data-toggle="tooltip" data-placement="bottom" title="close window">submit</button>
												</div>
											</div>
											<div class=" col-sm-6">
												<div class="form-group row ">
														<button type="submit" class="btn btn-default col-sm-offset-3 col-sm-6 finish" data-toggle="tooltip" data-placement="top" title="submit values">Finish</button>
												</div>
											</div>
										</div>
									</form>
								</div>				
							</div>
						</div>

<div class="row Logs"> 


							<div class=" col-sm-offset-1 col-sm-10" >
								<div class="box " id="Popup">
									<div class="row">
										<h2 class="configTitle" id="SubTitle"></h2>
									</div>									
									<div class="row">
										<form role="form" class="col-sm-offset-1" id="Date Range">
														<div class=" form-group row ">
															<div class="col-sm-2 ">
																<label  for="2Stime" class=" col-sm-offset- control-label">Start time</label>
																<div class="input-group bootstrap-timepicker">
																	<input   type="text" id="2Stime" class="  form-control " ><span class="input-group-addon add-on"><i class="glyphicon glyphicon-time"></i></span>
																	</input>
																</div>
															</div>
															<div class="col-sm-4" >
																<label  for="Stime" class=" col-sm-offset- control-label">Date Range</label>
																
																<div  class="input-daterange input-group" id="datepicker">
																	<input id="Stime"  type="text" class=" form-control " name="start" ><span class="input-group-addon">to</span>
																	<input type="text" class="form-control" name="end" />
																	
																</div>
															</div>
														</div>
																											
													</form>

										<form class="form " role="form">
											<div class=" boxoffields col-sm-offset-1 col-sm-2">
												<span>Logs</span>
												<div class="checkbox">
														<label>
														<input type="checkbox" id="INFO" value="info">Info
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox"  id="Warning" value="Warning">Warning
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox" id="error" value="Error">Error
														</label>
												</div>
											</div>
											<div class= "col-sm-offset-1 col-sm-7 ">
												<div class=" boxoffields logswrapper">
													<span>Log</span>
													<textarea id="logsarea" class="form-group"></textarea>
												</div>
												<div class="row"><button type="submit" class="btn btn-default col-sm-offset-2 col-sm-8 finish"  data-toggle="tooltip" data-placement="top" title="close window">Finish</button>
												</div>																
											</div>												
										</form>
									</div>	
								</div>				
							</div>
					

						
					</div>
				

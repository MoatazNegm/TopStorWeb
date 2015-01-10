<div class="row SS">
							<div class=" col-sm-offset-1 col-sm-10">
								<div class="box " id="Popup">
									<div class="row">
										<h2 class="configTitle" id="SubTitle"></h2>
									</div>	
									<form role="form" class="col-sm-offset-1" id="Date Range">
														<div class=" form-group row ">
															<div class="col-sm-2 ">
																<label  for="Stimec" class=" col-sm-offset- control-label">Start time</label>
																<div class="input-group bootstrap-timepicker">
																	<input   type="text" id="Stimec" class="  form-control " ><span class="input-group-addon add-on"><i class="glyphicon glyphicon-time"></i></span>
																	</input>
																</div>
															</div>
															<div class="col-sm-4" >
																<label  for="Sdatec" class=" col-sm-offset- control-label">Date Range</label>
																
																<div  class="input-daterange input-group" id="datepickerc">
																	<input id="Sdatec"  type="text" class=" form-control datec" name="start" ><span class="input-group-addon">to</span>
																	<input type="text" id="Edatec" class="form-control datec" name="end" />
																	
																</div>
															</div>
														</div>
																											
													</form>
								
									<div class="row">
										
										<form class="form " role="form">
											<div class=" boxoffields col-sm-offset-1 col-sm-2 spacer">
												<span>Show Traffic</span>
												<div class="checkbox">
														<label>
														<input type="checkbox" id="bw" class="traffic" value="Bandwidth">Bandwidth
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox" id="rs"  class="traffic" value="read/sec">Read/s
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox" id="ws" class="traffic"  value="Write/s">Write/s
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox" id="svct"  class="traffic"  value="svct">svc_t
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox" id="qlen" class="traffic"  value="qlen">Queue Length
														</label>
												</div>

											</div>
											<div  class= "col-sm-offset-1 col-sm-7 ">
												<div  class="  ">
													
													<div  class="demo-container">
														<div id="chart1" class="demo-placeholder"></div>
													</div>
												</div>
												<div class="row"><button type="submit" class="btn btn-default col-sm-offset-2 col-sm-8 finish"  data-toggle="tooltip" data-placement="top" title="close window">Finish</button>
												</div>														
											</div>
										</form>
									</div>	
								</div>				
							</div>
						</div>


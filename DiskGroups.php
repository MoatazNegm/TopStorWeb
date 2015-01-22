<div class="row DiskGroups">
							<div class=" col-sm-offset-1 col-sm-10">
								<div class="box ">
									<div class="row">
									
										<h2 class="configTitle">Active Directory</h2>
									</div>									
									<div class="row">
										<div id="s" class="col-sm-offset-2 col-sm-8">
											<ul class=" row">
												<li id="runningdik1" class=" col-sm-1"></li>
												<li id="runningdik1" class=" col-sm-offset-1 col-sm-1"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1"></li>
											</ul>
										</div>
									</div>
									<form class="form-horizontal row" role="form">
											<div class="  col-sm-offset-1 col-sm-5">
												<div class="form-group row">
													<table id="raidtabl" class="table table-condensed">
														<tbody class="center-block"> <strong>raw space = <span id="count"></span> x <span id="onedisk"></span>= <span id="size"></span></span>GB</strong> </tbody>
														<th>
															<td><strong>Useable space</strong></td>
															<td><strong>Select</strong></td>
														</th>
														<tr>
															<td ><strong>RAID 10</strong></td>
															<td><span id="Raidz0"></span>GB</td>
															<td> 
																<div class="">
																	<label>
																		<input type="radio" class="radiocontrol" name="Raidselect" id="mirror" value="mirror" checked>
																	</label>
																</div>
															</td>
														</tr>
														<tr>
															<td><strong>RAID 5</strong></td>
															<td><span id="Raidz1"></span>GB</td>
															<td> 
																<div class="">
																	<label>
																		<input type="radio" class="radiocontrol" name="Raidselect" id="raidz" value="raidz" >
																	</label>
																</div>
															</td>
														</tr>
														<tr>
															<td><strong>RAID 6 Enh.</strong></td>
															<td><span id="Raidz2"></span>GB</td>
															<td> 
																<div class="">
																	<label>
																		<input type="radio" class="radiocontrol" name="Raidselect" id="raidz2" value="raidz2" >
																	</label>
																</div>
															</td>
														</tr>
													</table>
													<div class="row">
														<button type="button" id="submitdiskgroup" class="btn btn-default col-sm-offset-3 col-sm-7 " data-toggle="tooltip" data-placement="top" title="submit values">Submit</button>
													</div>
												</div>
											</div>
											<div class=" col-sm-offset-1 col-sm-4">
												<div class=" form-group row ">
													<div id="emptydiv" class="col-sm-12 separator">
													</div>
													<div class=" separator col-sm-12">
														<textarea class="form-control" id="statusarea2" rows="3"></textarea>
													</div>
													<div id="emptydiv" class="col-sm-12"></div>
													<div class="row">
														<button type="button" class="btn btn-default col-sm-offset-2 col-sm-9  finish" data-toggle="tooltip" data-placement="bottom" title="close window">Finish</button>
													</div>
												</div>
											</div>
									</form>
								</div>	
							</div>
						</div>
						

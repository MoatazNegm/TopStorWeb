<div class="row DiskGroups">
							<div class=" col-sm-offset-1 col-sm-10">
								<div class="box ">
									<div class="row">
									
										<h2 class="configTitle">Active Directory</h2>
									</div>									
									<div class="row">
										<div id="s" class="col-sm-offset-2 col-sm-8" style="margin-left: 0px;">
											<ul class=" row">
												<li id="runningdik1" class=" col-sm-1"></li>
												<li id="runningdik1" class=" col-sm-offset-1 col-sm-1" style="margin-left: 0px;"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1" style="margin-left: 0px;"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1" style="margin-left: 0px;"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1" style="margin-left: 0px;"></li>
												<li id="runningdik1" class="col-sm-offset-1 col-sm-1" style="margin-left: 0px;"></li>
											</ul>
										</div>
									</div>
									<form class="form-horizontal row" role="form">
											<div class="  col-sm-offset-1 col-sm-5" style="margin-left: 0px;">
												<div class="form-group row">
													<table id="raidtabl" class="table table-condensed">
														<tbody class="center-block"> <strong>السعة الأساسية=<span id="count"></span><span>X</span> <span id="onedisk"></span>= <span id="size"></span></span>GB</strong> </tbody>
														<th>
															<td><strong>السعة المستعملة</strong></td>
															<td><strong>اختار</strong></td>
														</th>
														<tr>
															<td ><strong>رايد 10</strong></td>
															<td><span id="R10"></span>GB</td>
															<td> 
																<div class="">
																	<label>
																		<input type="radio" class="radiocontrol" name="Raidselect" id="mirror" value="Raid10" checked>
																	</label>
																</div>
															</td>
														</tr>
														<tr>
															<td><strong>رايد 5</strong></td>
															<td><span id="R5"></span>GB</td>
															<td> 
																<div class="">
																	<label>
																		<input type="radio" class="radiocontrol" name="Raidselect" id="raidz1" value="Raid5" >
																	</label>
																</div>
															</td>
														</tr>
														<tr>
															<td><strong>رايد 6 متقدم</strong></td>
															<td><span id="R6"></span>GB</td>
															<td> 
																<div class="">
																	<label>
																		<input type="radio" class="radiocontrol" name="Raidselect" id="raidz2" value="Raid6" >
																	</label>
																</div>
															</td>
														</tr>
													</table>
													<div class="row">
														<button type="button" id="submitdiskgroup" class="btn btn-default col-sm-offset-3 col-sm-7 " data-toggle="tooltip" data-placement="top" title="submit values">إدخال</button>
														<button type="button" id="deletePool" class="btn btn-danger col-sm-offset-3 col-sm-7 " data-toggle="tooltip" data-placement="top" title="submit values">إزالة المجموعة</button>
													</div>
												</div>
											</div>
											<div class=" col-sm-offset-1 col-sm-4" style="margin-left: 0px;">
												<div class=" form-group row ">
													<div id="emptydiv" class="col-sm-12 separator">
													</div>
													<div class=" separator col-sm-12">
														<textarea class="form-control" id="DGstatus" rows="3"></textarea>
													</div>
													<div id="emptydiv" class="col-sm-12"></div>
													<div class="row">
														<button type="button" class="btn btn-default col-sm-offset-2 col-sm-9  finish" data-toggle="tooltip" data-placement="bottom" title="close window">انتهاء</button>
													</div>
												</div>
											</div>
									</form>
								</div>	
							</div>
						</div>
						

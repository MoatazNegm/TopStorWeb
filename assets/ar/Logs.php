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
																<label  for="Stime" class=" col-sm-offset- control-label">وقت البدء</label>
																<div id="startimel" class="input-group bootstrap-timepicker">
																	<input   type="text" id="Stime" class="  form-control timep" ><span class="input-group-addon add-on"><i class="glyphicon glyphicon-time"></i></span>
																	</input>
																</div>
															</div>
															<div class="col-sm-offset-1 col-sm-4" >
																<label  for="Sdate" class=" col-sm-offset- control-label">تاريخ التسجيل</label>
																
																<div  class="input-daterange input-group" id="datepicker">
																	<input id="Sdate"  type="text" class=" form-control datep" name="start" ><span class="input-group-addon">إلى</span>
																	<input type="text" id="Edate" class="form-control datep" name="end" />
																	
																</div>
															</div>
														</div>
																											
													</form>

										<form class="form " role="form">
											<div class=" boxoffields col-sm-offset-1 col-sm-1 spacer">
												<span>السجلات</span>
												<div class="checkbox">
														<label>
														<input type="checkbox" class="checkboxy timep" id="INFO" value="info">معلومة
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox"  class="checkboxy timep" id="Warning" value="Warning">تحذير
														</label>
												</div>
												<div class="checkbox">
														<label>
															<input type="checkbox" id="Error" class="checkboxy timep" value="Error">مشكلة
														</label>
												</div>
											</div>
											<div class= "col-sm-offset- col-sm-8 ">
												<div id="Voldetails"	class="row Paneloption ">
													<div class="col-sm-offset-col-sm-12">
														<div  class="panel panel-default ">
															<!-- Default panel contents -->
															<div id="Volumnamedetails" class="panel-heading">تفصيل السجلات</div>
															<div class="panel-body">
																<form role="form">
																	<div class="row">
																		<div ; class="col-sm-12 scrolled" style="border-left: 10px solid transparent; border-color: transparent;">
																			<table id="Logdetails" class="table table-hover table-condensed narrowtble ">
																				<thead >
																					<tr class="info">
																						<th class="col-sm-3">التاريخ<br></th><th class="col-sm-1">المستخدم<br></th><th class="col-sm-7">التفصيل<br></th>
																					</tr>
																				</thead>
																				<tbody class="">
																				</tbody>
																			</table>
																	</div>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>

												<div class="row"><button type="button" class="btn btn-default col-sm-offset-2 col-sm-8 finish"  data-toggle="tooltip" data-placement="top" title="close window">انتهاء</button>
												</div>																
											</div>												
										</form>
									</div>	
								</div>				
							</div>
					

						
					</div>
				

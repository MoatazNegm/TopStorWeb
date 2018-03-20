<div class="row SnapShots">
							<div class=" col-sm-offset-1 col-sm-10">
								<div class="box ">
									<div class="row">
										<h2 class="configTitle col-sm-12">Active Directory</h2>
									</div>									
									<div class="row">
										
										<div class="  col-sm-7 ">
											<form class=" form-inline row">
												<div class="form-group col-sm-offset-1" style="margin-left: 2px;">
													<label  for="Pool" class="control-label">المجموعة</label>
													<select  id="Pool" class="  form-control ">
														<option>Data</option>
													</select>
												</div>
												<div class="form-group col-sm-offset-2" style="margin-left: 2px;">
													<label  for="Vol" class=" control-label">المجلد</label>
													<select  id="Vol" class=" form-control ">
														<option class="variable">Vol1</option><option class="variable" >Vol2</option>
													</select>
												</div>
											</form>
											<div class=" form-group row"></div>
											<div class="form-group row">
												<div class=" boxoffields col-sm-offset-1 col-sm-2" style="margin-left: 0px;">
													<span>التكرار</span>
													<div class="radio">
															<label>
															<input type="radio" name="Period" id="Once" value="Once">مرة
															</label>
													</div>
													<div class="radio">
															<label>
																<input type="radio" name="Period" id="Hourly" value="Hourly">بالساعة
															</label>
													</div>
													<div class="radio">
															<label>
																<input type="radio" name="Period" id="Minutely" value="Minutely">بالدقيقة
															</label>
													</div>
													<div class="radio">
															<label>
																<input type="radio" name="Period" id="Weekly" value="Weekly">بالإسبوع
															</label>
													</div>

												</div>
												<div class= " col-sm-offset-1 col-sm-8" style="margin-left: 0px;">
													<form class="form-horizontal row spacer" id="Onceset"role="form">
														<div class="form-group">
															<div class="input-group col-sm-offset-2 col-sm-5 " style="margin-left: 0px;">
																<label  for="Oncename" class="  control-label ">اسم اللقطة </label>
																
																<input type="text"  id="Oncename" class=" form-control ">
															</div>
														</div>
														<div class=" col-sm-offset-3" id="disableddiv">
															<button type="button" class="btn btn-default btn-xs   " id="disabled" data-toggle="tooltip" data-placement="bottom" title="TypeSnap" disabled >اكتب اسم اللقطة
															</button>
														</div>
													</form>
													<form role="form" id="Hourlyset">
														<div class=" form-group row ">
															<div class=" col-sm-3">
																<label  for="Sminute" class=" col-sm-offset- control-label">دقيقة</label>
																<input type="number" min="0" max="59" id="Sminute" class="  form-control ">
																
															</div>
															
															<div class=" col-sm-3">
																<label  for="Hour" class=" col-sm-offset-2 control-label">ساعة</label>
																<input  type="number" min="1" max="23" id="Hour" class="  form-control ">
																
															</div>
															<div class="  col-sm-3">
																<label  for="KeepHourly" class="  control-label">احتفاظ</label>
																<input  type="number" min="1" id="KeepHourly" class="  form-control ">
																</input>
															</div>
														</div>
														<div class="row ">
															<div class="  col-sm-8">
																<select   size="3" id="Hourlylist" class="  separatortop form-control col-sm-4 fonting " ></select>
															</div>
															<button type="button" class="btn btn-default col-sm-offset- col-sm-2 perioddelete" id="DeleteHourly" data-toggle="tooltip" data-placement="bottom" title="DeleteHourly">إزالة
																</button>
														</div>
													
													</form>
													<form role="form" id="Minutelyset">
														<div class=" form-group row ">
															<div class="col-sm-3">
																<label  for="Minute" class=" col-sm-offset- control-label">دقيقة</label>
																<input  type="number" min="1" max="59" id="Minute" class="  form-control ">
																</input>
															</div>
															<div class=" col-sm-3">
																<label  for="KeepMinutely" class=" col-sm-offset- control-label"> احتفاظ</label>
																<input  type="number" min="1" id="KeepMinutely" class="  form-control ">
																</input>
															</div>
														</div>
														<div class="row ">
															<div class="  col-sm-8">
																<select   size="3" id="Minutelylist" class="  separatortop form-control col-sm-4 fonting " ></select>
															</div>
															<button type="button" class="btn btn-default col-sm-offset- col-sm-2 perioddelete" id="DeleteMinutely" data-toggle="tooltip" data-placement="bottom" title="DeleteMinutely">إزالة
																</button>
														</div>
													
													</form>
													<form role="form" id="Weeklyset">
														<div class=" form-group row ">
															<div id="timepick" class="col-sm-4  "style="margin-left:1.3rem;">
																<label  for="Stime" class=" col-sm-offset- control-label">ميعاد اللقطة</label>
																<div class="input-group bootstrap-timepicker" style="width: 125%;">
																	<input   type="text" id="Stime" class="  form-control "><span class="input-group-addon add-on"><i class="glyphicon glyphicon-time"></i></span>
																	</input>
																</div>
															</div>
															<div class="col-sm-3" style=" margin-left: 0rem; padding-left: 0px; padding-right: 1.3rem;">
																<label  for="Week" class=" col-sm-offset- control-label">اليوم</label>
																<select   id="Week" class="  form-control ">
																	<option>Sat</option><option>Sun</option><option>Mon</option><option>Tue</option><option>Wed</option><option>Thu</option><option>Fri</option>
																</select>
															</div>
															<div class=" col-sm-3">
																<label  for="KeepWeekly" class=" col-sm-offset- control-label">احتفاظ</label>
																<input   type="number" min="1" max="25" id="KeepWeekly" class="  form-control ">
																</input>
															</div>
														</div>
														<div class="row ">
															<div class="  col-sm-8">
																<select   size="3" id="Weeklylist" class="  separatortop form-control col-sm-4 fonting " ></select>
															</div>
															<button type="button" class="btn btn-default col-sm-offset- col-sm-2 perioddelete" id="DeleteWeekly" data-toggle="tooltip" data-placement="bottom" title="DeleteWeekly">إزالة
																</button>
														</div>
													
													</form>
												</div>
											</div>
										</div>
										<div class=" col-sm-5 " >
											<form role="form">
												<div class="form-group col-sm-11 ">
													<div class=" ">
														<select   size="5" id="Snaplist" class="form-control  fonting" ></select>
														
													</div>
												</div>
												<div class="form-group col-sm-offset-1">
													<button type="button" class="btn btn-default " id="DeleteSnapshot" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot">Delete
													</button>
													<button type="button" class="btn btn-danger col-sm-offset-3 " style="margin-left:0px;" id="RollbackSnapshot" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot"> رجوع إلى اللقطة
													</button>
												</form>
											</div>
												
											
											<div class="row">	
												<div class=" col-sm-11">
													<textarea class="form-control separatortop col-sm-12" id="Snapsstatus" rows="3"></textarea>
												</div>
											</div>
										</div>
									</div>
										
									<div class=" row">
										<div class=" col-sm-6">
											<div class=" form-group row" id="SnapshotCreatediv">
												<button type="button" class="btn btn-default col-sm-offset-5 col-sm-6 SnapshotCreate " id="SnapshotCreate" data-toggle="tooltip" data-placement="bottom" title="close window">إدخال</button>
											</div>
										</div>
										
										<div class=" col-sm-6">
											<div class="form-group row ">
													<button type="button" class="btn btn-default col-sm-offset-3 col-sm-7 finish" data-toggle="tooltip" data-placement="top" title="submit values">انتهاء</button>
											</div>
										</div>
									</div>
								
							</div>				
						</div>
					
						

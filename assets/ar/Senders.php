<div class="row Sendersc">
							<div class=" col-sm-offset-1 col-sm-10">
								<div class="box ">
									<div class="row">
										<h2 class="configTitle col-sm-12">Active Directory</h2>
									</div>									
									<div class="row">
										
										<div class="  col-sm-6 ">
											<form class=" form-inline row">
												<div class="form-group col-sm-offset-1" style="margin-left: 2px;">
													<label  for="Pool" class="control-label">المجموعة</label>
													<select  id="Pool" class="  form-control ">
														<option>Data</option>
													</select>
												</div>
												<div class="form-group col-sm-offset-1" style="margin-left: 2px;">
													<label  for="Volsend" class=" control-label">المجلد</label>
													<select  id="Volsend" class=" form-control ">
														<option class="variable">Vol1</option><option class="variable" >Vol2</option>
													</select>
												</div>
												<div id="partnercsend" class="form-group col-sm-offset-" >
													<label  for="Partnersend" class=" control-label ">المرسل</label>
													<select  id="Partnersend" class=" form-control "><option>255.255.255.255</option></select>
												</div>

											</form>
										</div>
										<div class=" col-sm-6 " >
											<form role="form">
												<div class="form-group col-sm-11 ">
													<div class=" ">
														<select   size="5" id="Senderslist" class="form-control  fonting" ></select>
														
													</div>
												</div>
												<div class="form-group col-sm-offset-1">
													<button type="button" class="btn btn-default " id="DeleteSnapshotsend" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot">إزالة
													</button>
													<button type="button" class="btn btn-danger col-sm-offset-6 " style="margin-left:0px;" id="RollbackSnapshotsend" data-toggle="tooltip" data-placement="bottom" title="DeleteSnapshot"> رجوع إلى اللقطة
													</button>
												</form>
											</div>
												
											
											<div class="row">	
												<div class=" col-sm-11">
													<textarea class="form-control separatortop col-sm-12" id="Sendersstatus" rows="3"></textarea>
												</div>
											</div>
										</div>
									</div>
										
									<div class=" row">
										
										<div class=" col-sm-6">
											<div class="form-group row ">
													<button type="button" id="Senderfinish" class="btn btn-default col-sm-offset-2 col-sm-7 finish" data-toggle="tooltip" data-placement="top" title="submit values">انتهاء</button>
											</div>
										</div>
									</div>
								
							</div>				
						</div>
</div>
					
						

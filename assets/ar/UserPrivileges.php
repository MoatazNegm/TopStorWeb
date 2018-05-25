<div class="row UserPrivileges">
	<div class=" col-sm-offset-1 col-sm-10">
		<div class="box ">
			<div class="row">
				<h2 class="configTitle col-sm-12">إمتياز المستخدم</h2>
			</div>									
			<div class="row">
				<div class="  col-sm-7 ">
					<form class=" form-inline row">
						<div class="form-group col-sm-offset-3 " style="margin-left: 2px;">
							<label  for="UserList" class="control-label ">User</label>
							<select  id="UserList" class="  form-control ">
								<option>Data</option>
							</select>
						</div>
					</form>
					<form class="form " role="form">
					<div class=" row boxoffields col-sm-offset-1  spacer" style="margin-left: 2px;">
						<div class="col-sm-3 ">
							<div class="checkbox ">
									<label>
									<input type="checkbox" class="checkboxy " id="Active_Directory" ><p class="Priv">توصيل بالوندوز</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox"  class="checkboxy" id="Box_Users" value="Warning"><p class="Priv">مستخدمي الجهاز</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="Error" class="checkboxy" value="Error"><p class="Priv">خصائص الجهاز</p>
									</label>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="checkbox">
									<label>
									<input type="checkbox" class="checkboxy" id="Service_Charts" value="info"><p class="Priv">الرسم البياني</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox"  class="checkboxy" id="Logs" value="Warning"><p class="Priv">السجلات</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="CIFS" class="checkboxy" value="Error"><p class="Priv">أقراص ويندوز</p>
									</label>
							</div>
						</div>
						<div class="col-sm-3">
										<div class="checkbox">
												<label>
												<input type="checkbox" class="checkboxy" id="NFS" value="info"><p class="Priv">أقراص لينكس</p>
												</label>
										</div>
										<div class="checkbox">
												<label>
													<input type="checkbox"  class="checkboxy" id="ISCSI" value="Warning"><p class="Priv">أقراص مباشرة</p>
												</label>
										</div>
										<div class="checkbox">
												<label>
													<input type="checkbox" id="DISK_Groups" class="checkboxy" value="Error"><p class="Priv">تكوين الأقراص</p>
												</label>
										</div>
										<div class="checkbox">
												<label>
													<input type="checkbox" id="Licen" class="checkboxy" value="Error"><p class="Priv">رخصة الإرسال</p>
												</label>
										</div>
										
									</div>
						<div class="col-sm-3">
							<div class="checkbox">
									<label>
									<input type="checkbox" class="checkboxy" id="SnapShots" value="info"><p class="Priv">أخذاللقطات</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox"  class="checkboxy" id="User_Priv" value="Warning"><p class="Priv">إمتياز مستخدمي الجهاز</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="Colourize" class="checkboxy" value="Error"><p class="Priv">التلوين</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="Replication" class="checkboxy" value="Replication"><p class="Priv">التكرار</p>
									</label>
							</div>
						</div>

					</div>
				
				</form>
					<div class=" form-group row"></div>
				</div>
				<div class="col-sm-5">	
					<div class=" form-group row"></div>
					<div class=" form-group row"></div>
					<div class=" col-sm-11 spacer">
						<textarea class="form-control separatortop col-sm-12" id="Privstatus" rows="3"></textarea>
					</div>
				</div>
		
			</div>
			<div class=" row">
				<div class=" col-sm-6">
					<div class=" form-group row" id="SnapshotCreatediv">
						<button type="button" class="btn btn-default col-sm-offset-5 col-sm-6 SnapshotCreate " style="margin-left: 2px;" id="SubmitPriv" data-toggle="tooltip" data-placement="bottom" title="close window">إدخال</button>
					</div>
				</div>
				
				<div class=" col-sm-6">
					<div class="form-group row ">
							<button type="button" class="btn btn-default col-sm-offset-3 col-sm-7 finish" style="margin-left: 2px;" data-toggle="tooltip" data-placement="top"  title="submit values">انتهاء</button>
					</div>
				</div>
			</div>
		</div>				
	</div>
</div>
					
						

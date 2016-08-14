<div class="row UserPrivileges">
	<div class=" col-sm-12 boxy "  style="height: 42rem; padding: 1rem;" >
		<div class="row">
			<div class="col-sm-11">
				<h2 class="configTitle colorize separatortbot " style="margin-top:2px;"  id="SubTitle">Active Directory</h2>
			</div>			
			<div class="row">
				<div class="  col-sm-7 ">
					<form class=" form-inline row">
						<div class="form-group col-sm-offset-3 ">
							<label  for="UserList" class="control-label ">User</label>
							<select  id="UserList" class="  form-control ">
								<option>Data</option>
							</select>
						</div>
					</form>
					<form class="form " role="form">
					<div class=" row boxoffields col-sm-offset-1  spacer">
						<div class="col-sm-3 ">
							<div class="checkbox ">
									<label>
									<input type="checkbox" class="checkboxy " id="Active_Directory" ><p class="Priv">Active Directory</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox"  class="checkboxy" id="Box_Users" value="Warning"><p class="Priv">Box Users</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="Error" class="checkboxy" value="Error"><p class="Priv">Box Properties</p>
									</label>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="checkbox">
									<label>
									<input type="checkbox" class="checkboxy" id="Service_Charts" value="info"><p class="Priv">Service Charts</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox"  class="checkboxy" id="Logs" value="Warning"><p class="Priv">Logs</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="CIFS" class="checkboxy" value="Error"><p class="Priv">CIFS</p>
									</label>
							</div>
						</div>
						<div class="col-sm-3">
										<div class="checkbox">
												<label>
												<input type="checkbox" class="checkboxy" id="NFS" value="info"><p class="Priv">NFS</p>
												</label>
										</div>
										<div class="checkbox">
												<label>
													<input type="checkbox"  class="checkboxy" id="ISCSI" value="Warning"><p class="Priv">ISCSI</p>
												</label>
										</div>
										<div class="checkbox">
												<label>
													<input type="checkbox" id="DISK_Groups" class="checkboxy" value="Error"><p class="Priv">DISK Groups</p>
												</label>
										</div>
										<div class="checkbox">
												<label>
													<input type="checkbox" id="Licen" class="checkboxy" value="Error"><p class="Priv"> Proxy License</p>
												</label>
										</div>
										
									</div>
						<div class="col-sm-3">
							<div class="checkbox">
									<label>
									<input type="checkbox" class="checkboxy" id="SnapShots" value="info"><p class="Priv">SnapShots</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox"  class="checkboxy" id="User_Priv" value="Warning"><p class="Priv">User Privileges</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="Colourize" class="checkboxy" value="Error"><p class="Priv">Colourize</p>
									</label>
							</div>
							<div class="checkbox">
									<label>
										<input type="checkbox" id="Replication" class="checkboxy" value="Replication"><p class="Priv">Replication</p>
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
			<div class=" row spacer">
				<div class=" col-sm-offset-2 col-sm-8">
					<div class=" form-group row" id="SnapshotCreatediv">
						<button type="button" class="btn btn-default form-control SnapshotCreate " id="SubmitPriv" data-toggle="tooltip" data-placement="bottom" title="close window">submit</button>
					</div>
				</div>
				
				
			</div>
		</div>				
	</div>
</div>
					
						

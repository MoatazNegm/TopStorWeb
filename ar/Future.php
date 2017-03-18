<div class="row Future">
	<div class=" col-sm-offset-1 col-sm-10">
		<div class="box ">
			<div class="row">
				<h2 class="configTitle">Active Directory</h2>
			</div>									
			<form class="form-horizontal " role="form" data-toggle="validator">
				<div class="row">
					<div class="  col-sm-4 ">
						<div class=" form-group row">
							<label  for="BoxName" class="col-sm-5 control-label">اسم الجهاز</label>
							<div class=" col-sm-6">
								<input type="text" id="BoxName" class=" form-control " placeholder="boxname" required>
							</div>
						</div>
						<div class="form-group row">
							<label  for="network" class=" col-sm-5 control-label  ">الشبكة</label>
							<div class="col-sm-6">
								<select id="network"  class="form-control">
									<option value="2"  >عنوان أتوماتيكي</option>
									<option value="1"  >عنوان ثابت</option>
								</select>
							</div>
						</div>
						
						<div class=" form-group row IPAddress">
							<label  for="IPAddress" class="col-sm-5 control-label">العنوان آي بي</label>
							<div class=" col-sm-6">
								<input type="text" id="IPAddress" class="form-control " placeholder="IpAddress" pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" data-error="......invalid ip address" required>
							</div>
						</div>
						
						<div class=" form-group row Gateway ">
							<label  for="Gateway" class="col-sm-5 control-label">عنوان البوابة</label>
							<div class=" col-sm-6">
								<input type="text" id="Gateway" class="form-control " placeholder="Gateway" pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" required>
							</div>
							
						
						</div>
						
					</div>
					<div class="  col-sm-3">
						
						<div class=" form-group row DNS">
							<div class="row " >
								<label  for="DNS" class=" col-sm-2 control-label">الحافظ للأسماء</label>
								<div class=" col-sm-7">
								<input type="text" id="DNS" class="form-control " pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" placeholder="DNS address" data-error="......invalid ip address" required>
								</div>
							</div> 
							
						</div>
					
						<div class="form-group row">
							<div class="row">
								<button type="button" class="btn btn-default col-sm-offset-2 col-sm-7 submitb" data-toggle="tooltip" data-placement="top" title="submit values" id="DNSsubmit">إدخال</button>
							</div>
						</div>
					</div>
					<div class=" col-sm-5">
						<div class=" form-group row">
							<div class=" col-sm-12">
								<textarea id="Futurestatus" class="form-control" rows="3"></textarea>
							</div>
							<div class="row">
								<button type="button" class="btn btn-default col-sm-offset-3 col-sm-7 finish" data-toggle="tooltip" data-placement="bottom" title="close window">انتهاء</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>				
	</div>
</div>

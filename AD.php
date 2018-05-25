<div class="row AD ">
	<div id="Popup" class=" boxy colorize "  style="height: 42rem; padding: 1rem;" Data-tag=".boxy" Data-id="Popup" Data-textcolor="yes" Data-background="yes" Data-border="yes">
		<div class="row">
			<h2 class="configTitle colorize separatortbot" style="margin-top:2px;"  id="SubTitle"  Data-tag=".configTitle" Data-id="SubTitle" Data-textcolor="yes" Data-background="no" Data-border="no">Active Directory</h2>
		</div>									
		<div class="row">
			<form class="form-horizontal " role="form" style="margin-top: 6rem;">
				<div class=" col-sm-7">
					<div class=" form-group row ">
						<label  for="DomWork" class="col-sm-3 control-label">Domain/Workgroup
						</label>
							<div class=" col-sm-4">
								<input type="text"  class="form-control text-center  colorize" id="DomName" Data-tag="input" Data-id="inputs" Data-textcolor="yes" Data-background="yes" Data-border="yes"  value="Sampel type">
							</div>

						<label  for="Domtype"  class="control-label col-sm-1 colorize"  Data-tag="select" Data-id="droplist">Type
						</label>
						<div class="col-sm-4">
							<select id="Domtype"  class="form-control text-center colorize " value="Workgroup">
								<option value="Domain"  >Domain</option>
								<option value="Workgroup" selected >Workgroup</option>
							</select>
						</div>
					</div>
					<div class=" form-group row">
							<label  for="DCserver" class="col-sm-3 control-label">DC server</label>
							<div class=" col-sm-4">
								<input type="text"  class="form-control text-center colorize" id="DCserver" Data-tag="DomainServer" Data-id="inputs" Data-textcolor="yes" Data-background="yes" Data-border="yes"  value="Domain Server">
							</div>
						</div>
					<div class=" form-group row ">
						<label  for="Admin" class="col-sm-3 control-label">Administrator</label>
						<div class=" col-sm-4">
							<input type="text" id="Admin" class="form-control text-center " value="sample input">
						</div>
					</div>
				</div>	
				<div class=" col-sm-5">
					<textarea class="form-control colorize" id="ADstatus" Data-id="status" Data-tag="textarea" Data-textcolor="yes" Data-background="no" Data-border="yes" rows="3"> sample status Data </textarea>
				</div>
				
			</form>
		</div>
		<div class="row">
			<form class="form-horizontal " role="form" >
				<div class=" col-sm-7 ">
					<div class=" form-group row ">
					
						<label  for="Pass" class="col-sm-3 control-label">Passwored</label>
						<div class=" col-sm-4">
							<input type="password" id="Pass" class="form-control text-center  " placeholder="Admin password">
						</div>
					</div>
				</div>
				<div class="col-sm-5">
					<button type="button" class="btn btn-default form-control  colorize" id="ADsubmit" Data-tag="button" Data-id="Buttons" Data-textcolor="yes" Data-background="yes" Data-border="yes" data-toggle="tooltip" data-placement="top" title="submit values">Submit</button>
				</div>
			</form>

		</div>
		
		
	</div>
</div>

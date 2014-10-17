<div class="row CIFS">
	<div class=" col-sm-offset-1 col-sm-10">
		<div class="box " id="PopupCIFS">
			<div class="row">
				<h2 class="configTitle" id="SubTitleCIFS">Active Directory</h2>
			</div>									
			<form class="form-inline">
				<div class="form-group col-sm-offset-2">
					<label  for="Pool2CIFS" class="control-label">Pool</label>
					<select  id="Pool2CIFS" class="  form-control ">
						<option>High</option><option>Low</option>
					</select>
				</div>
				<div class="form-group col-sm-offset-2">
					<label  for="Vol2CIFS" class=" control-label">Volumes</label>
					<select  id="Vol2CIFS" class=" form-control ">
						<option class=" small Complete" value="newoption" >--New--</option><option class=" small Complete" value="alloption">--ALL--</option>
					</select>
				</div>
			</form>
			<div id="createvolCIFS" class=" row Paneloption">
				<div class="col-sm-10">
					<form  class="form">
						<div class="col-sm-offset-2">
							<div class="panel panel-default spacer ">
								<div class="panel-heading">Create new Volume </div>
								<div class="panel-body">
									<div class="col-sm-3">
											<label  for="VolnameCIFS" class="  control-label ">Vol name </label>
											<input type="text"  id="VolnameCIFS" class=" form-control ">
										</div>
									<div class="col-sm-2">
										<div class="col-sm-10">
											<label  for="volszieCIFS" class=" control-label">Size..GB</label>
											<input type="text" id="volsizeCIFS" class=" form-control ">
										</div>
									</div>
									<div class="col-sm-3">
										<label  for="button" class="  control-label ">&nbsp;</label>
										<button type="button" class="btn btn-default  form-control " id="CreatevolCIFS" data-toggle="tooltip" data-placement="bottom" title="CreateVol" >Create Volume
										</button>
									</div>
									<div class=" spacer2 col-sm-4">
										<textarea class="form-control" id="statusarea3CIFS" rows="1"></textarea>
									</div>
								</div>
							</div>
						</div>
					</form>		
				</div>
			</div>
			<div id="VollistCIFS"	class="row Paneloption spacer">
				<div class="col-sm-offset-1 col-sm-10">
					<div  class="panel panel-default ">
						<!-- Default panel contents -->
						<div class="panel-heading">All Volumes</div>
						<div class="panel-body">
							<form role="form">
								<div class="row">
									<div class="col-sm-4">
										<table  class="table table-hover table-condensed narrowtble ">
											<thead >
												<tr class="info">
													<th>Volume<br>Name</th><th>Volume<br>Size(GB)</th><th>Actual<br>size(GB)</th><th>Volume<br>Snaps</th>
												</tr>
											</thead>
										</table>
									</div>
									<div  class="col-sm-4">
											<table class="table  table-condensed table-bordered narrowtble  ">
												<thead >
													<tr class=" info">
														<th class="col-sm-4" >Total<br>&nbsp;Size</th><th class="col-sm-4">Actual<br>&nbsp;&nbsp;Size</th><th class="col-sm-4">Total<br>Snaps</th>
													</tr>
												</thead>
											</table>
											
										</div>
									<div class=" col-sm-4">
										<textarea class="form-control" id="statusarea4CIFS" rows="1"></textarea>
									</div>
								</div>
								<div class="row">
									<div  class="col-sm-4 scrolled">
										<table id="VolumetableCIFS" class="table table-hover table-condensed narrowtble ">
											<tbody class="">
												<tr onclick="rowisclicked(this)">
													<td>Homes</td><td>5000</td><td>3500</td><td>5</td>
												</tr>
												<tr onclick="rowisclicked(this)">
													<td>SQL</td><td>2</td><td>.4</td><td>20</td>
												</tr>
												<tr onclick="rowisclicked(this)">
													<td>temp</td><td>1</td><td>.1</td><td>3</td>
												</tr>
												<tr onclick="rowisclicked(this)">
													<td>temp</td><td>1</td><td>.1</td><td>34</td>
												</tr>
												<tr onclick="rowisclicked(this)">
													<td>temp</td><td>1</td><td>.1</td><td>3</td>
												</tr>
												<tr onclick="rowisclicked(this)">
													<td>temp</td><td>1</td><td>.1</td><td>4</td>
												</tr>
												<tr onclick="rowisclicked(this)">
													<td>temp</td><td>1</td><td>.1</td><td>55</td>
												</tr>
												<tr onclick="rowisclicked(this)">
													<td>temp</td><td>1</td><td>.1</td><td>54</td>
												</tr>
											</tbody>
										</table>
								</div>
									<div ; class="col-sm-4 ">
										<div>
											<table class="table table-condensed table-bordered narrowtble  ">
												<tbody>
												 	<tr  id="totalsCIFS">
														<td class="col-sm-4" id="aCIFS">0.00</td><td class="col-sm-4"  id="bCIFS">0.00</td><td class="col-sm-4" id="cCIFS">0.00</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div  class="col-sm-4" class="chart"  >
										<div id="chartCIFS" ></div>
									</div>
								</div>
								<div class="row">
									<div  id="VoldeleteCIFS" class="col-sm-offset-1 spacer-sm">
										<button type="submit" class="btn btn-default  col-sm-2 "   data-toggle="tooltip" data-placement="bottom" title="DeleteVol">Delete Vol
										</button>
									</div>
									<div class=" col-sm-offset-1 spacer-sm" id="disableddiv2CIFS">
															<button type="button" class="btn btn-default btn-sm  " id="disabledCIFS" data-toggle="tooltip" data-placement="bottom" title="TypeSnap" disabled >to delete select only one
															</button>
									</div>
									
								</div>

							</form>
						
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>

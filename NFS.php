<div class="row NFS">
							
	<div class=" col-sm-offset-1 col-sm-10">
		<div class="box " id="Popup">
			<div class="row">
				<h2 class="configTitle" id="SubTitle">Active Directory</h2>
			</div>									
			<form class="form-inline">
				<div class="form-group col-sm-offset-2">
					<label  for="Pool2" class="control-label">Pool</label>
					<select  id="Pool2" class="  form-control ">
						<option>High</option><option>Low</option>
					</select>
				</div>
				<div class="form-group col-sm-offset-2">
					<label  for="Vol2" class=" control-label">Volumes</label>
					<select  id="Vol2" class=" form-control ">
						<option class=" small" value="newoption" ><<New>></New></option><option class=" small" value="alloption"><<ALL>></option>
					</select>
				</div>
			</form>
			</form>
			<div id="createvol" class=" row Paneloption">
				<div class="col-sm-10">
					<form  class="form">
						<div class="col-sm-offset-2">
							<div class="panel panel-default spacer ">
								<div class="panel-heading">Create new Volume </div>
								<div class="panel-body">
									<div class="col-sm-3">
											<label  for="Volname" class="  control-label ">Vol name </label>
											<input type="text"  id="Volname" class=" form-control ">
										</div>
									<div class="col-sm-2">
										<div class="col-sm-10">
											<label  for="volszie" class=" control-label">Size..GB</label>
											<input type="text" id="volsize" class=" form-control ">
										</div>
									</div>
									<div class="col-sm-3">
										<label  for="button" class="  control-label ">&nbsp;</label>
										<button type="button" class="btn btn-default  form-control " id="Createvol" data-toggle="tooltip" data-placement="bottom" title="CreateVol" >Create Volume
										</button>
									</div>
									<div class=" spacer2 col-sm-4">
										<textarea class="form-control" id="statusarea3" rows="1"></textarea>
									</div>
								</div>
							</div>
						</div>
					</form>		
				</div>
			</div>
			<div id="Vollist"	class="row Paneloption spacer">
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
									<div id="y"; class="col-sm-4">
											<table class="table  table-condensed table-bordered narrowtble  ">
												<thead >
													<tr class=" info">
														<th class="col-sm-4" >Total<br>&nbsp;Size</th><th class="col-sm-4">Actual<br>&nbsp;&nbsp;Size</th><th class="col-sm-4">Total<br>Snaps</th>
													</tr>
												</thead>
											</table>
											
										</div>
									<div class=" col-sm-4">
										<textarea class="form-control" id="statusarea4" rows="1"></textarea>
									</div>
								</div>
								<div class="row">
									<div id="k"; class="col-sm-4 scrolled">
										<table id="Volumetable" class="table table-hover table-condensed narrowtble ">
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
									<div id="y"; class="col-sm-4 ">
										<div>
											<table class="table table-condensed table-bordered narrowtble  ">
												<tbody>
												 	<tr  id="totals">
														<td class="col-sm-4" id="a">0.00</td><td class="col-sm-4"  id="b">0.00</td><td class="col-sm-4" id="c">0.00</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-offset-1 spacer-sm">
										<button type="submit" class="btn btn-default  col-sm-2 " id="Voldelete" data-toggle="tooltip" data-placement="bottom" title="DeleteVol">Delete Vol
										</button>
									</div>
								</div>

							</form>
						
						</div>
					</div>
				</div>
			</div>
			<div id="Voldetails"	class="row Paneloption spacer">
				<div class="col-sm-offset-1 col-sm-10">
					<div  class="panel panel-default ">
						<!-- Default panel contents -->
						<div id="Volumnamedetails" class="panel-heading">All Volumes</div>
						<div class="panel-body">
							<form role="form">
								<div class="row">
									<div ; class="col-sm-12 scrolled">
										<table id="Volumedetails" class="table table-hover table-condensed narrowtble ">
											<thead >
												<tr class="info">
													<th>Volume<br>Size(GB)</th><th>Actual<br>size(GB)</th><th>Volume<br>Snaps</th><th>total<br>used</th><th>creation<br>date</th><th>free<br>space</th><th>compression<br>ratio</th><th>dedupe<br>ratio</th>
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
		</div>
	</div>
</div>
									
								


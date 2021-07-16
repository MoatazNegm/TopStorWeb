<div class="row dialogbox NFS">
							
	<div class=" col-sm-12 boxy "  style="height: 42rem; padding: 1rem;" >
		<div class="row">
			<div class="col-sm-11">
				<h2 class="configTitle colorize separatortbot " style="margin-top:2px;"  id="SubTitle">Active Directory</h2>
			</div>
			<div class="col-sm-1">
				<div id="refresh2" type="button" class="btn-default btn-circle" style="margin-top: 2px; background: transparent; border: 0px; max-width: 30x; max-height: 30px;";> 
														<a href="#" class="pull-right btn btn-default btn-circle " style="width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.42;
  border-radius: 15px;"> <i class="glyphicon glyphicon-refresh"></i>
  </a>
															</div>
			</div>
		</div>
		<div class="row">
			<form class="form-horizontal " role="form" style="margin-top: 3rem;">
				<div class=" col-sm-offset-1 col-sm-5">
					<div class="form-group row">
						<label  for="Pool2" class="col-sm-2 control-label">Pool</label>
						<div class="col-sm-5">
							<select id="Pool2" class="  form-control "></select>
						</div>
					</div>
				</div>
				<div class=" col-sm-offset-1 col-sm-5">
					<div class="form-group row">
						<label  for="Pool2" class="col-sm-4 col-sm-2 control-label">Volumes</label>
						<div class="col-sm-5">
							<select  id="Vol2" class="  form-control ">
								<option class=" small Complete New" value="newoption" >--New--</option><option class=" small Complete" value="alloption">--ALL--</option>
							</select>
						</div>
					</div>
				</div>
			</form>
		</div>	
		<div id="createvol" class=" row Paneloption spacer">
			<form class="form-horizontal " role="form" style=";">
				<div class=" col-sm-6">
					<div class="form-group rows spacer ">
						<label  for="Volname" class=" col-sm-3 control-label ">Vol name </label>
						<div class="col-sm-4">
							<input type="text"  id="Volname" class=" form-control ">
						</div>
						<label  for="volszie" class=" col-sm-3 control-label">Size..GB</label>
						<div class="col-sm-2">
							<input type="text" id="volsize" class=" form-control ">
						</div>	
					</div>
					<div class="form-group rows spacer ">
						<div class="col-sm-offset-1 col-sm-11">
							<button type="button" class="btn btn-default  form-control " id="Createvol" data-toggle="tooltip" data-placement="bottom" title="CreateVol" >Create Volume</button>
						</div>
					</div>
				</div>
				<div class=" col-sm-5">
					<textarea class="form-control " id="statusarea3" rows="4"></textarea>
				</div>
			</form>
		</div>
		<div id="Vollist"	class="row Paneloption ">
			<div class="col-sm-offset-1 col-sm-10">
				<div  class="panel  ">
					<!-- Default panel contents -->
					<div class="panel-heading pheading colorize" Data-tag=".pheading" Data-id="PanelHeading" >All Volumes</div>
					<div class="panel-body pbody colorize" Data-tag=".pbody" Data-id="PanelBody" >
						<form role="form">
							<div class="row">
								<div class="col-sm-8">
									<table  class="table table-hover table-condensed narrowtble  colorize " Data-tag=".theader" Data-id="tableHeader" >
										<thead  >
											<tr class="info ">
												<th class="theader" >Volume<br>Name</th><th class="theader">Volume<br>Size(MB)</th><th class="theader">Actual<br>size(MB)</th><th class="theader">Snaps<br>size(MB)</th><th class="theader">Compres<br>ratio(%)</th>
											</tr>
											<tr class="info">
												<th class="colorize" Data-tag=".tcol" Data-id="tablerow">Colorize row</th>
												<th class="colorize" Data-tag=".success .tcol" Data-id="row selected">colorize selected row</th>
											</tr>
										</thead>
									</table>
								</div>
								<div id="y"; class="col-sm-4">
										<table class="table  table-condensed table-bordered narrowtble  ">
											<thead >
												<tr class=" info">
													<th class="col-sm-4 theader"  >Total<br>&nbsp;Size</th><th class="col-sm-4 theader">Actual<br>&nbsp;&nbsp;Size</th><th class="col-sm-4 theader">Total<br>Snapsizes</th>
												</tr>
											</thead>
										</table>
										
									</div>
							</div>
							<div class="row">
								<div id="k"; class="col-sm-8 scrolled">
									<table id="Volumetable" class="table table-hover table-condensed narrowtble ">
										<tbody  class="">
											<tr class="trow" onclick="rowisclicked(this)">
												<td class="tcol" >Homes</td><td class="tcol">5000</td><td class="tcol">3500</td><td class="tcol">5</td>
											</tr>
											<tr class="trow success" onclick="rowisclicked(this)">
												<td class="tcol">SQL</td><td class="tcol">2</td class="tcol"><td class="tcol">.4</td><td class="tcol">20</td>
											</tr>
											<tr class="trow" onclick="rowisclicked(this)">
												<td class="tcol">temp</td><td class="tcol">1</td><td class="tcol">.1</td><td class="tcol">3</td>
											</tr>
											<tr class="trow" onclick="rowisclicked(this)">
												<td class="tcol">temp</td><td class="tcol">1</td><td class="tcol">.1</td><td class="tcol">34</td>
											</tr>
											<tr class="trow" onclick="rowisclicked(this)">
												<td class="tcol">temp</td><td class="tcol">1</td><td class="tcol">.1</td><td class="tcol">3</td>
											</tr>
											<tr class="trow" onclick="rowisclicked(this)">
												<td class="tcol">temp</td><td class="tcol">1</td><td class="tcol">.1</td><td class="tcol">4</td>
											</tr>
											<tr class="trow" onclick="rowisclicked(this)">
												<td class="tcol">temp</td><td class="tcol">1</td><td class="tcol">.1</td><td class="tcol">55</td>
											</tr>
											<tr class="trow" onclick="rowisclicked(this)">
												<td class="tcol">temp</td><td class="tcol">1</td><td class="tcol">.1</td><td class="tcol">54</td>
											</tr>
										</tbody>
									</table>
							</div>
								<div id="y"; class=" col-sm-4">
									<div>
										<table class="table table-condensed table-bordered narrowtble  ">
											<tbody>
												<tr  id="totals">
													<td class="col-sm-4" id="a">0.00</td><td class="col-sm-4"  id="b">0.00</td><td class="col-sm-4" id="c">0.00</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div  class="" class="chart"  >
										<div id="chartNFS" ></div>
									</div>

								</div>
								
							</div>
							<div class="row">
								<div  id="Voldelete" class="col-sm-offset-3 spacer-sm">
									<button type="button" id="VoldeleteButton" class="btn btn-default  col-sm-2 "   data-toggle="tooltip" data-placement="bottom" title="DeleteVol">Delete Vol
									</button>
								</div>
								<div class=" col-sm-offset-3 spacer-sm" id="disableddiv2">
														<button type="button" class="btn btn-default btn-sm  " id="disabled" data-toggle="tooltip" data-placement="bottom" title="TypeSnap" disabled >to delete select only one
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
												<th>Volume<br>Size(MB)</th><th>Actual<br>Size(MB)</th><th>Volume<br>Snaps(MB)</th><th>Total<br>Used(MB)</th><th>Creation<br>Date</th><th>Free<br>Space(MB)</th><th>Compression<br>Ratio</th><th>Dedupe<br>state</th>
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
									
								

									

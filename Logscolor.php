<div class="row Logs dialogbox"> 


							<div class=" col-sm-offset-- col-sm-12" >
								<div class="boxx statusbox colorize" Data-tag=".statusbox" Data-id="statusbox" id="Popuplog">
									<div class="row">
										<h2 class="configTitle separatortbot col-sm-12" style="margin-top:2px;" id="SubTitle"></h2>
									</div>									
											<div id="Voldetails"	class="row Paneloption ">
												<div  class="col-sm-offset-1 col-sm-10 panel ">
										        <!-- Default panel contents -->
												    <div id="Volumnamedetails" class=" panel-heading pheading  colorize " Data-tag=".pheading" Data-id="panel-heading" Data-textcolor="yes" Data-background="yes" Data-border="yes"style="">
													   <form class="form-inline "style="margin-top: -1%;margin-bottom: -1%;" role="form">	
														<div class="form-group heading"  style="width: 3%"></div>
														<div class="form-group heading" class="cheading" style="width: 30%">
															<label   class="form-label heading" for="dater">Date:</label>
															<input type="date" class="form-control colorize input-sm headingdate" Data-tag=".headingdate" Data-id="headingdate" style="padding-left: 2px; padding-right: 0px; width: 38%;" id="dater" >
														</div>
														<div class="form-group heading"  style="width: 9%">
															<input type="checkbox" class="heading" id="INFO" value="info" checked >Info
														</div>
														<div class="form-group heading" style="width: 9%">
															<input type="checkbox"  class="heading" id="Warning" value="Warning" checked >Warning
														</div>
														<div class="form-group heading"  style="width: 9%">
															<input type="checkbox" class="heading" id="Error"  value="Error" checked >Error
														</div>
														<div class="form-group heading" style="width: 12%">
															<label   class="form-label- heading" for="lines">lines:</label>
															<input type="number" min="10" max="50" class="form-control input-sm heading" id="lines" style="padding-left: 2px; padding-right: 0px; width: 33%" value="10">
														</div>
														<div class="form-group " style="width: 12%">
															<ul class=" pager" style=''>
																<li><a id="pnext" href="#" class=" pull-right glyphicon glyphicon-chevron-right" style="font-size: 50%; "></a></li>
																<li><a id="pprev" href="#" class=" pull-right glyphicon glyphicon-chevron-left" style="font-size: 50%;"></a></li>
															</ul>
														</div>
														<div class="form-group " style="width: 5%"></div>
														<div class="form-group " style="width: 5%">
															<button id="refresh" type="button" class="btn-default btn-circle" style="border: 0; max-width: 30x; max-height: 30px;";> 
														<a href="#" class="pull-right btn btn-default btn-circle " style="width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.42;
  border-radius: 15px;"> <i class="glyphicon glyphicon-refresh"></i></a>
															</button>
														</div>
													  </form>
													</div>
													<div class="panel-body pbody">
															<form role="form">
																<div class="row">
																	 <div ; class="col-sm-12 pre-scrollable" style="max-height: 120 px; min-height: 100px;">
																		<table id="Logdetails" class="table table-hover table-condensed narrowtble colorize" Data-tag=".logheader" Data-id="LogHeader">
																			<thead >
																				<tr class="info">
																					<th class="col-sm-3 logheader">date and time<br></th ><th class="col-sm-1 logheader">user<br></th><th class="col-sm-7 logheader">data<br></th>
																				</tr>
																				<tr class="">
																					<th class="colorize" Data-tag=".info" Data-id="LogINFO">Colorize info</th>
																				
																					<th class="colorize" Data-tag=".warning" Data-id="LogWARNING">Colorize warning</th>
																				
																					<th class="colorize" Data-tag=".error" Data-id="LogERROR">Colorize error</th>
																				</tr>
																			</thead>
																			<tbody class="">
<tr class="datarow trown info" ><td class="Volname info tcoln col/-sm-3"data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >info</td><td class="col-sm-1 info tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >info</td><td class="col-sm-7 info tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >info</td></tr>
<tr class="datarow trown warning" ><td class="Volname warning tcoln col/-sm-3"data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >warning</td><td class="col-sm-1 warning tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >warning</td><td class="col-sm-7 warning tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >warning</td></tr>
<tr class="datarow trown error" ><td class="Volname  error tcoln col/-sm-3"data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >error</td><td class="col-sm-1 error tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >error</td><td class="col-sm-7 error tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >error</td></tr>
<tr class="datarow trown error" ><td class="Volname error tcoln col/-sm-3"data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >error</td><td class="col-sm-1 error tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >error</td><td class="col-sm-7 error tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >error</td></tr>
<tr class="datarow trown warning" ><td class="Volname warning tcoln col/-sm-3"data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >warning</td><td class="col-sm-1 warning tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >warning</td><td class="col-sm-7 warning tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >warning</td></tr>
																		<tr class="datarow trown info" ><td class="Volname info tcoln col/-sm-3"data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >info</td><td class="col-sm-1 info tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container="body" data-content='+objdata+' >info</td><td class="col-sm-7 info tcoln"  data-toggle="popover" rel="popover" data-trigger="hover" data-container=this data-content='+objdata+' >info</td></tr>

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
					

						
				
					
				

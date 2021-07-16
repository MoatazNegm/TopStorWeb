<div class="row NFS">
							
	<div class=" col-sm-offset-1 col-sm-10">
		<div class="box " id="Popup">
			<div class="row">
				<div class="col-sm-11">
					<h2 class="configTitle" id="SubTitle">Active Directory</h2>
				</div>
				<div class=" col-sm-1">
					<button id="refreshb" class="btn btn-default">تنشيط</button>
				</div>								
			</div>
			<form class="form-inline">
				<div class="form-group col-sm-offset-2">
					<label  for="Pool2" class="control-label">مجموعة الأقراص</label>
					<select  id="Pool2" class="  form-control ">
						<option>Data</option>
					</select>
				</div>
				<div class="form-group col-sm-offset-2">
					<label  for="Vol2" class=" control-label">المجلد</label>
					<select  id="Vol2" class=" form-control ">
						<option class=" small Complete New" value="newoption" >--جديد--</option><option class=" small Complete" value="alloption">--الكل--</option>
					</select>
				</div>
			</form>
			
			<div id="createvol" class=" row Paneloption">
				<div class="col-sm-10">
					<form  class="form">
						<div class="col-sm-offset-1">
							<div class="panel panel-default spacer ">
								<div class="panel-heading">مجلد جديد </div>
								<div class="panel-body">
									<div class="col-sm-3">
											<label  for="Volname" class="  control-label ">اسم المجلد </label>
											<input type="text"  id="Volname" class=" form-control ">
										</div>
									<div class="col-sm-2">
										<div class="col-sm-12">
											<label  for="volszie" class=" control-label">سعة..GB</label>
											<input type="text" id="volsize" class=" form-control ">
										</div>
									</div>
									<div class="col-sm-3">
										<label  for="button" class="  control-label ">&nbsp;</label>
										<button type="button" class="btn btn-default  form-control " id="Createvol" data-toggle="tooltip" data-placement="bottom" title="CreateVol" >المجلد
										</button>
									</div>
									<div class=" spacer2 col-sm-4">
										<textarea class="form-control " id="statusarea3" rows="2"></textarea>
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
						<div class="panel-heading">كل المجلدات</div>
						<div class="panel-body">
							<form role="form">
								<div class="row">
									<div class="col-sm-8">
										<table  class="table table-hover table-condensed narrowtble ">
											<thead >
												<tr class="info">
													<th>المجلد<br>اسم</th><th>المجلد<br>سعة(MB)</th><th>الحقيقي<br>السعة(MB)</th><th>لقطات<br>سعة(MB)</th><th>انضغاط<br>نسبة(%)</th>
												</tr>
											</thead>
										</table>
									</div>
									<div id="y"; class="col-sm-4">
											<table class="table  table-condensed table-bordered narrowtble  ">
												<thead >
													<tr class=" info">
														<th class="col-sm-4" >المجموع<br>&nbsp;السعة</th><th class="col-sm-4">حقيقي<br>&nbsp;&nbsp;سعة</th><th class="col-sm-4">مجموع<br>سعة اللقطة</th>
													</tr>
												</thead>
											</table>
											
										</div>
								</div>
								<div class="row">
									<div id="k"; class="col-sm-8 scrolled">
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
															<button type="button" class="btn btn-default btn-sm  " id="disabled" data-toggle="tooltip" data-placement="bottom" title="TypeSnap" disabled >اختار واحدة فقط للإزالة
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
						<div id="Volumnamedetails" class="panel-heading">كل المجلدات</div>
						<div class="panel-body">
							<form role="form">
								<div class="row">
									<div ; class="col-sm-12 scrolled">
										<table id="Volumedetails" class="table table-hover table-condensed narrowtble ">
											<thead >
												<tr class="info">
													<th>المجلد<br>سعة(MB)</th><th>حقيقي<br>سع (MB)</th><th>المجلد<br>اللقطات</th><th>المجموع<br>المستعمل</th><th>التخليق<br>تاريخ</th><th>فارغة<br>مساحة</th><th>انضغاط<br>نسبة</th><th>اللا متكرر<br>نسبة</th>
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
			<div class="row">
				<div class=" col-sm-offset-11">
					
					<button type="button" class=" btn btn-default  finish" data-toggle="tooltip" data-placement="top" title="submit values">انتهاء</button>
					
				</div>
			</div>
		</div>
	</div>
</div>
									
								

									

<div class="row Upload">
	<div class="col-sm-offset-1 col-sm-10" > 
		<div class="box " id="Popup">
			<div class="row">
				<h2 class="configTitle" id="SubTitle">Upload update</h2>
			</div>									
			<div class="row">
	<!-- Standar Form --> 
			<form  action="config.php" method="post" accept-charset='utf-8' enctype="multipart/form-data" id="js-upload-form">
				<div class="form-inline">
					<div class="input-group col-sm-offset-3">
						<div class="col-sm-offset-">
							<input type="file" name="file" class=" " id="js-upload-files" >
						</div>
					</div>
						<button type="submit" class="btn btn-sm btn-primary " id="js-upload-submit">Upload files</button>
				</div>
				<input type="hidden" name="idd" value="<?php print session_id();?>" >
				<input type="hidden" name="fileupload" value="<?php print session_id();?>" >
			</form> 
	<!-- Drop Zone -->
			</div>
			<div class="row spacer"></div>
			<div class="row">
				<div class="col-sm-offset-1 col-sm-11">
					<div class="upload-drop-zone" id="drop-zone"> Just drag and drop file here </div>
				</div>
			</div>
	<!-- Progress Bar --> 
			<div class="row spacer"></div>
			<div class="row">
				<div class="progress col-sm-offset-1 col-sm-9">
					<div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 30%;"> <span class="sr-only percent">20% Complete</span> </div>
				</div>
	<!-- Upload Finished -->
			</div>
			<div class="row spacer"></div>
			<div class="row">
				<div class="js-upload-finished col-sm-offset-4"> <span id="h3msgid" class="h3msg">Processed files</span>
				</div>
				<div class="row">
					<div class="col-sm-offset-4 list-group">
						<a href="#" class="list-group-item list-group-item-success">
							<span id="badgesuccess" class="badge alert-success pull-right">Success</span><span id="filename">image-01.jpg</span></a>
						</a>
					</div>
			</div>
		</div>
		</div>
	</div>
</div> <!-- /container -->

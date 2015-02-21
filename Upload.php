<div class="row Upload">
	<div class="col-sm-offset-1 col-sm-10" > 
		<div class="box " id="Popup">
			<div class="row">
				<h2 class="configTitle" id="SubTitle">Upload update</h2>
			</div>									
			<div class="row">
				<div class="col-sm-offset-2">
					<div class="upload-drop-zone " id="drop-zone"> Just drag and drop file here </div>
					<form action="config.php" class="dropzone" method="post" accept-charset='utf-8' enctype="multipart/form-data" >
						<div class="fallback">
							<input name="file" type="file" >
							<input type="hidden" id="iddfile" name="idd" value="<?php echo session_id() ?>">
							<input type="submit" value="Upload File" >
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div> <!-- /container -->

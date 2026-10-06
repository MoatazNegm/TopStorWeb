 <script src="js/jquery.js"></script>

<script src="js/bootstrap.min.js"></script>
<script src="js/dropzone.js"></script>
<script src="InitColor.js"></script>
<script>
$(document).ready(function() {
	RestoreLastSettings();
});
</script>

<head>
		
		<meta Content="text/html"; charset="utf-8" >
		<meta name="author" content="Mezobuntu1310">
		<title>QuickStor</title>
		<link  rel="stylesheet" href="css/normalize.css" type="text/css">
		<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css" type="text/css">
		<link rel="stylesheet" href="css/bootstrap-timepicker.min.css" type="text/css">
		<link rel="stylesheet" href="css/datepicker3.css" type="text/css">
		<link rel="stylesheet" href="css/jquery.minicolors.css">
		<link rel="stylesheet" href="css/jquery.jqplot.css">
		<link rel="stylesheet" href="css/style.css" type="text/css">
	</head>
<body >
	<div class="colorize" id="body" Data-tag="#body,html" Data-id="body" Data-textcolor="no" Data-background="yes" Data-border="no" Data-backtrans=true >

<!------------  NAV Bar --------------->
		<div class="container-fluid">
			<div class="row " id="caption" >
				<div class="img-logo  ">
					<div class="col-sm-3">
						<a class="pull-left logoimg" href="#">
							<img src="img/logo2.png" height="200" width="200" class="img-responsive"> 
						</a>
					</div>
					<div class="col-sm-6">
						<h1 id="head2" class="text-center maintext colorize" id="Title" Data-tag="#Title" Data-id="Title" Data-textcolor="yes" Data-background="no" Data-border="no" ><strong>Login</strong></h1>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="">
					
					<div class="col-sm-11 rightPane" id="rightPane" Data-tag="#rightPane" Data-id="rightPane" Data-textcolor="yes" Data-background="yes" Data-border="yes">
						<ul>
 
						</ul>
					<div class="row table table-striped files "  id="previews">

  <div id="template" class="file-row">
		</div>
		</div>
    <!-- This is used as the file preview template -->
    <div  >
    <div>
        <span class="preview"><img data-dz-thumbnail /></span>
    </div>
    <div>
        <p class="name " data-dz-name></p>
        <strong class="error text-danger" data-dz-errormessage></strong>
    </div>
    <div class="bar">
        <p class="size" data-dz-size></p>
        <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
        </div>
    </div>
    <div  class="buttons">
      <button  class="btn btn-primary start fileinput-button ">
          <i class="glyphicon glyphicon-upload"></i>
          <span>Start</span>
      </button>
      <button data-dz-remove class="btn btn-warning cancel">
          <i class="glyphicon glyphicon-ban-circle"></i>
          <span>Cancel</span>
      </button>
      <button data-dz-remove class="btn btn-danger delete">
        <i class="glyphicon glyphicon-trash"></i>
        <span>Delete</span>
      </button>
    </div>
  

</div>
 
					</div>
				</div>
			</div>
<!-- HTML heavily inspired by http://blueimp.github.io/jQuery-File-Upload/ -->

</div>
</div>
</body>
<script>

// Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

	
var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
  url: "/target-url", // Set the url
  thumbnailWidth: 80,
  thumbnailHeight: 80,
  parallelUploads: 20,
  uploadMultiple: false,
  previewTemplate: previewTemplate,
  autoQueue: false, // Make sure the files aren't queued until manually added
  previewsContainer: "#previews", // Define the container to display the previews
  clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
});

myDropzone.on("addedfile", function(file) {
  // Hookup the start button
  file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file); };
});

// Update the total progress bar
myDropzone.on("totaluploadprogress", function(progress) {
  document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
});

myDropzone.on("sending", function(file) {
  // Show the total progress bar when upload starts
  document.querySelector("#total-progress").style.opacity = "1";
  // And disable the start button
  file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
});

// Hide the total progress bar when nothing's uploading anymore
myDropzone.on("queuecomplete", function(progress) {
  document.querySelector("#total-progress").style.opacity = "0";
});

// Setup the buttons for all transfers
// The "add files" button doesn't need to be setup because the config
// `clickable` has already been specified.
document.querySelector(".start").onclick = function() {
  myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
};
document.querySelector(" .cancel").onclick = function() {
  myDropzone.removeAllFiles(true);
};

</script>

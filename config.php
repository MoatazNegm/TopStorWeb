<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/des19/Login.php');}
 
?>
<?php
if( $_FILES['file']['name'] != "" )
{
    move_uploaded_file( $_FILES['file']['tmp_name'], "Data/".$_FILES['file']['name']); 
					switch ($_FILES['file']['error']) {
						case UPLOAD_ERR_OK:
								$message = "File uplodaded successfully";
								break;
            case UPLOAD_ERR_INI_SIZE:
                $message = "The uploaded file exceeds the upload_max_filesize directive in php.ini";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $message = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
                break;
            case UPLOAD_ERR_PARTIAL:
                $message = "The uploaded file was only partially uploaded";
                break;
            case UPLOAD_ERR_NO_FILE:
                $message = "No file was uploaded";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                $message = "Missing a temporary folder";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                $message = "Failed to write file to disk";
                break;
            case UPLOAD_ERR_EXTENSION:
                $message = "File upload stopped by extension";
                break;

            default:
                $message = "Unknown upload error";
                break;
				
        }   
       
        

}
else
{
    
    $message = "No file specified !";
    
}
$myfile = fopen("Data/fileupload.txt", "w");
fwrite($myfile, $message);
fclose($myfile);
?>


<html>
	<?php $men=6; include "header.html"; ?>
	
							<li>
								<a href="#" class="UserPrivilegesa rightli"><h4 id="UserPrivileges"><span>User Priviliges</span></h4></a></li>
							<li><a href="#" class="Colourizea rightli"><h4 id="Colourize"><span>Colourize</span></h4></a></li>
							<li><a href="#" class="Uploada rightli"><h4 id="Upload"><span>Upload Firmware</span></h4></a></li>
						</ul>
						<?php include "UserPrivileges.php"; ?>
						<?php include "Upload.php"; ?>
					
					</div>
				</div>
			</div>
			
		<div class="row">
			<footer class="footer"> Errors
			</footer>
		</div>
		<form  id="Colorpls" type="hidden" method="post" action="ColorizeWeb.php">
			<input type="hidden" id="iddcolor" name="idd">
				<input type="hidden" value="Submit">
		</form>	

		<script src="js/bootstrap-timepicker.js"></script>
		<script>
			var needupdate=1
			var proptime="55:55:55";
			var proptimenew="33:333:33";
			var DNS=1;
			$(".UserPrivileges").hide();
			$(".finish").click(function (){ $(".checkboxy").each(function(){ $(this).prop("checked",false)});
																				$(".UserPrivileges").hide(); $(".UserPrivileges").hide();});
			$("#UserPrivileges").click(function (){   
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].User_Priv
							}
						};
					
					if( userpriv=="true" | curuser=="admin" ) {
						$("h2").css("background-image","url('img/Priv.png')").text("User Privileges");  $("option.variable").remove(); proptime="44:333:22";; $(".UserPrivileges").show();refreshall();
					}
				});
			});
			
			$("#Colourize").click(function (){   
				var userpriv="false";
				var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("requestdata.php", { file: 'Data/userpriv.txt' },function(data){ 
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].User_Priv
						}
					};
				
				if( userpriv=="true" | curuser=="admin" ) {
					
					
					$("#iddcolor").val("<?php $men=7; echo session_id() ?>");
					$("#Colorpls").submit();
//					$("h2").css("background-image","url('img/Priv.png')").text("User Privileges");  $("option.variable").remove(); proptime="44:333:22";; $(".UserPrivileges").show();refreshall();
				}
				});
			});
			
			
			function refreshall() {
				DNS=1;
		//	console.log("AD is visible : " , $(".AD").is(":visible"));
			if($(".AD").is(":visible")){
				$.get("requestdata.php", { file: 'Data/status.log' }, function(data){ $("#ADstatus").val(data);});
			}
			else if($(".Future").is(":visible")) {
				$.get("requestdata.php", { file: 'Data/status.log' }, function(data){ $("#Futurestatus").val(data);});
			}
			else if($(".UserPrivileges").is(":visible")) {
				refreshUserList();
				var objdate;
				$.get("requestdatein.php", { file: 'Data/userprivdate.txt' }, function(data){ 
				var objdate = jQuery.parseJSON(data);
				proptimenew=objdate.updated });
				
				if(proptimenew == proptime) { }
				else {
					proptime=proptimenew;
				var gdata;
					$.get("requestdata.php", { file: 'Data/userpriv.txt' }, function(data){ 
						gdata=jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user==$("#UserList option:selected").val()) {
								$.each(gdata[prot], function(key,value){  if(value=="true") $("#"+key).prop('checked',true);});
							}
						}
					});
				}
			}

	}
			function refreshUserList() {
				var jdata;
				
				$.post("./pump.php", { req:"UnixListUsers", name:"a" }, function (data1){ 
					
					$.get("requestdata.php", { file: 'Data/listusers.txt' }, function(data){
						jdata = jQuery.parseJSON(data);
						if(Number($("#UserList option").length)+1 > 0 ) {
							$("#UserList option").each(function (i,v) { 
								for(var key in jdata) { 
									if ( key == this.value) {
										 $(this).toggleClass("dontdelete"); jdata[key]="inin"; 
									} else { 
										;
									} 
								}

							});
						}
						
						for (var key in jdata ) { 
							if(jdata[key] == "o") { $("#UserList").append($("<option class='dontdelete'>").text(key).val(key)); }
						}
					});
												
												;
					$("#UserList option").not(".dontdelete").remove();
					$("#UserList option").toggleClass("dontdelete");
					
				});	
			};
			$("#SubmitPriv").click( function (){ 
				
				sm="user"+" "+$("#UserList option:selected").val()+" ";
				$(".checkboxy").each(function (){ sm=sm+$(this).attr('id')+" "+$(this).prop('checked')+" ";});
				$.post("./pump.php", { req:"Priv", name:sm+" "+"administrator "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 //refresh2("#statusarea2");
		});
	 });
			$("#UserList").change(function(){
				$(".checkboxy").each(function(){ $(this).prop("checked",false)});
				proptime="44:333:22";
				});
			setInterval('refreshall()', 500);
			refreshUserList();
			refreshall();
		</script>
		<script>
			

		$("#drop-zone").dropzone({ url: "config.php" });
		console.log("<?php echo $message ?>");	
		</script>
		
	</body>

</html>

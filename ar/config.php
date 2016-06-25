<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/ar/Login.php');}
 
?>
<?php

if( $_FILES['file']['name'] != "" )
{

    move_uploaded_file( $_FILES['file']['tmp_name'], "../Data/".$_FILES['file']['name']); 
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
$myfile = fopen("../Data/fileupload.txt", "w");
fwrite($myfile, $message);
fclose($myfile);
?>


<html>
	<?php $men=6; include "header.html"; ?>
	
							<li>
								<a href="#" class="UserPrivilegesa rightli"><h4 id="UserPrivileges"><span>امتياز المستخدم</span></h4></a></li>
							<li><a href="#" class="Colourizea rightli"><h4 id="Colourize"><span>التلوين</span></h4></a></li>
							<li><a href="#" class="Uploada rightli"><h4 id="Upload"><span>تحديث النظام</span></h4></a></li>
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

		<script src="../js/bootstrap-timepicker.js"></script>
		<script src="../js/dropzone.js"></script>
		<script>
			var needupdate=1
			var proptime="55:55:55";
			var proptimenew="33:333:33";
			var DNS=1;
			var whichul=0;
			var upresult=0;
			$(".UserPrivileges").hide();$(".Upload").hide();
			$(".finish").click(function (){ whichul = 0; $(".checkboxy").each(function(){ $(this).prop("checked",false)});
																				$(".UserPrivileges").hide(); $(".Upload").hide();});
			$("#UserPrivileges").click(function (){  
				if(whichul==0) {
					var userpriv="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						whichul="#UserPrivileges";
						$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
							var gdata = jQuery.parseJSON(data);
							for (var prot in gdata){
								if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
									userpriv=gdata[prot].User_Priv
								}
							};
						
						if( userpriv=="true" | curuser=="admin" ) {
							$("h2").css("background-image","url('../img/Priv.png')").text("امتياز المستخدم");  $("option.variable").remove(); proptime="44:33233:22";; $(".UserPrivileges").show();refreshall();
						}
					});
				}
			});
			$("#Upload").click(function () {
				if(whichul == 0) {
					whichul="#Upload";
					$("h2").css("background-image","url('../img/Uploadfirmware.png')").text("تحديث النظام");
					$(".dz-preview").remove(); $("#previews").show(); droppls.enable();
					$("div.dz-message").text("نرجو الضغط أو استخدام المؤشر لسحب الملف هنا.");
					$(".Upload").show();
				}
				
				});
			$("#Colourize").click(function (){   
				if(whichul==0) {
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					whichul="#Colourize";
					$.get("requestdata.php", { file: '../Data/userpriv.txt' },function(data){ 
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
					}
			});
			
			
			function refreshall() {
				DNS=1;
								
				$.get("requestdata.php", { file: '../Data/currentinfo2.log2' }, function(data){ $("footer").text(data);});
				refresh2('Privstatus');
			 if($(".UserPrivileges").is(":visible")) {
					refreshUserList();
					var objdate;
					$.get("requestdatein.php", { file: '../Data/userprivdate.txt' }, function(data){ 
					var objdate = jQuery.parseJSON(data);
					proptimenew=objdate.updated });
					
					if(proptimenew == proptime) { }
					else {
						proptime=proptimenew;
					var gdata;
						$.get("requestdata.php", { file: '../Data/userpriv.txt' }, function(data){ 
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
			function refresh2(textareaid) {
				
				$.get("requestdata2.php", { file: '../Data/'+textareaid+'.log' }, function(data){
					$('#'+textareaid).val(data);
					});
			}	;
			function refreshUserList() {
				var jdata;
				
				$.post("./pump.php", { req:"UnixListUsers", name:"a" }, function (data1){ 
					
					$.get("requestdata.php", { file: '../Data/listusers.txt' }, function(data){
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
				proptime="44:54333:232";
				});
			setInterval('refreshall()', 2000);
			refreshUserList();
			refreshall();
		</script>
		<script>
			

/*		var droppls= $("#drop-zone").dropzone({ url: "config.php",
			previewsContainer: '#previews',

			 });
*/		
			var droppls = new Dropzone("#drop-zone",{ url: "upload.php",
			previewsContainer: '#previews',
			uploadMultiple: false,
			maxFilesize: 5,
			clickable: ".clickthis"
			});
			droppls.on("success", function(file,msg) { 
				upresult="success";
				droppls.disable();
				//console.log("file",file,"name",file.name,"path",file.mozFullPath);
				$.post("./pump.php", { req:"GenPatch", name:file.name });
				$(".dz-success-mark").show();$(".dz-error-mark").hide();
				$("div.dz-message").text("File is uploaded.. please, allow some minutes for upgrade");
				
			});
			droppls.on("error", function(file,msg) { 
				upresult="error";
				droppls.disable();
				$("div.dz-message").text("Problem uploading the file");
				$(".dz-success-mark").hide();$(".dz-error-mark").show();
				
			});
		
		 
		</script>
		
	</body>

</html>

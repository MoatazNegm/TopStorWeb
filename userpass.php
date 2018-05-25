<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
?>
<?php $men=1; include "header2.html";?>
   <form type="hidden" id="logagain" method="post" action="/Login.php">
		 <input type="hidden">
   </form>
	<div class="row">
		<div class="col-sm-offset-5 col-sm-3">
			<h4><strong></strong></h4>
				
				<input type="password" name="userPassword1"id="userPassword1"class="form-control passin chat-input centry " placeholder="type password">
				</br>
				<input type="password" name="userPassword" id="userPassword" class="form-control passin chat-input centry " placeholder="type again"  >
				
				</br>
				<div class="wrapper">
					<button type="button" id="wrong" class="col-sm-offset-1 btn btn-primary btn-md" disabled>passwords are not equal
					<button type="button" id="change" class="col-sm-offset-4 btn btn-primary btn-md" >change
					<button type="button" id="changed" class="col-sm-offset-4 btn btn-primary btn-md" >....Wait
						
					</button>
				</div>
			
		</div>
	</div>
	
	<script>
		var passcheck="22:333:33";
		var passchecknew="323:3443:34"
		var passchanged=0;
		function refreshall(){
			$.get("requestdatein.php", { file: "Data/userpass.txtupdated" }, function(data){
				var objdate = jQuery.parseJSON(data);
				passchecknew=objdate.updated;
			});
			if(passchanged==1 && passchecknew != passcheck) { $("#logagain").submit(); }
			else  {  passcheck=passchecknew; }
		}
 $("#head2").text("Change <?php echo $_SESSION["user"] ?> Password");
 $("#wrong").show(); $("#change").hide();$("#changed").hide();
 $(".passin").keyup(function(){
	 
	 if($("#userPassword1").val() != $("#userPassword").val()|| $("#userPassword1").val() =="") {
		$("#wrong").show(); $("#change").hide();
	 }
	 else {
		 $("#wrong").hide(); $("#change").show();
	 }
	});
 $("#change").click(function() {
	 var passchecknew="34:433:43534";
	 $.post("./pump.php", { req:"UnixChangePass", name:"'"+$("#userPassword1").val()+"'", passwd:"<?php echo $_SESSION["user"]; ?>"+" "+"<?php echo $_SESSION["user"]; ?>"}, function (data){});
	 //console.log("'"+$("#userPassword1").val()+"'","<?php echo $_SESSION["user"]; ?>");
	 passchanged=1;
	 $("#change").hide(); $("#changed").show();
	 
	});
	 setInterval('refreshall()', 1000);

</script>




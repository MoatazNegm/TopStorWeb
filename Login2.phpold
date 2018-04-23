

<!--Pulling Awesome Font --> 
<?php $men=2; include "header2.html"; ?>

<?php 
 $usern=$_POST["userName"];
 $passwd=$_POST["userPassword"];
 $isuser="Data/isuser.txt";
 $timeone=filemtime($isuser);
 shell_exec("./pump.sh "."UnixPrepUser"." ".$usern."chk ".$passwd);
 session_start();

 if($usern === "mezo") { ;} else { ;}
  if( $_REQUEST["idd"] != session_id()) {  header('Location:/Login.php');}
  
 if (empty($_SESSION['count'])) {
   $_SESSION['count'] = 1;
} else {
   $_SESSION['count']++;
}
 //session_commit();

?>

<form id="accounts" action="accounts.php" method="post">
				
	<input type="hidden" name="idd" value="<?php session_regenerate_id(); $_SESSION["user"]=$_POST["userName"]; session_commit();print session_id();?>" >
</form>

	<div class="row">
		<div class="col-sm-offset-5 col-sm-3">
			<h4><strong id="state">Please Wait....</strong></h4>

		</div>
	</div>
	<script src='js/jquery.js'></script>
<script>
	var nochange=2;
	
	function loopingauth() { 
		if( nochange > 1 ) {
			
			$.post("./pump.php", { req: "UnixChkUser", name:"<?php echo $usern ?>"+" chk" }, function (data1){
				$.get("requestdata.php", { file: 'Data/isuser.txt' }, function(data){
					var objdate = jQuery.parseJSON(data);
					var isuser=objdate.name;
					var isok=objdate.status;
					nochange=nochange+1;
					if (isuser==="<?php print $usern ?>" && isok == "ok" ) { 
						
						$("#state").val("OK");
						//console.log("<?php print session_id();?>");
						document.getElementById('accounts').submit();
					} else {
						//console.log("<?php print $usern ?>"," | ", isuser);
						if( nochange > 10 ) {window.location = "/Login.php";}
					};
					
				});
			});
		}
	}
	setInterval('loopingauth()', 500)
	
	
			
</script>

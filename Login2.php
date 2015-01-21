

<!--Pulling Awesome Font --> 
<?php $men=2; include "header2.html"; ?>

<?php 
 $usern=$_POST["userName"];
 $passwd=$_POST["userPassword"];
 $isuser="Data/isuser.txt";
 $timeone=filemtime($isuser);
 shell_exec("./pump.sh "."UnixPrepUser"." ".$usern."chk ".$passwd);
 session_start();
 if($usern === "mezo") { print $usern;} else { print No;}
  if( $_REQUEST["idd"] != session_id()) {  header('Location:/des19/login.php');}
 if (empty($_SESSION['count'])) {
   $_SESSION['count'] = 1;
} else {
   $_SESSION['count']++;
}
 //session_commit();

?>

<form id="accounts" action="accounts.php" method="post">
				
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>

	<div class="row">
		<div class="col-sm-offset-5 col-sm-3">
			<h4><strong id="state"> Wait....<?php  print  $_POST["idd"]; ?></strong></h4>

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
					if (isuser==="<?php $usern ?>" && isok == "ok" ) { 
						$("#state").val("OK");
						//console.log("<?php print session_id();?>");
						document.getElementById('accounts').submit();
						//window.location = "/des19/accounts.php";
					};
					
				});
			});
		}
	}
	setInterval('loopingauth()', 1000)
	
	
			
</script>

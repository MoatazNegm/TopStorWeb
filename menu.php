<?php session_start(); ?>
<form id="accountsref" action="accounts.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="statusref" action="status.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="Protocolref" action="Protocol.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="replicationref" action="replication.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="Poolsref" action="Pools.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="configref" action="config.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
 
	<div class=" col-sm-1 leftPane leftlia">
		<ul class="nav nav-pills nav-stacked config_leftPane_No_border_textcolor leftlia" >
			<li  <?php if($men==1) {echo 'class="active leftli leftlia"';} else { echo 'class="leftli leftlia"';}; ?>><a id="accounts" class="ref leftlia" href='#' ><br>Accounts</a></li>
			<li  <?php if($men==2) {echo 'class="active leftli leftlia"';} else { echo 'class="leftli leftlia"';}; ?>><a id="status" class="ref leftlia" href="#"  ><br>Status</a></li>
			<li <?php if($men==3) {echo 'class="active leftli leftlia"';} else { echo 'class="leftli leftlia"';}; ?>><a id="Protocol" class="ref leftlia"href="#" ><br>Protocol</a></li>
			<li <?php if($men==4) {echo 'class="active leftli leftlia"';} else { echo 'class="leftli leftlia"';}; ?>><a id="replication" class="ref leftlia"href="#" ><br>replication</a></li>
			<li <?php if($men==5) {echo 'class="active leftli leftlia"';} else { echo 'class="leftli leftlia"';}; ?>><a id="Pools" class="ref leftlia"href="#"  ><br>Pools</a></li>
			
			<?php 
				if($men==7){
					echo '<li id="Leftlist" class="active leftli leftlia colorize" Data-tag=".leftlia" Data-id="Leftlist" Data-textcolor="no" Data-background="yes" Data-border="no" ><a class="leftlia" href="#" ><br>colorize</a></li>';
					//echo '<li id="Selections" class="active leftli colorize" Data-tag="li.leftli a"Data-id="Selectoin" Data-textcolor="no" Data-background="yes" Data-border="no" ><a href="#" ><br>selections</a></li>';
				} else if($men==6) {
					echo	'<li class="active leftli leftlia"><a id="config" class="ref leftlia"href="#"   ><br>config</a></li>'	;			
				} else  {
					echo	'<li class=" leftli leftlia"><a id="config" class="ref leftlia"href="#"   ><br>config</a></li>'	;			
				}
			
			?>
		</ul>
	</div>
	<script>
	$(".ref").click(function() {
		document.getElementById($(this).attr('id')+'ref').submit();
		 //console.log($(this).attr('id')+'ref');
		});
	
	</script>



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
 
	<div class=" col-sm-1 leftPane">
		<ul class="nav nav-pills nav-stacked config_leftPane_No_border_textcolor" >
			<li  <?php if($men==1) {echo 'class="active leftli"';} else { echo 'class="leftli"';}; ?>><a id="accounts" class="ref" href='#' ><br>الخصائص</a></li>
			<li  <?php if($men==2) {echo 'class="active leftli"';} else { echo 'class="leftli"';}; ?>><a id="status" class="ref" href="#"  ><br>حالة الخزنة</a></li>
			<li <?php if($men==3) {echo 'class="active leftli"';} else { echo 'class="leftli"';}; ?>><a id="Protocol" class="ref"href="#" ><br>التوصيل</a></li>
			<li <?php if($men==4) {echo 'class="active leftli"';} else { echo 'class="leftli"';}; ?>><a id="replication" class="ref"href="#" ><br>التكرار</a></li>
			<li <?php if($men==5) {echo 'class="active leftli"';} else { echo 'class="leftli"';}; ?>><a id="Pools" class="ref"href="#"  ><br>التجميع</a></li>
			
			<?php 
				if($men==7){
					echo '<li id="Leftlist" class="active leftli colorize" Data-tag="li.leftli"Data-id="Leftlist" Data-textcolor="no" Data-background="yes" Data-border="no" ><a href="#" ><br>التلوين</a></li>';
				} else if($men==6) {
					echo	'<li class="active leftli"><a id="config" class="ref"href="#"   ><br>التكوين</a></li>'	;			
				} else  {
					echo	'<li class=" leftli"><a id="config" class="ref"href="#"   ><br>التكوين</a></li>'	;			
				}
			
			?>
		</ul>
	</div>
	<script>
	$(".ref").click(function() {
		document.getElementById($(this).attr('id')+'ref').submit();
		 console.log($(this).attr('id')+'ref');
		});
	
	</script>



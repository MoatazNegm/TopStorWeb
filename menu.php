

	<div class=" col-sm-1 leftPane">
		<ul class="nav nav-pills nav-stacked config_leftPane_No_border_textcolor" >
			<li <?php if($men==1) {echo 'class="active"';} ?>><a href="accounts.php" ><br>Accounts</a></li>
			<li <?php if($men==2) {echo 'class="active"';} ?>><a href="status.php"  ><br>Status</a></li>
			<li <?php if($men==3) {echo 'class="active"';} ?>><a href="Protocol.php" ><br>Protocol</a></li>
			<li <?php if($men==4) {echo 'class="active"';} ?>><a href="replication.php" ><br>replication</a></li>
			<li <?php if($men==5) {echo 'class="active"';} ?>><a id="Llist" href="Pools.php"  ><br>Pools</a></li>
			
			<?php 
				if($men==6){
					echo '<li id="Leftlist" class="active colorize" Data-id="Leftlist" Data-textcolor="yes" Data-background="yes" Data-border="no" ><a href="#" ><br>colorizePane</a></li>';
				} else {
					echo	'<li ><a href="config.php"  ><br>config</a></li>'	;			
				}
			
			?>
		</ul>
	</div>



<!DOCTYPE html>
<?php $men=2; include "header2.html";  session_start();  session_commit(); ?>
	<div class="row">
		<div class="col-sm-offset-4 col-sm-4">
			<h4><strong></strong></h4>
				<form action="Login2.php" method="post">
				<input type="text" name="userName" class="form-control chat-input centry " placeholder="username">
				</br>
				<input type="password" name="userPassword" class="form-control  chat-input centry " placeholder="password"  >
				<input type="hidden" name="idd" value="<?php print session_id();?>" >
				</br>
				<div class="wrapper">
					<button type="submit" id="logpls" class="col-sm-offset-5 btn btn-primary btn-md" >login
						<i class="fa fa-sign-in"></i> 
					</button>
				</div>
			</form>
		</div>
	</div>
	
	




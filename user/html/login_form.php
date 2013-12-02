<?php
/* DO NOT REMOVE */
if (!defined('QUADODO_IN_SYSTEM')) {
exit;
}
/*****************/
?>
<fieldset>
	<form action="user/login_process.php" method="post" class="">
		<input type="hidden" name="process" value="true" />

        <div class="form-group">
            <label><?php echo USERNAME_LABEL; ?></label>
            <input type="text" class="form-control" name="username" data-ng-model="userModel.email" required="true" maxlength="<?php echo $qls->config['max_username']; ?>"></input>
        </div>
        <div class="form-group">
            <label><?php echo PASSWORD_LABEL; ?></label>
            <input type="password" name="password" class="form-control" data-ng-model="userModel.pwd" required="true" maxlength="<?php echo $qls->config['max_password']; ?>"/>
        </div>
        <div class="form-group">
            <label><?php echo REMEMBER_ME_LABEL; ?></label>
            <input type="checkbox" name="remember" data-ng-model="userModel.remember" value="1" />
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="<?php echo LOGIN_SUBMIT_LABEL; ?>" />
            <a class="pull-right" href="user/register.php">New? Create an Account</a>
        </div>


        <!--<table>
			<tr>
				<td>
					<?php echo USERNAME_LABEL; ?>

				</td>
				<td>
					<input  type="text" name="username" maxlength="<?php echo $qls->config['max_username']; ?>" />
				</td>
			</tr>
			<tr>
				<td>
					<?php echo PASSWORD_LABEL; ?>

				</td>
				<td>
					<input type="password" name="password" maxlength="<?php echo $qls->config['max_password']; ?>" />
				</td>
			</tr>
			<tr>
				<td>
					<?php echo REMEMBER_ME_LABEL; ?>

				</td>
				<td>
					<input type="checkbox" name="remember" value="1" />
				</td>
			</tr>
			<tr>
				<td>
					&nbsp;
				</td>
				<td>
					<input type="submit" value="<?php echo LOGIN_SUBMIT_LABEL; ?>" />
				</td>
			</tr>
		</table>-->
	</form>
</fieldset>
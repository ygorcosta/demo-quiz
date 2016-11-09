const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
var auth = WeDeploy.auth('auth.' + DOMAIN);

function resetPassword() {
	WeDeploy.auth('auth.' + DOMAIN)
		.sendPasswordResetEmail(forgotPassword.email.value)
		.then(function() {
			alert('An email with instructions to reset password should arrive in a few minutes.');
			location.href = '/login.html';
		});
}
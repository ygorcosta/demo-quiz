const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth('auth.' + DOMAIN);

function resetPassword() {
	WeDeploy.auth('auth.' + DOMAIN)
		.sendPasswordResetEmail(forgotPassword.email.value)
		.then(() => {
			alert('An email with instructions to reset password should arrive in a few minutes.');
			location.href = '/login.html';
		});
}

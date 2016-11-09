const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");

function submitForm() {
	WeDeploy.auth('auth.' + DOMAIN)
		.createUser({
			email: signUp.email.value,
			name: signUp.name.value,
			password: signUp.password.value
		})
		.then(function(user) {
			location.href = '/';
		})
		.catch(function() {
			alert('Email already in use. Try another email.');
			signUp.reset();
		});
}

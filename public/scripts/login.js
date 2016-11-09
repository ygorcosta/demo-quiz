const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth('auth.' + DOMAIN);

function signInWithEmailAndPassword() {
	auth.signInWithEmailAndPassword(signIn.email.value, signIn.password.value)
		.then(function() {
			signIn.reset();
		})
		.catch(function() {
			alert('Wrong email or password.');
			signIn.reset();
		});
}

function signInWithGithub() {
	var githubProvider = new auth.provider.Github();
	githubProvider.setProviderScope('email');
	auth.signInWithRedirect(githubProvider);
}

function signInWithGoogle() {
	var googleProvider = new auth.provider.Google();
	googleProvider.setProviderScope('email');
	auth.signInWithRedirect(googleProvider);
}

auth.onSignIn(function(user) {
	location.href = '/';
});

const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth('auth.' + DOMAIN);

function signInWithEmailAndPassword() {
	auth.signInWithEmailAndPassword(signIn.email.value, signIn.password.value)
		.then(() => signIn.reset())
		.catch(() => {
			alert('Wrong email or password.');
			signIn.reset();
		});
}

function signInWithGithub() {
	const githubProvider = new auth.provider.Github();
	githubProvider.setProviderScope('email');
	auth.signInWithRedirect(githubProvider);
}

function signInWithGoogle() {
	const googleProvider = new auth.provider.Google();
	googleProvider.setProviderScope('email');
	auth.signInWithRedirect(googleProvider);
}

auth.onSignIn(function(user) {
	location.href = '/';
});

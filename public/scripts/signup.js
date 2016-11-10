const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth('auth.' + DOMAIN);

function submitForm() {
	const email = signUp.email.value;
  const password = signUp.password.value;

	auth.createUser({
		email: email,
		name: signUp.name.value,
		password: password
	})
	.then( user => signInWithEmailAndPassword(email, password))
	.catch(() => {
		alert('Email already in use. Try another email.');
		signUp.reset();
	});
}

function signInWithEmailAndPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password)
  .then(() => signUp.reset())
  .catch(() => {
    alert('Wrong email or password.');
    signUp.reset();
  });
}

auth.onSignIn(user => location.href = '/');

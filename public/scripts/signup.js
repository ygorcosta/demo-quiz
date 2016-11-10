const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth('auth.' + DOMAIN);
const alert = document.getElementById('alert');

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
    alert.innerHTML = '<p>Email already in use. Try another email.</p>';
    alert.innerHTML += '<button><span class="close icon-12-close-short" onclick="closeAlert()"></span></button>';
    alert.classList.add('visible');
		signUp.reset();
	});
}

function signInWithEmailAndPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password)
  .then(() => signUp.reset())
  .catch(() => {
    alert.innerHTML = '<p>Wrong email or password.</p>';
    alert.innerHTML += '<button><span class="close icon-12-close-short" onclick="closeAlert()"></span></button>';
    alert.classList.add('visible');
    signUp.reset();
  });
}

function closeAlert() {
  alert.classList.remove('visible');
}

auth.onSignIn(user => location.href = '/');

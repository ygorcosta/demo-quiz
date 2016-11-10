'use strict';

const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth('auth.' + DOMAIN);
const alert = document.getElementById('alert');

function resetPassword() {
	WeDeploy.auth('auth.' + DOMAIN)
		.sendPasswordResetEmail(forgotPassword.email.value)
		.then(() => {
      alert.innerHTML = '<p>An email with instructions to reset password should arrive in a few minutes.</p>';
      alert.innerHTML += '<button><span class="close icon-12-close-short" onclick="closeAlert()"></span></button>';
      alert.classList.add('visible');

			//location.href = '/login.html';
		});
}

function closeAlert() {
  location.href = '/login';
}

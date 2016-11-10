'use strict';

const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const authData = WeDeploy.data(`auth.${DOMAIN}`);
const userTable = document.getElementById('user-ranking');

function main() {
  authData
    .orderBy('correctAnswers', 'desc')
    .limit(10)
    .get('users')
    .then(function(users) {
      users.forEach(renderUser);
    });
}

function renderUser(user, index) {
	userTable.innerHtml += `<tr><td>${index}</td><td>${user.name ? user.name : user.email}</td><td>${user.correctAnswers}</td></tr>`;
}

main();

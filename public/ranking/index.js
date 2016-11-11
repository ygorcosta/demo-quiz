'use strict';

const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth(`auth.${DOMAIN}`);
const data = WeDeploy.data(`data.${DOMAIN}`);
const userTable = document.getElementById('user-ranking');

function main() {
  if (!auth.currentUser) {
    window.location = "/login";
  }

  data
    .orderBy('correctAnswers', 'desc')
    .limit(10)
    .get('users')
    .then(function(users) {
      users.forEach(renderUser);
    });
}

function renderUser(userStats, index) {
	auth
	  .getUser(userStats.id)
	  .then((user) => {
	  	let row = userTable.insertRow(index);
      
      let positionCell = row.insertCell(0);
      positionCell.innerHTML = `${index+1}`;

      let nameCell = row.insertCell(1);
      nameCell.innerHTML = `${user.name ? user.name : user.email}`;
	  	
      let pointsCell = row.insertCell(2);
      pointsCell.innerHTML = `${userStats.correctAnswers}`;
	  });
}

main();

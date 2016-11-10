const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const auth = WeDeploy.auth('auth.' + DOMAIN);
const data = WeDeploy.data('data.' + DOMAIN);

function main() {
	data
		.orderBy('oks', 'desc')
		.get('userStats')
		.then(function(stats) {
			for (s of stats) {
				auth
					.getUser(s.id)
					.then((user) => {
						console.log(user.name);
					}
				);
			}
		});

}

main();
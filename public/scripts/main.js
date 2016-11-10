const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");

const title = document.querySelector('.content-header.question #title');
const grid = document.querySelector('.grid-quiz.question');

const body = document.querySelector('body');
const validation = document.getElementById('validation');
const footer = document.querySelector('footer');
const nextButton = document.querySelector('#next');

var questions;
var qndx = 0;

function main() {
	var currentUser = WeDeploy.auth('auth.' + DOMAIN).currentUser;

	console.log(currentUser);

	if (currentUser) {
		WeDeploy
      .url('questions-generator.' + DOMAIN)
      .path('questions')
      .param('random', 'true')
      .get()
      .then(function(clientResponse) {
        questions = clientResponse.body();
        showNextQuestion();
      });

    const data = WeDeploy.data('data.' + DOMAIN)

		data.get('questionStats')
			.then((allQuestionStats) => {
	  			updateRanking(allQuestionStats);
			});

	  data.watch('questionStats')
			.on('changes',(allQuestionStats) => updateRanking(allQuestionStats))
			.on('fail', (error) => console.log(error));
	}
	else {
		window.location = "/login.html";
	}
}

function showNextQuestion() {
	if (qndx == questions.length) {
		qndx = 0;
	}

	let question = questions[qndx];
	qndx = qndx + 1;

	restartQuestionUI();

	renderQuestion(question);
}

function restartQuestionUI() {
	title.classList.remove('visible');

	body.classList.remove('correct');
	body.classList.remove('error');

	grid.innerHTML = '';

	footer.classList.remove('visible');
}

function renderQuestion(question) {
	let title = document.querySelector('.content-header.question #title');
	title.innerHTML = question.text;
	title.classList.add('visible');

	const grid = document.querySelector('.grid-quiz.question');
	question.answers.forEach((answer) => renderAnswer(grid, answer));
}

function renderAnswer(component, answer) {
	component.innerHTML += '<section class="half">' +
		'	<div onclick="' + (answer.correct ? 'success' : 'error') + '(this)" class="content-body clickable flex-column-center-center">' +
		'		<h3>' + answer.text + '</h3>' +
		'		<p>' + answer.description + '</p>' +
		'	</div>' +
		'</section>';
}

function success(event) {
	let validationTitle = validation.querySelector('h1');
	validationTitle.innerHTML = 'Correct!';

	let validationSubTitle = validation.querySelector('p');
	validationSubTitle.innerHTML = '3123123 users have answered it correct too';

	footer.classList.add('visible');

	handleAnswer(event, true);
}

function error(event) {

	let validationTitle = validation.querySelector('h1');
	validationTitle.innerHTML = 'Wrong :(';

	let validationSubTitle = validation.querySelector('p');
	validationSubTitle.innerHTML = '2 users have answered it wrong too';

	footer.classList.add('visible');

	handleAnswer(event, false);
}

function handleAnswer(event, isCorrect) {
	const className = isCorrect ? 'correct' : 'error'
	body.classList.add(className);

	const card = event.parentNode;
	card.classList.add(className);

	const otherCard = card.parentNode.querySelector('.half:not(.' + className + ')');
	otherCard.style.display = 'none';

	incrementUserStats('userNN', isCorrect);

  let idxQuestion = questions[qndx];

  // TODO: If questions = 0. Show something different on UI.
  if (qndx > 0) {
    idxQuestion = questions[qndx - 1]
  }

	incrementQuestionStats(idxQuestion.id, isCorrect);
}

function incrementUserStats(userId, correct) {
	WeDeploy
		.data('data.' + DOMAIN)
		.get('userStats/' + userId)
		.then(function(stats) {
			if (correct) {
				stats.oks += 1;
			}
			else {
				stats.errors += 1;
			}

			return WeDeploy
				.data('data.' + DOMAIN)
				.update('userStats/' + userId, stats)
				.then(function(userStats) {
					// todo userStats == ""?
					showNextButton(stats);
				});
		})
		.catch(function(err) {
			if (err.code == 404) {
				let stats = {
					'id' : userId,
					'oks' : 0,
					'errors' : 0,
				}

				if (correct) {
					stats.oks += 1;
				}
				else {
					stats.errors += 1;
				}

				return WeDeploy
					.data('data.' + DOMAIN)
					.create('userStats', stats)
					.then(function(userStats) {
						showNextButton(userStats);
					});
			}
			throw err;
		});
}

function incrementQuestionStats(questionId, correct) {
	WeDeploy
		.data('data.' + DOMAIN)
		.get('questionStats/' + questionId)
		.then(function(stats) {
			if (correct) {
				stats.oks += 1;
			}
			else {
				stats.errors += 1;
			}

			return WeDeploy
				.data('data.' + DOMAIN)
				.update('questionStats/' + questionId, stats);
		})
		.catch(function(err) {
			if (err.code == 404) {
				var stats = {
					'id' : questionId,
					'oks' : 0,
					'errors' : 0,
				}

				if (correct) {
					stats.oks += 1;
				}
				else {
					stats.errors += 1;
				}

				return WeDeploy
					.data('data.' + DOMAIN)
					.create('questionStats', stats);
			}
			throw err;
		});
}

function showNextButton(userStats) {
	// todo show next button
}

function updateRanking(questionStats) {
	var sortedOks = sortQuestions(questionStats, 'oks');
	for (qs of sortedOks) {
		console.log(findQuestionById(qs.id).text);
	}
	console.log("-------------------");
	var sortedErrs = sortQuestions(questionStats, 'errors');
	for (qs of sortedErrs) {
		console.log(findQuestionById(qs.id).text);
	}
}

function sortQuestions(questionStats, property) {
	function compare(a,b) {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
    	return 0;
    }
    return questionStats.sort(compare).reverse();
}

function findQuestionById(id) {
	for (q of questions) {
		if (q.id == id) {
			return q;
		}
	}
	return null;
}

main();

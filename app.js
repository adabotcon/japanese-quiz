// Answers state for DOM
var answerState = {
		answers: []
	};
//Correct Answers
var correctAnswers = 0;
//incorrect Answers
var incorrectAnswers = 0;
//currentQuestion
var numCurrentQuestion = 1;

function startQuiz(answerState, startElement, questionElement, answersElement, numCurrentQuestion, correctAnswers, incorrectAnswers){
	startElement.submit(function(event){
		event.preventDefault();
		correctAnswers = 0;
		incorrectAnswers = 0;
		numCurrentQuestion =1;
		addQuestionAnswers(answerState, startElement, startElement, questionElement, answersElement, 0, correctAnswers, numCurrentQuestion, incorrectAnswers);
	})
}

function createAnswerState(){
	answerState.answers.push({
		questionID: 0,
		question: 'Why is showing a tattoo in an Onsen taboo?',
		answerA: {answer: 'The color fades over time', correctAnswer: false},
		answerB: {answer: 'Entering an Onsen with a tattoo can cause illness.', correctAnswer: false},
		answerC: {answer: 'Tattoos are associated with the Yakuza.', correctAnswer: true},
		answerD: {answer: 'Tattoos are considered private.', correctAnswer: false}
	});

	answerState.answers.push({
		questionID: 1,
		question: 'What is the correct way to address a teacher?',
		answerA: {answer: '-san', correctAnswer: false},
		answerB: {answer: '-sensei', correctAnswer: true},
		answerC: {answer: 'Mr. or Mrs', correctAnswer: false},
		answerD: {answer: '-sama', correctAnswer: false}
	});

	answerState.answers.push({
		questionID: 2,
		question: 'Japanese names are announced and written which way (if'+
		'the person is speaking about themselves)?',
		answerA: {answer: 'Family Name, First Name', correctAnswer: true},
		answerB: {answer: 'First Name, Family Name', correctAnswer: false},
		answerC: {answer: 'Family Name, First Name -honorific', correctAnswer: false},
		answerD: {answer: 'honorific- First Name, Family Name', correctAnswer: false}
	});

	answerState.answers.push({
		questionID: 3,
		question: 'A story created to target an audience of mostly girls is called what?',
		answerA: {answer: 'Shōnen', correctAnswer: false},
		answerB: {answer: 'Shōjo', correctAnswer: true},
		answerC: {answer: 'Yaoi', correctAnswer: false},
		answerD: {answer: 'Yuri', correctAnswer: false}
	});

	answerState.answers.push({
		questionID: 4,
		question: 'What are maid cafes?',
		answerA: {answer: 'Traditional cafe that often has entertainment in the form of Geisha.', correctAnswer: false},
		answerB: {answer: 'A series of chain resteraunts that are located all over Japan.', correctAnswer: false},
		answerC: {answer: 'There is no such thing as maid cafes in real life.', correctAnswer: false},
		answerD: {answer: 'A cosplay restaurant featuring waitresses that dress in French maid outfits.', correctAnswer: true}
	});

	answerState.answers.push({
		questionID: 5,
		question: 'What do you say before eating if you are in Japan?',
		answerA: {answer: 'Itadakimasu', correctAnswer: true},
		answerB: {answer: 'Sama', correctAnswer: false},
		answerC: {answer: 'Gochiso sama deshita', correctAnswer: false},
		answerD: {answer: 'Yay for grub, get in the tub', correctAnswer: false}
	});

	answerState.answers.push({
		questionID: 6,
		question: 'How do the Japanese greet a stranger?',
		answerA: {answer: '45 degree bow', correctAnswer: false},
		answerB: {answer: '30 degree bow', correctAnswer: false},
		answerC: {answer: '15 degree bow', correctAnswer: true},
		answerD: {answer: 'Nod of the head', correctAnswer: false}
	});

	answerState.answers.push({
		questionID: 7,
		question: 'What is the correct way to address an older or more experienced colleague?',
		answerA: {answer: '-kun', correctAnswer: false},
		answerB: {answer: '-sama', correctAnswer: false},
		answerC: {answer: '-sensei', correctAnswer: false},
		answerD: {answer: 'senpai', correctAnswer: true}
	});

	answerState.answers.push({
		questionID: 8,
		question: 'What is the traditional food eaten in Japan at New Years?',
		answerA: {answer: 'Osechi Ryōri', correctAnswer: true},
		answerB: {answer: 'Ramen', correctAnswer: false},
		answerC: {answer: 'Sushi', correctAnswer: false},
		answerD: {answer: 'Okonomiyaki', correctAnswer: false}
	});

	answerState.answers.push({
		questionID: 9,
		question: 'What is the traditional religion of Japan?',
		answerA: {answer: 'Christianity', correctAnswer: false},
		answerB: {answer: 'Hinduism', correctAnswer: false},
		answerC: {answer: 'Shinto', correctAnswer: true},
		answerD: {answer: 'Buddhism', correctAnswer: false}
	});
}

function displayCurrentQuizInfo(answerState, startElement, questionElement, answersElement, correctAnswers, numCurrentQuestion, isCorrectAnswer, incorrectAnswers){
	debugger;
	if(isCorrectAnswer){
		$('.js-answers-form').find('.correct-incorrect').text('Correct!');
	}else{
		$('.js-answers-form').find('.correct-incorrect').text('Incorrect');
	}
	numCurrentQuestion++;
	var questionID = numCurrentQuestion - 1;

	hideClass($('.js-info-question-form'));
	showClass($('.js-answers-form'));
	if(numCurrentQuestion === 11)
	{
		$('.js-answers-form').submit(function(event){
			event.preventDefault();
			renderFinalPage(answerState, startElement, questionElement, answersElement, numCurrentQuestion, correctAnswers, incorrectAnswers);
		})

	}else{
		$('.js-answers-form').submit(function(event){
			event.preventDefault();
			addQuestionAnswers(answerState, $('.js-answers-form'), questionElement, questionID, correctAnswers, numCurrentQuestion, incorrectAnswers);
		})
	}

}

function getNewQuestionForm(){
	var questionForm = '<div>' +
		'<p class="js-question"></p>'+
			'<ul class="answer-list">' +
				'<li class="answer js-answer-a"></li>' +
				'<li class="answer js-answer-b"></li>' +
				'<li class="answer js-answer-c"></li>' +
				'<li class="answer js-answer-d"></li>' +
			'</ul>' +
			'<button type="submit" class="check-answer" id="check-answer">Check Answer</button>' +
		'</div>';

	return $(questionForm);	
}


function renderQuestion(answerState, questionID){
	var questionForm = getNewQuestionForm();
	var currentQuestion = answerState.answers[questionID];

	questionForm.find('.js-question').text(currentQuestion.question);
	questionForm.find('.js-answer-a').text(currentQuestion.answerA.answer);
	questionForm.find('.js-answer-b').text(currentQuestion.answerB.answer);
	questionForm.find('.js-answer-c').text(currentQuestion.answerC.answer);
	questionForm.find('.js-answer-d').text(currentQuestion.answerD.answer);

	return questionForm;

}

function addQuestionAnswers(answerState, startElement, currentElement, questionElement, answersElement, questionID, correctAnswers, numCurrentQuestion, incorrectAnswers){
	var questionForm = renderQuestion(answerState, questionID);

	questionElement.html(questionForm);
	hideClass(currentElement);
	showClass($('.js-info-question-form'));
	var isCorrectAnswer = false;

	$(questionElement).on('click', 'li', function(event){
		event.stopPropagation();
		$('li').removeClass('highlight');
		highlightAnswer($(this));
		isCorrectAnswer = isAnswerCorrect(answerState, $(this), questionID);
	})

	questionElement.submit(function(event){
		event.preventDefault();
		changeCorrectState(correctAnswers, isCorrectAnswer);
		displayCurrentQuizInfo(answerState, startElement, questionElement, answersElement, correctAnswers, numCurrentQuestion, isCorrectAnswer, incorrectAnswers);

	})
}

function highlightAnswer(element){
	element.addClass('highlight');

}

function hideClass(element){
	element.addClass('hidden');
}

function showClass(element){
	element.removeClass('hidden');
}

function isAnswerCorrect(answerState, element, questionID){
	var highlightedAnswer = element.attr("class");
	var splitClass = highlightedAnswer.split("-");
	var answerArray = splitClass[2].split(" ");
	var chosenAnswer = "answer" + answerArray[0].toUpperCase();
	var currentQuestion = answerState.answers[questionID];

	if(currentQuestion[chosenAnswer].correctAnswer === true){
		return true;
	} else {
		return false;
	}

}

function changeCorrectState(correctAnswers, incorrectAnswers, isCorrectAnswer){
	if(isCorrectAnswer){
		correctAnswer++;
	} else {
		incorrectAnswers++;
	}
}

function renderInfoForm(correctAnswers, incorrectAnswers, numCurrentQuestion){
	var formElement = $('.js-info-question-form');

	formElement.find('.js-question-number').text(numCurrentQuestion);
	formElement.find('.js-number-correct').text(correctAnswers);
	formElement.find('.js-number-incorrect').text(incorrectAnswers);
}

function renderFinalPage(answerState, startElement, questionElement, answersElement, numCurrentQuestion, correctAnswers, incorrectAnswers){
	var finalElement = $('.js-final-page');

	finalElement.find('.js-final-number-correct').text("You got " + correctAnswers + " out of 10");

	finalElement.submit(function(event){
		event.preventDefault();
		startQuiz(answerState, startElement, questionElement, answersElement, numCurrentQuestion, correctAnswers, incorrectAnswers);
	})
}

$(function(){
	var startElement = $('.js-start-quiz');
	var questionElement = $('.js-question-form');
	var answersElement = $('.js-answers-form');

	createAnswerState(answerState);
	startQuiz(answerState, startElement, questionElement, answersElement, numCurrentQuestion, correctAnswers, incorrectAnswers);
})
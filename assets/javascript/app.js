
var panel = $('#text-area');
var countStartNumber = 30;

$(document).on('click', '#start-over', function (e) {
    game.reset();
});

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
});

$(document).on('click', '#start', function (e) {
    $('#sub-container').prepend('<h2 id="time">Time: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
});






var questions = [{
    question: "What is the name of Mario's brother?",
    answers: ["Luigi", "Thor", "Zack", "Roberto"],
    correctAnswer: "Luigi",
}, {
    question: "What color is Zelda's costume?",
    answers: ["Red", "Green", "Brown", "Purple"],
    correctAnswer: "Green",

}, {
    question: "In the Pokemon, what is pikachu's weapon of choice?",
    answers: ["Water", "Wind", "Fire", "Thunder"],
    correctAnswer: "Thunder",

}, {
    question: "What is the letter on Mario's hat?",
    answers: ["D", "M", "O", "A"],
    correctAnswer: "M",

}, {
    question: "What is Zelda weapon of choice?",
    answers: ["Sword", "Sling shot", "Boomerang", "Laser"],
    correctAnswer: "Sword",

}, {
    question: "What is Mario super power",
    answers: ["Fly", "Run", "Grow Big", "Invinsible"],
    correctAnswer: "Grow Big",

}, {
    question: "Who is Mario rescuing?",
    answers: ["Roberto", "Raphael", "The Princes", "Wario"],
    correctAnswer: "The Princes",

}, {
    question: "Who is Mario evil twin?",
    answers: ["Luigy", "Mushroom", "Donnie", "Wario"],
    correctAnswer: "Wario",
}];




var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function () {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        // $('#sub-container').html("<h2>TIME LEFT <span id='counter'>30</span> Seconds</h2>");
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);


        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);

        panel.html('<h2>You have done it!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function (e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Wrong!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');


        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function () {
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');


        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

var startbtn = document.querySelector("#startquiz").children[0].children[0];
var multiplechoicesDiv = document.querySelector("#multiplechoices");
var titlepageDiv = document.querySelector("#titlepage");
var questionpageDiv = document.querySelector("#questionpage");
var resultspageDiv = document.querySelector("#resultspage");
var scorespageDiv = document.querySelector("#scorespage");
var questionEl = document.querySelector("#question").children[0];
var restartbtn = document.querySelector("#restartquiz").children[0].children[1];
var feedbackEl = document.querySelector("#feedback");
var timeleftmsg = document.querySelector("#secondsleft");
var initialsInput = document.querySelector("#initials");
var submitresultsbtn = document.querySelector("#submitresults");
var topscoreslist = document.querySelector("#topscores");
var rerestartbtn = document.querySelector("#rerestartquiz").children[0].children[1];
var viewscoresbtn = document.querySelector("#viewscores").children[0];
var resetscoresbtn = document.querySelector("#resetscores");

var timeInterval;
var index = 0;
var timeleft = 75;
var feedbacktimeleft = 2;
var score = 0;
var topscores = [];
timeleftmsg.textContent = timeleft;

var quizquestions = [
    "Commonly used data types DO NOT include:",
    "The condition in an if / else statement is enclosed within ____.",
    "Arrays in JavaScript can be used to store ____.",
    "String values must be enclosed within ____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    "Commonly used data types DO NOT include:",
    "The condition in an if / else statement is enclosed within ____.",
    "Arrays in JavaScript can be used to store ____.",
    "String values must be enclosed within ____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
];
var quizMC = {
    Question1: ["strings", "booleans", "alerts", "numbers"],
    Question2: ["quotes", "curly brackets", "parentheses", "square brackets"],
    Question3: ["numbers and strings","other arrays","booleans","all of the above"],
    Question4: ["commas", "curly brackets", "quotes", "parentheses"],
    Question5: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    Question6: ["strings", "booleans", "alerts", "numbers"],
    Question7: ["quotes", "curly brackets", "parentheses", "square brackets"],
    Question8: ["numbers and strings","other arrays","booleans","all of the above"],
    Question9: ["commas", "curly brackets", "quotes", "parentheses"],
    Question10: ["JavaScript", "terminal / bash", "for loops", "console.log"],
};
var quizMCcorrect = [
    "alerts",
    "parentheses",
    "all of the above",
    "quotes",
    "console.log",
    "alerts",
    "parentheses",
    "all of the above",
    "quotes",
    "console.log"
];

init();
rendertopscores();

function init() {
    var storedscores = JSON.parse(localStorage.getItem("topscores"));
    if (storedscores !== null) {
        topscores = storedscores;
    }
}
function rendertopscores() {
    for (i = 0; i < topscores.length; i++) {
        topscore = topscores[i];
        var li = document.createElement("li");
        li.textContent = topscore;
        topscoreslist.appendChild(li);
    }
}
function storeTopScores() {
    localStorage.setItem("topscores",JSON.stringify(topscores));
}
function startQuiz(event) {
    event.preventDefault();
    timeleftmsg.textContent = 75;
    reset();
    timer();
    questionpageDiv.style.display = "inline-block";
    titlepageDiv.style.display = "none";
    resultspageDiv.style.display = "none";
    scorespageDiv.style.display = "none";
    loadQuestion(0);
}
function loadQuestion() {
    var qxnames = Object.keys(quizMC);
    var currentqx = quizMC[qxnames[index]];
    questionEl.textContent = quizquestions[index];
    multiplechoicesDiv.children[0].textContent = currentqx[0];
    multiplechoicesDiv.children[1].textContent = currentqx[1];
    multiplechoicesDiv.children[2].textContent = currentqx[2];
    multiplechoicesDiv.children[3].textContent = currentqx[3];
}
function endQuiz() {
    clearInterval(timeInterval);
    questionpageDiv.style.display = "none";
    resultspageDiv.style.display = "inline";
    resultspageDiv.children[1].children[0].children[0].textContent = "Your total score is " + score + ". Enter your initials below to find out your ranking!";
    
}
function feedback() {
    var qxresponse = event.target.textContent;
    console.log(quizMCcorrect[index]);
    console.log(event.target.textContent);
    if (qxresponse === quizMCcorrect[index]) {
        feedbackEl.children[1].textContent = "Correct";
        score++;
    }
    else {
        feedbackEl.children[1].textContent = "Wrong";
        timeleft-=5;
    }
    index++;
    feedbacktimer();
}
function timer() {
    timeInterval = setInterval(function() {
        timeleft--;
        timeleftmsg.textContent = timeleft;
        if (timeleft === 0) {
            endQuiz();
        }
    }, 1000);
}
function feedbacktimer() {
    var timeInterval = setInterval(function() {
        feedbacktimeleft--;
        timeleftmsg.textContent = timeleft;
        if (feedbacktimeleft === 0) {
            clearInterval(timeInterval);
            feedbackEl.children[1].textContent = "";
            feedbacktimeleft = 2;
        };
    }, 1000);
}
function submitresults() {
    var li = document.createElement("li");
    li.textContent = initialsInput.value + ": " + score + " points";
    topscores.push(li.textContent);
    topscoreslist.appendChild(li); 
    resultspageDiv.style.display = "none";
    scorespageDiv.style.display = "inline-block";
    storeTopScores();
}
function viewscores() {
    endQuiz();
    questionpageDiv.style.display = "none";
    resultspageDiv.style.display = "none";
    scorespageDiv.style.display = "inline-block";
}
function reset() {
    index = 0;
    score = 0;
    timeleft = 75;
}
function resetscores() {
    topscores = [];
    ts = document.getElementById("topscores");
    document.querySelector("#topscores").innerHTML="";
    storeTopScores();
}

startbtn.addEventListener("click", startQuiz);
restartbtn.addEventListener("click", startQuiz);
rerestartbtn.addEventListener("click", startQuiz);
multiplechoicesDiv.addEventListener("click", function(event) {
    event.preventDefault();

    if(event.target.matches("button")) {
        feedback();
        if (index < quizquestions.length) {
            loadQuestion();
        }
        else {
            endQuiz();
        }
    }
  });
submitresultsbtn.addEventListener("click", submitresults);
viewscoresbtn.addEventListener("click", viewscores);
resetscoresbtn.addEventListener("click",resetscores);


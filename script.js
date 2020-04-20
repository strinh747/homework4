var startbtn = document.querySelector("#startquiz").children[0].children[0];
var container = document.querySelector(".container");
var multiplechoicesDiv = document.querySelector("#multiplechoices");
var titlepageDiv = document.querySelector("#titlepage");
var questionpageDiv = document.querySelector("#questionpage");
var resultspageDiv = document.querySelector("#resultspage");
var questionEl = document.querySelector("#question").children[0];
var restartbtn = document.querySelector("#restartquiz").children[0].children[1];
var feedbackEl = document.querySelector("#feedback");
var timeleftmsg = document.querySelector("#secondsleft");
var initialsInput = document.querySelector("#initials");
var submitresultsbtn = document.querySelector("#submitresults");
var topscoreslist = document.querySelector("#topscores");
var scorespageDiv = document.querySelector("#scorespage");
var rerestartbtn = document.querySelector("#rerestartquiz").children[0].children[1];
var viewscoresbtn = document.querySelector("#viewscores").children[0];
var resetscoresbtn = document.querySelector("#resetscores");
var topscoresParent = document.querySelector("#topscoresParent");
var liscore;

var timeInterval;
var index = 0;
var timeleft = 75;
var feedbacktimeleft = 2;
var score = 0;
var topscores = [];
timeleftmsg.textContent = timeleft;


var quizquestions = [
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "question6",
    "question7",
    "question8",
    "question9",
    "question10"
];
var quizMC = {
    Question1: ["MC1", "MC2", "MC3", "MC4"],
    Question2: ["MC1", "MC2", "MC3", "MC4"],
    Question3: ["MC1", "MC2", "MC3", "MC4"],
    Question4: ["MC1", "MC2", "MC3", "MC4"],
    Question5: ["MC1", "MC2", "MC3", "MC4"],
    Question6: ["MC1", "MC2", "MC3", "MC4"],
    Question7: ["MC1", "MC2", "MC3", "MC4"],
    Question8: ["MC1", "MC2", "MC3", "MC4"],
    Question9: ["MC1", "MC2", "MC3", "MC4"],
    Question10: ["MC1", "MC2", "MC3", "MC4"]
};
var quizMCcorrect = [
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "question6",
    "question7",
    "question8",
    "question9",
    "question10"
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
        li.setAttribute("class","liscore");
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
    index++;
}
function endQuiz() {
    clearInterval(timeInterval);
    questionpageDiv.style.display = "none";
    resultspageDiv.style.display = "inline";
    resultspageDiv.children[1].children[0].children[0].textContent = "Your total score is " + score + ". Enter your initials below to find out your ranking!";
    reset();
}
function feedback() {
    var qxresponse = event.currentTarget;
    if (qxresponse === quizMCcorrect[index]) {
        feedbackEl.children[1].textContent = "Correct";
        score++;
    }
    else {
        feedbackEl.children[1].textContent = "Wrong";
    }
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
    li.setAttribute("class","liscore");
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
    lis = document.getElementsByTagName("li");
    for (i=0; i < lis.length; i++) {
        if (lis[i].matches(".liscore")) {
            lis[i].parentNode.removeChild(lis[i])
        }
    };
    
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



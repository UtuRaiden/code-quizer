var displayResult = document.querySelector('#displayResult')
var displayTimer = document.querySelector('#countDownTimer');

var questionList =[
    {
        questionText: "Javascript is an _______ language?",
        answers: [ "Object-Oriented","Object-Based","Procedural","None of the above"],
        correctAnswer: "Object-Oriented",
    },
    {
        questionText: "Which of the following keywords is used to define a variable in Javascript?",
        answers: ["Var","Let","Both A and B","None of the above"],
        correctAnswer: "Both A and B",
    },
    {
        questionText:"Which of the following methods is used to access HTML elements using Javascript?",
        answers: ["getElementbyId()","getElementsByClassName()","Both A and B","None of the above"],
        correctAnswer:"Both A and B",
    },
    {
        questionText:"Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers: ["Throws and error","Ignores the statements","Gives a warning","None of the Above"],
        correctAnswer:"Ignores the statements",
    },
    {
        questionText:"Which of the following methods can be used to display data in some form using Javascript?",
        answers: ["document.write()","console.log()","window.alert()","All of the above"],
        correctAnswer:"All of the above",
    },
]
var questionLength = questionList.length;
var i = 0;
var timer = 60;

// Function to update the timer display
function updateTimer() {
  var timerText = document.createElement('p');
  timerText.textContent = 'Time Left: ' + timer+ ' seconds';
  displayTimer.innerHTML = ''; // Clear previous content before adding new timerText
  displayTimer.appendChild(timerText);
  timer--;

  if (timer < 0) {
    clearInterval(timerInterval);
    displayResult.textContent = "Time's up! Quiz completed";
  }
}

// Set up the timer interval
var timerInterval = setInterval(updateTimer, 1000);

var displayE1 = startQuiz();

displayResult.appendChild(displayE1);

function startQuiz() {
    //displayResult.innerHTML="";
    var display = document.createElement('div');
    var questionE1 = document.createElement('h2');
    var answersE1 = document.createElement('div');
  console.log(questionList[i])
    questionE1.textContent = questionList[i].questionText;
  
    for (let j = 0; j < questionList[i].answers.length; j++) {
        var btnE1 = document.createElement('button');
        btnE1.textContent = questionList[i].answers[j];
        answersE1.appendChild(btnE1);
        (function(answer) {
            btnE1.addEventListener('click', function() {
              var selectedAnswer = answer;
              if (selectedAnswer === questionList[i].correctAnswer) { 
              } else {
              }
              nextQuestion()
            });
          })(questionList[i].answers[j]);
        }
      
        display.append(questionE1, answersE1);
        return display;
      }
      function nextQuestion() {
        i++;
        if (i < questionLength) {
          var displayE1 = startQuiz();
          displayResult.innerHTML = "";
          displayResult.appendChild(displayE1);
        } else {
          displayResult.textContent = "Quiz completed";
        }
      }
//get all my necessary ID's for displaying on the front end
var displayResult = document.querySelector('#displayResult');
var displayTimer = document.querySelector('#countDownTimer');
var displayAnswer = document.querySelector('#answerStatus');

//add all of the questions to an array to call upon later
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
//declare accumulators
var questionLength = questionList.length;
var i = 0;
var timer = 60;
var score = 0;

//update the timer display
function updateTimer() {
  var timerText = document.createElement('p');
  timerText.textContent = 'Time Left: ' + timer+ ' seconds';
  displayTimer.innerHTML = '';
  displayTimer.appendChild(timerText);
  timer--;
//if the timer hits 0 stop counting down and finish the quiz
  if (timer < 0) {
    clearInterval(timerInterval);
    displayResult.textContent = "Time's up! Quiz completed";
  }
}

var pageOpen = freshPage();
displayResult.appendChild(pageOpen);

//creates the landing page with the start quiz button
function freshPage() {
  displayResult.innerHTML = '';
  var display = document.createElement('div');
  var start = document.createElement('button');
  start.textContent = 'Start Quiz!';
  //event listener for the button to start the quiz and the timer
  start.addEventListener('click', function() {
    var displayE1 = startQuiz();
    displayResult.appendChild(displayE1);
    timerInterval = setInterval(updateTimer, 1000);
  });
  display.appendChild(start);
  return display;
}

//displays the first question
function startQuiz() {
    displayResult.innerHTML="";
    var display = document.createElement('div');
    var questionE1 = document.createElement('h2');
    var answersE1 = document.createElement('div');
  console.log(questionList[i])
    questionE1.textContent = questionList[i].questionText;
  //create a button for every single answer
    for (let j = 0; j < questionList[i].answers.length; j++) {
        var btnE1 = document.createElement('button');
        btnE1.textContent = questionList[i].answers[j];
        answersE1.appendChild(btnE1);
        (function(answer) {
            btnE1.addEventListener('click', function() {
              var selectedAnswer = answer;
              //if the answer was correct add 15 to the score and display Correct 
              if (selectedAnswer === questionList[i].correctAnswer) { 
                var displayAnswerText = document.createElement('h3');
                displayAnswerText.textContent = 'Correct!'
                displayAnswer.innerHTML='';
                displayAnswer.appendChild(displayAnswerText);
                score +=15;
              } else {//if the answer was incorrect display Incorrect and subtract 15 seconds from the timer
                timer-=15;
                updateTimer();
                var displayAnswerText = document.createElement('h3');
                displayAnswerText.textContent = 'Incorrect!'
                displayAnswer.innerHTML='';
                displayAnswer.appendChild(displayAnswerText);
              }
              //call the function to cycle through the remaining questions
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
        } else {//if there is no more questions stop the timer
          clearInterval(timerInterval);
      //create input box for the high score
          var nameInput = document.createElement('input');
          nameInput.type = 'text';
          nameInput.placeholder = 'Enter your name';
      
          var submitButton = document.createElement('button');
          submitButton.textContent = 'Submit';
          submitButton.addEventListener('click', function() {
            var playerName = nameInput.value;
            //pass the players name and the score values to the saveHighScore function
            saveHighScore(playerName,score);
            nameInput.value = '';
            displayAnswer.innerHTML='';
            displayResult.textContent = `Thank you for Submitting!`;
            console.log(playerName,score);

          });
      
          var inputContainer = document.createElement('div');
          inputContainer.appendChild(nameInput);
          inputContainer.appendChild(submitButton);
      
          score += timer;
          displayResult.textContent = `Quiz completed! Your score is ${score}. Please put in your name for the High score leader board! `;
          displayResult.appendChild(inputContainer);
        }
      }
      //used to save the high scores
      function saveHighScore(name,score) {
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        var newScore = { name: name, score: score };
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
      }
//displays the high scores in an alertbox
      function showHighScores() {
        //calls the function to get the highscores
        var highScoresData = getHighScores();
      
        if (highScoresData.length === 0) {
          alert("No high scores yet!");
          return;
        }
      
        var message = "High Scores:\n";
        for (var i = 0; i < highScoresData.length; i++) {
          message += highScoresData[i].name + ": " + highScoresData[i].score + "\n";
        }
      
        alert(message);
      }
//gets all the scores
      function getHighScores() {
        return JSON.parse(localStorage.getItem("highScores"));
      }
//clears all the scores
      function clearHighScore() {
        localStorage.clear();
      }

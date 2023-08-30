const app = document.querySelector("#app");
const info_box=document.querySelector("#info_box");
const continuequizbtn= document.querySelector("#continue-quiz-btn")
const dashboard = document.querySelector("#dashboard");
const quizContainer = document.querySelector("#quiz-container");
const scoreBoard = document.querySelector("#score-board");
const usernameInput = document.querySelector("#username");
const startQuizBtn = document.querySelector("#start-quiz-btn");
const nextQuestionBtn = document.querySelector("#next-question-btn");
const quizForm = document.querySelector("#quiz-form");
const question = document.querySelector("#question");
const options = document.querySelector("#options");
const scoreBoardBody = document.querySelector("#score-board-body");
const timer = document.querySelector("#timer");
const quit_quiz = document.querySelector("#quit");
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerID = null;
let questions = [
  {
    text: "What is the capital of France?",
    options: [
      "Paris",
      "London",
      "Berlin",
      "Rome"
    ],
    answer: 0
  },
  {
    text: "What is the capital of Germany?",
    options: [
      "Paris",
      "London",
      "Berlin",
      "Rome"
    ],
    answer: 2
  },
  {
    text: "What is the capital of Italy?",
    options: [
      "Paris",
      "London",
      "Berlin",
      "Rome"
    ],
    answer: 3
  },
  {
    text: "Who is the CEO of Google",
    options: [
      "Sundar pichai",
      "Elon Mas",
      "Ratan",
      "Narendra Modi"
    ],
    answer: 0
  }
];
continuequizbtn.addEventListener("click", function(event) {
  event.preventDefault();
  info_box.style.display = "none";
  dashboard.style.display = "block";
  startQuizBtn();
});

startQuizBtn.addEventListener("click", function(event) {
  event.preventDefault();
  dashboard.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();

});
function startTimer (){
  clearInterval(timerID);
  timer.textContent = timeLeft;
  function countDown() {
    timeLeft--;
    timer.textContent = timeLeft; 
    if(timeLeft===0){
      const confirmUser = confirm("Time up!!! Do you want to play the quiz again")
      if(confirmUser){
       timeLeft = 15;
        startQuiz();
      } else{
        info_box.style.display = "block";
        quizContainer.style.display = "none";
        return;
      }
    }
  } 
  timerID = setInterval(countDown,1000);
 }
  const stopTimer =() => {
clearInterval(timerID);
 }
  const startQuiz = () =>{
    timeLeft = 15;
   loadQuestion();
  
  }
 
nextQuestionBtn.addEventListener("click", function(event) {
event.preventDefault();
let selectedOption = -1;
  for (let i = 0; i < quizForm.elements.length - 1; i++) {
    if (quizForm.elements[i].checked) {
      selectedOption = i;
      break;
    }
  }
  if (selectedOption === -1) {
    alert("Please select an option");
    return;
  }
  if (selectedOption === questions[currentQuestion].answer) {
    score++;
  }
  timeLeft= 15;
  currentQuestion++;
  if (currentQuestion === questions.length) {
    quizContainer.style.display = "none";
    scoreBoard.style.display = "block";
    updateScoreBoard();
    stopTimer();
  } 
  else {
    startQuiz();
  }
});
function loadQuestion() {
  question.textContent = questions[currentQuestion].text;
  options.innerHTML = "";
  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    options.innerHTML += `
      <div>
        <input type="radio" id="option-${i}" name="option" value="${i}">
        <label for="option-${i}">${questions[currentQuestion].options[i]}</label>
      </div>
    `;
  }
  if(currentQuestion < questions.length){
    startTimer();
  }
  nextQuestionBtn.disabled = false;
}
function updateScoreBoard() {
  scoreBoardBody.innerHTML = "";
  let username = usernameInput.value || "anonymous";
  scoreBoardBody.innerHTML += `
    <tr>
      <td>${username}</td>
      <td>${score}/${questions.length}</td>
    </tr>
  `;
}
quit_quiz.onclick = () =>{
  window.location.reload();
};

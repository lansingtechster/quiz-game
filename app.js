const questionTitle = document.getElementById('questionTitle');
const questionText = document.getElementById('questionText');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const questionCountEl = document.getElementById('questionCount');
const scoreCountEl = document.getElementById('scoreCount');
const checkButton = document.getElementById('checkButton');
const nextButton = document.getElementById('nextButton');
const restartButton = document.getElementById('restartButton');
const quizContent = document.getElementById('quizContent');

let currentQuestion = 0;
let selectedOption = null;
let score = 0;
let quizComplete = false;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedOption = null;
  quizComplete = false;
  updateStatus();
  loadQuestion();
  feedbackEl.textContent = 'Choose an answer and press Check.';
  nextButton.disabled = true;
  checkButton.disabled = false;
  quizContent.classList.remove('result-screen');
}

function updateStatus() {
  questionCountEl.textContent = quizComplete
    ? `Quiz complete!`
    : `Question ${currentQuestion + 1} of ${quizData.length}`;
  scoreCountEl.textContent = `Score: ${score}`;
}

function loadQuestion() {
  const question = quizData[currentQuestion];
  questionTitle.textContent = `Question ${currentQuestion + 1}`;
  questionText.textContent = question.question;
  optionsEl.innerHTML = '';

  question.options.forEach((optionText, optionIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.textContent = optionText;
    button.dataset.index = optionIndex;
    button.addEventListener('click', () => selectOption(button, optionIndex));
    optionsEl.append(button);
  });
}

function selectOption(button, optionIndex) {
  if (checkButton.disabled) return;
  selectedOption = optionIndex;
  optionsEl.querySelectorAll('.option-button').forEach((btn) => {
    btn.classList.remove('selected');
  });
  button.classList.add('selected');
  feedbackEl.textContent = 'Now press Check Answer to see if you are right.';
}

function checkAnswer(question, selectedIndex) {
  return selectedIndex === question.answer;
}

function incrementScore(isCorrect) {
  if (isCorrect) {
    score += 1;
  }
  updateStatus();
}

function showResult() {
  const question = quizData[currentQuestion];
  const buttons = optionsEl.querySelectorAll('.option-button');
  buttons.forEach((button) => {
    const index = Number(button.dataset.index);
    button.disabled = true;
    button.classList.remove('selected');

    if (index === question.answer) {
      button.classList.add('correct');
    }
    if (selectedOption !== null && index === selectedOption && index !== question.answer) {
      button.classList.add('incorrect');
    }
  });

  if (selectedOption === null) {
    feedbackEl.innerHTML = '<strong>Oops!</strong> Please choose an answer before checking.';
    buttons.forEach((button) => (button.disabled = false));
    return;
  }

  const isCorrect = checkAnswer(question, selectedOption);

  if (isCorrect) {
    incrementScore(true);
    feedbackEl.innerHTML = `<strong>Great job!</strong> ${question.fact}`;
  } else {
    incrementScore(false);
    feedbackEl.innerHTML = `<strong>Nice try!</strong> The correct answer is <strong>${question.options[question.answer]}</strong>. ${question.fact}`;
  }

  checkButton.disabled = true;
  nextButton.disabled = false;
}

function nextQuestion() {
  currentQuestion += 1;
  selectedOption = null;
  if (currentQuestion >= quizData.length) {
    showFinalResults();
    return;
  }
  loadQuestion();
  feedbackEl.textContent = 'Choose an answer and press Check.';
  nextButton.disabled = true;
  checkButton.disabled = false;
}

function showFinalResults() {
  quizComplete = true;
  updateStatus();
  quizContent.innerHTML = `
    <div class="result-screen">
      <h2>🎉 You finished the quiz!</h2>
      <p class="result-score">${score} / ${quizData.length}</p>
      <p>Great work! You learned some fun facts about animals, from cheetahs and chameleons to koalas and bats.</p>
      <div class="fun-fact">
        <strong>Animal fact:</strong> The blue whale is the largest animal ever known, and its heart is about the size of a small car.
      </div>
    </div>
  `;
}

checkButton.addEventListener('click', showResult);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startQuiz);

startQuiz();

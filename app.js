function emojiImageDataUri(emoji) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="160"><defs><filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.08"/></filter></defs><rect width="220" height="160" rx="22" fill="#f8fbff" filter="url(#shadow)"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="90" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif">${emoji}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

let currentQuestion = 0;
let score = 0;
let answered = false;
let selectedOption = null;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  selectedOption = null;
  showScreen('quizScreen');
  loadQuestion();
}

function loadQuestion() {
  const question = quizData[currentQuestion];

  document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of 10`;
  document.getElementById('questionText').textContent = question.question;
  const imageSrc = question.imageEmoji ? emojiImageDataUri(question.imageEmoji) : question.image;
  document.getElementById('questionImage').innerHTML = `<img src="${imageSrc}" alt="Illustration of the animal related to the question" class="animal-image">`;

  updateScoreDisplay();
  updateProgressBar();
  renderOptions(question);

  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback';
  feedback.textContent = '';
  answered = false;
  selectedOption = null;
}

function updateScoreDisplay() {
  document.getElementById('currentScore').textContent = score;
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

function renderOptions(question) {
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = option;
    btn.onclick = () => selectOption(index);
    optionsContainer.appendChild(btn);
  });
}

function evaluateAnswer(question, selectedIndex) {
  return selectedIndex === question.correct;
}

function selectOption(index) {
  if (answered) return;

  answered = true;
  selectedOption = index;
  const question = quizData[currentQuestion];
  const options = document.querySelectorAll('.option');
  const isCorrect = evaluateAnswer(question, index);

  options.forEach((btn, i) => {
    if (i === question.correct) {
      btn.classList.add('correct');
    } else if (i === index) {
      btn.classList.add('incorrect');
    }
    btn.disabled = true;
  });

  const selectedBtn = options[index];
  selectedBtn.classList.add(isCorrect ? 'bounce' : 'shake');

  const feedback = document.getElementById('feedback');
  feedback.classList.add('show');

  if (isCorrect) {
    score++;
    feedback.className = 'feedback show correct';
    feedback.textContent = '✅ Correct! ' + question.fun_fact;
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = '❌ Oops! The correct answer is ' + question.options[question.correct] + '. ' + question.fun_fact;
  }

  updateScoreDisplay();

  setTimeout(() => {
    nextQuestion();
  }, 2000);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const percentage = Math.round((score / quizData.length) * 100);
  document.getElementById('finalScore').textContent = `${score}/10`;
  document.getElementById('correctCount').textContent = score;
  document.getElementById('percentage').textContent = `${percentage}%`;

  let emoji = '🎉';
  let message = '';

  if (percentage === 100) {
    emoji = '🏆';
    message = 'Perfect Score! You\'re an Animal Expert! 🌟';
  } else if (percentage >= 80) {
    emoji = '🌟';
    message = 'Awesome! You\'re an Animal Superstar!';
  } else if (percentage >= 60) {
    emoji = '😊';
    message = 'Great Job! You know a lot about animals!';
  } else if (percentage >= 40) {
    emoji = '😄';
    message = 'Good Try! Learn more about animals and try again!';
  } else {
    emoji = '🐾';
    message = 'Keep Learning! Animals are amazing!';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultMessage').textContent = message;

  showScreen('resultsScreen');
}

function restartQuiz() {
  showScreen('welcomeScreen');
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

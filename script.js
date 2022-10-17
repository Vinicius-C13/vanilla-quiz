const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const resultsButton = document.getElementById('results-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const quizContainer = document.querySelector('.quiz-container');
const quizInfo = document.querySelector('.quiz-info');
const progressText = document.querySelector('#progress-text');
const progressStatus = document.querySelector('#progress-status')

let sortedQuestions, currentQuestionIndex

startButton.addEventListener('click', () => {
  startGame();
});

function startGame() {
  startButton.classList.add('hide');
  quizInfo.classList.add('hide');
  sortedQuestions = questions;
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  if(currentQuestionIndex < 4) {
    resetState()
    showQuestion(sortedQuestions[currentQuestionIndex]);
    barProgression(currentQuestionIndex);
  } else {
    showLoadingPage()
    setTimeout(showResults, 3000);
  }
}

function showQuestion(question) {
  progressText.innerText = question.text;
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn', 'answer-btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', () => {
      currentQuestionIndex++;
      setNextQuestion();
    })
    answerButtonsElement.appendChild(button)
  })
  scrollBottom();
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function showLoadingPage() {
  resultsButton.classList.add('hide');
    quizContainer.classList.add('loading-page')
    quizContainer.innerHTML = 
      '<p>Carregando resultados...</p>'
}

function showResults() {
  quizContainer.classList.remove('loading-page');
    resultsButton.classList.add('hide');
    quizContainer.classList.add('results-page');
    quizContainer.innerHTML = 
      '<h2>Seus Resultados</h2>\
       <p>Clique no botão para fazer alguma ação:</p>\
       <br>\
       <button class=btn>Botão</button>'
    scrollBottom();
}

function barProgression(question) {
  let progress = (question + 1)*(100/4);
  progressStatus.style.width = progress + '%';

  if(question + 1 == 4) {
    progressStatus.style.borderRadius = '15px'; 
  }
}

function scrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

const questions = [
  {
    question: 'Pergunta 1',
    text: 'Questão 1 de 4',
    answers: [
      { text: 'Resposta 1'},
      { text: 'Resposta 2'}
    ]
  },
  {
    question: 'Pergunta 2',
    text: 'Questão 2 de 4',
    answers: [
      { text: 'Resposta 1'},
      { text: 'Resposta 2'}
    ]
  },
  {
    question: 'Pergunta 3',
    text: 'Questão 3 de 4',
    answers: [
      { text: 'Resposta 1'},
      { text: 'Resposta 2'}
    ]
  },
  {
    question: 'Pergunta 4',
    text: 'Questão 4 de 4',
    answers: [
      { text: 'Resposta 1'},
      { text: 'Resposta 2'}
    ]
  }
]
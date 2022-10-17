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

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  console.log(currentQuestionIndex)
  setNextQuestion()
})
resultsButton.addEventListener('click', () => {
  showLoadingPage()
  setTimeout(showResults, 3000);
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
    console.log('acabou')
  }
}

function showQuestion(question) {
  progressText.innerText = question.text;
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn', 'answer-btn')
    //Alterar isso aqui
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  selectedButton.classList.add('selected')
  //const correct = selectedButton.dataset.correct
  //setStatusClass(document.body, correct)
  //Array.from(answerButtonsElement.children).forEach(button => {
  //  setStatusClass(button, button.dataset.correct)
  //})
  if (sortedQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    resultsButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
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
}

function barProgression(question) {
  let progress = (question + 1)*(100/4);
  progressStatus.style.width = progress + '%';

  if(question + 1 == 4) {
    progressStatus.style.borderRadius = '15px'; 
  }
}

const questions = [
  {
    question: 'Pergunta 1',
    text: 'Questão 1 de 4',
    answers: [
      { text: 'Resposta 1', correct: true },
      { text: 'Resposta 2', correct: false },
      { text: 'Resposta 3', correct: false },
      { text: 'Resposta 4', correct: false }
    ]
  },
  {
    question: 'Pergunta 2',
    text: 'Questão 2 de 4',
    answers: [
      { text: 'Resposta 1', correct: true },
      { text: 'Resposta 2', correct: false }
    ]
  },
  {
    question: 'Pergunta 3',
    text: 'Questão 3 de 4',
    answers: [
      { text: 'Resposta 1', correct: false },
      { text: 'Resposta 2', correct: true },
      { text: 'Resposta 3', correct: false }
    ]
  },
  {
    question: 'Pergunta 4',
    text: 'Questão 4 de 4',
    answers: [
      { text: 'Resposta 1', correct: false },
      { text: 'Resposta 2', correct: true },
      { text: 'Resposta 3', correct: false },
      { text: 'Resposta 4', correct: false }
    ]
  }
]
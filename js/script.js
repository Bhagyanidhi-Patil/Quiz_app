const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
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
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
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

const questions = [
  {
    question: 'HTML stands for?',
    answers: [
      { text: 'Hyper Text Markup Language ', correct: true },
      { text: ' High Text Markup Language', correct: false}, 
      {text: ' Hyper Tabular Markup Language', correct: false },
      {text: ' None of these', correct: false }
    ]
  },
  {
    question: 'Correct HTML tag for the largest heading is',
    answers: [
      { text: '<head>', correct: false },
      { text: '<h1>', correct: true },
      { text: '<h6>', correct: false },
      { text: '<heading', correct: false }
    ]
  },
  {
    question: 'Which of the following HTML Elements is used for making any text bold ?',
    answers: [
      { text: '<h1>', correct: false },
      { text: '<b>', correct: true },
      { text: '<br>', correct: false },
      { text: '<i>', correct: false }
    ]
  },
  {
    question: 'If we want define style for an unique element, then which css selector will we use ?',
    answers: [
      { text: 'class', correct: false },
      { text: 'name', correct: false },
      { text: 'text', correct: false},
      { text: 'Id', correct: true }
    ]
  },
  {
    question: "If we don't want to allow a floating div to the left side of an element, which css property will we use ?",
    answers: [
      { text: 'margin', correct: false },
      { text: 'float', correct: false },
      { text: 'padding', correct: false},
      { text: 'clear', correct: true }
    ]
  }
]

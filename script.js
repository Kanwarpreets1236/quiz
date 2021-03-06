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
    question: 'Which type of JavaScript language is',
    answers: [
      { text: 'Object-Based', correct: true },
      { text: 'Object-Oriented', correct: false },
      { text: 'Assembly-language', correct: false },
      { text: 'High-level', correct: false }
    ]
  },
  {
    question: 'The "function" and " var" are known as:',
    answers: [
      { text: 'Keywords', correct: false },
      { text: 'Data types', correct: false },
      { text: 'Declaration statements', correct: true },
      { text: 'Prototypes', correct: false }
    ]
  },
  {
    question: 'Which one of the following operator is used to check weather a specific property exists or not:',
    answers: [
      { text: 'Exists', correct: false },
      { text: 'exist', correct: false },
      { text: 'in', correct: true },
      { text: 'within', correct: false }
    ]
  },
  {
    question: 'Which one of the following is an ternary operator:',
    answers: [
      { text: '?', correct: true },
      { text: ':', correct: false },
      { text: '-', correct: false },
      { text: '+', correct: false }
    ]
  }
]
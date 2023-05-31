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
    question: 'What sport has been played on the moon?',
    answers: [
      { text: 'Golf', correct: true },
      { text: 'Hockey', correct: false },
      { text: 'Chess', correct: false },
      { text: 'Badminton', correct: false }
    ]
  },
  {
    question: 'What is the heaviest organ in the human body?',
    answers: [
      { text: 'Kidney', correct: false },
      { text: 'Heart', correct: false },
      { text: 'Liver', correct: true },
      { text: 'Brain', correct: false }
    ]
  },
  {
    question: 'What currency is used in Turkey',
    answers: [
        { text: 'Turkish dollar', correct: false },
        { text: 'Turkish Lira', correct: true },
        { text: 'Turkish yen', correct: false },
        { text: 'Turkish pound', correct: false }
      ]
  },
  {
    question: 'How many hearts does an octopus have?',
    answers: [
      { text: 'Four', correct: false },
      { text: 'Two', correct: false },
      { text: 'Three', correct: true },
      { text: 'One', correct: false }
    ]
  },
  {
    question: 'Is scotland national animal is unicorn ?',
    answers: [
      { text: 'No', correct: false },
      { text: 'Yes', correct: true }
    ]
  }
]
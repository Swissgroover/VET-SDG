document.addEventListener("DOMContentLoaded", () => {
  const quizApp = {
    questions: [
      {
        question:
          "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
        answers: ["Apple", "Microsoft", "Atari", "Commodore"],
        correct_answer: 0,
        selected: null,
        sense: 0,
      },
      {
        question:
          "In any programming language, what is the most common way to iterate through an array?",
        answers: [
          "If Statements",
          "Do-while loops",
          "For loops",
          "While loops",
        ],
        correct_answer: 2,
        selected: null,
        sense: 0,
      },
      {
        question:
          "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
        answers: ["512", "1000", "1024", "500"],
        correct_answer: 1,
        selected: null,
        sense: 0,
      },
      {
        question: "HTML is what type of language?",
        answers: [
          "Markup Language",
          "Macro Language",
          "Programming Language",
          "Scripting Language",
        ],
        correct_answer: 0,
        selected: null,
        sense: 0,
      },
      {
        question: "What amount of bits commonly equals one byte?",
        answers: ["1", "2", "64", "8"],
        correct_answer: 3,
        selected: null,
        sense: 0,
      },
      {
        question:
          "If you were to code software in this language you'd only be able to type Ones and Zeros.",
        answers: ["JavaScript", "Binary", "C++", "Python"],
        correct_answer: 1,
        selected: null,
        sense: 0,
      },
      {
        question: "What is the most preferred image format used for logos?",
        answers: [".png", ".jpeg", ".svg", ".gif"],
        correct_answer: 2,
        selected: null,
        sense: 0,
      },
      {
        question: "In web development, what does CSS stand for?",
        answers: [
          "Counter Strike: Source",
          "Cascading Style Sheet",
          "Corrective Style Sheet",
          "Computer Style Sheet",
        ],
        correct_answer: 1,
        selected: null,
        sense: 0,
      },
      {
        question:
          'In "Hexadecimal", what color would be displayed from the color code? #00FF00?',
        answers: ["Red", "Green", "Blue", "Yellow"],
        correct_answer: 1,
        selected: null,
        sense: 0,
      },
      {
        question:
          "The C programming language was created by this American computer scientist.",
        answers: [
          "Dennis Ritchie",
          "Tim Berners Lee",
          "al-Khwārizmī",
          "Willis Ware",
        ],
        correct_answer: 0,
        selected: null,
        sense: 0,
      },
    ],
    currentQuestion: 0,
    answered: 0,
    wrongAnswers: 0,
    correctAnswers: 0,
    wrongQuestions: [],
    init() {
      this.setupEventListeners();
      this.renderQuestion();
    },
    renderQuestion() {
      const questionContainer = document.querySelector(".question");
      const answersContainer = document.querySelector(".answers");
      const questionObj = this.questions[this.currentQuestion];

      questionContainer.textContent = questionObj.question;
      answersContainer.innerHTML = "";

      questionObj.answers.forEach((answer, index) => {
        const span = document.createElement("span");
        span.textContent = answer;
        span.dataset.index = index;
        span.addEventListener("click", (e) => this.selectAnswer(e));
        answersContainer.appendChild(span);
      });

      document.querySelector(".next-btn").disabled = true;
    },
    selectAnswer(e) {
      const selectedElement = e.target;
      const allAnswers = document.querySelectorAll(".answers span");

      allAnswers.forEach((answer) => answer.classList.remove("selected"));
      selectedElement.classList.add("selected");

      this.questions[this.currentQuestion].selected = parseInt(
        selectedElement.dataset.index
      );

      document.querySelector(".next-btn").disabled = false;
    },
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
        this.renderQuestion();
      } else {
        this.calculateResults();
      }
    },
    calculateResults() {
      const resultContainer = document.querySelector(".result");
      const questionContainer = document.querySelector(".question");

      this.questions.forEach((question) => {
        if (
          question.selected === question.correct_answer &&
          question.sense === 0
        ) {
          this.correctAnswers++;
          question.sense = 1;
        } else if (
          question.selected !== question.correct_answer &&
          question.sense === 0
        ) {
          this.wrongAnswers++;
          question.sense = 1;

          const temp = {
            question: question.question,
            answers: question.answers,
            correct_answer: question.correct_answer,
            selected: question.selected,
          };

          this.wrongQuestions.push(temp);
        }
      });

      resultContainer.classList.add("active");
      questionContainer.classList.add("blur");
    },
    showWrongQuestions() {
      const wrongQuestionsContainer =
        document.querySelector(".wrong-questions");
      wrongQuestionsContainer.innerHTML = "";

      this.wrongQuestions.forEach((question) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p><strong>Question:</strong> ${question.question}</p>
          <p><strong>Your Answer:</strong> ${
            question.answers[question.selected]
          }</p>
          <p><strong>Correct Answer:</strong> ${
            question.answers[question.correct_answer]
          }</p>
        `;
        wrongQuestionsContainer.appendChild(div);
      });

      document.querySelector(".result").classList.remove("active");
      wrongQuestionsContainer.classList.add("active");
    },
    setupEventListeners() {
      document.querySelector(".next-btn").addEventListener("click", () => {
        this.nextQuestion();
      });

      document
        .querySelector(".result button.close")
        .addEventListener("click", () => {
          document.querySelector(".result").classList.remove("active");
          document.querySelector(".question").classList.remove("blur");
        });

      document
        .querySelector(".show-wrong-ones")
        .addEventListener("click", () => {
          this.showWrongQuestions();
        });

      document
        .querySelector("#return-to-result")
        .addEventListener("click", () => {
          document.querySelector(".wrong-questions").classList.remove("active");
          document.querySelector(".result").classList.add("active");
        });
    },
  };

  quizApp.init();
});

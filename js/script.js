const questions = [
  {
    question: "Which is the only continent in the world without a desert?",
    answers: [
      {
        answer: "north america",
        correct: false,
      },
      {
        answer: "asia",
        correct: false,
      },
      {
        answer: "europe",
        correct: true,
      },
      {
        answer: "africa",
        correct: false,
      },
    ],
  },
  {
    question: "Which is the most widely spoken language in the world?",
    answers: [
      {
        answer: "spanish",
        correct: false,
      },
      {
        answer: "mandarin",
        correct: true,
      },
      {
        answer: "english",
        correct: false,
      },
      {
        answer: "german",
        correct: false,
      },
    ],
  },
  {
    question: "Who Invented Computer?",
    answers: [
      {
        answer: "Charles Babbage",
        correct: true,
      },
      {
        answer: "Charles luce",
        correct: false,
      },
      {
        answer: "Henry Luce",
        correct: false,
      },
      {
        answer: "henry luce",
        correct: false,
      },
    ],
  },
];

window.onload = () => {
  main();
};

//global
let questionCount = 1;
let questionNo = 0;
let rightAnswer = 0;
function main() {
  const id = (id) => document.getElementById(id);
  const btnContainer = id("btn-container");
  const nextQuestion = id("next-question");
  const questionText = id("question");
  const time = id("time");
  const totalQuestion = id("total-question");
  const currentQuestion = id("current-question");
  const restartBtn = id("restart-btn");
  const startQuiz = id("start-btn");

  function startTheQuiz() {
    hideElementById("start-quiz");
    showElementById("quiz");
  }
  startQuiz.addEventListener("click", startTheQuiz);

  //update question no
  setInnerText("question-no", questionCount);

  //update total question
  setInnerText("total-question", questions.length);

  function createQuestion(answers) {
    answers.forEach((qes) => {
      const btn = document.createElement("button");
      btn.innerText = qes.answer;
      btn.classList.add("button");
      btn.dataset.name = qes.correct;
      btnContainer.appendChild(btn);
    });
  }

  function loadQuestion(questionNo) {
    questionText.innerText = questions[questionNo].question;
    createQuestion(questions[questionNo].answers);
  }
  loadQuestion(questionNo);

  function updateNextButtonText() {
    questionCount === questions.length
      ? setInnerText("next-question", "Finish")
      : setInnerText("next-question", "Next");
  }

  btnContainer.addEventListener("click", function (e) {
    if (e.target.id === "btn-container") return;
    //handle right answer
    const correct = e.target.dataset.name;
    if (correct === "true") {
      rightAnswer++;
      e.target.classList.add("bg-emerald-100", "border", "border-emerald-400");

      //disabled all button
      const buttons = btnContainer.querySelectorAll("button");
      buttons.forEach((btn) => {
        //show next button
        showElementById("next-question");

        updateNextButtonText();

        btn.setAttribute("disabled", true);
        btn.classList.add("cursor-no-drop");
      });
    } else {
      e.target.classList.add("bg-red-100", "border", "border-red-400");

      //disabled all button
      const buttons = btnContainer.querySelectorAll("button");
      buttons.forEach((btn) => {
        const correct = btn.dataset.name;
        if (correct === "true") {
          //show next button
          showElementById("next-question");

          updateNextButtonText();
          btn.classList.add("bg-emerald-100", "border", "border-emerald-400");
        }
        btn.setAttribute("disabled", true);
        btn.classList.add("cursor-no-drop");
      });
    }
  });

  function updateNextQuestion() {
    hideElementById("next-question");
    //remove existing child from button container
    removeElement(btnContainer);

    questionCount++;
    questionNo++;
    if (questionCount > questions.length) {
      hideElementById("quiz");
      showElementById("score-page");
      setInnerText("score", rightAnswer);
      setInnerText("total", questions.length);
      return;
    } else {
      loadQuestion(questionNo);
      setInnerText("question-no", questionCount);
    }
  }
  // handle nextQuestion button
  nextQuestion.addEventListener("click", updateNextQuestion);

  restartBtn.addEventListener("click", function () {
    window.location.reload();
  });

  //remove childe
  function removeElement(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}


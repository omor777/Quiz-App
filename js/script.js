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
let timeCount = 15;
let intervalId;
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
    loadQuestion(questionNo);
    timeCountDownQuiz();
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

  function timeCountDownQuiz() {
    setInnerText("time", timeCount);

    const buttons = btnContainer.querySelectorAll("button");

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        clearInterval(intervalId);
      });
    });

    intervalId = setInterval(() => {
      if (timeCount === 0) {
        clearTimeout(intervalId);
        return;
      }
      timeCount--;
      setInnerText("time", timeCount);
    }, 1000);
  }

  function showAnswerByTimeEnd() {
    const buttons = btnContainer.querySelectorAll("button");
    if (timeCount === 0) {
      buttons.forEach((btn) => {
        const correct = btn.dataset.name;
        if (correct === "true") {
          btn.classList.add("bg-emerald-100", "border", "border-emerald-400");

          showElementById("next-question");
          updateNextButtonText();

          btn.setAttribute("disabled", true);
          btn.classList.add("cursor-no-drop");
        } else {
          btn.setAttribute("disabled", true);
          btn.classList.add("cursor-no-drop");
        }
      });
    }
  }

  function loadQuestion(questionNo) {
    questionText.innerText = questions[questionNo].question;
    createQuestion(questions[questionNo].answers);
    // show answer automatically when time is end
    const intervalId = setInterval(() => {
      showAnswerByTimeEnd();
      if (timeCount === 0) {
        clearInterval(intervalId);
        return;
      }
    }, 1000);
  }

  function updateNextButtonText() {
    questionCount === questions.length
      ? setInnerText("next-question", "Finish")
      : setInnerText("next-question", "Next");
  }

  btnContainer.addEventListener("click", function (e) {
    if (e.target.id === "btn-container") return;

    if (e.target) {
      clearInterval(intervalId);
    }
    //handle right answer
    const correct = e.target.dataset.name;
    if (correct === "true") {
      rightAnswer++;
      e.target.classList.add("bg-emerald-100", "border", "border-emerald-400");

      const buttons = btnContainer.querySelectorAll("button");
      buttons.forEach((btn) => {
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
    timeCount = 15;
    questionCount++;
    questionNo++;
    hideElementById("next-question");
    removeElement(btnContainer);
    timeCountDownQuiz();
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

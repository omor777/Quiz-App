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
    question: "Which is the only continent in the world without a desert?",
    answers: [
      {
        answer: "north america",
        correct: false,
      },
      {
        answer: "uganda",
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
];

window.onload = () => {
  main();
};

function main() {
  const id = (id) => document.getElementById(id);
  const btnContainer = id("btn-container");
  const nextQuestion = id("next-question");
  const questionText = id("question");
  const time = id("time");
  const totalQuestion = id("total-question");
  const currentQuestion = id("current-question");

  function createQuestion(answers) {
    answers.forEach((qes) => {
      const btn = document.createElement("button");
      btn.innerText = qes.answer;
      btn.classList.add("button");
      btn.dataset.name = qes.correct;
      btnContainer.appendChild(btn);
    });
  }

  function loadQuestion() {
    questionText.innerText = questions[0].question;
    createQuestion(questions[0].answers);
  }
  loadQuestion();

  //
  btnContainer.addEventListener("click", function (e) {
    if (e.target.id === "btn-container") return;
    const correct = e.target.dataset.name;
    if (correct === "true") {
      e.target.classList.add("bg-emerald-100", "border", "border-emerald-400");

      //disabled all button
      const buttons = btnContainer.querySelectorAll("button");
      buttons.forEach((btn) => {
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
          btn.classList.add("bg-emerald-100", "border", "border-emerald-400");
        }
        btn.setAttribute("disabled", true);
        btn.classList.add("cursor-no-drop");
      });
    }
  });
}

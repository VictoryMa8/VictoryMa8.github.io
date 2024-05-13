const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Madrid", "Rome", "Berlin"],
      answer: "Paris"
    },
    {
      question: "What are some negative consequences of gaming addiction?",
      options: ["Jupiter", "Saturn", "Mars", "Earth"],
      answer: "Jupiter"
    },
    {
        questions: "Why are microtransactions harmful?",
        options: ["Since you don't know how much you're spending", "They can cause gambling disorders", "They can cause gaming disorders", "All of the above"],
        answer: "All of the above"
    }
  ];
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit");
  
  let currentQuestion = 0;
  let score = 0;
  
  function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;
  
    optionsElement.innerHTML = "";
    question.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      optionsElement.appendChild(button);
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;
  
    if (selectedButton.innerText === answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    quiz.innerHTML = `
      <h1>Quiz Completed!</h1>
      <p>Your score: ${score}/${quizData.length}</p>
    `;
  }
  
  showQuestion();
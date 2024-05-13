const quizData = [
    {
      question: "What percentage of teenage boys were called an offensive name while gaming?",
      options: ["41%", "48%", "32%", "10%"],
      answer: "48%"
    },
    {
      question: "What are some negative consequences of gaming addiction?",
      options: ["Lack of sleep", "Social withdrawal", "Becoming an alien", "Lack of sleep and social withdrawal"],
      answer: "Lack of sleep and social withdrawal"
    },
    {
        question: "What percentage of teenage girls were physically threatened while gaming?",
        options: ["12%", "25%", "15%", "10%"],
        answer: "48%"
    },
    {
        questions: "Why are microtransactions harmful?",
        options: ["Since you don't know how much you're spending", "They can cause gambling disorders", "They can cause gaming disorders", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What percentage of teenagers felt that gaming negatively impacted their amount of sleep?",
        options: ["41%", "25%", "65%", "10%"],
        answer: "41%"
    },
    
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
const questions = [
      {
        question: "1. What does CSS stand for?",
        options: [
          "Creative Style System <br> <br>",
          "Cascading Style Sheet <br><br>",
          "Computer Styled Sheet <br><br>",
          "Colorful Style Sheet <br> <br>"
        ],
        answer: "Cascading Style Sheet"
      },
      {
        question: "2. What does HTML stand for?",
        options: [
          "Hyper Text Markup Language  <br><br>",
          "Home Tool Markup Language <br><br> ",
          "Hyperlinks and Text Markup Language <br> <br>",
          "Hyper Tool Multiple Language <br><br>"
        ],
        answer: "Hyper Text Markup Language"
      },
      {
        question: "3. Which tag is used to create a hyperlink in HTML?",
        options: ["link  <br> <br>", "a  <br><br>", "href  <br><br>", "hyperlink  <br><br>"],
        answer: "a"
      },
      {
        question: "4. Which HTML element defines important text?",
        options: ["b  <br><br>", "em  <br><br>", "strong <br> <br>", "i <br> <br>"],
        answer: "strong"
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;
    let timerInterval;
    let timeLeft = 20;

    function startQuiz() {
      const username = document.getElementById("username").value.trim();
      if (!username) {
        alert("Please enter your name.");
        return;
      }
      localStorage.setItem("username", username);
      document.getElementById("displayName").innerText = `Welcome, ${username}`;
      document.getElementById("login-section").style.display = "none";
      document.getElementById("quiz-section").style.display = "flex";
      currentQuestion = 0;
      score = 0;
      showQuestion();
      startTimer();
    }

    function showQuestion() {
      const q = questions[currentQuestion];
      document.getElementById("question").innerText = q.question;
      const optionsContainer = document.getElementById("options");
      optionsContainer.innerHTML = "";
      q.options.forEach((opt, index) => {
        const radioId = `opt${index}`;
        optionsContainer.innerHTML += `
          <input type="radio" name="option" id="${radioId}" value="${opt}" />
          <label for="${radioId}" class="q">${opt}</label>
        `;
      });

      document.querySelectorAll('input[name="option"]').forEach((radio) => {
        radio.addEventListener("change", () => {
          selectedOption = radio.value;
        });
      });

      timeLeft = 20;
      updateTimerDisplay();
    }

    function nextQuestion() {
      if (!selectedOption) {
        alert("Please select an answer.");
        return;
      }

      if (selectedOption === questions[currentQuestion].answer) {
        score++;
      }

      selectedOption = null;
      currentQuestion++;
      clearInterval(timerInterval);

      if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
      } else {
        showResult();
      }
    }

    function showResult() {
      document.getElementById("quiz-section").style.display = "none";
      document.getElementById("result-section").style.display = "flex";
      document.getElementById("scoreDisplay").innerText = `Your Score: ${score}/${questions.length}`;
      clearInterval(timerInterval);
    }

    function restartQuiz() {
      localStorage.removeItem("username");
      document.getElementById("username").value = "";
      document.getElementById("displayName").innerText = "";
      document.getElementById("result-section").style.display = "none";
      document.getElementById("login-section").style.display = "flex";
    }

    function startTimer() {
      updateTimerDisplay();
      timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          alert("Time's up! Moving to next question.");
          nextQuestion();
        }
      }, 1000);
    }

    function updateTimerDisplay() {
      const timerEl = document.getElementById("timer");
      timerEl.innerText = `Time Left: ${timeLeft}s`;
    }

    window.onload = () => {
      const username = localStorage.getItem("username");
      if (username) {
        document.getElementById("username").value = username;
        document.getElementById("displayName").innerText = `Welcome, ${username}`;
      }
    };
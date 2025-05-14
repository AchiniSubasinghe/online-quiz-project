// Save the user's name on first page
function saveName() {
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
}

// Display name on every page
window.onload = function () {
    const displayName = document.getElementById('displayName');
    if (displayName) {
        const name = localStorage.getItem('username');
        displayName.innerText = name ? `Welcome, ${name}` : '';
    }

    startTimer();
}

// Timer logic (20 seconds)
let time = 20;
let timerInterval;

function startTimer() {
    const timerEl = document.createElement('div');
    timerEl.style.color = 'white';
    timerEl.style.fontWeight = 'bold';
    timerEl.style.marginLeft = '20px';
    timerEl.id = 'timer';
    document.querySelector('.nav').appendChild(timerEl);

    updateTimerDisplay();

    timerInterval = setInterval(() => {
        time--;
        updateTimerDisplay();
        if (time === 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to next question.");
            document.getElementById('b').click(); // Auto click next
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timer = document.getElementById('timer');
    if (timer) {
        timer.innerText = `Time Left: ${time}s`;
    }
}

// Save answers
const radios = document.querySelectorAll('.r');
radios.forEach((radio, index) => {
    radio.addEventListener('click', () => {
        const label = document.querySelector(`label[for=${radio.id}]`);
        if (label) {
            const qText = document.querySelector('.h3')?.innerText || `Q${index}`;
            localStorage.setItem(qText, label.innerText);
        }
    });
});

// On final page, calculate score
if (window.location.pathname.includes("page5.html")) {
    document.getElementById('b').addEventListener('click', () => {
        const correctAnswers = {
            "1.What does css Stands for?": "Cascading Style sheet",
            "2.What does html Stands for?": "Hyper Text Markup Language",
            "3.Which tag is used to create a hyperlink in HTML?": "a",
            "4.Which HTML element is used to define important text?": "strong"
        };

        let score = 0;
        for (let question in correctAnswers) {
            if (localStorage.getItem(question) === correctAnswers[question]) {
                score++;
            }
        }

        alert(`Your Score: ${score}/${Object.keys(correctAnswers).length}`);
        localStorage.clear(); // optional: clear for retry
    });
}

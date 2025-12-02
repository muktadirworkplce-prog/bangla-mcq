// বাংলা সংখ্যা রূপান্তর ফাংশন
function toBengaliDigits(number) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().replace(/\d/g, digit => bengaliDigits[digit]);
}

// বাংলা টাইম ফর্ম্যাট ফাংশন
function formatTimeBengali(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toBengaliDigits(minutes.toString().padStart(2, '0'))}:${toBengaliDigits(secs.toString().padStart(2, '0'))}`;
}

// অ্যাপ্লিকেশন অবস্থা
let currentQuestionIndex = 0;
let selectedQuestions = [];
let userAnswers = [];
let score = 0;
let examStarted = false;
let examTime = 30; // মিনিটে
let timeLeft = 0; // সেকেন্ডে
let timerInterval = null;
let darkMode = false;

// DOM এলিমেন্টস
const themeToggle = document.getElementById('themeToggle');
const examSetup = document.getElementById('examSetup');
const questionContainer = document.getElementById('questionContainer');
const resultContainer = document.getElementById('resultContainer');
const timerDisplay = document.getElementById('timer');
const currentQuestionDisplay = document.getElementById('currentQuestion');
const totalQuestionsDisplay = document.getElementById('totalQuestions');
const resetBtn = document.getElementById('resetBtn');
const submitBtn = document.getElementById('submitBtn');
const startExamBtn = document.getElementById('startExamBtn');
const examTimeInput = document.getElementById('examTime');
const totalQuestionsSelect = document.getElementById('totalQuestionsSelect');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const qNumber = document.getElementById('qNumber');
const qTime = document.getElementById('qTime');
const resultScore = document.getElementById('resultScore');
const correctCount = document.getElementById('correctCount');
const wrongCount = document.getElementById('wrongCount');
const progressPercentage = document.getElementById('progressPercentage');
const progressFill = document.getElementById('progressFill');
const answersReview = document.getElementById('answersReview');
const retryBtn = document.getElementById('retryBtn');

// অ্যাপ্লিকেশন শুরু করুন
function init() {
    examSetup.style.display = 'block';
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    
    themeToggle.addEventListener('click', toggleTheme);
    startExamBtn.addEventListener('click', startExam);
    resetBtn.addEventListener('click', resetExam);
    submitBtn.addEventListener('click', submitExam);
    retryBtn.addEventListener('click', retryExam);

    const savedTheme = localStorage.getItem('mcq-theme');
    if (savedTheme === 'dark') enableDarkMode();

    examTimeInput.value = toBengaliDigits(30);
}

// হালকা এবং গাঢ় মোড
function toggleTheme() { darkMode ? disableDarkMode() : enableDarkMode(); }
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    darkMode = true;
    localStorage.setItem('mcq-theme', 'dark');
}
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkMode = false;
    localStorage.setItem('mcq-theme', 'light');
}

// পরীক্ষা শুরু করুন
function startExam() {
    const examTimeValue = examTimeInput.value.replace(/[০-৯]/g, digit => '০১২৩৪৫৬৭৮৯'.indexOf(digit));
    examTime = parseInt(examTimeValue) || 30;
    const totalQ = parseInt(totalQuestionsSelect.value) || questions.length;
    
    // সকল প্রশ্ন নির্বাচিত
    selectedQuestions = questions.slice(0, totalQ);

    currentQuestionIndex = 0;
    userAnswers = new Array(selectedQuestions.length).fill(null);
    score = 0;
    examStarted = true;
    timeLeft = examTime * 60;

    examSetup.style.display = 'none';
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    totalQuestionsDisplay.textContent = toBengaliDigits(selectedQuestions.length);
    currentQuestionDisplay.textContent = toBengaliDigits(currentQuestionIndex + 1);

    loadQuestion(currentQuestionIndex);
    startTimer();
}

// টাইমার
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) { clearInterval(timerInterval); submitExam(); }
    }, 1000);
}
function updateTimerDisplay() {
    timerDisplay.textContent = formatTimeBengali(timeLeft);
    qTime.textContent = formatTimeBengali(timeLeft);
    if (timeLeft < 60) { timerDisplay.style.color = 'var(--danger)'; qTime.style.color = 'var(--danger)'; }
    else if (timeLeft < 300) { timerDisplay.style.color = 'var(--warning)'; qTime.style.color = 'var(--warning)'; }
    else { timerDisplay.style.color = ''; qTime.style.color = ''; }
}

// প্রশ্ন লোড
function loadQuestion(index) {
    if (index < 0 || index >= selectedQuestions.length) return;
    
    const question = selectedQuestions[index];
    currentQuestionIndex = index;

    qNumber.textContent = toBengaliDigits(index + 1);
    currentQuestionDisplay.textContent = toBengaliDigits(index + 1);
    questionText.textContent = question.question;

    optionsContainer.innerHTML = '';
    const optionLabels = ['ক', 'খ', 'গ', 'ঘ'];

    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[index] === i) optionElement.classList.add('selected');

        optionElement.innerHTML = `<div class="option-label">${optionLabels[i]}</div><div class="option-text">${option}</div>`;
        optionElement.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionElement);
    });
}

// অপশন নির্বাচন
function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => option.classList.toggle('selected', i === optionIndex));

    setTimeout(() => {
        if (currentQuestionIndex < selectedQuestions.length - 1) loadQuestion(currentQuestionIndex + 1);
    }, 1000);
}

// পরীক্ষা জমা
function submitExam() {
    examStarted = false;
    clearInterval(timerInterval);

    let correct = 0;
    selectedQuestions.forEach((q, i) => { if (userAnswers[i] === q.answer) correct++; });
    score = correct;
    const total = selectedQuestions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    resultScore.textContent = `${toBengaliDigits(score)}/${toBengaliDigits(total)}`;
    correctCount.textContent = toBengaliDigits(correct);
    wrongCount.textContent = toBengaliDigits(total - correct);
    progressPercentage.textContent = `${toBengaliDigits(percentage)}%`;
    progressFill.style.width = `${percentage}%`;

    answersReview.innerHTML = '';
    selectedQuestions.forEach((q, i) => {
        const reviewItem = document.createElement('div');
        const isCorrect = userAnswers[i] === q.answer;
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`;
        const optionLabels = ['ক', 'খ', 'গ', 'ঘ'];
        const userAnswerText = userAnswers[i] !== null ? `${optionLabels[userAnswers[i]]}. ${q.options[userAnswers[i]]}` : 'উত্তর দেওয়া হয়নি';
        const correctAnswerText = `${optionLabels[q.answer]}. ${q.options[q.answer]}`;
        reviewItem.innerHTML = `
            <div class="review-question">${toBengaliDigits(i + 1)}. ${q.question}</div>
            <div class="review-answer"><strong>আপনার উত্তর:</strong> ${userAnswerText} ${!isCorrect && userAnswers[i] !== null ? '✗' : ''}</div>
            ${!isCorrect ? `<div class="review-answer"><strong>সঠিক উত্তর:</strong> ${correctAnswerText} ✓</div>` : ''}
        `;
        answersReview.appendChild(reviewItem);
    });

    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}

// রিসেট
function resetExam() {
    if (!confirm('আপনি কি নিশ্চিত যে আপনি পরীক্ষা রিসেট করতে চান?')) return;
    clearInterval(timerInterval);
    examStarted = false;

    examSetup.style.display = 'block';
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'none';

    currentQuestionIndex = 0;
    selectedQuestions = [];
    userAnswers = [];
    score = 0;

    timerDisplay.textContent = '০০:০০';
    currentQuestionDisplay.textContent = '০';
    totalQuestionsDisplay.textContent = '০';
    resultScore.textContent = '০';

    examTimeInput.value = toBengaliDigits(30);
}

// আবার চেষ্টা
function retryExam() { resultContainer.style.display = 'none'; examSetup.style.display = 'block'; }

document.addEventListener('DOMContentLoaded', init);

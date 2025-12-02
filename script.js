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

// সম্পূর্ণ ঠিক করা প্রশ্ন ডেটা
const questions = [
    { id: 1, question: "বিলাসী গল্পে কোন দিনের নাম রয়েছে?", options: ["শনিবার", "সোমবার", "শুক্রবার", "রবিবার"], answer: 0 },
    { id: 2, question: "বিলাসী গল্পে আর কোন দিনের নাম রয়েছে?", options: ["বৃহস্পতিবার", "বুধবার", "মঙ্গলবার", "রবিবার"], answer: 2 },
    { id: 3, question: "বিলাসী গল্পে কোন ঋতুর নাম রয়েছে?", options: ["শীত", "গ্রীষ্ম", "বসন্ত", "শরৎ"], answer: 1 },
    { id: 4, question: "বিলাসী গল্পে আর কোন ঋতুর নাম রয়েছে?", options: ["হেমন্ত", "বর্ষা", "শরৎ", "বসন্ত"], answer: 1 },

    // রং
    { id: 5, question: "বিলাসী গল্পে কোন রঙের নাম রয়েছে?", options: ["নীল", "কালো", "লাল", "সাদা"], answer: 0 },
    { id: 6, question: "বিলাসী গল্পে আর কোন রঙের নাম রয়েছে?", options: ["সবুজ", "গেরুয়া", "হলুদ", "বেগুনি"], answer: 1 },

    // ফল
    { id: 7, question: "বিলাসী গল্পে মোট কয়টি ফলের নাম আছে?", options: ["তিন টি", "চার টি", "পাঁচ টি", "ছয় টি"], answer: 2 },
    { id: 8, question: "নিচের কোনটি বিলাসী গল্পের ফলের নাম?", options: ["কমলা", "আম", "তরমুজ", "পেয়ারা"], answer: 1 },
    { id: 9, question: "নিচের কোনটি বিলাসী গল্পের ফলের নাম?", options: ["কলা", "আতা", "কাঁঠাল", "বেল"], answer: 2 },
    { id: 10, question: "নিচের কোনটি বিলাসী গল্পের ফলের নাম?", options: ["আনারস", "আমড়া", "কুল", "ডাব"], answer: 0 },
    { id: 11, question: "নিচের কোনটি বিলাসী গল্পের ফলের নাম?", options: ["রম্ব", "লেবু", "আম", "জাম"], answer: 0 },
    { id: 12, question: "নিচের কোনটি বিলাসী গল্পের ফলের নাম?", options: ["বেল", "বৈঁচি", "কুল", "তেঁতুল"], answer: 1 },

    // মাদক দ্রব্য
    { id: 13, question: "বিলাসী গল্পে কোন মাদকের দ্রব্যের নাম রয়েছে?", options: ["গাঁজা", "হুক্কা", "খৈনি", "জর্দা"], answer: 0 },
    { id: 14, question: "বিলাসী গল্পে কোন মাদকের দ্রব্য রয়েছে?", options: ["গুলি", "সিগারেট", "জর্দা", "ধূম"], answer: 0 },
    { id: 15, question: "বিলাসী গল্পে কোন মাদকের দ্রব্য রয়েছে?", options: ["আফিম", "সুরা", "বিড়ি", "চুরুট"], answer: 0 },

    // ব্যক্তির নাম
    { id: 16, question: "বিলাসী গল্পে কোন ব্যক্তির নাম রয়েছে?", options: ["আকবর", "হুমায়ুন", "জাহাঙ্গীর", "বাবর"], answer: 1 },
    { id: 17, question: "বিলাসী গল্পে কোন ব্যক্তির নাম রয়েছে?", options: ["ভূদেব বাবু", "রঘুনাথ", "অমল", "শম্ভু"], answer: 0 },
    { id: 18, question: "বিলাসী গল্পে কোন ব্যক্তির নাম রয়েছে?", options: ["শাহজাহান", "তোগলোক খাঁ", "ইলতুতমিশ", "আলাউদ্দিন"], answer: 1 },

    // জাত
    { id: 19, question: "বিলাসী গল্পে কোন জাতির নাম রয়েছে?", options: ["ইংরাজ", "পাঞ্জাবি", "গুর্খা", "মারাঠি"], answer: 0 },
    { id: 20, question: "বিলাসী গল্পে কোন জাতির নাম রয়েছে?", options: ["রাজবংশী", "ডোম", "তান্ত্রিক", "তামাঙ্গ"], answer: 1 },
    { id: 21, question: "বিলাসী গল্পে কোন জাতির নাম রয়েছে?", options: ["মাহলি", "কায়স্থ", "মালি", "কুমোর"], answer: 1 },
    { id: 22, question: "বিলাসী গল্পে কোন জাতির নাম রয়েছে?", options: ["ব্রাহ্মণ", "জৈন", "শিখ", "মারাঠি"], answer: 0 },

    // রোগ
    { id: 23, question: "বিলাসী গল্পে কোন রোগের নাম রয়েছে?", options: ["বসন্ত", "টাইফয়েড", "ম্যালেরিয়া", "কলেরা"], answer: 2 },

    // মূল তথ্য
    { id: 24, question: "বিলাসী গল্পের মর্মবাণী কী?", options: ["মানব প্রেমের অপূর্ব মহিমা", "সমাজ সংস্কার", "দেশপ্রেম", "নৈতিক শিক্ষা"], answer: 0 },
    { id: 25, question: "বিলাসী গল্পের প্রথম লাইন কোনটি?", options: ["আমি বিলাসী...", "মৃত্যুঞ্জয় স্কুলে যায়...", "পাকা দুই ক্রোশ হাঁটিয়া...", "বিলাসীর জন্ম..."], answer: 2 },
    { id: 26, question: "বিলাসী গল্পের শেষ লাইন কোনটি?", options: ["আমি শুধু এই বলিব যে...", "বিলাসী মৃত্যুবরণ করল", "গল্প শেষ", "মৃত্যুঞ্জয়ের স্মৃতি"], answer: 0 },
    { id: 27, question: "বিলাসী গল্পের লেখক কে?", options: ["শরৎচন্দ্র চট্টোপাধ্যায়", "রবীন্দ্রনাথ ঠাকুর", "বিভূতিভূষণ", "বঙ্কিমচন্দ্র"], answer: 0 },
    { id: 28, question: "বিলাসী গল্প প্রথম প্রকাশিত হয় কোথায়?", options: ["মাসিক বসুমতী", "ভারতী পত্রিকায়", "সবুজপত্র", "আনন্দবাজার"], answer: 1 },
    { id: 29, question: "বিলাসী গল্প কখন প্রকাশিত হয়?", options: ["১৯২০", "১৯১৫", "১৯১৮", "১৯১০"], answer: 2 },
    { id: 30, question: "পরে গল্পটি কোন গল্পগ্রন্থের অন্তর্ভুক্ত হয়?", options: ["গৃহদাহ", "চরিত্রহীন", "ছবি", "দত্তা"], answer: 2 },

    // লেখক সম্পর্কিত
    { id: 31, question: "শরৎচন্দ্রের প্রথম প্রকাশিত গল্পের নাম কী?", options: ["মন্দির", "বড়দিদি", "মহেশ", "শ্রীকান্ত"], answer: 0 },
    { id: 32, question: "শরৎচন্দ্রের আত্মজৈবনিক উপন্যাসের নাম কী?", options: ["গৃহদাহ", "চরিত্রহীন", "শ্রীকান্ত", "দত্তা"], answer: 2 },
    { id: 33, question: "শরৎচন্দ্রের প্রথম উপন্যাসের নাম কী?", options: ["বড়দিদি", "বিন্দুর ছেলে", "দত্তা", "পথের দাবী"], answer: 0 },
    { id: 34, question: "বিলাসী গল্পে লেখকের কিসের ছায়াপাত ঘটেছে?", options: ["ছেলেবেলার", "যৌবন", "প্রৌঢ়ত্ব", "পরিবার"], answer: 0 },
    { id: 35, question: "শরৎচন্দ্র কত বছর বয়সে সন্ন্যাসী হন?", options: ["২৬", "২৪", "৩০", "২২"], answer: 1 },
    { id: 36, question: "শরৎচন্দ্র অনিলা দেবী ছদ্মনামে কোন গ্রন্থ রচনা করেন?", options: ["গৃহদাহ", "নারীর মূল্য", "দত্তা", "মন্দির"], answer: 1 },
    { id: 37, question: "সরকার কর্তৃক বাজেয়াপ্ত শরৎচন্দ্রের উপন্যাস?", options: ["পথের দাবী", "বড়দিদি", "গৃহদাহ", "মহেশ"], answer: 0 },
    { id: 38, question: "পথের দাবী কেমন উপন্যাস?", options: ["রোমান্টিক", "রাজনৈতিক", "সামাজিক", "ব্যঙ্গাত্মক"], answer: 1 },
    { id: 39, question: "পথের দাবীতে শরৎচন্দ্র কাদের সমালোচনা করেন?", options: ["জমিদার", "ব্রিটিশ শাসন", "ব্রাহ্মণ", "কৃষক"], answer: 1 },
    { id: 40, question: "কোন উপন্যাসে সশস্ত্র বিপ্লবকে সমর্থন করা হয়েছে?", options: ["চরিত্রহীন", "পথের দাবী", "দত্তা", "শ্রীকান্ত"], answer: 1 },
    { id: 41, question: "মন্দির গল্পের জন্য কোন পুরস্কার পান?", options: ["সাহিত্য একাডেমি", "আনন্দ পুরস্কার", "কুন্তলীন পুরস্কার", "রবীন্দ্র পুরস্কার"], answer: 2 },
    { id: 42, question: "কুন্তলীন পুরস্কার লাভের বছর?", options: ["১৯০৫", "১৯০৩", "১৯০৭", "১৯১০"], answer: 1 },
    { id: 43, question: "বিলাসী গল্পে কী বর্ণিত হয়েছে?", options: ["গ্রামের রাজনীতি", "দুই বঞ্চিত মানব মানবীর প্রেম", "যুদ্ধবিদ্যা", "শিক্ষার গুরুত্ব"], answer: 1 },
    { id: 44, question: "কোন গল্পে শরৎচন্দ্র নিজের জীবনের ছায়া ফেলেছেন?", options: ["মহেশ", "বিলাসী", "দত্তা", "গৃহদাহ"], answer: 1 },
    { id: 45, question: "বিলাসী কোন গ্রন্থভুক্ত গল্প?", options: ["পথের দাবী", "ছবি", "চরিত্রহীন", "দত্তা"], answer: 1 },

    // চরিত্র
    { id: 46, question: "বিলাসী গল্পের নায়ক কে?", options: ["ভূদেব", "ন্যাড়া", "মৃত্যুঞ্জয়", "তোগলোক খাঁ"], answer: 2 },
    { id: 47, question: "বিলাসী গল্পের নায়িকা কে?", options: ["কাদম্বিনী", "বিলাসী", "রমলা", "সুচরিতা"], answer: 1 },
    { id: 48, question: "মৃত্যুঞ্জয় কোন দেবতার নামে?", options: ["গণেশ", "মহেশ্বর", "বিষ্ণু", "কার্তিক"], answer: 1 },
    { id: 49, question: "মৃত্যুঞ্জয়ের জাত কী ছিল?", options: ["ব্রাহ্মণ", "ডোম", "কায়স্থ", "তন্তুবায়"], answer: 2 },
    { id: 50, question: "মৃত্যুঞ্জয় কোন বংশের ছেলে?", options: ["ঘোষ", "দত্ত", "মিত্তির", "পাল"], answer: 2 },
    { id: 51, question: "মৃত্যুঞ্জয় কোন ক্লাসে পড়ত?", options: ["ফোর্থ", "থার্ড", "ফিফথ", "সেকেন্ড"], answer: 1 },
    { id: 52, question: "মৃত্যুঞ্জয়ের বাগানের আয়তন কত ছিল?", options: ["১০-১৫ বিঘা", "৩০-৩৫ বিঘা", "২০-২৫ বিঘা", "৫-১০ বিঘা"], answer: 2 },
    { id: 53, question: "মৃত্যুঞ্জয়কে কোন সাপে কামড় দেয়?", options: ["দুধসাপ", "খরিস গোখরা", "জলসাপ", "চন্দ্রবোড়া"], answer: 1 },
    { id: 54, question: "সাপে দংশনের কত মিনিট পরে বমি করে?", options: ["১০-১৫ মিনিট", "১৫-২০ মিনিট", "৩০ মিনিট", "৫ মিনিট"], answer: 1 },
    { id: 55, question: "মৃত্যুঞ্জয় কতদিন শয্যাগত ছিল?", options: ["এক মাস", "দুই মাস", "দেড় মাস", "তিন সপ্তাহ"], answer: 2 },
    { id: 56, question: "কাগজ তো ইঁদুরেও আনতে পারে উক্তিটি কার?", options: ["ভূদেব", "ন্যাড়া", "বিলাসী", "মৃত্যুঞ্জয়"], answer: 2 },
    { id: 57, question: "বিলাসী গল্পে ন্যাড়া কে?", options: ["শরৎচন্দ্র চট্টোপাধ্যায়", "মৃত্যুঞ্জয়", "তোগলোক খাঁ", "ভূদেব"], answer: 0 },
    { id: 58, question: "ন্যাড়া মৃত্যুঞ্জয়কে দেখতে গিয়েছিল কখন?", options: ["সকালে", "দুপুরে", "সন্ধ্যেবেলা", "রাতে"], answer: 2 },
    { id: 59, question: "মা সরস্বতী কে?", options: ["বিদ্যা ও কলার দেবী", "যুদ্ধের দেবী", "সম্পদের দেবী", "বৃষ্টির দেবী"], answer: 0 },
    { id: 60, question: "নালতের মিত্তির কে?", options: ["মৃত্যুঞ্জয়ের মামা", "মৃত্যুঞ্জয়ের খুঁড়ো", "মৃত্যুঞ্জয়ের ভাই", "মৃত্যুঞ্জয়ের দাদা"], answer: 1 },
];

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
        const scoreDisplay = document.getElementById('score');
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
            // শুরুতে পরীক্ষা সেটআপ দেখান
            examSetup.style.display = 'block';
            questionContainer.style.display = 'none';
            resultContainer.style.display = 'none';
            
            // ইভেন্ট লিসেনার সেট আপ করুন
            themeToggle.addEventListener('click', toggleTheme);
            startExamBtn.addEventListener('click', startExam);
            resetBtn.addEventListener('click', resetExam);
            submitBtn.addEventListener('click', submitExam);
            retryBtn.addEventListener('click', retryExam);
            
            // সংরক্ষিত থিম পছন্দ লোড করুন
            const savedTheme = localStorage.getItem('mcq-theme');
            if (savedTheme === 'dark') {
                enableDarkMode();
            }
            
            // বাংলা সংখ্যা ইনপুট সেট করুন
            examTimeInput.value = toBengaliDigits(30);
        }

        // হালকা এবং গাঢ় মোডের মধ্যে টগল করুন
        function toggleTheme() {
            if (darkMode) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        }

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
            // বাংলা সংখ্যাকে ইংরেজি সংখ্যায় রূপান্তর করুন
            const examTimeValue = examTimeInput.value.replace(/[০-৯]/g, digit => '০১২৩৪৫৬৭৮৯'.indexOf(digit));
            examTime = parseInt(examTimeValue) || 30;
            const totalQ = parseInt(totalQuestionsSelect.value) || 75;
            
            // এলোমেলো প্রশ্ন নির্বাচন করুন
            selectedQuestions = shuffleArray([...questions]).slice(0, totalQ);
            
            // অবস্থা রিসেট করুন
            currentQuestionIndex = 0;
            userAnswers = new Array(selectedQuestions.length).fill(null);
            score = 0;
            examStarted = true;
            timeLeft = examTime * 60;
            
            // UI আপডেট করুন
            examSetup.style.display = 'none';
            questionContainer.style.display = 'block';
            resultContainer.style.display = 'none';
            
            // কাউন্টার আপডেট করুন
            totalQuestionsDisplay.textContent = toBengaliDigits(selectedQuestions.length);
            currentQuestionDisplay.textContent = toBengaliDigits(currentQuestionIndex + 1);
            scoreDisplay.textContent = toBengaliDigits(score);
            
            // প্রথম প্রশ্ন লোড করুন
            loadQuestion(currentQuestionIndex);
            
            // টাইমার শুরু করুন
            startTimer();
        }

        // অ্যারে এলোমেলো করুন (ফিশার-ইয়েটস অ্যালগরিদম)
        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        // কাউন্টডাউন টাইমার শুরু করুন
        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            
            updateTimerDisplay();
            
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    submitExam();
                }
            }, 1000);
        }

        // টাইমার প্রদর্শন আপডেট করুন
        function updateTimerDisplay() {
            timerDisplay.textContent = formatTimeBengali(timeLeft);
            qTime.textContent = formatTimeBengali(timeLeft);
            
            // সময় ফুরিয়ে এলে রং পরিবর্তন করুন
            if (timeLeft < 60) {
                timerDisplay.style.color = 'var(--danger)';
                qTime.style.color = 'var(--danger)';
            } else if (timeLeft < 300) {
                timerDisplay.style.color = 'var(--warning)';
                qTime.style.color = 'var(--warning)';
            } else {
                timerDisplay.style.color = '';
                qTime.style.color = '';
            }
        }

        // একটি প্রশ্ন লোড করুন
        function loadQuestion(index) {
            if (index < 0 || index >= selectedQuestions.length) return;
            
            const question = selectedQuestions[index];
            currentQuestionIndex = index;
            
            // প্রশ্ন নম্বর আপডেট করুন
            qNumber.textContent = toBengaliDigits(index + 1);
            currentQuestionDisplay.textContent = toBengaliDigits(index + 1);
            
            // প্রশ্ন পাঠ্য আপডেট করুন
            questionText.textContent = question.question;
            
            // অপশনগুলি সাফ করুন
            optionsContainer.innerHTML = '';
            
            // অপশন যোগ করুন
            const optionLabels = ['ক', 'খ', 'গ', 'ঘ'];
            
            question.options.forEach((option, i) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                if (userAnswers[index] === i) {
                    optionElement.classList.add('selected');
                }
                
                optionElement.innerHTML = `
                    <div class="option-label">${optionLabels[i]}</div>
                    <div class="option-text">${option}</div>
                `;
                
                optionElement.addEventListener('click', () => selectOption(i));
                optionsContainer.appendChild(optionElement);
            });
        }

        // একটি অপশন নির্বাচন করুন
        function selectOption(optionIndex) {
            userAnswers[currentQuestionIndex] = optionIndex;
            
            // UI আপডেট করুন
            const options = document.querySelectorAll('.option');
            options.forEach((option, i) => {
                option.classList.remove('selected');
                if (i === optionIndex) {
                    option.classList.add('selected');
                }
            });
            
            // 1 সেকেন্ড পরে স্বয়ংক্রিয়ভাবে পরবর্তী প্রশ্নে যান
            setTimeout(() => {
                if (currentQuestionIndex < selectedQuestions.length - 1) {
                    loadQuestion(currentQuestionIndex + 1);
                }
            }, 1000);
        }

        // পরীক্ষা জমা দিন
        function submitExam() {
            examStarted = false;
            clearInterval(timerInterval);
            
            // স্কোর গণনা করুন
            let correct = 0;
            selectedQuestions.forEach((question, index) => {
                if (userAnswers[index] === question.answer) {
                    correct++;
                }
            });
            
            score = correct;
            const total = selectedQuestions.length;
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
            
            // ফলাফল UI আপডেট করুন
            resultScore.textContent = `${toBengaliDigits(score)}/${toBengaliDigits(total)}`;
            correctCount.textContent = toBengaliDigits(correct);
            wrongCount.textContent = toBengaliDigits(total - correct);
            progressPercentage.textContent = `${toBengaliDigits(percentage)}%`;
            progressFill.style.width = `${percentage}%`;
            
            // উত্তর পর্যালোচনা দেখান
            answersReview.innerHTML = '';
            selectedQuestions.forEach((question, index) => {
                const reviewItem = document.createElement('div');
                const isCorrect = userAnswers[index] === question.answer;
                
                reviewItem.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`;
                
                const optionLabels = ['ক', 'খ', 'গ', 'ঘ'];
                
                const userAnswerText = userAnswers[index] !== null 
                    ? `${optionLabels[userAnswers[index]]}. ${question.options[userAnswers[index]]}`
                    : 'উত্তর দেওয়া হয়নি';
                
                const correctAnswerText = `${optionLabels[question.answer]}. ${question.options[question.answer]}`;
                
                reviewItem.innerHTML = `
                    <div class="review-question">${toBengaliDigits(index + 1)}. ${question.question}</div>
                    <div class="review-answer">
                        <strong>আপনার উত্তর:</strong> 
                        ${userAnswerText} ${!isCorrect && userAnswers[index] !== null ? '✗' : ''}
                    </div>
                    ${!isCorrect ? `
                        <div class="review-answer">
                            <strong>সঠিক উত্তর:</strong> 
                            ${correctAnswerText} ✓
                        </div>
                    ` : ''}
                `;
                
                answersReview.appendChild(reviewItem);
            });
            
            // ফলাফল কন্টেইনার দেখান
            questionContainer.style.display = 'none';
            resultContainer.style.display = 'block';
        }

        // পরীক্ষা রিসেট করুন
        function resetExam() {
            if (confirm('আপনি কি নিশ্চিত যে আপনি পরীক্ষা রিসেট করতে চান? এটি আপনার অগ্রগতি মুছে ফেলবে।')) {
                
                clearInterval(timerInterval);
                examStarted = false;
                
                // UI রিসেট করুন
                examSetup.style.display = 'block';
                questionContainer.style.display = 'none';
                resultContainer.style.display = 'none';
                
                // অবস্থা রিসেট করুন
                currentQuestionIndex = 0;
                selectedQuestions = [];
                userAnswers = [];
                score = 0;
                
                // কাউন্টার আপডেট করুন
                timerDisplay.textContent = '০০:০০';
                currentQuestionDisplay.textContent = '০';
                totalQuestionsDisplay.textContent = '০';
                scoreDisplay.textContent = '০';
                
                // ইনপুট ক্ষেত্র রিসেট করুন
                examTimeInput.value = toBengaliDigits(30);
            }
        }

        // পরীক্ষা আবার চেষ্টা করুন
        function retryExam() {
            resultContainer.style.display = 'none';
            examSetup.style.display = 'block';
        }

        // পৃষ্ঠা লোড হওয়ার সময় শুরু করুন
        document.addEventListener('DOMContentLoaded', init);

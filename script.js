document.addEventListener('DOMContentLoaded', () => {

    // --- 資料定義 ---
    const questions = [
        {
            question: "外頭的喧囂，是你想投入其中，還是暫時隔絕？",
            answers: ["投入其中，感受人聲鼎沸。", "拉上窗簾，享受片刻寧靜。"]
        },
        {
            question: "此刻，時間的流速感覺像是...",
            answers: ["一杯暢快的啤酒，泡沫飛逝。", "一杯純飲的威士忌，緩慢品嚐。"]
        },
        {
            question: "腦海中的思緒，比較像...",
            answers: ["爵士樂的即興獨奏，自由奔放。", "一本攤開的舊書，靜待翻閱。"]
        },
        {
            question: "如果回憶有味道，你今晚嚐到的是...",
            answers: ["辛辣帶勁，像第一口烈酒。", "溫潤回甘，像融化的冰塊。"]
        },
        {
            question: "這首歌，你希望它為你帶來什麼？",
            answers: ["一個暫時忘卻煩惱的出口。", "一面能誠實看見自己的鏡子。"]
        }
    ];

    const resultsData = [
        {
            scoreThreshold: 6,
            text: "你需要的是一場釋放。把所有沉重都寄放在這個節拍裡，跟著它一起搖擺，直到燈亮起。",
            song: "Red Hot Chili Peppers - Can't Stop",
            songLink: "https://www.youtube.com/watch?v=8DyziWtkfBw"
        },
        {
            scoreThreshold: 8,
            text: "有點飄浮，有點迷惘，但不壞。像午夜後的城市街燈，模糊、朦朧，但有著獨特的美感。",
            song: "Cigarettes After Sex - Apocalypse",
            songLink: "https://www.youtube.com/watch?v=Xvw8dGJrY3k"
        },
        {
            scoreThreshold: Infinity, // 最後一個選項
            text: "你正在與自己對話。很好。這杯酒的時間，這首歌的空間，只屬於你和你的思緒。",
            song: "Bon Iver - Holocene",
            songLink: "https://www.youtube.com/watch?v=TWcyIpul8OE"
        }
    ];

    // --- DOM 元素快取 ---
    const mainTitle = document.getElementById('main-title');
    const startSection = document.getElementById('start-section');
    const startBtn = document.getElementById('start-btn');
    const questionCard = document.getElementById('question-card');
    const questionText = document.getElementById('question-text');
    const answerBtn1 = document.getElementById('answer-btn-1');
    const answerBtn2 = document.getElementById('answer-btn-2');
    const progressContainer = document.getElementById('progress-container');
    const progressItems = progressContainer.querySelectorAll('.progress-item');
    const resultCard = document.getElementById('result-card');
    const resultText = document.getElementById('result-text');
    const resultSong = document.getElementById('result-song');

    // --- 應用程式狀態 ---
    let score = 0;
    let currentQuestionIndex = 0;

    // --- 函式定義 ---

    // 開始測驗
    function startQuiz() {
        startSection.style.display = 'none'; // 直接隱藏開始按鈕
        mainTitle.style.display = 'none'; // 同時隱藏主標題
        progressContainer.classList.add('active');
        renderQuestion();
    }
    
    // 渲染問題
    function renderQuestion() {
        const q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        answerBtn1.textContent = q.answers[0];
        answerBtn2.textContent = q.answers[1];
        questionCard.classList.add('active');
    }

    // 處理回答
    function handleAnswer(choice) {
        score += choice;
        progressItems[currentQuestionIndex].classList.add('active');
        currentQuestionIndex++;
        
        questionCard.classList.remove('active'); // 讓舊問題淡出

        // 等待淡出動畫結束後再顯示下一個問題或結果
        setTimeout(() => {
            if (currentQuestionIndex < questions.length) {
                renderQuestion();
            } else {
                showResult();
            }
        }, 500); // 這個時間應與 CSS 中的 transition-speed 相關
    }

    // 顯示最終結果
    function showResult() {
        progressContainer.classList.remove('active');
        
        const result = resultsData.find(r => score <= r.scoreThreshold);

        if (result) {
            resultText.textContent = result.text;
            resultSong.textContent = `聽這首歌：${result.song}`;
            resultSong.href = result.songLink;
            resultCard.classList.add('active');
        }
    }

    // --- 事件監聽 ---
    startBtn.addEventListener('click', startQuiz);
    answerBtn1.addEventListener('click', () => handleAnswer(1));
    answerBtn2.addEventListener('click', () => handleAnswer(2));

});
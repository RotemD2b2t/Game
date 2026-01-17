// ========== Game Start Ad Logic ==========

// Create unique device ID
function getOrCreateDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

// Settings Button - הצג רק במצב רגיל (לא גיימיל או אפליקציה)
function createSettingsButton() {
    const gameType = document.body.getAttribute('data-game-type') || 'imposter';
    
    // הצג כפתור רק אם זה משחק רגיל
    if (gameType !== 'imposter') {
        return;
    }
    
    const settingsBtn = document.createElement('button');
    settingsBtn.textContent = '⚙️ חזרה להגדרות';
    settingsBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        z-index: 8888;
        font-family: 'Heebo', sans-serif;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
    `;
    
    settingsBtn.onmouseover = () => {
        settingsBtn.style.transform = 'translateY(-2px)';
        settingsBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    };
    
    settingsBtn.onmouseout = () => {
        settingsBtn.style.transform = 'translateY(0)';
        settingsBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    };
    
    settingsBtn.onclick = () => {
        window.location.href = '/choosegame';
    };
    
    document.body.appendChild(settingsBtn);
}

// Full-Screen Ad Component - Professional Design
function createFullScreenAd(onComplete) {
    const adContainer = document.createElement('div');
    adContainer.id = 'full-screen-ad-container';
    adContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        overflow: hidden;
        direction: rtl;
        font-family: 'Heebo', '-apple-system', sans-serif;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
        width: 100%;
        padding: 15px 20px;
        background: rgba(255, 255, 255, 0.05);
        text-align: right;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `;
    header.textContent = 'פרסומת';

    const adContent = document.createElement('div');
    adContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 0;
        width: 90%;
        max-width: 600px;
        height: auto;
        text-align: center;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        margin: 20px auto;
    `;

    // Ad placeholder - larger, more professional
    const adPlaceholder = document.createElement('div');
    adPlaceholder.style.cssText = `
        width: 100%;
        aspect-ratio: 1 / 1.2;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 48px;
        font-weight: bold;
        position: relative;
        overflow: hidden;
    `;
    
    // Add some animation
    const bgAnimation = document.createElement('div');
    bgAnimation.style.cssText = `
        position: absolute;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
        animation: shimmer 3s infinite;
        top: 0;
        left: -100%;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { transform: translateX(0); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
    
    adPlaceholder.appendChild(bgAnimation);
    adPlaceholder.textContent = '🎯 פרסומת';

    // Info section
    const infoSection = document.createElement('div');
    infoSection.style.cssText = `
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
    `;

    // Countdown timer
    let timeLeft = 30;
    let canSkip = false;
    
    const timerContainer = document.createElement('div');
    timerContainer.style.cssText = `
        margin: 20px 0;
    `;
    
    const timerLabel = document.createElement('div');
    timerLabel.style.cssText = `
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
    `;
    timerLabel.textContent = 'סיום הפרסומת בעוד:';
    
    const timer = document.createElement('div');
    timer.style.cssText = `
        font-size: 56px;
        font-weight: bold;
        color: #667eea;
        font-family: 'Courier New', monospace;
        margin: 10px 0;
    `;
    timer.textContent = `${timeLeft}`;

    timerContainer.appendChild(timerLabel);
    timerContainer.appendChild(timer);

    const skipButton = document.createElement('button');
    skipButton.textContent = 'דלג על הפרסומת (אחרי 10 שניות)';
    skipButton.style.cssText = `
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: not-allowed;
        margin-top: 15px;
        margin-bottom: 10px;
        opacity: 0.3;
        transition: all 0.3s ease;
        width: 100%;
        max-width: 400px;
        box-sizing: border-box;
        font-family: 'Heebo', sans-serif;
    `;
    skipButton.disabled = true;

    // Countdown logic
    const countdownInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = `${timeLeft}`;

        // After 10 seconds, enable skip button
        if (timeLeft === 10 && !canSkip) {
            canSkip = true;
            skipButton.disabled = false;
            skipButton.style.opacity = '1';
            skipButton.style.cursor = 'pointer';
            skipButton.textContent = 'דלג על הפרסומת';
        }

        // Time's up
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            completeAd();
        }
    }, 1000);

    skipButton.onclick = () => {
        clearInterval(countdownInterval);
        completeAd();
    };

    infoSection.appendChild(timerContainer);
    infoSection.appendChild(skipButton);
    
    adContent.appendChild(adPlaceholder);
    adContent.appendChild(infoSection);

    adContainer.appendChild(header);
    adContainer.appendChild(adContent);
    document.body.appendChild(adContainer);

    function completeAd() {
        adContainer.remove();
        if (onComplete) onComplete();
    }
}

// Check if ad is needed and show it
async function checkAndShowAdBeforeGame() {
    try {
        const isPremium = localStorage.getItem('isPremium') === 'true';
        const deviceId = getOrCreateDeviceId();
        const username = document.body.getAttribute('data-user') || null;

        // If premium, skip ad
        if (isPremium) {
            return true; // Continue game
        }

        // Check with server if ad is needed
        const response = await fetch('/api/check-game-ad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId, username })
        });

        const result = await response.json();

        // If no ad needed, record without ad and continue
        if (!result.needs_ad) {
            await fetch('/api/record-game-play', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ device_id: deviceId, had_ad: 0 })
            });
            return true;
        }

        // Ad is needed: show it first, then record
        return new Promise((resolve) => {
            createFullScreenAd(async () => {
                // Record with ad = 1
                await fetch('/api/record-game-play', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ device_id: deviceId, had_ad: 1 })
                });
                resolve(true);
            });
        });

    } catch (error) {
        console.error('Error checking ad:', error);
        return true; // Continue game even if error
    }
}

// ========== Original Game Logic Below ==========

// --- נתונים למשחק: מילה ומילה (Word vs Word) ---
const DATA_WordNWord = {
    dailyObjects: [
        { "word": "תפוח" }, { "word": "כיסא" }, { "word": "טלפון" }, { "word": "מחשב" }, { "word": "שולחן" },
        { "word": "כוס" }, { "word": "בקבוק" }, { "word": "מפתח" }, { "word": "שלט" }, { "word": "שעון" },
        { "word": "ספר" }, { "word": "עט" }, { "word": "עפרון" }, { "word": "מחק" }, { "word": "קלמר" },
        { "word": "מספריים" }, { "word": "מסרק" }, { "word": "מברשת שיניים" }, { "word": "משחת שיניים" }, { "word": "סבון" },
        { "word": "מגבת" }, { "word": "מטען" }, { "word": "אוזניות" }, { "word": "מקלדת" }, { "word": "עכבר" },
        { "word": "מראה" }, { "word": "סכין" }, { "word": "מזלג" }, { "word": "כף" }, { "word": "קערה" },
        { "word": "צלחת" }, { "word": "מחבת" }, { "word": "סיר" }, { "word": "קומקום" }, { "word": "מקרר" },
        { "word": "תנור" }, { "word": "מיקרוגל" }, { "word": "כפפה" }, { "word": "נעל" }, { "word": "גרב" },
        { "word": "מטרייה" }, { "word": "תיק" }, { "word": "ארנק" }, { "word": "ממחטה" }, { "word": "מגב" },
        { "word": "שואב אבק" }, { "word": "טלויזיה" }, { "word": "מנורה" }, { "word": "וילון" }
    ],      
      famousPeople: [
        { "word": "אלברט איינשטיין" }, { "word": "מארק צוקרברג" }, { "word": "בר רפאלי" }, { "word": "גולדה מאיר" },
        { "word": "דוד בן גוריון" }, { "word": "בנימין נתניהו" }, { "word": "יוסיין בולט" }, { "word": "כריסטיאנו רונאלדו" },
        { "word": "ליאו מסי" }, { "word": "מוחמד סלאח" }, { "word": "ביונסה" }, { "word": "טיילור סוויפט" },
        { "word": "שון מנדז" }, { "word": "ברונו מארס" }, { "word": "אלון מאסק" }, { "word": "סטיב ג'ובס" },
        { "word": "ביל גייטס" }, { "word": "גל גדות" }, { "word": "נטע ברזילי" }, { "word": "עומר אדם" },
        { "word": "סטטיק ובן אל" }, { "word": "נועה קירל" }, { "word": "עדן חסון" }, { "word": "משה פרץ" },
        { "word": "איל גולן" }, { "word": "ריטה" }, { "word": "עופרה חזה" }, { "word": "מייקל ג'קסון" },
        { "word": "אלביס פרסלי" }, { "word": "ג'סטין ביבר" }, { "word": "ריהאנה" }, { "word": "דרייק" },
        { "word": "אמינם" }, { "word": "קים קרדשיאן" }, { "word": "דונלד טראמפ" }, { "word": "ברק אובמה" },
        { "word": "ולדימיר פוטין" }, { "word": "וולודימיר זלנסקי" }, { "word": "אנג'לינה ג'ולי" }, { "word": "טום קרוז" },
        { "word": "ליאונרדו דיקפריו" }, { "word": "ג'וני דפ" }, { "word": "וויל סמית'" }, { "word": "דוויין ג'ונסון" },
        { "word": "מיילי סיירוס" }, { "word": "סלינה גומז" }, { "word": "סלבדור דאלי" }, { "word": "לאונרדו דה וינצ'י" },
        { "word": "מיכלאנג'לו" }
    ],    
    foodDrinks: [
        { "word": "שוקולד" }, { "word": "קפה" }, { "word": "לחם" }, { "word": "חלב" }, { "word": "גבינה" },
        { "word": "חביתה" }, { "word": "פיצה" }, { "word": "המבורגר" }, { "word": "צ'יפס" }, { "word": "סושי" },
        { "word": "פלאפל" }, { "word": "שווארמה" }, { "word": "חומוס" }, { "word": "טחינה" }, { "word": "קולה" },
        { "word": "מים" }, { "word": "מיץ תפוזים" }, { "word": "תה" }, { "word": "ביסלי" }, { "word": "במבה" },
        { "word": "עוגה" }, { "word": "עוגיות" }, { "word": "גלידה" }, { "word": "סנדוויץ'" }, { "word": "קורנפלקס" },
        { "word": "פסטה" }, { "word": "בורקס" }, { "word": "קרואסון" }, { "word": "פיתה" }, { "word": "עוגת גבינה" },
        { "word": "סלט" }, { "word": "חסה" }, { "word": "עגבניה" }, { "word": "מלפפון" }, { "word": "בצל" },
        { "word": "שוקו" }, { "word": "נקניקיה" }, { "word": "סטייק" }, { "word": "קבב" }, { "word": "שקשוקה" },
        { "word": "מרק" }, { "word": "שוקולד חלב" }, { "word": "ביצה קשה" }, { "word": "פיתה דרוזית" }, { "word": "עוגת שוקולד" },
        { "word": "אורז" }, { "word": "קוסקוס" }, { "word": "פתיתים" }, { "word": "שניצל" }, { "word": "עוגת גבינה אפויה" },
        { "word": "באגט" }, { "word": "קרמבו" }, { "word": "פופקורן" }
    ],    
    animals: [
        { "word": "חתול" }, { "word": "כלב" }, { "word": "אריה" }, { "word": "פיל" }, { "word": "ג'ירפה" },
        { "word": "דולפין" }, { "word": "ציפור" }, { "word": "דבורה" }, { "word": "נחש" }, { "word": "עקרב" },
        { "word": "קוף" }, { "word": "דוב" }, { "word": "זברה" }, { "word": "סוס" }, { "word": "חמור" },
        { "word": "עז" }, { "word": "כבש" }, { "word": "תרנגול" }, { "word": "תרנגולת" }, { "word": "ברווז" },
        { "word": "צב" }, { "word": "נמר" }, { "word": "פינגווין" }, { "word": "ינשוף" }, { "word": "חמור בר" },
        { "word": "עורב" }, { "word": "גמל" }, { "word": "דג זהב" }, { "word": "תוכי" }, { "word": "טיגריס" },
        { "word": "לוויתן" }, { "word": "כלב ים" }, { "word": "נמר שלג" }, { "word": "שפן" }, { "word": "אוגר" },
        { "word": "עכבר" }, { "word": "גחלילית" }, { "word": "פרפר" }, { "word": "חיפושית" }
    ],    
    brands: [
        { "word": "נייק" }, { "word": "אפל" }, { "word": "אדידס" }, { "word": "קוקה קולה" }, { "word": "טויוטה" },
        { "word": "סמסונג" }, { "word": "מקדונלד'ס" }, { "word": "סטארבקס" }, { "word": "לואי ויטון" }, { "word": "גוגל" },
        { "word": "מייקרוסופט" }, { "word": "פיצה האט" }, { "word": "דנונה" }, { "word": "הונדה" }, { "word": "לגו" },
        { "word": "רולקס" }, { "word": "אינטל" }, { "word": "סוני" }, { "word": "קנון" }, { "word": "נסטלה" },
        { "word": "טום פורד" }, { "word": "פפסי" }, { "word": "דיזל" }, { "word": "שופרסל" }, { "word": "עלית" },
        { "word": "קוקה קולה זירו" }, { "word": "בוש" }, { "word": "לנובו" }, { "word": "הילטי" }, { "word": "ריבוק" },
        { "word": "פוקס" }, { "word": "ג'יפ" }, { "word": "פורד" }, { "word": "טוי" }, { "word": "פנדורה" },
        { "word": "ברבי" }, { "word": "ראי-בן" }, { "word": "לדורée" }, { "word": "שאנל" }, { "word": "לוריאל" },
        { "word": "וואטסאפ" }, { "word": "אובר" }, { "word": "גוגל מפות" }, { "word": "אמזון" }
    ],    
    countries: [
        { "word": "ישראל" }, { "word": "צרפת" }, { "word": "ארצות הברית" }, { "word": "אנגליה" }, { "word": "גרמניה" },
        { "word": "איטליה" }, { "word": "ספרד" }, { "word": "יפן" }, { "word": "סין" }, { "word": "קנדה" },
        { "word": "אוסטרליה" }, { "word": "ברזיל" }, { "word": "מקסיקו" }, { "word": "הודו" }, { "word": "תאילנד" },
        { "word": "רוסיה" }, { "word": "מצרים" }, { "word": "דרום אפריקה" }, { "word": "יוון" }, { "word": "שוודיה" },
        { "word": "נורווגיה" }, { "word": "פולין" }, { "word": "הולנד" }, { "word": "בלגיה" }, { "word": "שוויץ" },
        { "word": "אוסטריה" }, { "word": "צ'ילה" }, { "word": "ארגנטינה" }, { "word": "קולומביה" }, { "word": "קובה" },
        { "word": "פינלנד" }, { "word": "דנמרק" }, { "word": "איסלנד" }, { "word": "וייטנאם" }, { "word": "מלזיה" },
        { "word": "אינדונזיה" }, { "word": "דרום קוריאה" }, { "word": "צפון קוריאה" }, { "word": "סינגפור" }, { "word": "ניו זילנד" },
        { "word": "פקיסטן" }, { "word": "אירלנד" }, { "word": "פורטוגל" }, { "word": "הונגריה" }, { "word": "צ'כיה" }
    ],    
    moviesSeries: [
        { "word": "הארי פוטר" }, { "word": "משחקי הכס" }, { "word": "שרלוק" }, { "word": "חברים" }, { "word": "החץ" },
        { "word": "הבית הנייר" }, { "word": "המתים המהלכים" }, { "word": "סטריינג'ר טינגס" }, { "word": "שרק" }, { "word": "טיטניק" },
        { "word": "מלחמת הכוכבים" }, { "word": "אבודים" }, { "word": "פלאש" }, { "word": "סופרמן" }, { "word": "איירון מן" },
        { "word": "הנוקמים" }, { "word": "נרניה" }, { "word": "החמישה" }, { "word": "ג'ומנג'י" }, { "word": "ממלכת הקרח" },
        { "word": "הנוקם האחרון" }, { "word": "נמו" }, { "word": "ספיידרמן" }, { "word": "באטמן" }, { "word": "הצופן" },
        { "word": "הנוקמים סוף המשחק" }, { "word": "שכונה" }, { "word": "זגורי אימפריה" }, { "word": "הצנחנים" }, { "word": "מלה אחת" },
        { "word": "כיפה אדומה" }, { "word": "מלך האריות" }, { "word": "רקוויאם לחלום" }, { "word": "פיטר פן" }, { "word": "סנדק" },
        { "word": "החושך" }, { "word": "פרויקט רוזוולט" }, { "word": "גודזילה" }, { "word": "הנסיכה והצפרדע" }, { "word": "מכושפת" },
        { "word": "האקס מן" }, { "word": "קינג קונג" }
    ],    
    professions: [
        { "word": "רופא" }, { "word": "שף" }, { "word": "מורה" }, { "word": "מהנדס" }, { "word": "אדריכל" },
        { "word": "שוטר" }, { "word": "עיתונאי" }, { "word": "שחקן" }, { "word": "זמר" }, { "word": "רקדן" },
        { "word": "ספורטאי" }, { "word": "אופה" }, { "word": "טכנאי" }, { "word": "נהג" }, { "word": "מלצר" },
        { "word": "מוזיקאי" }, { "word": "צלם" }, { "word": "עורך דין" }, { "word": "אחות" }, { "word": "חוקר" },
        { "word": "עובד סוציאלי" }, { "word": "סטייליסט" }, { "word": "מאמן כושר" }, { "word": "טייס" }, { "word": "מוזיאונאי" },
        { "word": "בלש" }, { "word": "מתכנת" }, { "word": "יועץ" }, { "word": "סטודנט" }, { "word": "ספר" },
        { "word": "גנן" }, { "word": "חקלאי" }, { "word": "אמן" }, { "word": "פסיכולוג" }, { "word": "שחקן קולנוע" },
        { "word": "דיגיטלי" }, { "word": "מזכיר" }, { "word": "חוקר מדעי" }, { "word": "עובד ציבור" }, { "word": "נהג אוטובוס" },
        { "word": "דייג" }, { "word": "קוסם" }, { "word": "חייל" }
    ],    
    scienceTech: [
        { "word": "מחשב" }, { "word": "חיישן" }, { "word": "טלפון חכם" }, { "word": "טלוויזיה" }, { "word": "רובוט" },
        { "word": "דפדפן" }, { "word": "שרת" }, { "word": "אלגוריתם" }, { "word": "מסך מגע" }, { "word": "מצלמה" },
        { "word": "שבב" }, { "word": "בינה מלאכותית" }, { "word": "מטען" }, { "word": "סוללה" }, { "word": "רשת" },
        { "word": "כבל" }, { "word": "מספריים" }, { "word": "מדפסת" }, { "word": "תוכנה" }, { "word": "יישום" },
        { "word": "לייזר" }, { "word": "טאבלט" }, { "word": "דיסק קשיח" }, { "word": "נתב" }, { "word": "מיקרוסקופ" },
        { "word": "טלסקופ" }, { "word": "רדיו" }, { "word": "קונסולה" }, { "word": "משדר" }, { "word": "חיישן טמפרטורה" },
        { "word": "דינמו" }, { "word": "מנוע" }, { "word": "ג'ויסטיק" }, { "word": "מצלמת רשת" }, { "word": "כבל USB" },
        { "word": "מודם" }, { "word": "סנסור חיישן" }, { "word": "מעבד" }, { "word": "תשתית" }, { "word": "מערכת הפעלה" },
        { "word": "שרת ענן" }, { "word": "טכנולוגיה רפואית" }
    ],    
    videoGames: [
        { "word": "פוקימון" }, { "word": "מריו" }, { "word": "זלדה" }, { "word": "סוני" }, { "word": "מיינקראפט" },
        { "word": "פורטנייט" }, { "word": "קול אוף דיוטי" }, { "word": "פיפא" }, { "word": "גרנד ת'פט אוטו" }, { "word": "סימס" },
        { "word": "דוטה 2" }, { "word": "ליג אוף לג'נדס" }, { "word": "סופר סמאש ברוס" }, { "word": "קינגדום הארטס" }, { "word": "דיוויז'ן" },
        { "word": "רסידנט איביל" }, { "word": "אססינס קריד" }, { "word": "סוניק" }, { "word": "פייב נייטס אט פרדי'ס" }, { "word": "וואצ' דוגס" },
        { "word": "מטל גיר" }, { "word": "ספורט" }, { "word": "ראל" }, { "word": "בליזרד" }, { "word": "אוברווטש" },
        { "word": "הלו קיטי" }, { "word": "סוניק אדג'" }, { "word": "אורבן טריילס" }, { "word": "חיות מחמד" }, { "word": "סימוליישן" },
        { "word": "לגו משחק" }, { "word": "גיטר הירו" }, { "word": "סקייטבורד" }, { "word": "אמונג אס" }, { "word": "סטריט פייטר" },
        { "word": "קירבי" }, { "word": "דוןקי קונג" }, { "word": "אינדיבידואל" }, { "word": "טטריס" }, { "word": "סופר מריו ברוס" },
        { "word": "פיינל פנטזי" }, { "word": "קול אוף דיוטי מודרן" }, { "word": "קראש בנדיקוט" }, { "word": "אנגרי בירדס" }, { "word": "קלש רויאל" }
    ],    
    music: [
        { "word": "ג'ון לנון" }, { "word": "ביטלס" }, { "word": "מייקל ג'קסון" }, { "word": "מדונה" }, { "word": "אלטון ג'ון" },
        { "word": "קולדפליי" }, { "word": "קייטי פרי" }, { "word": "ביונסה" }, { "word": "אדל" }, { "word": "ריהאנה" },
        { "word": "אד שירן" }, { "word": "ליידי גאגא" }, { "word": "טיילור סוויפט" }, { "word": "מג'יק!" }, { "word": "אריאנה גרנדה" },
        { "word": "פול מקרטני" }, { "word": "הרולינג סטונז" }, { "word": "ג'יימס בראון" }, { "word": "פרינס" }, { "word": "לינקין פארק" },
        { "word": "נירוונה" }, { "word": "אינטרפול" }, { "word": "דפש מוד" }, { "word": "Black Sabbath" }, { "word": "עידן רייכל" },
        { "word": "קווין" }, { "word": "רדיוהד" }, { "word": "AC/DC" }, { "word": "מטליקה" }, { "word": "איירון מיידן" },
        { "word": "דיסני" }, { "word": "אלט ג'י" }, { "word": "פינק" }, { "word": "לנה דל ריי" }, { "word": "ג'סטין ביבר" },
        { "word": "דמי לובאטו" }
    ],
    clashRoyale: [
        { "word": "Archers" }, { "word": "Archer Queen" }, { "word": "Baby Dragon" }, { "word": "Balloon" }, { "word": "Bandit" },
        { "word": "Barbarians" }, { "word": "Bats" }, { "word": "Battle Healer" }, { "word": "Battle Ram" }, { "word": "Berserker" },
        { "word": "Bomber" }, { "word": "Boss Bandit" }, { "word": "Bowler" }, { "word": "Cannon Cart" }, { "word": "Dark Prince" },
        { "word": "Dart Goblin" }, { "word": "Electro Dragon" }, { "word": "Electro Giant" }, { "word": "Electro Spirit" }, { "word": "Electro Wizard" },
        { "word": "Elite Barbarians" }, { "word": "Elixir Golem" }, { "word": "Executioner" }, { "word": "Firecracker" }, { "word": "Fire Spirit" },
        { "word": "Fisherman" }, { "word": "Flying Machine" }, { "word": "Furnace" }, { "word": "Giant" }, { "word": "Giant Skeleton" },
        { "word": "Goblin Gang" }, { "word": "Goblin Demolisher" }, { "word": "Goblin Giant" }, { "word": "Goblin Machine" }, { "word": "Goblins" },
        { "word": "Goblinstein" }, { "word": "Golden Knight" }, { "word": "Golem" }, { "word": "Guards" }, { "word": "Hog Rider" },
        { "word": "Hunter" }, { "word": "Heal Spirit" }, { "word": "Ice Golem" }, { "word": "Ice Spirit" }, { "word": "Ice Wizard" },
        { "word": "Inferno Dragon" }, { "word": "Knight" }, { "word": "Lava Hound" }, { "word": "Little Prince" }, { "word": "Lumberjack" },
        { "word": "Magic Archer" }, { "word": "Mega Knight" }, { "word": "Mega Minion" }, { "word": "Mighty Miner" }, { "word": "Miner" },
        { "word": "Mini P.E.K.K.A." }, { "word": "Minion Horde" }, { "word": "Minions" }, { "word": "Monk" }, { "word": "Mother Witch" },
        { "word": "Musketeer" }, { "word": "Night Witch" }, { "word": "P.E.K.K.A." }, { "word": "Phoenix" }, { "word": "Prince" },
        { "word": "Princess" }, { "word": "Ram Rider" }, { "word": "Rascals" }, { "word": "Royal Ghost" }, { "word": "Royal Giant" },
        { "word": "Royal Hogs" }, { "word": "Royal Recruits" }, { "word": "Rune Giant" }, { "word": "Skeleton Army" }, { "word": "Skeleton Barrel" },
        { "word": "Skeleton Dragons" }, { "word": "Skeleton King" }, { "word": "Skeletons" }, { "word": "Sparky" }, { "word": "Spear Goblins" },
        { "word": "Spirit Empress" }, { "word": "Suspicious Bush" }, { "word": "Three Musketeers" }, { "word": "Valkyrie" }, { "word": "Wall Breakers" },
        { "word": "Witch" }, { "word": "Wizard" }, { "word": "Zappies" }, { "word": "Bomb Tower" }, { "word": "Cannon" },
        { "word": "Inferno Tower" }, { "word": "Mortar" }, { "word": "Tesla" }, { "word": "X-Bow" }, { "word": "Barbarian Hut" },
        { "word": "Elixir Collector" }, { "word": "Goblin Cage" }, { "word": "Goblin Drill" }, { "word": "Goblin Hut" }, { "word": "Tombstone" },
        { "word": "Arrows" }, { "word": "Barbarian Barrel" }, { "word": "Earthquake" }, { "word": "Fireball" }, { "word": "Freeze" },
        { "word": "Giant Snowball" }, { "word": "Goblin Curse" }, { "word": "Lightning" }, { "word": "Poison" }, { "word": "Rage" },
        { "word": "Rocket" }, { "word": "Royal Delivery" }, { "word": "The Log" }, { "word": "Tornado" }, { "word": "Vines" },
        { "word": "Void" }, { "word": "Zap" }, { "word": "Cannoneer" }, { "word": "Dagger Duchess" }, { "word": "Royal Chef" },
        { "word": "Tower Princess" }
    ],
    brawlStars: [
        { word: "Shelly" }, { word: "Nita" }, { word: "Bo" }, { word: "Gus" }, { word: "Colt" }, { word: "Bull" },
        { word: "Brock" }, { word: "El Primo" }, { word: "Barley" }, { word: "Poco" }, { word: "Rosa" }, { word: "Jessie" },
        { word: "Dynamike" }, { word: "Tick" }, { word: "8-Bit" }, { word: "Rico" }, { word: "Darryl" }, { word: "Penny" },
        { word: "Carl" }, { word: "Jacky" }, { word: "Emz" }, { word: "Stu" }, { word: "Piper" }, { word: "Pam" },
        { word: "Frank" }, { word: "Bibi" }, { word: "Bea" }, { word: "Nani" }, { word: "Edgar" }, { word: "Griff" },
        { word: "Grom" }, { word: "Bonnie" }, { word: "Gale" }, { word: "Colette" }, { word: "Belle" }, { word: "Ash" },
        { word: "Lola" }, { word: "Sam" }, { word: "Mandy" }, { word: "Maisie" }, { word: "Hank" }, { word: "Pearl" },
        { word: "Larry & Lawrie" }, { word: "Angelo" }, { word: "Berry" }, { word: "Shade" }, { word: "Meeple" }, { word: "Trunk" },
        { word: "Mortis" }, { word: "Tara" }, { word: "Gene" }, { word: "Max" }, { word: "Mr. P" }, { word: "Sprout" },
        { word: "Byron" }, { word: "Squeak" }, { word: "Lou" }, { word: "Ruffs" }, { word: "Buzz" }, { word: "Fang" },
        { word: "Eve" }, { word: "Janet" }, { word: "Otis" }, { word: "Buster" }, { word: "Gray" }, { word: "Mico" },
        { word: "Lily" }, { word: "Clancy" }, { word: "Moe" }, { word: "Kenji" }, { word: "Juju" }, { word: "Buzz Lightyear" },
        { word: "Ollie" }, { word: "Lumi" }, { word: "Finx" }, { word: "Jae-yong" }, { word: "Kaze" }, { word: "Alli" },
        { word: "Ziggy" }, { word: "Mina" }, { word: "Spike" }, { word: "Crow" }, { word: "Leon" }, { word: "Sandy" },
        { word: "Surge" }, { word: "Amber" }, { word: "Kit" }, { word: "Meg" }, { word: "Melodie" }, { word: "Charlie" },
        { word: "Chuck" }, { word: "Chester" }, { word: "Doug" }, { word: "Draco" }, { word: "R-T" }, { word: "Cordelius" },
        { word: "Willow" }
    ]      
  };

  // --- נתונים למשחק: מילה ורמז (Word & Hint) ---
  const DATA_WordNHint = {
      dailyObjects: [
          { "word": "תפוח", "clues": ["פרי","אדום","מתוק","עץ","קליפה"] },
          { "word": "כיסא", "clues": ["ישיבה","רגליים","משענת","נוח","עץ"] },
          { "word": "טלפון", "clues": ["מסך","שיחה","נייד","אפליקציה","טעינה"] },
          { "word": "מחשב", "clues": ["מסך","מקלדת","עכבר","תכנות","לפטופ"] },
          { "word": "שולחן", "clues": ["משטח","רגליים","אוכל","משרד","עץ"] },
          { "word": "כוס", "clues": ["שתייה","זכוכית","ספל","כפית","קר"] },
          { "word": "בקבוק", "clues": ["שתייה","פקק","נייד","בקבוקון","קירור"] },
          { "word": "מפתח", "clues": ["דלת","מנעול","ברזל","טבעת","כניסה"] },
          { "word": "שלט", "clues": ["טלוויזיה","לחצנים","ערוצים","רחוק","סוללה"] },
          { "word": "שעון", "clues": ["זמן","שעה","דקה","מחוגים","תצוגה"] },
          { "word": "ספר", "clues": ["דפים","קריאה","ידע","כריכה","סיפור"] },
          { "word": "עט", "clues": ["כתיבה","דיו","חתימה","משרד","כחול"] },
          { "word": "עפרון", "clues": ["כתיבה","מחק","חוד","עץ","ציור"] },
          { "word": "מחק", "clues": ["מחיקה","לוח","רך","בית ספר","תיקון"] },
          { "word": "קלמר", "clues": ["עטים","עפרון","בית ספר","רוכסן","ציוד"] },
          { "word": "מספריים", "clues": ["חיתוך","נייר","חד","ידית","כלי"] },
          { "word": "מסרק", "clues": ["שיער","סירוק","שיניים","בוקר","פנים"] },
          { "word": "מברשת שיניים", "clues": ["שיניים","צחצוח","בבוקר","ניקיון","אמבטיה"] },
          { "word": "משחת שיניים", "clues": ["ניקיון","מנטה","שפופרת","לבן","בוקר"] },
          { "word": "סבון", "clues": ["ניקיון","קצף","רחצה","ריח","ידיים"] },
          { "word": "מגבת", "clues": ["ייבוש","בד","רחצה","חוף","ריח"] },
          { "word": "מטען", "clues": ["טעינה","USB","כבל","סוללה","שקע"] },
          { "word": "אוזניות", "clues": ["מוזיקה","שמע","אוזן","בלוטות","שקט"] },
          { "word": "מקלדת", "clues": ["מקלדות","קלט","מקש","קליקים","טקסט"] },
          { "word": "עכבר", "clues": ["קליקים","גלגלת","USB","מחשב","תזוזה"] },
          { "word": "מראה", "clues": ["השתקפות","פנים","זכוכית","קיר","שיער"] },
          { "word": "סכין", "clues": ["חד","חיתוך","מטבח","פלדה","ידית"] },
          { "word": "מזלג", "clues": ["אכילה","שיניים","שולחן","סלט","ארוחה"] },
          { "word": "כף", "clues": ["מרק","קערה","אכילה","ידית","מתכת"] },
          { "word": "קערה", "clues": ["מרק","פירות","שולחן","עיגול","מטבח"] },
          { "word": "צלחת", "clues": ["מנה","שולחן","אכילה","עיגול","פירות"] },
          { "word": "מחבת", "clues": ["טיגון","אש","ידית","שמן","בישול"] },
          { "word": "סיר", "clues": ["בישול","מכסה","מרק","אש","מתכת"] },
          { "word": "קומקום", "clues": ["רתיחה","תה","מים","חשמל","בוקר"] },
          { "word": "מקרר", "clues": ["קור","אחסון","מזון","דלת","חשמל"] },
          { "word": "תנור", "clues": ["אפייה","חום","תנור","עוגה","גז"] },
          { "word": "מיקרוגל", "clues": ["חימום","מהיר","דקה","קערה","פופקורן"] },
          { "word": "כפפה", "clues": ["חום","חורף","צמר","יד","זוג"] },
          { "word": "נעל", "clues": ["הליכה","שרוכים","רגל","רחוב","עור"] },
          { "word": "גרב", "clues": ["זוג","רגל","צמר","נוחות","חורף"] },
          { "word": "מטרייה", "clues": ["גשם","קיפול","מגן","ידית","רחוב"] },
          { "word": "תיק", "clues": ["חפצים","גב","נסיעה","רצועה","ספרים"] },
          { "word": "ארנק", "clues": ["כסף","כרטיסים","שטרות","כיס","עור"] },
          { "word": "ממחטה", "clues": ["נייר","נזלת","חד פעמי","כאב","קופסה"] },
          { "word": "מגב", "clues": ["ניקיון","רצפה","מים","גומי","ידית"] },
          { "word": "שואב אבק", "clues": ["ניקיון","אבק","צינור","שקט","שקע"] },
          { "word": "טלויזיה", "clues": ["מסך","ערוצים","שמע","סלון","שלט"] },
          { "word": "מנורה", "clues": ["אור","תאורה","מתג","חדר","שולחן"] },
          { "word": "וילון", "clues": ["חלון","בד","קפלים","צל","סלון"] },
          { "word": "מראה", "clues": ["שיקוף","פנים","מסגרת","זכוכית","קיר"] }
      ],      
        famousPeople: [
          { "word": "אלברט איינשטיין", "clues": ["פיזיקה","שיער פרוע","תיאוריה","יחסות","גאון"] },
          { "word": "מארק צוקרברג", "clues": ["פייסבוק","טכנולוגיה","סטארטאפ","אפליקציה","יזם"] },
          { "word": "בר רפאלי", "clues": ["דוגמנית","ישראל","אופנה","טלוויזיה","מפורסמת"] },
          { "word": "גולדה מאיר", "clues": ["ראש ממשלה","ישראל","מנהיגה","פוליטיקה","היסטוריה"] },
          { "word": "דוד בן גוריון", "clues": ["ראש ממשלה","הקמה","עצמאות","מנהיג","הכרזה"] },
          { "word": "בנימין נתניהו", "clues": ["ראש ממשלה","ליכוד","כנסת","ביטחון","פוליטיקה"] },
          { "word": "יוסיין בולט", "clues": ["מהירות","אולימפיאדה","ג'מייקה","שיא עולם","ספרינט"] },
          { "word": "כריסטיאנו רונאלדו", "clues": ["כדורגל","פורטוגל","שערים","מספר 7","מנצ'סטר"] },
          { "word": "ליאו מסי", "clues": ["כדורגל","ארגנטינה","מספר 10","כישרון","בלון ד'אור"] },
          { "word": "מוחמד סלאח", "clues": ["כדורגל","ליברפול","מצרים","חלוץ","פרמייר ליג"] },
          { "word": "ביונסה", "clues": ["זמרת","במה","פופ","הופעות","כוכבת"] },
          { "word": "טיילור סוויפט", "clues": ["זמרת","אלבומים","שירים","פרסים","קהל"] },
          { "word": "שון מנדז", "clues": ["זמר","קנדה","גיטרה","במה","שירים"] },
          { "word": "ברונו מארס", "clues": ["זמר","ריקוד","קצב","הופעות","פופ"] },
          { "word": "אלון מאסק", "clues": ["טסלה","חלל","יזם","חדשנות","מיליארדר"] },
          { "word": "סטיב ג'ובס", "clues": ["אפל","אייפון","חזון","עיצוב","טכנולוגיה"] },
          { "word": "ביל גייטס", "clues": ["מיקרוסופט","תוכנה","פילנתרופ","מיליארדר","טכנולוגיה"] },
          { "word": "גל גדות", "clues": ["שחקנית","וונדר וומן","ישראל","הוליווד","כוכבת"] },
          { "word": "נטע ברזילי", "clues": ["אירוויזיון","זמרת","ישראל","במה","כוכבת"] },
          { "word": "עומר אדם", "clues": ["זמר","ישראל","מזרחית","הופעות","כוכב"] },
          { "word": "סטטיק ובן אל", "clues": ["צמד","פופ","הופעות","שירים","ישראל"] },
          { "word": "נועה קירל", "clues": ["זמרת","אירוויזיון","ריקוד","כוכבת","תצוגה"] },
          { "word": "עדן חסון", "clues": ["זמר","ישראל","מזרחית","במה","כוכב"] },
          { "word": "משה פרץ", "clues": ["זמר","ישראל","במה","שירים","פופולרי"] },
          { "word": "איל גולן", "clues": ["זמר","מזרחית","כוכב","הופעות","שירים"] },
          { "word": "ריטה", "clues": ["זמרת","עברית","כוכבת","מוזיקה","במה"] },
          { "word": "עופרה חזה", "clues": ["אגדה","זמרת","עברית","כוכבת","מוזיקה"] },
          { "word": "מייקל ג'קסון", "clues": ["קינג אוף פופ","ריקוד","שירים","הופעות","אגדה"] },
          { "word": "אלביס פרסלי", "clues": ["רוק","אגדה","כוכב","שירים","ריקוד"] },
          { "word": "ג'סטין ביבר", "clues": ["זמר","פופ","כוכב","הופעות","אלבומים"] },
          { "word": "ריהאנה", "clues": ["זמרת","ברבדוס","מוזיקה","פרסים","כוכבת"] },
          { "word": "דרייק", "clues": ["ראפר","קנדה","שירים","אלבומים","כוכב"] },
          { "word": "אמינם", "clues": ["ראפר","מילים","שירים","כוכב","אמריקאי"] },
          { "word": "קים קרדשיאן", "clues": ["ריאליטי","מדיה","כוכבת","אופנה","משפחה"] },
          { "word": "דונלד טראמפ", "clues": ["נשיא","פוליטיקה","עסקים","אמריקה","מפורסם"] },
          { "word": "ברק אובמה", "clues": ["נשיא","אמריקה","נאומים","מנהיג","פוליטיקה"] },
          { "word": "ולדימיר פוטין", "clues": ["רוסיה","נשיא","כוח","צבא","מנהיג"] },
          { "word": "וולודימיר זלנסקי", "clues": ["נשיא","אוקראינה","נאומים","מלחמה","מנהיג"] },
          { "word": "אנג'לינה ג'ולי", "clues": ["שחקנית","הוליווד","בינלאומית","סרטים","כוכבת"] },
          { "word": "טום קרוז", "clues": ["שחקן","אקשן","הוליווד","כוכב","סרטים"] },
          { "word": "ליאונרדו דיקפריו", "clues": ["שחקן","טיטאניק","אוסקר","קולנוע","כוכב"] },
          { "word": "ג'וני דפ", "clues": ["שחקן","שודדי הקאריביים","כוכב","סרטים","מפורסם"] },
          { "word": "וויל סמית'", "clues": ["שחקן","אמריקאי","כוכב","סרטים","הצלחה"] },
          { "word": "דוויין ג'ונסון", "clues": ["שחקן","מתאבק","כוח","הוליווד","כוכב"] },
          { "word": "מיילי סיירוס", "clues": ["זמרת","פופ","כוכבת","שירים","הופעות"] },
          { "word": "סלינה גומז", "clues": ["זמרת","כוכבת","שירים","טלוויזיה","רשת"] },
          { "word": "סלבדור דאלי", "clues": ["סוריאליזם","שפשף שעון","אמן","ספרד","מפורסם"] },
          { "word": "לאונרדו דה וינצ'י", "clues": ["מונה ליזה","אמן","המצאות","רנסנס","איטליה"] },
          { "word": "מיכלאנג'לו", "clues": ["פסל","ציור","רנסנס","יצירה","מפורסם"] }
      ],    
      foodDrinks: [
          { "word": "שוקולד", "clues": ["מתוק","קקאו","בר","קינוח","ממתק"] },
          { "word": "קפה", "clues": ["בוקר","חם","ספל","מריר","ארומה"] },
          { "word": "לחם", "clues": ["טרי","פרוסות","מאפה","כריך","שמרים"] },
          { "word": "חלב", "clues": ["לבן","קר","פרה","סוללה","שתייה"] },
          { "word": "גבינה", "clues": ["צהובה","פרוסה","חלבי","טעם","מקרר"] },
          { "word": "חביתה", "clues": ["ביצה","מחבת","צהוב","מהיר","בוקר"] },
          { "word": "פיצה", "clues": ["גבינה","עיגול","איטליה","תנור","טעים"] },
          { "word": "המבורגר", "clues": ["לחמניה","בשר","מהיר","גבינה","ארוחה"] },
          { "word": "צ'יפס", "clues": ["מטוגן","תפוח אדמה","מלוח","שקית","חטיף"] },
          { "word": "סושי", "clues": ["אורז","דג","יפן","רול","סויה"] },
          { "word": "פלאפל", "clues": ["כדור","פיתה","טחינה","רחוב","מטוגן"] },
          { "word": "שווארמה", "clues": ["פיתה","בשר","סלט","רחוב","טלה"] },
          { "word": "חומוס", "clues": ["ממרח","טחינה","פיתה","קטניות","סלט"] },
          { "word": "טחינה", "clues": ["שומשום","ממרח","רוטב","בריא","סלט"] },
          { "word": "קולה", "clues": ["גזים","פחית","קר","מתוק","שתייה"] },
          { "word": "מים", "clues": ["שקוף","כוס","בריא","צמא","בקבוק"] },
          { "word": "מיץ תפוזים", "clues": ["כתום","ויטמין C","פרי","קר","ארוחה"] },
          { "word": "תה", "clues": ["חם","שקית","מרגיע","כוס","עלים"] },
          { "word": "ביסלי", "clues": ["מלוח","שקית","חטיף","פופולרי","טעם"] },
          { "word": "במבה", "clues": ["בוטנים","חטיף","צהוב","ילדים","נשנוש"] },
          { "word": "עוגה", "clues": ["קינוח","מתוק","אפיה","יום הולדת","שכבות"] },
          { "word": "עוגיות", "clues": ["קינוח","מתוק","נשנוש","שוקולד","תנור"] },
          { "word": "גלידה", "clues": ["קפוא","כפית","וניל","קיץ","קינוח"] },
          { "word": "סנדוויץ'", "clues": ["לחם","כריך","בשר","צהריים","מהיר"] },
          { "word": "קורנפלקס", "clues": ["בוקר","קערה","חלב","דגנים","כפית"] },
          { "word": "פסטה", "clues": ["איטליה","אטריות","רוטב","גבינה","בישול"] },
          { "word": "בורקס", "clues": ["מאפה","גבינה","בצק","חם","מאפיה"] },
          { "word": "קרואסון", "clues": ["בצק עלים","צרפת","בוקר","שוקולד","מאפה"] },
          { "word": "פיתה", "clues": ["עגול","לחם","שווארמה","פלאפל","רחוב"] },
          { "word": "עוגת גבינה", "clues": ["גבינה","קר","קינוח","פרוסה","אפרוח"] },
          { "word": "סלט", "clues": ["טרי","ירקות","רענן","קערה","בריא"] },
          { "word": "חסה", "clues": ["ירוק","פריך","סלט","כריך","טרי"] },
          { "word": "עגבניה", "clues": ["אדום","סלט","רטבי","טרי","עיגול"] },
          { "word": "מלפפון", "clues": ["ירוק","פריך","סלט","קיץ","טרי"] },
          { "word": "בצל", "clues": ["חריף","דמעות","קצוץ","בישול","ריח"] },
          { "word": "שוקו", "clues": ["חלב","קקאו","מתוק","קר","שתייה"] },
          { "word": "נקניקיה", "clues": ["לחמניה","בשר","קטשופ","מהיר","רחוב"] },
          { "word": "סטייק", "clues": ["גריל","בשר","פרוסה","מסעדה","אדום"] },
          { "word": "קבב", "clues": ["שיפוד","גריל","בשר","פיתה","מסעדה"] },
          { "word": "שקשוקה", "clues": ["ביצה","רטבים","עגבניות","חם","מטבח"] },
          { "word": "מרק", "clues": ["חם","קערה","כף","ירקות","נוזל"] },
          { "word": "שוקולד חלב", "clues": ["חלב","מתוק","בר","ממתק","ילדים"] },
          { "word": "ביצה קשה", "clues": ["קליפה","צהוב","לבן","בישול","כריך"] },
          { "word": "פיתה דרוזית", "clues": ["טאבון","דרוזים","מילוי","מאפה","טבעי"] },
          { "word": "עוגת שוקולד", "clues": ["שוקולד","אפיה","נרות","שכבות","פרוסה"] },
          { "word": "אורז", "clues": ["גרגירים","תוספת","לבן","סיר","בישול"] },
          { "word": "קוסקוס", "clues": ["גרגירים","תבשיל","מרוקו","ירקות","כף"] },
          { "word": "פתיתים", "clues": ["ישראלי","תוספת","סיר","בישול","גרגירים"] },
          { "word": "שניצל", "clues": ["פירורי לחם","מטוגן","עוף","פריך","כריך"] },
          { "word": "עוגת גבינה אפויה", "clues": ["אפיה","גבינה","פרוסה","תנור","קינוח"] },
          { "word": "באגט", "clues": ["צרפת","לחם","ארוך","פרוסות","כריך"] },
          { "word": "קרמבו", "clues": ["קצף","שוקולד","נוסטלגיה","חטיף","חורף"] },
          { "word": "פופקורן", "clues": ["קולנוע","חטיף","פיצוח","מלוח","קערה"] }
      ],    
      animals: [
          { "word": "חתול", "clues": ["מיאו","פרווה","ציד","זנב","חמוד"] },
          { "word": "כלב", "clues": ["נבח","חבר","טיול","שומר","פרווה"] },
          { "word": "אריה", "clues": ["מלך","אפריקה","נהמה","רעמה","טורף"] },
          { "word": "פיל", "clues": ["חדק","אוזניים","ענק","להקה","חכם"] },
          { "word": "ג'ירפה", "clues": ["צוואר","גבוה","כתמים","עליונות","אפריקה"] },
          { "word": "דולפין", "clues": ["ים","קפיצה","חכם","שחייה","חברתי"] },
          { "word": "ציפור", "clues": ["כנפיים","שיר","טיסה","קן","ביצים"] },
          { "word": "דבורה", "clues": ["דבש","צוף","עוקץ","כוורת","פרחים"] },
          { "word": "נחש", "clues": ["זוחל","רעל","חלק","זנב","שטחי"] },
          { "word": "עקרב", "clues": ["מדבר","רעל","לילה","זנב","קטן"] },
          { "word": "קוף", "clues": ["עצים","קפיצה","חכם","זנב","משחקי"] },
          { "word": "דוב", "clues": ["יער","דבש","כביד","שינה","פרווה"] },
          { "word": "זברה", "clues": ["פסים","ערבה","קבוצה","סוס","אפריקה"] },
          { "word": "סוס", "clues": ["רכיבה","מרוץ","עגלה","עגיל","חוזק"] },
          { "word": "חמור", "clues": ["אוזניים","נשיאה","חזק","משק","עקשן"] },
          { "word": "עז", "clues": ["חלב","קפיצה","הרפתקני","שיחים","חטיפים"] },
          { "word": "כבש", "clues": ["צמר","עדר","רועה","דשא","שקט"] },
          { "word": "תרנגול", "clues": ["בוקר","קוקו","זריחה","קריאה","כנף"] },
          { "word": "תרנגולת", "clues": ["ביצה","חווה","אכלה","כנפיים","חלבון"] },
          { "word": "ברווז", "clues": ["אגם","שחייה","קוואק","רגליים","כנף"] },
          { "word": "צב", "clues": ["איטי","קליפה","שנים","יבשה","שלווה"] },
          { "word": "נמר", "clues": ["כתמים","מהיר","טורף","לילה","צייד"] },
          { "word": "פינגווין", "clues": ["קרח","טורף","הולך","מעיל","קבוצה"] },
          { "word": "ינשוף", "clues": ["לילה","חכמה","עיניים","ציד","שקט"] },
          { "word": "חמור בר", "clues": ["מדבר","שקט","פרווה","קבוצתי","צל"] },
          { "word": "עורב", "clues": ["שחור","חכם","קול","פסולת","כנף"] },
          { "word": "גמל", "clues": ["גיבנת","מדבר","שיירה","מים","נסיעה"] },
          { "word": "דג זהב", "clues": ["אקווריום","זהב","שחייה","קטן","זנב"] },
          { "word": "תוכי", "clues": ["צבעוני","מדבר","חיקוי","מחשוף","כנף"] },
          { "word": "טיגריס", "clues": ["פסים","עצום","צייד","מהיר","אדום"] },
          { "word": "לוויתן", "clues": ["ים","ענק","שירה","עמוק","חמוש"] },
          { "word": "כלב ים", "clues": ["חוף","שחייה","שומן","קול","שכב"] },
          { "word": "נמר שלג", "clues": ["שלג","כתמים","ביתי","צייד","אפור"] },
          { "word": "שפן", "clues": ["אוזניים","קפיצה","גזע","קטן","ירקות"] },
          { "word": "אוגר", "clues": ["קיל","חום","כלוב","קטן","חמוד"] },
          { "word": "עכבר", "clues": ["גבינה","קטן","מהיר","חור","שקט"] },
          { "word": "גחלילית", "clues": ["זוהר","לילה","אור","חרק","קיץ"] },
          { "word": "פרפר", "clues": ["כנפיים","פריחה","צבעוני","מעופף","חול"] },
          { "word": "דבורה", "clues": ["דבש","כוורת","פרחים","עובדת","עוקץ"] },
          { "word": "חיפושית", "clues": ["חרק","שריון","כנפיים","קטנה","לילה"] }
      ],    
      brands: [
          { "word": "נייק", "clues": ["נעליים","ספורט","שארק","ריצה","לוגו"] },
          { "word": "אפל", "clues": ["אייפון","מק","אייפד","אוזניות","לוגו"] },
          { "word": "אדידס", "clues": ["3 פסים","ספורט","חולצה","ריצה","כדורגל"] },
          { "word": "קוקה קולה", "clues": ["קולה","בקבוק","פחית","מתוק","מותג"] },
          { "word": "טויוטה", "clues": ["מכונית","יפן","בטיחות","נסיעה","דגם"] },
          { "word": "סמסונג", "clues": ["טלפון","מסך","גלקסי","טכנולוגיה","חכם"] },
          { "word": "מקדונלד'ס", "clues": ["המבורגר","צ'יפס","מהיר","מסעדה","ארוחה"] },
          { "word": "סטארבקס", "clues": ["קפה","כוס","סניף","מותג","טעמים"] },
          { "word": "לואי ויטון", "clues": ["תיק","יוקרה","אופנה","לוגו","חנות"] },
          { "word": "גוגל", "clues": ["חיפוש","מפות","גמייל","אינטרנט","לוגו"] },
          { "word": "מייקרוסופט", "clues": ["וינדוס","אופיס","אקוסיסטם","מחשב","לוגו"] },
          { "word": "פיצה האט", "clues": ["פיצה","שליח","חם","גבינה","מותג"] },
          { "word": "דנונה", "clues": ["יוגורט","חלב","בריאות","מארז","טעם"] },
          { "word": "הונדה", "clues": ["מכונית","יפן","דגם","סולידי","נסיעה"] },
          { "word": "לגו", "clues": ["בלוקים","יצירה","צעצוע","חלקים","כיף"] },
          { "word": "רולקס", "clues": ["שעון","יוקרה","לוגו","זמן","מתנה"] },
          { "word": "אינטל", "clues": ["מעבד","שבב","CPU","חומרה","מהירות"] },
          { "word": "סוני", "clues": ["קונסולה","טלוויזיה","סאונד","טכנולוגיה","מותג"] },
          { "word": "קנון", "clues": ["מצלמה","עדשה","צילום","וידאו","סטודיו"] },
          { "word": "נסטלה", "clues": ["שוקולד","קינוח","משקה","חטיף","מותג"] },
          { "word": "טום פורד", "clues": ["אופנה","ניחוח","סטייל","משקפיים","יוקרה"] },
          { "word": "פפסי", "clues": ["קולה","כחול","פחית","מתוק","מותג"] },
          { "word": "דיזל", "clues": ["בגדים","סטייל","ניחוח","גברים","לוגו"] },
          { "word": "שופרסל", "clues": ["סופר","קניות","מוצרים","סניף","ישראלי"] },
          { "word": "עלית", "clues": ["שוקולד","חטיף","ממתק","ישראלי","טעם"] },
          { "word": "קוקה קולה זירו", "clues": ["קולה","דיאט","גזים","פחית","מותג"] },
          { "word": "בוש", "clues": ["כלים","מטבח","מכשיר","חשמל","חזק"] },
          { "word": "לנובו", "clues": ["לפטופ","מחשב","עסקי","מסך","מותג"] },
          { "word": "הילטי", "clues": ["כלי עבודה","בניין","חזק","מקצועי","דגם"] },
          { "word": "ריבוק", "clues": ["נעלי ספורט","כושר","כחול","מותג","ריצה"] },
          { "word": "פוקס", "clues": ["אופנה","בגדים","ישראלי","צעירים","סטייל"] },
          { "word": "ג'יפ", "clues": ["שטח","רכב","חזק","דגם","נסיעה"] },
          { "word": "פורד", "clues": ["מכונית","דגם","נסיעה","מותג","בטיחות"] },
          { "word": "טוי", "clues": ["צעצועים","ילדים","משחק","מותג","כיף"] },
          { "word": "פנדורה", "clues": ["תכשיטים","צמידים","יוקרה","מתנה","לוגו"] },
          { "word": "ברבי", "clues": ["בובה","אופנה","ילדים","סטייל","בגדים"] },
          { "word": "ראי-בן", "clues": ["משקפיים","שמש","אופנה","לוגו","סטייל"] },
          { "word": "לדורée", "clues": ["מאקרון","פאתי","מאפה","פריז","קונדיטור"] },
          { "word": "שאנל", "clues": ["אופנה","יוקרה","ניחוח","תכשיטים","לוגו"] },
          { "word": "לוריאל", "clues": ["קוסמטיקה","איפור","שיער","טיפוח","מותג"] },
          { "word": "וואטסאפ", "clues": ["צ'אט","הודעות","אפליקציה","קבוצות","טלו"] },
          { "word": "אובר", "clues": ["נסיעה","אפליקציה","רכב","הזמנה","מהיר"] },
          { "word": "גוגל מפות", "clues": ["ניווט","מפות","כיוונים","אפליקציה","חכם"] },
          { "word": "אמזון", "clues": ["קניות","משלוח","אינטרנט","חנות","דיגיטל"] }
      ],    
      countries: [
          { "word": "ישראל", "clues": ["תל אביב","ירושלים","כנסת","ים המלח","חול"] },
          { "word": "צרפת", "clues": ["פריז","מגדל אייפל","בגט","יין","לובר"] },
          { "word": "ארצות הברית", "clues": ["ניו יורק","וושינגטון","חופש","הוליווד","דולאר"] },
          { "word": "אנגליה", "clues": ["לונדון","ממלכה","מגדל שעון","כדורגל","תה"] },
          { "word": "גרמניה", "clues": ["ברלין","בירה","מכוניות","אוקטוברפסט","תעשייה"] },
          { "word": "איטליה", "clues": ["רומא","פיצה","פסטה","קולוסיאום","אופנה"] },
          { "word": "ספרד", "clues": ["מדריד","טאפאס","פלאמה","חופים","פורטה"] },
          { "word": "יפן", "clues": ["טוקיו","סושי","פוג'י","סמוראי","טכנולוגיה"] },
          { "word": "סין", "clues": ["בייג'ינג","חומה גדולה","טיאננמן","נודלים","אסיה"] },
          { "word": "קנדה", "clues": ["טורונטו","שלג","אגמים","מייפל","צפון"] },
          { "word": "אוסטרליה", "clues": ["סידני","קנגורו","אופרה","אוסטרליה","חופים"] },
          { "word": "ברזיל", "clues": ["ריו","קרנבל","כדורגל","אמזונס","חופים"] },
          { "word": "מקסיקו", "clues": ["מקסיקו סיטי","טאקו","קקטוס","כובע","צרפתית"] },
          { "word": "הודו", "clues": ["ניו דלהי","טאג' מהאל","גנגס","תבלינים","הודית"] },
          { "word": "תאילנד", "clues": ["בנגקוק","חופים","איים","מטבח","שווקים"] },
          { "word": "רוסיה", "clues": ["מוסקבה","קרמלין","שלג","בלט","אסיה"] },
          { "word": "מצרים", "clues": ["קהיר","פירמידות","נילוס","קברים","מדבר"] },
          { "word": "דרום אפריקה", "clues": ["קייפטאון","ספארי","חיות פראיות","מטבע","טבע"] },
          { "word": "יוון", "clues": ["אתונה","אקראופוליס","איים","מיתולוגיה","חומוס"] },
          { "word": "שוודיה", "clues": ["סטוקהולם","עיצוב","סאבה","פיצה שבדית","טבע"] },
          { "word": "נורווגיה", "clues": ["אוסלו","פיורדים","צפון","שלג","דייגים"] },
          { "word": "פולין", "clues": ["ורשה","היסטוריה","קולינריה","יהדות","פראג"] },
          { "word": "הולנד", "clues": ["אמסטרדם","תעלות","טוליפים","אופניים","גבינות"] },
          { "word": "בלגיה", "clues": ["בריסל","שוקולד","וופלס","בירה","קומיקס"] },
          { "word": "שוויץ", "clues": ["ברן","הרים","שוקולד","שווייץ","שעונים"] },
          { "word": "אוסטריה", "clues": ["ווינה","מוזיקה","אופרה","הרים","קפה"] },
          { "word": "צ'ילה", "clues": ["סןτιάגו","אנדים","יין","חופים","דגים"] },
          { "word": "ארגנטינה", "clues": ["בואנוס איירס","טנגו","בקר","יין","פוטבול"] },
          { "word": "קולומביה", "clues": ["בוגוטה","קפה","קולומביה","מוזיקה","חופים"] },
          { "word": "קובה", "clues": ["הוואנה","סיגרים","סלסה","קלאסית","חופים"] },
          { "word": "פינלנד", "clues": ["הלסינקי","צפון","סאונה","אגמים","שלג"] },
          { "word": "דנמרק", "clues": ["קופנהגן","האג","עיצוב","לגו","חופים"] },
          { "word": "איסלנד", "clues": ["רג'אויק","גייזרים","קרח","נופים","וולקנים"] },
          { "word": "וייטנאם", "clues": ["האנוי","מפרץ הלונג","מטבח","אופניים","נהר"] },
          { "word": "מלזיה", "clues": ["קואלה לומפור","איים","מטבח","מקדשים","ג'ונגל"] },
          { "word": "אינדונזיה", "clues": ["ג'קרטה","באלי","איים","תרבות","סכינים"] },
          { "word": "דרום קוריאה", "clues": ["סיאול","K-pop","טכנולוגיה","מטבח","דרמה"] },
          { "word": "צפון קוריאה", "clues": ["פיונגיאנג","בידוד","משטר","גבול","מצעדים"] },
          { "word": "סינגפור", "clues": ["עיר מדינה","נמל","גנים","חדשנות","מטבח"] },
          { "word": "ניו זילנד", "clues": ["ואלינגטון","שדות","איים","טבע","הובל"] },
          { "word": "פקיסטן", "clues": ["איסלאמבאד","תרבות","נהר","הרים","שפה"] },
          { "word": "אירלנד", "clues": ["דבלין","ירוק","מוזיקה","מאניות","פאבים"] },
          { "word": "פורטוגל", "clues": ["ליסבון","חופים","פאדו","דגים","יין"] },
          { "word": "הונגריה", "clues": ["בודפשט","מרחצאות","נהר","מטבח","ברזל"] },
          { "word": "צ'כיה", "clues": ["פראג","טירות","בירה","היסטוריה","גשרים"] }
      ],    
      moviesSeries: [
          { "word": "הארי פוטר", "clues": ["הוגוורטס","מטאטא","קסם","נסיך","חברים"] },
          { "word": "משחקי הכס", "clues": ["דרקונים","חרבות","חורף","שלטון","ממלכות"] },
          { "word": "שרלוק", "clues": ["בלש","לונדון","חידה","חכם","תעלומה"] },
          { "word": "חברים", "clues": ["קפה","דירות","קומדיה","ניו יורק","חברויות"] },
          { "word": "החץ", "clues": ["קשת","גיבור","עיר","נבל","פעולה"] },
          { "word": "הבית הנייר", "clues": ["מסכה","פריצה","בנק","תכנון","מתח"] },
          { "word": "המתים המהלכים", "clues": ["זומבים","אפוקליפסה","הישרדות","מוטל","מתח"] },
          { "word": "סטריינג'ר טינגס", "clues": ["שנות ה80","על-טבעי","ילדים","מסתורין","מכונה"] },
          { "word": "שרק", "clues": ["ענק","נסיכה","אגדה","קומדיה","משפחה"] },
          { "word": "טיטניק", "clues": ["ספינה","אסון","רומן","ים","טראגי"] },
          { "word": "מלחמת הכוכבים", "clues": ["חלל","כוח","ג'די","רובוטים","היפר"] },
          { "word": "אבודים", "clues": ["אי","מטוס","תעלומה","שרידים","הישרדות"] },
          { "word": "פלאש", "clues": ["מהירות","גיבור","עיר","נבל","כח"] },
          { "word": "סופרמן", "clues": ["מעוף","חליפה","גיבור","כוח","חייזר"] },
          { "word": "איירון מן", "clues": ["חליפה","טכנולוגיה","טוני","גיבור","פעולה"] },
          { "word": "הנוקמים", "clues": ["צוות","גיבורים","קרב","כוח","אויב"] },
          { "word": "נרניה", "clues": ["ארץ","קסם","אריה","ילדים","הרפתקה"] },
          { "word": "החמישה", "clues": ["חבורה","חידות","הרפתקה","ילדים","סודות"] },
          { "word": "ג'ומנג'י", "clues": ["משחק","יער","סכנה","קסם","הרפתקה"] },
          { "word": "ממלכת הקרח", "clues": ["אחיות","שלג","שיר","נסיכה","קסם"] },
          { "word": "הנוקם האחרון", "clues": ["צוות","פעולה","סיוע","טכנולוגיה","סוד"] },
          { "word": "נמו", "clues": ["דג","אוקיינוס","חיפוש","אב","ידידות"] },
          { "word": "ספיידרמן", "clues": ["עכביש","קפיצה","חליפה","עיר","גיבור"] },
          { "word": "באטמן", "clues": ["כהה","אבקנים","חליפה","עיר","נבל"] },
          { "word": "הצופן", "clues": ["חידה","דת","תעלומה","ספר","רצח"] },
          { "word": "הנוקמים סוף המשחק", "clues": ["שיא","גיבורים","הקרב","זמן","צוות"] },
          { "word": "שכונה", "clues": ["קומדיה","ישראל","חיים","שכונה","חברויות"] },
          { "word": "זגורי אימפריה", "clues": ["ישראל","קומדיה","הומור","חברויות","תרבות"] },
          { "word": "הצנחנים", "clues": ["צבא","חיילים","אימונים","פעולה","חברות"] },
          { "word": "מלה אחת", "clues": ["רומנטי","אהבה","סיפור","רגש","זוג"] },
          { "word": "כיפה אדומה", "clues": ["אגדה","יער","נסיכה","זאב","ילדים"] },
          { "word": "מלך האריות", "clues": ["אפריקה","אריה","מלכות","משפחה","שיר"] },
          { "word": "רקוויאם לחלום", "clues": ["דרמה","פסיכולוגי","מכורויות","כבד","סורס"] },
          { "word": "פיטר פן", "clues": ["מעופף","אי","ילדים","קסם","הרפתקה"] },
          { "word": "סנדק", "clues": ["מאפיה","משפחה","פשע","כוח","טרגדיה"] },
          { "word": "החושך", "clues": ["מתח","פשע","לילה","מסתורין","סוד"] },
          { "word": "פרויקט רוזוולט", "clues": ["חסוי","ממשלה","פעולה","סוד","תוכנית"] },
          { "word": "גודזילה", "clues": ["מפלצת","הרס","עיר","אסון","כוח"] },
          { "word": "הנסיכה והצפרדע", "clues": ["נסיכה","אגדה","אנימציה","שיר","הגשמה"] },
          { "word": "מכושפת", "clues": ["קסם","נסיכה","אנימציה","אהבה","הפתעה"] },
          { "word": "האקס מן", "clues": ["על-כוחות","גנים","צוות","מאבק","סדרה"] },
          { "word": "קינג קונג", "clues": ["ענק","אי","מפלצת","עיר","אירוע"] }
      ],    
      professions: [
          { "word": "רופא", "clues": ["בית חולים","אבחון","תרופות","מרפאה","חולים"] },
          { "word": "שף", "clues": ["מטבח","בישול","מנה","תבלינים","אפייה"] },
          { "word": "מורה", "clues": ["כיתה","תלמידים","לוח","שיעור","מבחן"] },
          { "word": "מהנדס", "clues": ["תכנון","בניין","ציור","פרויקט","חישובים"] },
          { "word": "אדריכל", "clues": ["שרטוט","מבנה","עיצוב","דירה","פרויקט"] },
          { "word": "שוטר", "clues": ["חוק","מעצר","תנועה","משטרה","בטחון"] },
          { "word": "עיתונאי", "clues": ["חדשות","ראיון","כתיבה","חוקר","טלוויזיה"] },
          { "word": "שחקן", "clues": ["במה","תפקיד","אודישן","הצגה","סרט"] },
          { "word": "זמר", "clues": ["קול","שיר","הקלטה","במה","קונצרט"] },
          { "word": "רקדן", "clues": ["תנועה","קצב","במה","צעד","חוג"] },
          { "word": "ספורטאי", "clues": ["אימון","תחרות","מדליה","מגרש","חוזק"] },
          { "word": "אופה", "clues": ["תנור","לחם","עוגה","קונדיטוריה","קינוח"] },
          { "word": "טכנאי", "clues": ["תיקון","כלים","מכשיר","חיבור","פתרון"] },
          { "word": "נהג", "clues": ["רכב","נסיעה","כביש","רישיון","תחבורה"] },
          { "word": "מלצר", "clues": ["מסעדה","שולחן","מנות","הזמנה","טיפ"] },
          { "word": "מוזיקאי", "clues": ["כלי נגינה","תווים","אקורד","הקלטה","במה"] },
          { "word": "צלם", "clues": ["מצלמה","צילום","תאורה","סטודיו","אירוע"] },
          { "word": "עורך דין", "clues": ["בית משפט","חוזה","טיעון","הגנה","ייעוץ"] },
          { "word": "אחות", "clues": ["טיפול","בדיקה","תרופות","מחלקה","עזרה"] },
          { "word": "חוקר", "clues": ["חקירה","ראיות","תיק","סוד","בדיקה"] },
          { "word": "עובד סוציאלי", "clues": ["תמיכה","משפחה","קהילה","ייעוץ","רווחה"] },
          { "word": "סטייליסט", "clues": ["אופנה","בגדים","לוק","לקוח","עיצוב"] },
          { "word": "מאמן כושר", "clues": ["אימון","חדר כושר","תזונה","הדרכה","כוח"] },
          { "word": "טייס", "clues": ["מטוס","טיסה","נוסעים","רישיון","שמיים"] },
          { "word": "מוזיאונאי", "clues": ["תערוכה","מוזיאון","היסטוריה","תצוגה","סיור"] },
          { "word": "בלש", "clues": ["חידה","ראיות","חקירה","פתרון","תיק"] },
          { "word": "מתכנת", "clues": ["קוד","אפליקציה","פיתוח","לוגיקה","מסך"] },
          { "word": "יועץ", "clues": ["הכוונה","אסטרטגיה","לקוח","ייעוץ","פתרון"] },
          { "word": "סטודנט", "clues": ["לימודים","אוניברסיטה","מבחן","קורס","ספרים"] },
          { "word": "ספר", "clues": ["מספרה","תספורת","מסרק","לקוח","עיצוב"] },
          { "word": "גנן", "clues": ["גינה","צמחים","דשא","טיפוח","עצים"] },
          { "word": "חקלאי", "clues": ["שדות","יבול","חווה","גידולים","מים"] },
          { "word": "אמן", "clues": ["ציור","יצירה","צבעים","תערוכה","יצירתי"] },
          { "word": "פסיכולוג", "clues": ["רגשות","שיחה","טיפול","מוח","ייעוץ"] },
          { "word": "שחקן קולנוע", "clues": ["סרט","תסריט","הפקה","במה","תפקיד"] },
          { "word": "דיגיטלי", "clues": ["תוכן","אינטרנט","אתר","קוד","אפליקציה"] },
          { "word": "מזכיר", "clues": ["משרד","מסמכים","תיאום","טלפון","ארגון"] },
          { "word": "חוקר מדעי", "clues": ["ניסוי","מעבדה","מחקר","תיאוריה","תגלית"] },
          { "word": "עובד ציבור", "clues": ["ממשלה","עירייה","שירות","משרדים","ציבור"] },
          { "word": "נהג אוטובוס", "clues": ["קווים","נוסעים","תחנה","לוח זמנים","רישיון"] },
          { "word": "דייג", "clues": ["ים","סירה","דגים","חכה","רשת"] },
          { "word": "קוסם", "clues": ["קסם","טריקים","במה","כובע","קהל"] },
          { "word": "חייל", "clues": ["מדים","אימון","משימה","צבא","משמעת"] }
      ],    
      scienceTech: [
          { "word": "מחשב", "clues": ["שבב","מסך","תכנות","מקלדת","עכבר"] },
          { "word": "חיישן", "clues": ["מדידה","תנועה","חום","לחץ","אור"] },
          { "word": "טלפון חכם", "clues": ["אפליקציות","מצלמה","מסך","סוללה","שיחות"] },
          { "word": "טלוויזיה", "clues": ["שידור","סדרה","מסך","רמקול","בידור"] },
          { "word": "רובוט", "clues": ["מכונה","מנוע","חיישנים","תכנות","בינה"] },
          { "word": "דפדפן", "clues": ["אתר","קישורים","חיפוש","טאב","URL"] },
          { "word": "שרת", "clues": ["רשת","נתונים","אחסון","חיבור","מארח"] },
          { "word": "אלגוריתם", "clues": ["חישוב","כללים","פתרון","תהליך","קוד"] },
          { "word": "מסך מגע", "clues": ["מגע","סמארטפון","טאבלט","קלט","חיישן"] },
          { "word": "מצלמה", "clues": ["עדשה","פוקוס","צילום","וידאו","חיישן"] },
          { "word": "שבב", "clues": ["מעבד","סיליקון","מעגל","ננו","חישוב"] },
          { "word": "בינה מלאכותית", "clues": ["למידה","מודלים","נתונים","AI","אוטומציה"] },
          { "word": "מטען", "clues": ["USB","טעינה","כבל","סוללה","חשמל"] },
          { "word": "סוללה", "clues": ["אנרגיה","מתח","טעינה","כוח","תא"] },
          { "word": "רשת", "clues": ["אינטרנט","חיבור","פרוטוקול","WiFi","נתונים"] },
          { "word": "כבל", "clues": ["חיבור","חשמל","נתונים","USB","כוח"] },
          { "word": "מספריים", "clues": ["חיתוך","חד","כלי","יצירה","ידיים"] },
          { "word": "מדפסת", "clues": ["הדפסה","נייר","צבע","מסמך","משרד"] },
          { "word": "תוכנה", "clues": ["קוד","יישום","עדכון","מערכת","פיתוח"] },
          { "word": "יישום", "clues": ["אפליקציה","ממשק","טלפון","שירות","כלי"] },
          { "word": "לייזר", "clues": ["קרן","דיוק","חיתוך","אור","טווח"] },
          { "word": "טאבלט", "clues": ["נייד","מסך","מגע","ניידות","אפליקציות"] },
          { "word": "דיסק קשיח", "clues": ["אחסון","נתונים","נפח","כונן","קבצים"] },
          { "word": "נתב", "clues": ["WiFi","סיגנל","חיבור","בית","ראוטר"] },
          { "word": "מיקרוסקופ", "clues": ["גדילה","תאים","זכוכית","חקר","מעבדה"] },
          { "word": "טלסקופ", "clues": ["כוכבים","אסטרונומיה","שמיים","הגדלה","חלל"] },
          { "word": "רדיו", "clues": ["שידור","גלים","תחנה","האזנה","קול"] },
          { "word": "קונסולה", "clues": ["גיימינג","בקר","טלוויזיה","וידאו","פלטפורמה"] },
          { "word": "משדר", "clues": ["שידור","גלים","אודיו","וידאו","שנאי"] },
          { "word": "חיישן טמפרטורה", "clues": ["חום","מדידה","דיוק","חיישן","בית"] },
          { "word": "דינמו", "clues": ["סיבוב","חשמל","אנרגיה","גנרטור","מגנט"] },
          { "word": "מנוע", "clues": ["תנועה","כוח","צילינדר","מכני","סיבוב"] },
          { "word": "ג'ויסטיק", "clues": ["בקר","משחק","תנועה","אינטראקטיבי","דאון"] },
          { "word": "מצלמת רשת", "clues": ["וידאו","שיחה","קונפרנס","שידור","חיבור"] },
          { "word": "כבל USB", "clues": ["טעינה","נתונים","חיבור","ממשק","כבל"] },
          { "word": "מודם", "clues": ["חיבור","אינטרנט","סיגנל","בית","נתונים"] },
          { "word": "סנסור חיישן", "clues": ["תנועה","חום","לחץ","זיהוי","מידע"] },
          { "word": "מעבד", "clues": ["חישוב","מהירות","ליבות","CPU","שבב"] },
          { "word": "תשתית", "clues": ["רשת","בסיס","קווים","חיבורים","מבנה"] },
          { "word": "מערכת הפעלה", "clues": ["חלונות","לינוקס","מנהל","גרפיקה","קליטה"] },
          { "word": "שרת ענן", "clues": ["וירטואלי","אחסון","קלאוד","נתונים","שירות"] },
          { "word": "טכנולוגיה רפואית", "clues": ["דיאגנוזה","ציוד","בית חולים","בדיקה","טיפול"] }
      ],    
      videoGames: [
          { "word": "פוקימון", "clues": ["לכידת יצורים","קרבות","מאמן","כדורים","אסוף"] },
          { "word": "מריו", "clues": ["קפיצה","צינורות","נסיכה","מטבעות","סופר"] },
          { "word": "זלדה", "clues": ["חרב","מבוכים","משחק הרפתקה","תעלומה","נסיכה"] },
          { "word": "סוני", "clues": ["קונסולה","בקר","מולטימדיה","איכות","פלייסטיישן"] },
          { "word": "מיינקראפט", "clues": ["בלוקים","חפירה","בניין","יצירה","שרידות"] },
          { "word": "פורטנייט", "clues": ["רויאל","בנייה","קצת צבעוני","סקינים","קרב"] },
          { "word": "קול אוף דיוטי", "clues": ["צבא","נשקים","אקשן","מולטי","טקטיקה"] },
          { "word": "פיפא", "clues": ["כדורגל","גולים","קבוצות","ליגה","שחקנים"] },
          { "word": "גרנד ת'פט אוטו", "clues": ["עיר פתוחה","פשע","רכבים","חופש פעולה","מהיר"] },
          { "word": "סימס", "clues": ["חיים מדומים","משפחה","עיצוב בית","בנייה","סימול"] },
          { "word": "דוטה 2", "clues": ["MOBA","גיבורים","טאואר","קבוצה","טורניר"] },
          { "word": "ליג אוף לג'נדס", "clues": ["MOBA","להיטים","פיק-באן","גיבורים","תחרות"] },
          { "word": "סופר סמאש ברוס", "clues": ["קרבות דמויות","אצווה","מולטיפלייר","סופר","פלטפורמה"] },
          { "word": "קינגדום הארטס", "clues": ["סיפור רגשי","קסם","גיבורים","עולמות","ריבוט"] },
          { "word": "דיוויז'ן", "clues": ["עיר מפורקת","טקטי","ציוד","שחור-שוק","שיתופי"] },
          { "word": "רסידנט איביל", "clues": ["זומבים","אימה","חידות","שרידות","קלאסי"] },
          { "word": "אססינס קריד", "clues": ["חבלן","היסטוריה","קפיצות","פרשייה","חץ"] },
          { "word": "סוניק", "clues": ["מהירות","כחול","טייל","טבעת","פלטפורמה"] },
          { "word": "פייב נייטס אט פרדי'ס", "clues": ["בובות מפחידות","לילה","פחד","מכונות","חידות"] },
          { "word": "וואצ' דוגס", "clues": ["האקר","ריגול","רשת","טכנולוגיה","עיר"] },
          { "word": "מטל גיר", "clues": ["ריגול","סנייק","סיבת קרב","קונספט","טקטי"] },
          { "word": "ספורט", "clues": ["תחרויות","קבוצות","אימונים","ליגות","משחקים"] },
          { "word": "ראל", "clues": ["מירוץ","מהירות","מסלול","רכב","קונסולה"] },
          { "word": "בליזרד", "clues": ["חברה","שירותים","וורקרפט","אקספרס","תחרויות"] },
          { "word": "אוברווטש", "clues": ["גיבורים","קומבינציה","קונסולה","צוות","אקשן"] },
          { "word": "הלו קיטי", "clues": ["חמוד","דמויות","ילדים","לבן","מתוק"] },
          { "word": "סוניק אדג'", "clues": ["מהיר במיוחד","כחול","פורטנר","פלטפורמה","קיפוץ"] },
          { "word": "אורבן טריילס", "clues": ["עיר","תחרות","מסלולים","פילוח","פעולה"] },
          { "word": "חיות מחמד", "clues": ["אימוץ","חמודים","טיפול","משחק ילדים","דיגיטל"] },
          { "word": "סימוליישן", "clues": ["חיים מדומים","בנייה","ניהול","אינטראקציה","חוויות"] },
          { "word": "לגו משחק", "clues": ["בלוקים","יצירה","לגו","קולקציות","משפחה"] },
          { "word": "גיטר הירו", "clues": ["כלי נגינה","תווים","ריתמוס","פסימון","קונסולה"] },
          { "word": "סקייטבורד", "clues": ["טריקים","גלישה","מהירות","סלייט","פעולה"] },
          { "word": "אמונג אס", "clues": ["מרחב חלל","בוגי","חשד","קולוניות","צבעים"] },
          { "word": "סטריט פייטר", "clues": ["אגרוף","דמויות","קרבות","מהלכים","תחרות"] },
          { "word": "קירבי", "clues": ["בליעה","חמוד","וורלד","כח","פלטפורמה"] },
          { "word": "דונקי קונג", "clues": ["קופים","חבלים","חסימות","פעם","אתגר"] },
          { "word": "אינדיבידואל", "clues": ["שחקן יחיד","אקשן","ממוצע","קונסולה","פעילות"] },
          { "word": "טטריס", "clues": ["בלוקים","חידות","שורות","מהירות","סנכרון"] },
          { "word": "סופר מריו ברוס", "clues": ["מטבעות","קפיצה","נסיכה","כוח","פלטפורמה"] },
          { "word": "פיינל פנטזי", "clues": ["פנטזיה","קרבות","קסם","סאגה","גיבורים"] },
          { "word": "קול אוף דיוטי מודרן", "clues": ["מודרני","משימות","נשקים","חיילים","מהירות"] },
          { "word": "קראש בנדיקוט", "clues": ["פלטפורמה","קפיצות","תופים","קארטרה","הרפתקה"] },
          { "word": "אנגרי בירדס", "clues": ["ציפורים","שליחה","פיזיקה","סמארטפון","כיוון"] },
          { "word": "קלש רויאל", "clues": ["קלפים","קרב","ארמדה","אסטרטגיה","מהיר"] }
      ],    
      music: [
          { "word": "ג'ון לנון", "clues": ["ביטלס","סולו","Imagine","פעיל שלום","פסנתר"] },
          { "word": "ביטלס", "clues": ["ליברפול","קומבינה","1960s","הרמוניות","ממלא אולמות"] },
          { "word": "מייקל ג'קסון", "clues": ["Moonwalk","מלך פופ","ריקוד","שיר אייקון","כפפת לבנה"] },
          { "word": "מדונה", "clues": ["80s","סטייל","פרובוקציה","קליפים","מלכת פופ"] },
          { "word": "אלטון ג'ון", "clues": ["פסנתר","משקפיים","כובע","בלדות","פזמונאי"] },
          { "word": "קולדפליי", "clues": ["לונדון","להיטים","אווירה","להקה","קונצרטים"] },
          { "word": "קייטי פרי", "clues": ["קליפים","פופ","פסטיבל","כריזמה","להיטים"] },
          { "word": "ביונסה", "clues": ["כוח קול","ביצועים","מלכותית","פרפורמנס","סולו"] },
          { "word": "אדל", "clues": ["בלדות","קול כבד","רגש","פשטות","אולמות"] },
          { "word": "ריהאנה", "clues": ["סטייל","פופ","סינגלים","הצלחות","מיזוג"] },
          { "word": "אד שירן", "clues": ["גיטרה","בלדות","לופר","סולו","שירים"] },
          { "word": "ליידי גאגא", "clues": ["אקסצנטרית","סטייג'","קול דרמטי","לוק עז","פופ"] },
          { "word": "טיילור סוויפט", "clues": ["סיפוריות","גיטרה","פופ","יומנים","טור"] },
          { "word": "מג'יק!", "clues": ["רגאיי פופ","וויב","להיט","קול מוביל","קייצי"] },
          { "word": "אריאנה גרנדה", "clues": ["ווקאלית","קול גבוה","קליפים","פופ","ביצועים"] },
          { "word": "פול מקרטני", "clues": ["ביטלס","לחנים","גיטרה","פזמונאי","אייקון"] },
          { "word": "הרולינג סטונז", "clues": ["לונדון","רוק קלאסי","מיק ג'אגר","ריפים","להקה"] },
          { "word": "ג'יימס בראון", "clues": ["פאנק מקור","ריקוד","סולו","קול חזק","מקור"] },
          { "word": "פרינס", "clues": ["גיטרה","סטייל","מולטימדיה","אלבומים","אישיות"] },
          { "word": "לינקין פארק", "clues": ["נוארו מטאל","אנרגיה","דואט קולי","להקה","סאונד"] },
          { "word": "נירוונה", "clues": ["גרנג'","קורט קוביין","90s","להקה","אייקון"] },
          { "word": "אינטרפול", "clues": ["אווירה אפלה","גיטרות","ניו יורק","פוסט-פאנק","להקה"] },
          { "word": "דפש מוד", "clues": ["סינת'פופ","אלקטרוניקה","צליל אלגנטי","קליפים","אווירה"] },
          { "word": "Black Sabbath", "clues": ["מטאל מוקדם","ריפים","חושך","אוקסיד","להקה"] },
          { "word": "עידן רייכל", "clues": ["פופ-עברי","הרכב","מופעים","מיקס עולמי","פזמונאי"] },
          { "word": "קווין", "clues": ["פרדי מרקיורי","הרמוניות","אופרה רוק","היט מקהלה","סטייג'"] },
          { "word": "רדיוהד", "clues": ["אלטרנטיב","אווירה","חדשנות","טום יורק","קונספט"] },
          { "word": "AC/DC", "clues": ["ריף גיטרה","ווקאל גס","אנרגיה","היטי רוק","אוסטרלי"] },
          { "word": "מטליקה", "clues": ["תיפוף מהיר","מטאל כבד","ריפים","אנרגיה","להקה"] },
          { "word": "איירון מיידן", "clues": ["מטאל מלודי","אייקון","אדום שחור","גיטרות","מסורת"] },
          { "word": "דיסני", "clues": ["סרטים","שירי ילדים","מנגינות","קסם","הפקות"] },
          { "word": "אלט ג'י", "clues": ["אלטרנטיב","קולות גבוהים","הפקה","להקה","אימג'"] },
          { "word": "פינק", "clues": ["אקרובטיקה","קול נוכח","רוק פופ","ביצועים","סולו"] },
          { "word": "לנה דל ריי", "clues": ["נווסטלגיה","וויב","ליריקה","אינדי","אווירה"] },
          { "word": "ג'סטין ביבר", "clues": ["טין פופ","להיטים","קליפים","סולו","פופ"] },
          { "word": "דמי לובאטו", "clues": ["ווקאלית","שירים אישיים","קליפים","במה","פופ"] }
      ],
      clashRoyale: [
          { "word": "Archers", "clues": ["Common","2016","3","ירי זוגי","תמיכה מרחוק"] },
          { "word": "Archer Queen", "clues": ["Champion","2021","5(1)","קשת גיבורה","צליפה מדויקת"] },
          { "word": "Baby Dragon", "clues": ["Epic","2016","4","מעופף אש","נזק שטח"] },
          { "word": "Balloon", "clues": ["Epic","2016","5","מתמקד בבנינים","פיצוץ חזק"] },
          { "word": "Bandit", "clues": ["Legendary","2017","3","דאש מהיר","מכת פתע"] },
          { "word": "Barbarians", "clues": ["Common","2016","5","חבורה","קרקע"] },
          { "word": "Bats", "clues": ["Common","2017","2","עדר עפים","הצפה(swarm) זול"] },
          { "word": "Battle Healer", "clues": ["Rare","2019","4","ריפוי","חיזוק יחידות"] },
          { "word": "Battle Ram", "clues": ["Rare","2017","4","פריצה","פגיעה בגשר"] },
          { "word": "Berserker", "clues": ["Epic","2024","2","זעם מתגבר","נזק עולה"] },
          { "word": "Bomber", "clues": ["Common","2016","2","פיצוץ קשת","נזק לאשכול"] },
          { "word": "Boss Bandit", "clues": ["Champion","2024","6(1)","דאש","מכה עוצמתית"] },
          { "word": "Bowler", "clues": ["Epic","2016","5","אבנים","דחיפה אחורית"] },
          { "word": "Cannon Cart", "clues": ["Epic","2017","5","תותח","נשבר"] },
          { "word": "Dark Prince", "clues": ["Epic","2016","4","מגן","פגיעה ספלאש"] },
          { "word": "Dart Goblin", "clues": ["Rare","2017","3","מהיר","ירי מרובה"] },
          { "word": "Electro Dragon", "clues": ["Epic","2018","5","חשמל","פגיעת שרשרת"] },
          { "word": "Electro Giant", "clues": ["Epic","2020","7","זורק ניצוצות","מפריע הגנות"] },
          { "word": "Electro Spirit", "clues": ["Common","2020","1","קפיצה חשמלית","שוק קצר"] },
          { "word": "Electro Wizard", "clues": ["Legendary","2017","4","זעם זעיר","השהיית אויבים"] },
          { "word": "Elite Barbarians", "clues": ["Common","2016","6","זוג","חבלה מהירה"] },
          { "word": "Elixir Golem", "clues": ["Rare","2019","3","גולם","מתפרק"] },
          { "word": "Executioner", "clues": ["Epic","2017","5","גרזן","נזק חותך"] },
          { "word": "Firecracker", "clues": ["Common","2019","3","ירי מתפרץ","נזק מרחוק"] },
          { "word": "Fire Spirit", "clues": ["Common","2016","1","נפץ קופץ","נזק מיידי"] },
          { "word": "Fisherman", "clues": ["Legendary","2019","3","קרס משיכה","משיכה ובקרת יחידות"] },
          { "word": "Flying Machine", "clues": ["Rare","2017","4","מעופף","פגיעה מתמשכת"] },
          { "word": "Furnace", "clues": ["Rare","2016","4","מפעל אש","מייצר"] },
          { "word": "Giant", "clues": ["Rare","2016","5","טנק","מכוון למגדלים"] },
          { "word": "Giant Skeleton", "clues": ["Epic","2016","6","שלד","פיצוץ חזק"] },
          { "word": "Goblin Gang", "clues": ["Common","2017","3","קבוצה מעורבת","הצפת(swarm) קרקע"] },
          { "word": "Goblin Demolisher", "clues": ["Rare","2025","4","מחזיק חבלה","ריצה"] },
          { "word": "Goblin Giant", "clues": ["Epic","2018","6","גובלין רכוב","מגן נייד"] },
          { "word": "Goblin Machine", "clues": ["Rare","2025","5","מכונה","גובלין"] },
          { "word": "Goblins", "clues": ["Common","2016","2","רביעיה","נזק מהיר"] },
          { "word": "Goblinstein", "clues": ["Champion","2024","5(2)","גובלין ענק","מפעיל תמרון"] },
          { "word": "Golden Knight", "clues": ["Champion","2021","4(1)","אדמ","מכה בשרשרת"] },
          { "word": "Golem", "clues": ["Epic","2016","8","פיצול","מטען כבד"] },
          { "word": "Guards", "clues": ["Epic","2016","3","עם שריון","בלימה מדויקת"] },
          { "word": "Hog Rider", "clues": ["Rare","2016","4","רוכב","פוגע בבניינים"] },
          { "word": "Hunter", "clues": ["Epic","2017","4","ירי פיצוץ קרוב","נזק מרוכז"] },
          { "word": "Heal Spirit", "clues": ["Rare","2020","1","מרפא","ריפוי קטן"] },
          { "word": "Ice Golem", "clues": ["Rare","2016","2","גולם","פיצוץ מאט"] },
          { "word": "Ice Spirit", "clues": ["Common","2016","1","קפיצת קיפאון","קפיאה קצרה"] },
          { "word": "Ice Wizard", "clues": ["Legendary","2016","3","קוסם","מאט אויבים"] },
          { "word": "Inferno Dragon", "clues": ["Legendary","2016","4","להבה","נזק מצטבר"] },
          { "word": "Knight", "clues": ["Common","2016","3","לוחם בסיסי","טנק זול"] },
          { "word": "Lava Hound", "clues": ["Legendary","2016","7","לבה","טנק מעופף"] },
          { "word": "Little Prince", "clues": ["Champion","2024","3(3)","נסיך","שומר"] },
          { "word": "Lumberjack", "clues": ["Legendary","2016","4","זעם","גרזן"] },
          { "word": "Magic Archer", "clues": ["Legendary","2018","4","חץ חודר","יריה ארוכה"] },
          { "word": "Mega Knight", "clues": ["Legendary","2017","7","קפיצה","נזק נחיתה"] },
          { "word": "Mega Minion", "clues": ["Rare","2016","3","מיניון","מעופף קרבי"] },
          { "word": "Mighty Miner", "clues": ["Champion","2022","4(1)","כריה מהירה","חפירה תקיפה"] },
          { "word": "Miner", "clues": ["Legendary","2016","3","כריה נסתרת","פוגע מאחורה"] },
          { "word": "Mini P.E.K.K.A.", "clues": ["Rare","2016","4","פנקייק","נזק בודד"] },
          { "word": "Minion Horde", "clues": ["Common","2016","5","עדר עפים","הצפה מהירה"] },
          { "word": "Minions", "clues": ["Common","2016","3","קבוצת עפים","פגיעה אווירית"] },
          { "word": "Monk", "clues": ["Champion","2022","5(1)","נזיר קרבי","תמיכה"] },
          { "word": "Mother Witch", "clues": ["Legendary","2020","4","מכשפה","הופכת ליחידות"] },
          { "word": "Musketeer", "clues": ["Rare","2016","4","צלף מרחוק","פגיעה יחידה"] },
          { "word": "Night Witch", "clues": ["Legendary","2017","4","מכשפה","יוצרת דברים"] },
          { "word": "P.E.K.K.A.", "clues": ["Epic","2016","7","איטית","נזק יחיד עצום"] },
          { "word": "Phoenix", "clues": ["Legendary","2022","4","קימה מחדש","שיבה לאחר מוות"] },
          { "word": "Prince", "clues": ["Epic","2016","5","דאש","רוכב"] },
          { "word": "Princess", "clues": ["Legendary","2016","3","ירי רחוק","חץ וקשת"] },
          { "word": "Ram Rider", "clues": ["Legendary","2018","5","רוכבת","מכה מעכבת"] },
          { "word": "Rascals", "clues": ["Common","2018","5","שלישיית","תמיכה-שילוב"] },
          { "word": "Royal Ghost", "clues": ["Legendary","2017","3","בלתי נראה","התקפה פתע"] },
          { "word": "Royal Giant", "clues": ["Common","2016","6","תותח","מיקוד מבנה"] },
          { "word": "Royal Hogs", "clues": ["Rare","2018","5","פיצול","מתקפת גשר"] },
          { "word": "Royal Recruits", "clues": ["Common","2018","7","מגנים","חסימת נתיבים"] },
          { "word": "Rune Giant", "clues": ["Rare","2025","4","ענק","חיזוק משני"] },
          { "word": "Skeleton Army", "clues": ["Epic","2016","3","צבא","הצפה(swarm) המונית"] },
          { "word": "Skeleton Barrel", "clues": ["Common","2017","3","חבית","נחיתה מפרקת"] },
          { "word": "Skeleton Dragons", "clues": ["Common","2020","4","דרקונים","עפים ואש"] },
          { "word": "Skeleton King", "clues": ["Champion","2021","4(2)","מלך","מוביל"] },
          { "word": "Skeletons", "clues": ["Common","2016","1","שלישיה","הסחת טנקים"] },
          { "word": "Sparky", "clues": ["Legendary","2016","6","נשק חשמלי","פיצוץ כבד"] },
          { "word": "Spear Goblins", "clues": ["Common","2016","2","חניתים","ירי לאוויר וקרקע"] },
          { "word": "Spirit Empress", "clues": ["Champion","2024","6(3)","רוחנית","עפה וגם הולכת"] },
          { "word": "Suspicious Bush", "clues": ["Common","2025","2","שיח","הסוואה/הטעיה"] },
          { "word": "Three Musketeers", "clues": ["Rare","2016","9","שלישיה","כוח יקר"] },
          { "word": "Valkyrie", "clues": ["Rare","2016","4","גרזן","נזק סביבתי"] },
          { "word": "Wall Breakers", "clues": ["Epic","2018","2","פיצוץ כפול","התמקדות בניינים"] },
          { "word": "Witch", "clues": ["Epic","2016","5","זקנה","שלדים"] },
          { "word": "Wizard", "clues": ["Rare","2016","5","קוסם","נזק אווירי וקרקע"] },
          { "word": "Zappies", "clues": ["Rare","2018","4","זעזוע","מכה משהה"] },
          { "word": "Bomb Tower", "clues": ["Rare","2016","4","מגדל","הגנה נייחת"] },
          { "word": "Cannon", "clues": ["Common","2016","3","תותח","עצר טנקים"] },
          { "word": "Inferno Tower", "clues": ["Rare","2016","5","מגדל אש","נזק מצטבר"] },
          { "word": "Mortar", "clues": ["Common","2016","4","קלע ארוך","ירי מרחוק"] },
          { "word": "Tesla", "clues": ["Common","2016","4","מגדל","לא גלוי"] },
          { "word": "X-Bow", "clues": ["Epic","2016","6","קו ירי ממוקד","חצים"] },
          { "word": "Barbarian Hut", "clues": ["Rare","2016","6","בית","ברברים"] },
          { "word": "Elixir Collector", "clues": ["Rare","2016","6","אליקסיר","משאבים"] },
          { "word": "Goblin Cage", "clues": ["Rare","2019","4","כלוב","משחרר שומר"] },
          { "word": "Goblin Drill", "clues": ["Epic","2021","4","חפירה","התקפה מתחת"] },
          { "word": "Goblin Hut", "clues": ["Rare","2016","4","בית","גובלינים"] },
          { "word": "Tombstone", "clues": ["Rare","2016","3","מצבה","שלדים"] },
          { "word": "Arrows", "clues": ["Common","2016","3","חצים","ניקוי חיילים"] },
          { "word": "Barbarian Barrel", "clues": ["Epic","2018","2","חבית","יציאה"] },
          { "word": "Earthquake", "clues": ["Rare","2019","3","שובר מבנים","מעט דמויות"] },
          { "word": "Fireball", "clues": ["Rare","2016","4","אש","נזק ממוקד"] },
          { "word": "Freeze", "clues": ["Epic","2016","4","הקפאה","השהיית אויבים"] },
          { "word": "Giant Snowball", "clues": ["Common","2018","2","כדור","דחיפה והאטה"] },
          { "word": "Goblin Curse", "clues": ["Epic","2025","2","גובלין","השפעת יחידות"] },
          { "word": "Lightning", "clues": ["Epic","2016","6","פוגע שלוש","חשמל"] },
          { "word": "Poison", "clues": ["Epic","2016","4","רעיל","נזק מתמשך"] },
          { "word": "Rage", "clues": ["Epic","2016","2","זעם","הגברה זמנית"] },
          { "word": "Rocket", "clues": ["Rare","2016","6","ירי חזק ואיטי","נזק בניין"] },
          { "word": "Royal Delivery", "clues": ["Common","2020","3","מכה בנחיתה","הסעת תמיכה"] },
          { "word": "The Log", "clues": ["Legendary","2016","2","עץ","דחיפה רחבה"] },
          { "word": "Tornado", "clues": ["Epic","2016","3","שואב","הזזה"] },
          { "word": "Vines", "clues": ["Epic","2025","3","תופס","סגירת נתיבים"] },
          { "word": "Void", "clues": ["Epic","2025","3","פגיעה בהרבה וקצת","הסרת יחידות"] },
          { "word": "Zap", "clues": ["Common","2016","2","הלם קצר","חשמל"] },
          { "word": "Cannoneer", "clues": ["Epic","2024","None","תותחן","ירי ממוקד"] },
          { "word": "Dagger Duchess", "clues": ["Legendary","2024","None","סכינים","תקיפה מהירה"] },
          { "word": "Royal Chef", "clues": ["Legendary","2024","None","שף","תמיכה פסיבית"] },
          { "word": "Tower Princess", "clues": ["Common","2024","None","נסיכה","ירי מהיר"] }
      ],
      brawlStars: [
          { word: "Shelly", clues: ["שאטגאן","טווח קצר","דוחפת","2017","Rare"] },
          { word: "Nita", clues: ["דובי קרב","נזק אזורי","שליטה בשטח","2017","Rare"] },
          { word: "Bo", clues: ["חיצים חפורים","מלכודות","טווח בינוני","2017","Epic"] },
          { word: "Gus", clues: ["ירי בלון","ריפוי בונוס","תמיכה צוותית","2022","Super Rare"] },
          { word: "Colt", clues: ["ירי מדויק","נזק מרחוק","דיוק גבוה","2017","Rare"] },
          { word: "Bull", clues: ["שאטגאן כבד","התנגשויות","טנק קרוב","2017","Rare"] },
          { word: "Brock", clues: ["טילים ארוכים","פיצוץ אזורי","נזק מרחוק","2017","Rare"] },
          { word: "El Primo", clues: ["אגרוף קרוב","קרב פנים","טנק נייד","2017","Rare"] },
          { word: "Barley", clues: ["בקבוקי רעל","נזק שטח","פוגע במכשולים","2017","Rare"] },
          { word: "Poco", clues: ["ריפוי גל","מרפא צוות","תמיכה אזורית","2017","Rare"] },
          { word: "Rosa", clues: ["מגן צמח","ספיגת נזק","חסימה ודחיפה","2017","Rare"] },
          { word: "Jessie", clues: ["תותח משני","ירי מקפץ","הגנה אזורית","2017","Rare"] },
          { word: "Dynamike", clues: ["דינמיט","פיצוץ שטח","טקטי קבוצתי","2017","Rare"] },
          { word: "Tick", clues: ["מוקשים ניידים","פיצוצים מרוחקים","שליטה אזורית","2017","Super Rare"] },
          { word: "8-Bit", clues: ["עמדת ארקייד","מחזק צוות","איטי תומך","2018","Super Rare"] },
          { word: "Rico", clues: ["כדורי ריקושט","פגיעה בקירות","ניידות גבוהה","2018","Epic"] },
          { word: "Darryl", clues: ["חבית מתגלגלת","פריצה/בריחה","טווח קרוב","2018","Super Rare"] },
          { word: "Penny", clues: ["תותח נייח","פיצוץ משני","מלכודת","2018","Super Rare"] },
          { word: "Carl", clues: ["פטיש בומרנג","זריקה מסובבת","ניידות גבוהה","2018","Super Rare"] },
          { word: "Jacky", clues: ["פטיש סביבתי","מושך אויבים","טנק קרוב","2019","Super Rare"] },
          { word: "Emz", clues: ["רסס רעל","מאט ונזק","בקרה צוותית","2019","Rare"] },
          { word: "Stu", clues: ["לחץ מהיר","קפיצות מהירות","טעינה מהירה","2020","Legendary"] },
          { word: "Piper", clues: ["צלף מרחוק","נזק גבוה","דיוק קריטי","2020","Epic"] },
          { word: "Pam", clues: ["מגדל ריפוי","תמיכה עמדתית","הגנה אזורית","2020","Epic"] },
          { word: "Frank", clues: ["מכה כבדה","הרדמה קצרה","טנק איטי","2020","Epic"] },
          { word: "Bibi", clues: ["נדנוד כדור","דחיפה אחורית","טווח קצר","2021","Epic"] },
          { word: "Bea", clues: ["ירי דביק","פגיעה בראש","דיוק גבוה","2021","Legendary"] },
          { word: "Nani", clues: ["בובה עוקבת","פצצה מדויקת","שליטה מטרה","2021","Legendary"] },
          { word: "Edgar", clues: ["קפיצה אגרוף","חמקני","טווח קצר","2021","Legendary"] },
          { word: "Griff", clues: ["איסוף משאבים","בונוס צוות","תמיכה כלכלית","2021","Epic"] },
          { word: "Grom", clues: ["סינרגיה צוות","תמיכה ניידת","חובה קבוצתית","2021","Epic"] },
          { word: "Bonnie", clues: ["חיזוק נשק","כוח קרוב","תמיכה צוותית","2021","Legendary"] },
          { word: "Gale", clues: ["רוח דוחפת","דחיפת מיקום","בקרת קבוצות","2021","Legendary"] },
          { word: "Colette", clues: ["נזק לפי HP","אנטי-טנק","נזק סלקטיבי","2021","Legendary"] },
          { word: "Belle", clues: ["סימון יריב","ירי חודר","נגד טנקים","2021","Legendary"] },
          { word: "Ash", clues: ["פיצוץ דחיפה","חדירה מהירה","מהירות","2021","Epic"] },
          { word: "Lola", clues: ["שכפול תמיכה","סנכרון","תמיכה צוותית","2021","Epic"] },
          { word: "Sam", clues: ["מכות רצופות","סולו חזק","מהיר","2021","Epic"] },
          { word: "Mandy", clues: ["הטיית יריבים","שליטת מסך","בקרת המון","2021","Legendary"] },
          { word: "Maisie", clues: ["גרירת יריב","שליטה בחובל","קיבוע","2021","Epic"] },
          { word: "Hank", clues: ["שמירה דפנסיבית","עמידה יציבה","חסימת דרכים","2021","Epic"] },
          { word: "Pearl", clues: ["תותח ימי","דחיפה מרחוק","ניתוב טווח","2021","Epic"] },
          { word: "Larry & Lawrie", clues: ["התקפה זוגית","תמיכה זוגית","סינרגיה","2021","Mythic"] },
          { word: "Angelo", clues: ["פיזור יריות","טריקים","התקפה מתעתעת","2021","Mythic"] },
          { word: "Berry", clues: ["ריפוי סביבתי","תמיכה שטח","ריפוי קבוצתי","2021","Epic"] },
          { word: "Shade", clues: ["היעלמות","התקפה פתע","חמקני","2021","Legendary"] },
          { word: "Meeple", clues: ["יוצר יחידות","הצפה שטח","תמיכה","2021","Epic"] },
          { word: "Trunk", clues: ["דחיפה כבדה","הסרת מערכים","מכה קצרה","2021","Epic"] },
          { word: "Mortis", clues: ["נשיכה מחזירה","קפיצה מהירה","חמקני","2018","Mythic"] },
          { word: "Tara", clues: ["משיכת קבוצתית","קלפים לנזק","קסמי שליטה","2018","Super Rare"] },
          { word: "Gene", clues: ["משיכה מרוחקת","תמיכה חטופתית","שליטה יחידנית","2018","Legendary"] },
          { word: "Max", clues: ["מהירות צוות","תנועה מהירה","תמרון","2018","Epic"] },
          { word: "Mr. P", clues: ["סוכנים ניידים","לחץ מתמשך","תמיכה ניידת","2018","Epic"] },
          { word: "Sprout", clues: ["קיר טבעי","חסימת דרכים","טקטיקה","2020","Mythic"] },
          { word: "Byron", clues: ["ריפוי-ורעל","שילוב נזק","תמיכה מרחוק","2020","Mythic"] },
          { word: "Squeak", clues: ["בום דביק","מלכודת שטח","שליטה אזורית","2020","Epic"] },
          { word: "Lou", clues: ["הקפאה אזורית","עיכוב תנועה","קפיאה","2020","Mythic"] },
          { word: "Ruffs", clues: ["פריסת חיילים","חיזוק צוות","טקטיקה","2020","Epic"] },
          { word: "Buzz", clues: ["נחיתת קפיצה","חדירה מהירה","סגנון","2020","Legendary"] },
          { word: "Fang", clues: ["דאש מהיר","נשיכות סדרה","מתקפה ממוקדת","2020","Legendary"] },
          { word: "Eve", clues: ["יוצרת עזר","תמיכה ניידת","סייעת צוות","2020","Epic"] },
          { word: "Janet", clues: ["טקטיקה מהלכים","ניהול כלים","שינוי מהלכים","2020","Epic"] },
          { word: "Otis", clues: ["פלנק מהיר","אש לעקיפה","טקטיקה","2020","Epic"] },
          { word: "Buster", clues: ["פיצוץ קרוב","טנק כבד","מצור","2020","Legendary"] },
          { word: "Gray", clues: ["גמישות משחק","שינוי קרב","מתאים מנוסים","2020","Epic"] },
          { word: "Mico", clues: ["חיזוק מוזיקלי","ריפוי צוות","באמפ תומך","2020","Epic"] },
          { word: "Lily", clues: ["הגנה סביבתית","שדה ריפוי","תמיכה","2020","Epic"] },
          { word: "Clancy", clues: ["רכב מהיר","פריצה לקו","מהירות","2020","Epic"] },
          { word: "Moe", clues: ["נעילת אזור","סגר טקטי","חסימת נתיבים","2020","Epic"] },
          { word: "Kenji", clues: ["דאש חיתוך","שריקה מהירה","פולס מהיר","2020","Epic"] },
          { word: "Juju", clues: ["אאורה מחזקת","בונוס תמיכה","חיזוק צוות","2020","Mythic"] },
          { word: "Buzz Lightyear", clues: ["קולבורציה","יכולות קמפיין","דמות מיוחדת","2020","Mythic"] },
          { word: "Ollie", clues: ["קפיצה מפוצלת","נזק שטח","התשטחות","2020","Epic"] },
          { word: "Lumi", clues: ["ריפוי אור","תמיכה עמידה","שדה שימור","2020","Epic"] },
          { word: "Finx", clues: ["שיבוש תנועות","סינרגיה קבוצתית","שיבוש","2020","Epic"] },
          { word: "Jae-yong", clues: ["דאש מהיר","תקיפה ממוקדת","חיתוך","2020","Epic"] },
          { word: "Kaze", clues: ["רוח מסתערת","חמקני","תקיפה מהירה","2020","Ultra Legendary"] },
          { word: "Alli", clues: ["אאורה צוותית","חיזוק כולל","תמיכה שטח","2020","Mythic"] },
          { word: "Ziggy", clues: ["פיזור פיצוצים","פגיעה מרובה","שליטה שטח","2025","Epic"] },
          { word: "Mina", clues: ["כדורי קשירה","שליטה מרחוק","קיבוע קבוצתי","2025","Mythic"] },
          { word: "Spike", clues: ["קוצים","נזק אזורי","פגיעה מרחבית","2017","Legendary"] },
          { word: "Crow", clues: ["רעל","פגיעה חוזרת","מהיר","2017","Legendary"] },
          { word: "Leon", clues: ["חמקני","פיצוץ פתאומי","התמחות פתע","2017","Legendary"] },
          { word: "Sandy", clues: ["שדה חול","הסוואה","שליטה שטח","2017","Epic"] },
          { word: "Surge", clues: ["שדרוג עצמי","שינוי כוח","מטפס כוח","2019","Mythic"] },
          { word: "Amber", clues: ["להבה","נזק מתמשך","שמירה שטח","2020","Legendary"] },
          { word: "Kit", clues: ["רובוט קטן","מהירות פיצוץ","ניידות","2021","Legendary"] },
          { word: "Meg", clues: ["מכונה ענקית","שדרוג כוח","כוח פיזי","2022","Legendary"] },
          { word: "Melodie", clues: ["לחני ריפוי","ריפוי צוות","תמיכה מוזיקלית","2022","Epic"] },
          { word: "Charlie", clues: ["התקפה מרחבית","שליטה שטח","מהלכים גדולים","2023","Epic"] },
          { word: "Chuck", clues: ["ריצה מהירה","פיצול התקפה","דחיפה מהירה","2023","Epic"] },
          { word: "Chester", clues: ["תמיכה מהירה","חיבור צוות","העברת עזרה","2023","Epic"] },
          { word: "Doug", clues: ["חסימת פתח","הגנה ניידת","מגן אזורי","2023","Epic"] },
          { word: "Draco", clues: ["נשיפת אש","תקיפה מעופפת","פגיעה ממעוף","2023","Legendary"] },
          { word: "R-T", clues: ["מכונה מאומנת","תמיכה אוטונומית","חזק קבוצות","2023","Epic"] },
          { word: "Cordelius", clues: ["פטריות תוקף","תמרון מהיר","תקיפה טעונה","2023","Legendary"] },
          { word: "Willow", clues: ["עץ מהפנט","חסימת ראות","טקטיקה הסחה","2023","Mythic"] }
      ]      
  };

  // --- נתונים למשחק: קטגוריה ומילים (Category & Words) ---
  const DATA_CategoryNWord = {

      // ==========================================
      // 1. סיווג ראשי
      // ==========================================

      "אדם/אישיות": [
          { "word": "אלברט איינשטיין" },
          { "word": "מארק צוקרברג" },
          { "word": "בר רפאלי" },
          { "word": "גולדה מאיר" },
          { "word": "דוד בן גוריון" },
          { "word": "בנימין נתניהו" },
          { "word": "יוסיין בולט" },
          { "word": "כריסטיאנו רונאלדו" },
          { "word": "ליאו מסי" },
          { "word": "מוחמד סלאח" },
          { "word": "ביונסה" },
          { "word": "טיילור סוויפט" },
          { "word": "שון מנדז" },
          { "word": "ברונו מארס" },
          { "word": "אלון מאסק" },
          { "word": "סטיב ג'ובס" },
          { "word": "ביל גייטס" },
          { "word": "גל גדות" },
          { "word": "נטע ברזילי" },
          { "word": "עומר אדם" },
          { "word": "סטטיק ובן אל" },
          { "word": "נועה קירל" },
          { "word": "עדן חסון" },
          { "word": "משה פרץ" },
          { "word": "איל גולן" },
          { "word": "ריטה" },
          { "word": "עופרה חזה" },
          { "word": "מייקל ג'קסון" },
          { "word": "אלביס פרסלי" },
          { "word": "ג'סטין ביבר" },
          { "word": "ריהאנה" },
          { "word": "דרייק" },
          { "word": "אמינם" },
          { "word": "קים קרדשיאן" },
          { "word": "דונלד טראמפ" },
          { "word": "ברק אובמה" },
          { "word": "ולדימיר פוטין" },
          { "word": "וולודימיר זלנסקי" },
          { "word": "אנג'לינה ג'ולי" },
          { "word": "טום קרוז" },
          { "word": "ליאונרדו דיקפריו" },
          { "word": "ג'וני דפ" },
          { "word": "וויל סמית'" },
          { "word": "דוויין ג'ונסון" },
          { "word": "מיילי סיירוס" },
          { "word": "סלינה גומז" },
          { "word": "סלבדור דאלי" },
          { "word": "לאונרדו דה וינצ'י" },
          { "word": "מיכלאנג'לו" }
      ],

      "דמות בדיונית": [
          { "word": "הארי פוטר" },
          { "word": "שרלוק" },
          { "word": "שרק" },
          { "word": "פלאש" },
          { "word": "סופרמן" },
          { "word": "איירון מן" },
          { "word": "נמו" },
          { "word": "ספיידרמן" },
          { "word": "באטמן" },
          { "word": "כיפה אדומה" },
          { "word": "מלך האריות" },
          { "word": "ממלכת הקרח" },
          { "word": "פיטר פן" },
          { "word": "גודזילה" },
          { "word": "קינג קונג" },
          { "word": "מריו" },
          { "word": "סוניק" },
          { "word": "קירבי" },
          { "word": "Archers" }, { "word": "Archer Queen" }, { "word": "Baby Dragon" }, { "word": "Balloon" }, { "word": "Bandit" },
          { "word": "Barbarians" }, { "word": "Bats" }, { "word": "Battle Healer" }, { "word": "Battle Ram" }, { "word": "Berserker" },
          { "word": "Bomber" }, { "word": "Boss Bandit" }, { "word": "Bowler" }, { "word": "Cannon Cart" }, { "word": "Dark Prince" },
          { "word": "Dart Goblin" }, { "word": "Electro Dragon" }, { "word": "Electro Giant" }, { "word": "Electro Spirit" }, { "word": "Electro Wizard" },
          { "word": "Elite Barbarians" }, { "word": "Elixir Golem" }, { "word": "Executioner" }, { "word": "Firecracker" }, { "word": "Fire Spirit" },
          { "word": "Fisherman" }, { "word": "Flying Machine" }, { "word": "Furnace" }, { "word": "Giant" }, { "word": "Giant Skeleton" },
          { "word": "Goblin Gang" }, { "word": "Goblin Demolisher" }, { "word": "Goblin Giant" }, { "word": "Goblin Machine" }, { "word": "Goblins" },
          { "word": "Goblinstein" }, { "word": "Golden Knight" }, { "word": "Golem" }, { "word": "Guards" }, { "word": "Hog Rider" },
          { "word": "Hunter" }, { "word": "Heal Spirit" }, { "word": "Ice Golem" }, { "word": "Ice Spirit" }, { "word": "Ice Wizard" },
          { "word": "Inferno Dragon" }, { "word": "Knight" }, { "word": "Lava Hound" }, { "word": "Little Prince" }, { "word": "Lumberjack" },
          { "word": "Magic Archer" }, { "word": "Mega Knight" }, { "word": "Mega Minion" }, { "word": "Mighty Miner" }, { "word": "Miner" },
          { "word": "Mini P.E.K.K.A." }, { "word": "Minion Horde" }, { "word": "Minions" }, { "word": "Monk" }, { "word": "Mother Witch" },
          { "word": "Musketeer" }, { "word": "Night Witch" }, { "word": "P.E.K.K.A." }, { "word": "Phoenix" }, { "word": "Prince" },
          { "word": "Princess" }, { "word": "Ram Rider" }, { "word": "Rascals" }, { "word": "Royal Ghost" }, { "word": "Royal Giant" },
          { "word": "Royal Hogs" }, { "word": "Royal Recruits" }, { "word": "Rune Giant" }, { "word": "Skeleton Army" }, { "word": "Skeleton Barrel" },
          { "word": "Skeleton Dragons" }, { "word": "Skeleton King" }, { "word": "Skeletons" }, { "word": "Sparky" }, { "word": "Spear Goblins" },
          { "word": "Spirit Empress" }, { "word": "Suspicious Bush" }, { "word": "Three Musketeers" }, { "word": "Valkyrie" }, { "word": "Wall Breakers" },
          { "word": "Witch" }, { "word": "Wizard" }, { "word": "Zappies" }, { "word": "Cannoneer" }, { "word": "Dagger Duchess" }, 
          { "word": "Royal Chef" }, { "word": "Tower Princess" },
          { "word": "Shelly" }, { "word": "Nita" }, { "word": "Bo" }, { "word": "Gus" }, { "word": "Colt" }, { "word": "Bull" },
          { "word": "Brock" }, { "word": "El Primo" }, { "word": "Barley" }, { "word": "Poco" }, { "word": "Rosa" }, { "word": "Jessie" },
          { "word": "Dynamike" }, { "word": "Tick" }, { "word": "8-Bit" }, { "word": "Rico" }, { "word": "Darryl" }, { "word": "Penny" },
          { "word": "Carl" }, { "word": "Jacky" }, { "word": "Emz" }, { "word": "Stu" }, { "word": "Piper" }, { "word": "Pam" },
          { "word": "Frank" }, { "word": "Bibi" }, { "word": "Bea" }, { "word": "Nani" }, { "word": "Edgar" }, { "word": "Griff" },
          { "word": "Grom" }, { "word": "Bonnie" }, { "word": "Gale" }, { "word": "Colette" }, { "word": "Belle" }, { "word": "Ash" },
          { "word": "Lola" }, { "word": "Sam" }, { "word": "Mandy" }, { "word": "Maisie" }, { "word": "Hank" }, { "word": "Pearl" },
          { "word": "Larry & Lawrie" }, { "word": "Angelo" }, { "word": "Berry" }, { "word": "Shade" }, { "word": "Meeple" }, { "word": "Trunk" },
          { "word": "Mortis" }, { "word": "Tara" }, { "word": "Gene" }, { "word": "Max" }, { "word": "Mr. P" }, { "word": "Sprout" },
          { "word": "Byron" }, { "word": "Squeak" }, { "word": "Lou" }, { "word": "Ruffs" }, { "word": "Buzz" }, { "word": "Fang" },
          { "word": "Eve" }, { "word": "Janet" }, { "word": "Otis" }, { "word": "Buster" }, { "word": "Gray" }, { "word": "Mico" },
          { "word": "Lily" }, { "word": "Clancy" }, { "word": "Moe" }, { "word": "Kenji" }, { "word": "Juju" }, { "word": "Buzz Lightyear" },
          { "word": "Ollie" }, { "word": "Lumi" }, { "word": "Finx" }, { "word": "Jae-yong" }, { "word": "Kaze" }, { "word": "Alli" },
          { "word": "Ziggy" }, { "word": "Mina" }, { "word": "Spike" }, { "word": "Crow" }, { "word": "Leon" }, { "word": "Sandy" },
          { "word": "Surge" }, { "word": "Amber" }, { "word": "Kit" }, { "word": "Meg" }, { "word": "Melodie" }, { "word": "Charlie" },
          { "word": "Chuck" }, { "word": "Chester" }, { "word": "Doug" }, { "word": "Draco" }, { "word": "R-T" }, { "word": "Cordelius" },
          { "word": "Willow" }
      ],

      "חפץ דומם": [
          { "word": "תפוח" },
          { "word": "כיסא" },
          { "word": "טלפון" },
          { "word": "מחשב" },
          { "word": "שולחן" },
          { "word": "כוס" },
          { "word": "בקבוק" },
          { "word": "מפתח" },
          { "word": "שלט" },
          { "word": "שעון" },
          { "word": "ספר" },
          { "word": "עט" },
          { "word": "עפרון" },
          { "word": "מחק" },
          { "word": "קלמר" },
          { "word": "מספריים" },
          { "word": "מסרק" },
          { "word": "מברשת שיניים" },
          { "word": "משחת שיניים" },
          { "word": "סבון" },
          { "word": "מגבת" },
          { "word": "מטען" },
          { "word": "אוזניות" },
          { "word": "מקלדת" },
          { "word": "עכבר" },
          { "word": "מראה" },
          { "word": "סכין" },
          { "word": "מזלג" },
          { "word": "כף" },
          { "word": "קערה" },
          { "word": "צלחת" },
          { "word": "מחבת" },
          { "word": "סיר" },
          { "word": "קומקום" },
          { "word": "מקרר" },
          { "word": "תנור" },
          { "word": "מיקרוגל" },
          { "word": "כפפה" },
          { "word": "נעל" },
          { "word": "גרב" },
          { "word": "מטרייה" },
          { "word": "תיק" },
          { "word": "ארנק" },
          { "word": "ממחטה" },
          { "word": "מגב" },
          { "word": "שואב אבק" },
          { "word": "טלויזיה" },
          { "word": "מנורה" },
          { "word": "וילון" },
          { "word": "מחשב" },
          { "word": "חיישן" },
          { "word": "טלפון חכם" },
          { "word": "טלוויזיה" },
          { "word": "רובוט" },
          { "word": "שרת" },
          { "word": "מסך מגע" },
          { "word": "מצלמה" },
          { "word": "שבב" },
          { "word": "מטען" },
          { "word": "סוללה" },
          { "word": "כבל" },
          { "word": "מספריים" },
          { "word": "מדפסת" },
          { "word": "לייזר" },
          { "word": "טאבלט" },
          { "word": "דיסק קשיח" },
          { "word": "נתב" },
          { "word": "מיקרוסקופ" },
          { "word": "טלסקופ" },
          { "word": "רדיו" },
          { "word": "קונסולה" },
          { "word": "משדר" },
          { "word": "חיישן טמפרטורה" },
          { "word": "דינמו" },
          { "word": "מנוע" },
          { "word": "ג'ויסטיק" },
          { "word": "מצלמת רשת" },
          { "word": "כבל USB" },
          { "word": "מודם" },
          { "word": "סנסור חיישן" },
          { "word": "מעבד" }
      ],

      "בעל חיים": [
          { "word": "חתול" },
          { "word": "כלב" },
          { "word": "אריה" },
          { "word": "פיל" },
          { "word": "ג'ירפה" },
          { "word": "דולפין" },
          { "word": "ציפור" },
          { "word": "דבורה" },
          { "word": "נחש" },
          { "word": "עקרב" },
          { "word": "קוף" },
          { "word": "דוב" },
          { "word": "זברה" },
          { "word": "סוס" },
          { "word": "חמור" },
          { "word": "עז" },
          { "word": "כבש" },
          { "word": "תרנגול" },
          { "word": "תרנגולת" },
          { "word": "ברווז" },
          { "word": "צב" },
          { "word": "נמר" },
          { "word": "פינגווין" },
          { "word": "ינשוף" },
          { "word": "חמור בר" },
          { "word": "עורב" },
          { "word": "גמל" },
          { "word": "דג זהב" },
          { "word": "תוכי" },
          { "word": "טיגריס" },
          { "word": "לוויתן" }, 
          { "word": "כלב ים" },
          { "word": "נמר שלג" },
          { "word": "שפן" },
          { "word": "אוגר" },
          { "word": "עכבר" },
          { "word": "גחלילית" }, 
          { "word": "פרפר" },
          { "word": "חיפושית" }
      ],

      "מזון/משקה": [
          { "word": "שוקולד" },
          { "word": "קפה" },
          { "word": "לחם" },
          { "word": "חלב" },
          { "word": "גבינה" },
          { "word": "חביתה" },
          { "word": "פיצה" },
          { "word": "המבורגר" },
          { "word": "צ'יפס" },
          { "word": "סושי" },
          { "word": "פלאפל" },
          { "word": "שווארמה" },
          { "word": "חומוס" },
          { "word": "טחינה" },
          { "word": "קולה" },
          { "word": "מים" },
          { "word": "מיץ תפוזים" },
          { "word": "תה" },
          { "word": "ביסלי" },
          { "word": "במבה" },
          { "word": "עוגה" },
          { "word": "עוגיות" },
          { "word": "גלידה" },
          { "word": "סנדוויץ'" },
          { "word": "קורנפלקס" },
          { "word": "פסטה" },
          { "word": "בורקס" },
          { "word": "קרואסון" },
          { "word": "פיתה" },
          { "word": "עוגת גבינה" },
          { "word": "סלט" },
          { "word": "חסה" },
          { "word": "עגבניה" },
          { "word": "מלפפון" }, { "word": "בצל" },
          { "word": "שוקו" },
          { "word": "נקניקיה" },
          { "word": "סטייק" },
          { "word": "קבב" }, { "word": "שקשוקה" },
          { "word": "מרק" },
          { "word": "שוקולד חלב" },
          { "word": "ביצה קשה" },
          { "word": "פיתה דרוזית" },
          { "word": "עוגת שוקולד" },
          { "word": "אורז" },
          { "word": "קוסקוס" },
          { "word": "פתיתים" },
          { "word": "שניצל" },
          { "word": "עוגת גבינה אפויה" },
          { "word": "באגט" },
          { "word": "קרמבו" },
          { "word": "פופקורן" }
      ],

      "מקום/מדינה": [
          { "word": "ישראל" },
          { "word": "צרפת" },
          { "word": "ארצות הברית" },
          { "word": "אנגליה" },
          { "word": "גרמניה" },
          { "word": "איטליה" },
          { "word": "ספרד" },
          { "word": "יפן" },
          { "word": "סין" },
          { "word": "קנדה" },
          { "word": "אוסטרליה" },
          { "word": "ברזיל" },
          { "word": "מקסיקו" },
          { "word": "הודו" },
          { "word": "תאילנד" },
          { "word": "רוסיה" },
          { "word": "מצרים" },
          { "word": "דרום אפריקה" },
          { "word": "יוון" },
          { "word": "שוודיה" },
          { "word": "נורווגיה" },
          { "word": "פולין" },
          { "word": "הולנד" },
          { "word": "בלגיה" },
          { "word": "שוויץ" },
          { "word": "אוסטריה" },
          { "word": "צ'ילה" },
          { "word": "ארגנטינה" },
          { "word": "קולומביה" },
          { "word": "קובה" },
          { "word": "פינלנד" },
          { "word": "דנמרק" },
          { "word": "איסלנד" },
          { "word": "וייטנאם" },
          { "word": "מלזיה" },
          { "word": "אינדונזיה" },
          { "word": "דרום קוריאה" },
          { "word": "צפון קוריאה" },
          { "word": "סינגפור" },
          { "word": "ניו זילנד" },
          { "word": "פקיסטן" },
          { "word": "אירלנד" },
          { "word": "פורטוגל" },
          { "word": "הונגריה" },
          { "word": "צ'כיה" }
      ],

      "מותג/חברה": [
          { "word": "נייק" },
          { "word": "אפל" },
          { "word": "אדידס" },
          { "word": "קוקה קולה" },
          { "word": "טויוטה" },
          { "word": "סמסונג" },
          { "word": "מקדונלד'ס" },
          { "word": "סטארבקס" },
          { "word": "לואי ויטון" },
          { "word": "גוגל" },
          { "word": "מייקרוסופט" },
          { "word": "פיצה האט" },
          { "word": "דנונה" },
          { "word": "הונדה" },
          { "word": "לגו" },
          { "word": "רולקס" },
          { "word": "אינטל" },
          { "word": "סוני" },
          { "word": "קנון" },
          { "word": "נסטלה" },
          { "word": "טום פורד" },
          { "word": "פפסי" },
          { "word": "דיזל" },
          { "word": "שופרסל" },
          { "word": "עלית" },
          { "word": "קוקה קולה זירו" },
          { "word": "בוש" },
          { "word": "לנובו" },
          { "word": "הילטי" },
          { "word": "ריבוק" },
          { "word": "פוקס" },
          { "word": "ג'יפ" },
          { "word": "פורד" },
          { "word": "טוי" },
          { "word": "פנדורה" },
          { "word": "ברבי" },
          { "word": "ראי-בן" },
          { "word": "לדורée" },
          { "word": "שאנל" },
          { "word": "לוריאל" },
          { "word": "וואטסאפ" },
          { "word": "אובר" },
          { "word": "גוגל מפות" },
          { "word": "אמזון" }
      ],

      // ==========================================
      // 2. תפקידים בקרב ובמשחק
      // ==========================================

      "Tank": [
          { "word": "Boss Bandit"},
          { "word": "Bowler"},
          { "word": "Electro Giant"},
          { "word": "Elite Barbarians"},
          { "word": "Elixir Golem"},
          { "word": "Giant Skeleton"},
          { "word": "Goblin Giant"},
          { "word": "Goblin Machine"},
          { "word": "Golem"},
          { "word": "Goblinstein"},
          { "word": "Knight"},
          { "word": "Lava Hound"},
          { "word": "Skeleton King"},
          { "word": "Sparky"},
          { "word": "Valkyrie"},
          { "word": "Mega Knight"},
          { "word": "P.E.K.K.A."},
          { "word": "Royal Giant"},
          { "word": "Giant"},
          { "word": "Monk"},
          { "word": "Bull"},
          { "word": "El Primo"},
          { "word": "Rosa"},
          { "word": "8-Bit"},
          { "word": "Jacky"},
          { "word": "Pam"},
          { "word": "Frank"},
          { "word": "Bibi"},
          { "word": "Ash"},
          { "word": "Buster"},
          { "word": "Meg"},
          { "word": "Hank"},
          { "word": "Sam"},
          { "word": "Draco"}
      ],

      "Damage Dealer": [
          { "word": "Balloon"},
          { "word": "Battle Ram"},
          { "word": "Boss Bandit"},
          { "word": "Electro Giant"},
          { "word": "Elite Barbarians"},
          { "word": "Giant Skeleton"},
          { "word": "Giant"},
          { "word": "Hog Rider"},
          { "word": "Golem"},
          { "word": "Goblinstein"},
          { "word": "Hunter"},
          { "word": "Inferno Dragon"},
          { "word": "Mega Knight"},
          { "word": "Mighty Miner"},
          { "word": "Mini P.E.K.K.A."},
          { "word": "Minion Horde"},
          { "word": "P.E.K.K.A."},
          { "word": "Prince"},
          { "word": "Ram Rider"},
          { "word": "Sparky"},
          { "word": "Three Musketeers"},
          { "word": "X-Bow"},
          { "word": "Inferno Tower"},
          { "word": "Rocket"},
          { "word": "Colt"},
          { "word": "Rico"},
          { "word": "Spike"},
          { "word": "Nani"},
          { "word": "Lola"},
          { "word": "Griff"},
          { "word": "Clancy"},
          { "word": "Pearl"},
          { "word": "Chester"},
          { "word": "Surge"},
          { "word": "Colette"},
          { "word": "Eve"},
          { "word": "R-T"}
      ],

      "Support": [
          { "word": "Archers"},
          { "word": "Battle Healer"},
          { "word": "Bats"},
          { "word": "Bomber"},
          { "word": "Dart Goblin"},
          { "word": "Executioner"},
          { "word": "Firecracker"},
          { "word": "Fisherman"},
          { "word": "Goblins"},
          { "word": "Goblin Gang"},
          { "word": "Guards"},
          { "word": "Heal Spirit"},
          { "word": "Magic Archer"},
          { "word": "Monk"},
          { "word": "Rune Giant"},
          { "word": "Wizard"},
          { "word": "Ice Wizard"},
          { "word": "Zappies"},
          { "word": "Elixir Collector"},
          { "word": "Cannoneer" },
          { "word": "Dagger Duchess" },
          { "word": "Royal Chef" },
          { "word": "Tower Princess" },
          { "word": "Mother Witch" },
          { "word": "Poco"},
          { "word": "Pam"},
          { "word": "Max"},
          { "word": "Byron"},
          { "word": "Ruffs"},
          { "word": "Gus"},
          { "word": "Gray"},
          { "word": "Doug"},
          { "word": "Kit"},
          { "word": "Berry"}
      ],

      "Healer": [
          { "word": "Battle Healer" },
          { "word": "Heal Spirit" },
          { "word": "Poco" },
          { "word": "Pam" },
          { "word": "Byron" },
          { "word": "Gus" },
          { "word": "Berry" }
      ],

      "Sniper/Ranged": [
          { "word": "Piper" },
          { "word": "Brock" },
          { "word": "Princess" },
          { "word": "Magic Archer" },
          { "word": "Musketeer" },
          { "word": "Dart Goblin" },
          { "word": "Belle" },
          { "word": "Bea" },
          { "word": "Flying Machine" },
          { "word": "Firecracker" },
          { "word": "Spear Goblins" },
          { "word": "Archer Queen" },
          { "word": "Mandy" },
          { "word": "Maisie" },
          { "word": "Angelo" },
          { "word": "Nani" },
          { "word": "Janet" }
      ],

      "Melee": [
          { "word": "Knight" },
          { "word": "Valkyrie" },
          { "word": "Edgar" },
          { "word": "Mortis" },
          { "word": "El Primo" },
          { "word": "Mini P.E.K.K.A" },
          { "word": "Prince" },
          { "word": "Elite Barbarians" },
          { "word": "Barbarians" },
          { "word": "Royal Ghost" },
          { "word": "Bandit" },
          { "word": "Dark Prince" },
          { "word": "Lumberjack" },
          { "word": "Fisherman" },
          { "word": "Golden Knight" },
          { "word": "Fang" },
          { "word": "Buzz" },
          { "word": "Kenji" },
          { "word": "Sam" },
          { "word": "Mico" },
          { "word": "Lily" }
      ],

      "Thrower/Artillery": [
          { "word": "Barley" },
          { "word": "Dynamike" },
          { "word": "Tick" },
          { "word": "Sprout" },
          { "word": "Grom" },
          { "word": "Miner" },
          { "word": "Goblin Barrel" },
          { "word": "Bomber" },
          { "word": "Mortar" },
          { "word": "Larry & Lawrie" },
          { "word": "Willow" },
          { "word": "Penny" }
      ],

      "Assassin": [
          { "word": "Leon" },
          { "word": "Crow" },
          { "word": "Mortis" },
          { "word": "Bandit" },
          { "word": "Royal Ghost" },
          { "word": "Stu" },
          { "word": "Cordelius" },
          { "word": "Miner" },
          { "word": "Buzz" },
          { "word": "Fang" },
          { "word": "Edgar" },
          { "word": "Lily" },
          { "word": "Shade" },
          { "word": "Mico" },
          { "word": "Melodie" }
      ],

      "Spawner": [
          { "word": "Witch" },
          { "word": "Night Witch" },
          { "word": "Furnace" },
          { "word": "Goblin Hut" },
          { "word": "Tombstone" },
          { "word": "Eve" },
          { "word": "Mr. P" },
          { "word": "Barbarian Hut" },
          { "word": "Goblin Drill" },
          { "word": "Mother Witch" },
          { "word": "Skeleton King" },
          { "word": "Nita" },
          { "word": "Jessie" },
          { "word": "Penny" },
          { "word": "Tara" }
      ],

      "Controller": [
          { "word": "Lou" },
          { "word": "Gale" },
          { "word": "Sandy" },
          { "word": "Emz" },
          { "word": "Ice Wizard" },
          { "word": "Tornado" },
          { "word": "The Log" },
          { "word": "Bowler" },
          { "word": "Executioner" },
          { "word": "Fisherman" },
          { "word": "Gene" },
          { "word": "Squeak" },
          { "word": "Otis" },
          { "word": "Charlie" },
          { "word": "Willow" },
          { "word": "Moe" }
      ],

      // ==========================================
      // 3. נדירות ויוקרה
      // ==========================================

      "Common/Starter": [
          { "word": "Shelly" },
          { "word": "Nita" },
          { "word": "Colt" },
          { "word": "Knight" },
          { "word": "Archers" },
          { "word": "Skeletons" },
          { "word": "לחם" },
          { "word": "מים" },
          { "word": "Goblins" },
          { "word": "Spear Goblins" },
          { "word": "Barbarians" },
          { "word": "Minions" },
          { "word": "Zap" },
          { "word": "Arrows" },
          { "word": "Bull" },
          { "word": "Brock" },
          { "word": "El Primo" },
          { "word": "Barley" },
          { "word": "Poco" },
          { "word": "Rosa" }
      ],

      "Rare": [
          { "word": "Musketeer" },
          { "word": "Hog Rider" },
          { "word": "Valkyrie" },
          { "word": "El Primo" },
          { "word": "Barley" },
          { "word": "Poco" },
          { "word": "Giant" },
          { "word": "Mini P.E.K.K.A." },
          { "word": "Fireball" },
          { "word": "Wizard" },
          { "word": "Gus" },
          { "word": "Jessie" },
          { "word": "Dynamike" },
          { "word": "Tick" },
          { "word": "8-Bit" },
          { "word": "Rico" },
          { "word": "Darryl" },
          { "word": "Penny" },
          { "word": "Carl" },
          { "word": "Jacky" }
      ],

      "Epic": [
          { "word": "P.E.K.K.A" },
          { "word": "Prince" },
          { "word": "Baby Dragon" },
          { "word": "Piper" },
          { "word": "Frank" },
          { "word": "Bibi" },
          { "word": "Witch" },
          { "word": "Skeleton Army" },
          { "word": "Golem" },
          { "word": "X-Bow" },
          { "word": "Pam" },
          { "word": "Bea" },
          { "word": "Nani" },
          { "word": "Edgar" },
          { "word": "Griff" },
          { "word": "Grom" },
          { "word": "Bonnie" },
          { "word": "Gale" },
          { "word": "Colette" },
          { "word": "Belle" },
          { "word": "Ash" },
          { "word": "Lola" },
          { "word": "Sam" },
          { "word": "Mandy" },
          { "word": "Maisie" },
          { "word": "Hank" },
          { "word": "Pearl" },
          { "word": "Larry & Lawrie" },
          { "word": "Angelo" },
          { "word": "Berry" }
      ],

      "Mythic": [
          { "word": "Mortis" },
          { "word": "Tara" },
          { "word": "Gene" },
          { "word": "Max" },
          { "word": "Byron" },
          { "word": "Mr. P" },
          { "word": "Sprout" },
          { "word": "Squeak" },
          { "word": "Lou" },
          { "word": "Ruffs" },
          { "word": "Buzz" },
          { "word": "Fang" },
          { "word": "Eve" },
          { "word": "Janet" },
          { "word": "Otis" },
          { "word": "Buster" },
          { "word": "Gray" },
          { "word": "Mico" },
          { "word": "Lily" },
          { "word": "Clancy" },
          { "word": "Moe" },
          { "word": "Juju" }
      ],

      "Legendary": [
          { "word": "Leon" },
          { "word": "Crow" },
          { "word": "Spike" },
          { "word": "Meg" },
          { "word": "Princess" },
          { "word": "The Log" },
          { "word": "Lava Hound" },
          { "word": "ליאו מסי" },
          { "word": "מייקל ג'קסון" },
          { "word": "Ice Wizard" },
          { "word": "Miner" },
          { "word": "Sparky" },
          { "word": "Electro Wizard" },
          { "word": "Inferno Dragon" },
          { "word": "Night Witch" },
          { "word": "Royal Ghost" },
          { "word": "Magic Archer" },
          { "word": "Mother Witch" },
          { "word": "Sandy" },
          { "word": "Amber" },
          { "word": "Chester" },
          { "word": "Cordelius" },
          { "word": "Surge" },
          { "word": "Kit" },
          { "word": "Draco" },
          { "word": "Kenji" }
      ],

      "Champion": [
          { "word": "Archer Queen" },
          { "word": "Golden Knight" },
          { "word": "Skeleton King" },
          { "word": "Mighty Miner" },
          { "word": "Little Prince" },
          { "word": "Monk" },
          { "word": "Goblinstein" }
      ],

      "יוקרה/פרימיום": [
          { "word": "רולקס" },
          { "word": "פרארי" },
          { "word": "אייפון" },
          { "word": "לואי ויטון" },
          { "word": "טסלה" }
      ],

      // ==========================================
      // 4. אלמנטים וכוחות
      // ==========================================

      "אש/שרפה": [
          { "word": "Wizard" },
          { "word": "Amber" },
          { "word": "Baby Dragon" },
          { "word": "Inferno Tower" },
          { "word": "Fire Spirit" },
          { "word": "גפרור" },
          { "word": "דרקון" },
          { "word": "Inferno Dragon" },
          { "word": "Firecracker" },
          { "word": "Phoenix" },
          { "word": "Furnace" },
          { "word": "Lava Hound" },
          { "word": "Fireball" },
          { "word": "Pearl" },
          { "word": "Stewie (Stu - Fire Skin)" }
      ],

      "קרח/קיפאון": [
          { "word": "Ice Wizard" },
          { "word": "Lou" },
          { "word": "Gale" },
          { "word": "Freeze" },
          { "word": "Ice Spirit" },
          { "word": "גלידה" },
          { "word": "מקרר" },
          { "word": "Ice Golem" },
          { "word": "Giant Snowball" },
          { "word": "Frost Queen Amber" }
      ],

      "חשמל": [
          { "word": "Electro Wizard" },
          { "word": "Electro Giant" },
          { "word": "Sparky" },
          { "word": "Tesla" },
          { "word": "Pikachu" },
          { "word": "מטען" },
          { "word": "ברק" },
          { "word": "Electro Dragon" },
          { "word": "Electro Spirit" },
          { "word": "Zappies" },
          { "word": "Lightning" },
          { "word": "Zap" },
          { "word": "Belle" },
          { "word": "Meg" },
          { "word": "Surge" }
      ],

      "רעל/טוקסיק": [
          { "word": "Crow" },
          { "word": "Poison" },
          { "word": "Byron" },
          { "word": "Willow" },
          { "word": "נחש" },
          { "word": "עקרב" },
          { "word": "Emz" },
          { "word": "Angelo" },
          { "word": "Eve" }
      ],

      "אדמה/טבע": [
          { "word": "Sprout" },
          { "word": "Rosa" },
          { "word": "The Log" },
          { "word": "עץ" },
          { "word": "פרח" },
          { "word": "Goblin Giant" },
          { "word": "Dart Goblin" },
          { "word": "Nita" },
          { "word": "Bo" },
          { "word": "Bea" },
          { "word": "Lily" },
          { "word": "Cordelius" }
      ],

      "קסם/כישוף": [
          { "word": "Witch" },
          { "word": "Wizard" },
          { "word": "Magic Archer" },
          { "word": "Gene" },
          { "word": "הארי פוטר" },
          { "word": "מטאטא" },
          { "word": "Night Witch" },
          { "word": "Mother Witch" },
          { "word": "Ice Wizard" },
          { "word": "Tara" },
          { "word": "Sandy" },
          { "word": "Chester" }
      ],

      "טכנולוגיה/רובוטיקה": [
          { "word": "P.E.K.K.A" },
          { "word": "Surge" },
          { "word": "8-Bit" },
          { "word": "Sparky" },
          { "word": "Rico" },
          { "word": "מחשב" },
          { "word": "אייפון" },
          { "word": "אלון מאסק" },
          { "word": "Mini P.E.K.K.A." },
          { "word": "Flying Machine" },
          { "word": "Goblin Machine" },
          { "word": "Zappies" },
          { "word": "Barley" },
          { "word": "Darryl" },
          { "word": "Carl" },
          { "word": "Tick" },
          { "word": "Nani" },
          { "word": "Stu" },
          { "word": "Meg" },
          { "word": "R-T" },
          { "word": "Pearl" },
          { "word": "Larry & Lawrie" }
      ],

      // ==========================================
      // 5. מאפיינים פיזיים
      // ==========================================

      "מעופף/אווירי": [
          { "word": "Baby Dragon" },
          { "word": "Minions" },
          { "word": "Balloon" },
          { "word": "Lava Hound" },
          { "word": "Janet" },
          { "word": "מטוס" },
          { "word": "ציפור" },
          { "word": "Inferno Dragon" },
          { "word": "Electro Dragon" },
          { "word": "Skeleton Dragons" },
          { "word": "Bats" },
          { "word": "Minion Horde" },
          { "word": "Phoenix" },
          { "word": "Flying Machine" },
          { "word": "Eve" },
          { "word": "Mico" }
      ],

      "מהיר מאוד": [
          { "word": "Max" },
          { "word": "Leon" },
          { "word": "Hog Rider" },
          { "word": "The Flash" },
          { "word": "פרארי" },
          { "word": "יוסיין בולט" },
          { "word": "Elite Barbarians" },
          { "word": "Lumberjack" },
          { "word": "Wall Breakers" },
          { "word": "Crow" },
          { "word": "Mortis" },
          { "word": "Stu" },
          { "word": "Melodie" }
      ],

      "איטי/כבד": [
          { "word": "Golem" },
          { "word": "Giant" },
          { "word": "P.E.K.K.A" },
          { "word": "8-Bit" },
          { "word": "צב" },
          { "word": "Lava Hound" },
          { "word": "Electro Giant" },
          { "word": "Giant Skeleton" },
          { "word": "Sparky" },
          { "word": "Frank" }
      ],

      "Swarm": [
          { "word": "Skeleton Army" },
          { "word": "Minion Horde" },
          { "word": "Goblin Gang" },
          { "word": "Rascals" },
          { "word": "נמלה" },
          { "word": "אורז" },
          { "word": "Minions" },
          { "word": "Bats" },
          { "word": "Barbarians" },
          { "word": "Royal Hogs" },
          { "word": "Royal Recruits" },
          { "word": "Goblins" },
          { "word": "Spear Goblins" }
      ],

      "ענקי/גדול": [
          { "word": "Giant" },
          { "word": "Royal Giant" },
          { "word": "Electro Giant" },
          { "word": "Frank" },
          { "word": "פיל" },
          { "word": "בניין" },
          { "word": "Golem" },
          { "word": "P.E.K.K.A." },
          { "word": "Mega Knight" },
          { "word": "Goblin Giant" },
          { "word": "El Primo" },
          { "word": "Ash" },
          { "word": "Hank" },
          { "word": "Draco" }
      ],

      "בלתי נראה/חמקמק": [
          { "word": "Leon" },
          { "word": "Royal Ghost" },
          { "word": "Sandy" },
          { "word": "אוויר" },
          { "word": "רוח רפאים" },
          { "word": "Shade" },
          { "word": "Kit" },
          { "word": "Lily" }
      ],

      "עשוי מתכת": [
          { "word": "P.E.K.K.A" },
          { "word": "Sparky" },
          { "word": "מכונית" },
          { "word": "סיר" },
          { "word": "רובוט" },
          { "word": "Mega Knight" },
          { "word": "Mini P.E.K.K.A." },
          { "word": "Flying Machine" },
          { "word": "Cannon Cart" },
          { "word": "Rico" },
          { "word": "Darryl" },
          { "word": "Carl" },
          { "word": "Nani" },
          { "word": "Meg" },
          { "word": "Surge" }
      ],

      "עשוי עץ": [
          { "word": "The Log" },
          { "word": "Dart Goblin" },
          { "word": "שולחן" },
          { "word": "עיפרון" },
          { "word": "עץ" },
          { "word": "Battle Ram" },
          { "word": "Flying Machine" },
          { "word": "Goblin Hut" }
      ],

      // ==========================================
      // 6. הקשר ושימוש
      // ==========================================

      "בית/סלון/מטבח": [
          { "word": "מקרר" },
          { "word": "טלוויזיה" },
          { "word": "ספה" },
          { "word": "מיטה" },
          { "word": "מזלג" }
      ],

      "בית ספר/משרד": [
          { "word": "מורה" },
          { "word": "עיפרון" },
          { "word": "מחשב" },
          { "word": "ילקוט" },
          { "word": "מחק" }
      ],

      "טבע/יער/ים": [
          { "word": "עץ" },
          { "word": "פרח" },
          { "word": "אריה" },
          { "word": "דולפין" },
          { "word": "הר" }
      ],

      "חלל/עתידני": [
          { "word": "Eve" },
          { "word": "Ruffs" },
          { "word": "Squeak" },
          { "word": "חללית" },
          { "word": "חייזר" },
          { "word": "אסטרונאוט" },
          { "word": "8-Bit" },
          { "word": "Surge" },
          { "word": "Janet" },
          { "word": "Otis" },
          { "word": "R-T" },
          { "word": "Buzz Lightyear" }
      ],

      "היסטוריה/עבר": [
          { "word": "אביר" },
          { "word": "דינוזאור" },
          { "word": "פירמידה" },
          { "word": "אלברט איינשטיין" },
          { "word": "בן גוריון" }
      ],

      "ספורט/כושר": [
          { "word": "כדורגל" },
          { "word": "כדורסל" },
          { "word": "רונאלדו" },
          { "word": "מסי" },
          { "word": "משקולת" },
          { "word": "El Primo" },
          { "word": "Bibi" },
          { "word": "Bull" },
          { "word": "Colt" },
          { "word": "Fang" }
      ],

      "מוזיקה/במה": [
          { "word": "גיטרה" },
          { "word": "Poco" },
          { "word": "Janet" },
          { "word": "נועה קירל" },
          { "word": "מייקל ג'קסון" },
          { "word": "פסנתר" },
          { "word": "Melodie" },
          { "word": "Draco" },
          { "word": "Buzz" },
          { "word": "Frank" }
      ],

      "צבא/מלחמה": [
          { "word": "חייל" },
          { "word": "טנק" },
          { "word": "רובה" },
          { "word": "Bangalore" },
          { "word": "Clash Royale" },
          { "word": "Ruffs" },
          { "word": "Musketeer" },
          { "word": "Three Musketeers" },
          { "word": "Hunter" },
          { "word": "Royal Recruits" },
          { "word": "Hank" }
      ],

      // ==========================================
      // 7. מקור גיאוגרפי
      // ==========================================

      "ישראלי": [
          { "word": "פלאפל" },
          { "word": "במבה" },
          { "word": "גל גדות" },
          { "word": "ירושלים" },
          { "word": "חומוס" },
          { "word": "נועה קירל" }
      ],

      "אמריקאי": [
          { "word": "המבורגר" },
          { "word": "קוקה קולה" },
          { "word": "דונלד טראמפ" },
          { "word": "הוליווד" },
          { "word": "אייפון" }
      ],

      "אירופאי": [
          { "word": "פיצה" },
          { "word": "שוקולד" },
          { "word": "מרצדס" },
          { "word": "הארי פוטר" },
          { "word": "אדידס" }
      ],

      "אסייתי": [
          { "word": "סושי" },
          { "word": "סמסונג" },
          { "word": "אנימה" },
          { "word": "נינג'ה" },
          { "word": "Pikachu" }
      ]
  };

  // --- נתונים למשחק: קטגוריה וקטגוריה (Category vs Category) ---
  const DATA_CategoryNCategory = {

      // ==========================================
      // 1. סיווג ראשי
      // ==========================================

      "אדם/אישיות": [
      ],

      "דמות בדיונית": [
      ],

      "חפץ דומם": [
      ],

      "בעל חיים": [
      ],

      "מזון/משקה": [
      ],

      "מקום/מדינה": [
      ],

      "מותג/חברה": [
      ],

      // ==========================================
      // 2. תפקידים בקרב ובמשחק
      // ==========================================

      "Tank": [
      ],

      "Damage Dealer": [
      ],

      "Support": [
      ],

      "Healer": [
      ],

      "Sniper/Ranged": [
      ],

      "Melee": [
      ],

      "Thrower/Artillery": [
      ],

      "Assassin": [
      ],

      "Spawner": [
      ],

      "Controller": [
      ],

      // ==========================================
      // 3. נדירות ויוקרה
      // ==========================================

      "Common/Starter": [
      ],

      "Rare": [
      ],

      "Epic": [
      ],

      "Mythic": [
      ],

      "Legendary": [
      ],

      "Champion": [
      ],

      "יוקרה/פרימיום": [
      ],

      // ==========================================
      // 4. אלמנטים וכוחות
      // ==========================================

      "אש/שרפה": [
      ],

      "קרח/קיפאון": [
      ],

      "חשמל": [
      ],

      "רעל/טוקסיק": [
      ],

      "אדמה/טבע": [
      ],

      "קסם/כישוף": [
      ],

      "טכנולוגיה/רובוטיקה": [
      ],

      // ==========================================
      // 5. מאפיינים פיזיים
      // ==========================================

      "מעופף/אווירי": [
      ],

      "מהיר מאוד": [
      ],

      "איטי/כבד": [
      ],

      "Swarm": [
      ],

      "ענקי/גדול": [
      ],

      "בלתי נראה/חמקמק": [
      ],

      "עשוי מתכת": [
      ],

      "עשוי עץ": [
      ],

      // ==========================================
      // 6. הקשר ושימוש
      // ==========================================

      "בית/סלון/מטבח": [
      ],

      "בית ספר/משרד": [
      ],

      "טבע/יער/ים": [
      ],

      "חלל/עתידני": [
      ],

      "היסטוריה/עבר": [
      ],

      "ספורט/כושר": [
      ],

      "מוזיקה/במה": [
      ],

      "צבא/מלחמה": [
      ],

      // ==========================================
      // 7. מקור גיאוגרפי
      // ==========================================

      "ישראלי": [
      ],

      "אמריקאי": [
      ],

      "אירופאי": [
      ],

      "אסייתי": [
      ]
  };


  // ============================================================================
  // UI CATEGORIES DATA - רשימות הקטגוריות לתצוגה
  // ============================================================================
  const UI_CATEGORIES = {
      'wordNword': [
          {val: 'dailyObjects', text: 'חפצים יומיומיים'},
          {val: 'famousPeople', text: 'אנשים מפורסמים'},
          {val: 'foodDrinks', text: 'אוכל ומשקאות'},
          {val: 'animals', text: 'חיות'},
          {val: 'brands', text: 'מותגים'},
          {val: 'countries', text: 'מדינות'},
          {val: 'moviesSeries', text: 'סרטים וסדרות'},
          {val: 'professions', text: 'מקצועות'},
          {val: 'scienceTech', text: 'מדע וטכנולוגיה'},
          {val: 'videoGames', text: 'משחקי מחשב'},
          {val: 'music', text: 'מוזיקה'},
          {val: 'clashRoyale', text: 'קלאש רויאל'},
          {val: 'brawlStars', text: 'בראול סטארס'}
      ],
      'wordNhint': [
          {val: 'dailyObjects', text: 'חפצים יומיומיים'},
          {val: 'famousPeople', text: 'אנשים מפורסמים'},
          {val: 'foodDrinks', text: 'אוכל ומשקאות'},
          {val: 'animals', text: 'חיות'},
          {val: 'brands', text: 'מותגים'},
          {val: 'countries', text: 'מדינות'},
          {val: 'moviesSeries', text: 'סרטים וסדרות'},
          {val: 'professions', text: 'מקצועות'},
          {val: 'scienceTech', text: 'מדע וטכנולוגיה'},
          {val: 'videoGames', text: 'משחקי מחשב'},
          {val: 'music', text: 'מוזיקה'},
          {val: 'clashRoyale', text: 'קלאש רויאל'},
          {val: 'brawlStars', text: 'בראול סטארס'}
      ],
      'categoryNword': [
          {val: 'אדם/אישיות', text: 'אדם/אישיות'},
          {val: 'דמות בדיונית', text: 'דמות בדיונית'},
          {val: 'חפץ דומם', text: 'חפץ דומם'},
          {val: 'בעל חיים', text: 'בעל חיים'},
          {val: 'מזון/משקה', text: 'מזון/משקה'},
          {val: 'מקום/מדינה', text: 'מקום/מדינה'},
          {val: 'מותג/חברה', text: 'מותג/חברה'},
          {val: 'Tank', text: 'Tank'},
          {val: 'Damage Dealer', text: 'Damage Dealer'},
          {val: 'Support', text: 'Support'},
          {val: 'Healer', text: 'Healer'},
          {val: 'Sniper/Ranged', text: 'Sniper/Ranged'},
          {val: 'Melee', text: 'Melee'},
          {val: 'Thrower/Artillery', text: 'Thrower/Artillery'},
          {val: 'Assassin', text: 'Assassin'},
          {val: 'Spawner', text: 'Spawner'},
          {val: 'Controller', text: 'Controller'}
      ],
      'categoryNcategory': [
          {val: 'אדם/אישיות', text: 'אדם/אישיות'},
          {val: 'דמות בדיונית', text: 'דמות בדיונית'},
          {val: 'חפץ דומם', text: 'חפץ דומם'},
          {val: 'בעל חיים', text: 'בעל חיים'},
          {val: 'מזון/משקה', text: 'מזון/משקה'},
          {val: 'מקום/מדינה', text: 'מקום/מדינה'},
          {val: 'מותג/חברה', text: 'מותג/חברה'},
          {val: 'Tank', text: 'Tank'},
          {val: 'Damage Dealer', text: 'Damage Dealer'},
          {val: 'Support', text: 'Support'},
          {val: 'Healer', text: 'Healer'},
          {val: 'Sniper/Ranged', text: 'Sniper/Ranged'},
          {val: 'Melee', text: 'Melee'},
          {val: 'Thrower/Artillery', text: 'Thrower/Artillery'},
          {val: 'Assassin', text: 'Assassin'},
          {val: 'Spawner', text: 'Spawner'},
          {val: 'Controller', text: 'Controller'},
          {val: 'Common/Starter', text: 'Common/Starter'},
          {val: 'Rare', text: 'Rare'},
          {val: 'Epic', text: 'Epic'},
          {val: 'Mythic', text: 'Mythic'},
          {val: 'Legendary', text: 'Legendary'},
          {val: 'Champion', text: 'Champion'},
          {val: 'יוקרה/פרימיום', text: 'יוקרה/פרימיום'},
          {val: 'אש/שרפה', text: 'אש/שרפה'},
          {val: 'קרח/קיפאון', text: 'קרח/קיפאון'},
          {val: 'חשמל', text: 'חשמל'},
          {val: 'רעל/טוקסיק', text: 'רעל/טוקסיק'},
          {val: 'אדמה/טבע', text: 'אדמה/טבע'},
          {val: 'קסם/כישוף', text: 'קסם/כישוף'},
          {val: 'טכנולוגיה/רובוטיקה', text: 'טכנולוגיה/רובוטיקה'},
          {val: 'מעופף/אווירי', text: 'מעופף/אווירי'},
          {val: 'מהיר מאוד', text: 'מהיר מאוד'},
          {val: 'איטי/כבד', text: 'איטי/כבד'},
          {val: 'Swarm', text: 'Swarm'},
          {val: 'ענקי/גדול', text: 'ענקי/גדול'},
          {val: 'בלתי נראה/חמקמק', text: 'בלתי נראה/חמקמק'},
          {val: 'עשוי מתכת', text: 'עשוי מתכת'},
          {val: 'עשוי עץ', text: 'עשוי עץ'},
          {val: 'בית/סלון/מטבח', text: 'בית/סלון/מטבח'},
          {val: 'בית ספר/משרד', text: 'בית ספר/משרד'},
          {val: 'טבע/יער/ים', text: 'טבע/יער/ים'},
          {val: 'חלל/עתידני', text: 'חלל/עתידני'},
          {val: 'היסטוריה/עבר', text: 'היסטוריה/עבר'},
          {val: 'ספורט/כושר', text: 'ספורט/כושר'},
          {val: 'מוזיקה/במה', text: 'מוזיקה/במה'},
          {val: 'צבא/מלחמה', text: 'צבא/מלחמה'},
          {val: 'ישראלי', text: 'ישראלי'},
          {val: 'אמריקאי', text: 'אמריקאי'},
          {val: 'אירופאי', text: 'אירופאי'},
          {val: 'אסייתי', text: 'אסייתי'}
      ]
  };
// ============================================================================
// CUSTOM ALERT (TOAST) LOGIC
// ============================================================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ============================================================================
// GLOBAL STATE
// ============================================================================

let players = JSON.parse(localStorage.getItem('unified_players')) || [];
let imposters = []; 
let wordsMap = {}; 
let playersOrder = [];
let currentIndex = 0;
let approvedPlayers = new Set();

let currentMode = localStorage.getItem('unified_currentMode') || 'wordNword'; 
let gameType = localStorage.getItem('unified_gameType') || 'gmail';

const currentUser = document.body.dataset.currentUser;
let lobbyInterval = null;

// ============================================================================
// DOM ELEMENTS
// ============================================================================
const ui = {
    playerList: document.getElementById('player-list'),
    addPlayerBtn: document.getElementById('add-player'),
    startGameBtn: document.getElementById('start-game'),
    resetBtn: document.getElementById('reset-game'),
    clearServerBtn: document.getElementById('clear-server-btn'),

    playerName: document.getElementById('player-name'),
    playerEmail: document.getElementById('player-email'),
    numImposters: document.getElementById('num-imposters'),

    modeTabs: document.querySelectorAll('.mode-tab'),
    gameModeRadios: document.querySelectorAll('input[name="gameMode"]'),

    // אופציות
    hintOptions: document.getElementById('hint-options'),
    catWordOptions: document.getElementById('category-word-options'),
    categoriesList: document.getElementById('categories-list'),

    // רמזים
    giveClueCheckbox: document.getElementById('give-clue'),
    numCluesContainer: document.getElementById('num-clues-container'),
    numCluesInput: document.getElementById('num-clues2'),
    giveClueCategoryCheckbox: document.getElementById('give-clue-category'),
    numWordsImposterInput: document.getElementById('num-words-imposter'),

    // קטגוריות
    categoriesDiv: document.getElementById('categories'),
    toggleCategoriesBtn: document.getElementById('toggle-categories'),
    categoriesArrow: document.getElementById('categories-arrow'),

    // מסכים
    setupDiv: document.getElementById('setup'),
    gameDiv: document.getElementById('game'),
    gameOrderDiv: document.getElementById('game-order'),

    currentPlayerH1: document.getElementById('current-player'),
    revealBtn: document.getElementById('reveal-button'),
    revealText: document.getElementById('reveal-text'),
    nextBtn: document.getElementById('next-button'),
    modalOverlay: document.getElementById('modal-overlay'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    secretCloseBtn: document.getElementById('secret-close-btn'),
    orderList: document.getElementById('order-list'),
    gameOrderButtons: document.getElementById('game-order-buttons'),
    hostArea: document.getElementById('host-area'),
    hostShowCardBtn: document.getElementById('host-show-card-btn'),

    themeToggleBtn: document.getElementById('theme-toggle-btn')
};

// ============================================================================
// SETTINGS & THEME
// ============================================================================

function saveGlobalSettings() {
    if (ui.giveClueCheckbox) localStorage.setItem('unified_opt_giveClue', ui.giveClueCheckbox.checked);
    if (ui.giveClueCategoryCheckbox) localStorage.setItem('unified_opt_giveCat', ui.giveClueCategoryCheckbox.checked);
    if (ui.numImposters) localStorage.setItem('unified_opt_numImposters', ui.numImposters.value);
    if (ui.numCluesInput) localStorage.setItem('unified_opt_numClues', ui.numCluesInput.value);
    const selectedCats = Array.from(document.querySelectorAll('.category:checked')).map(c => c.value);
    localStorage.setItem('unified_opt_selectedCats_' + currentMode, JSON.stringify(selectedCats));
}

function loadGlobalSettings() {
    if (ui.giveClueCheckbox && localStorage.getItem('unified_opt_giveClue') !== null) {
        ui.giveClueCheckbox.checked = localStorage.getItem('unified_opt_giveClue') === 'true';
    }
    if (ui.giveClueCategoryCheckbox && localStorage.getItem('unified_opt_giveCat') !== null) {
        ui.giveClueCategoryCheckbox.checked = localStorage.getItem('unified_opt_giveCat') === 'true';
    }
    if (ui.numImposters && localStorage.getItem('unified_opt_numImposters')) {
        ui.numImposters.value = localStorage.getItem('unified_opt_numImposters');
    }
    if (ui.numCluesInput && localStorage.getItem('unified_opt_numClues')) {
        ui.numCluesInput.value = localStorage.getItem('unified_opt_numClues');
    }
}

function applyTheme() {
    const savedTheme = localStorage.getItem('gameTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('gameTheme', isLight ? 'light' : 'dark');
}

// ============================================================================
// INIT
// ============================================================================

function init() {
    applyTheme();
    if (ui.themeToggleBtn) {
        ui.themeToggleBtn.onclick = null; 
        ui.themeToggleBtn.removeAttribute('onclick');
        ui.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    renderPlayerList();
    if (localStorage.getItem('unified_currentMode')) currentMode = localStorage.getItem('unified_currentMode');
    loadGlobalSettings();

    if(ui.giveClueCheckbox) ui.giveClueCheckbox.addEventListener('change', saveGlobalSettings);
    if(ui.giveClueCategoryCheckbox) ui.giveClueCategoryCheckbox.addEventListener('change', saveGlobalSettings);
    if(ui.numImposters) ui.numImposters.addEventListener('change', saveGlobalSettings);
    if(ui.numCluesInput) ui.numCluesInput.addEventListener('change', saveGlobalSettings);

    ui.modeTabs.forEach(tab => {
        if(tab.dataset.mode === currentMode) tab.classList.add('active');
        else tab.classList.remove('active');
        tab.addEventListener('click', () => {
            ui.modeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentMode = tab.dataset.mode;
            localStorage.setItem('unified_currentMode', currentMode);
            updateUIVisibility(); 
        });
    });

    ui.gameModeRadios.forEach(radio => {
        if(radio.value === gameType) radio.checked = true;
        radio.addEventListener('change', (e) => {
            gameType = e.target.value;
            localStorage.setItem('unified_gameType', gameType);
            updateUIVisibility();
            renderPlayerList();

            approvedPlayers.clear();
            if (gameType === 'app') startLobbyPolling();
            else stopLobbyPolling();
        });
    });

    if (ui.toggleCategoriesBtn) {
        ui.toggleCategoriesBtn.addEventListener('click', () => {
            const isOpen = ui.categoriesDiv.style.display === 'block';
            ui.categoriesDiv.style.display = isOpen ? 'none' : 'block';
            if(ui.categoriesArrow) ui.categoriesArrow.innerHTML = isOpen ? '&#9660;' : '&#9650;';
        });
    }

    if (ui.giveClueCheckbox) {
        ui.giveClueCheckbox.addEventListener('change', () => {
            if (ui.numCluesContainer) ui.numCluesContainer.style.display = ui.giveClueCheckbox.checked ? 'block' : 'none';
        });
    }

    if (ui.playerName) {
        ui.playerName.addEventListener('keydown', (e) => { 
            if(e.key === 'Enter') {
                if (gameType === 'gmail' && ui.playerEmail && ui.playerEmail.value.trim() === '') {
                    ui.playerEmail.focus();
                } else {
                    ui.addPlayerBtn.click(); 
                }
            }
        });
    }
    if (ui.playerEmail) {
        ui.playerEmail.addEventListener('keydown', (e) => { 
            if(e.key === 'Enter') ui.addPlayerBtn.click(); 
        });
    }

    if (ui.secretCloseBtn) {
        ui.secretCloseBtn.addEventListener('click', () => {
            if (gameType === 'regular' && ui.modalOverlay.style.display !== 'none') {
                ui.modalOverlay.classList.remove('active');
                ui.modalOverlay.classList.add('hidden');
                ui.modalOverlay.style.display = 'none';
            }
        });
    }

    updateUIVisibility();
    forceSetupHostButton();

    if (gameType === 'app') startLobbyPolling();
}

function updateUIVisibility() {
    ui.hintOptions.style.display = 'none';
    ui.catWordOptions.style.display = 'none';

    if (currentMode === 'wordNhint') {
        ui.hintOptions.style.display = 'block';
        if (ui.numCluesContainer && ui.giveClueCheckbox) {
            ui.numCluesContainer.style.display = ui.giveClueCheckbox.checked ? 'block' : 'none';
        }
    } else if (currentMode === 'categoryNword') {
        ui.catWordOptions.style.display = 'block';
    }

    if (gameType === 'gmail') {
        ui.playerEmail.style.display = 'inline-block';
        ui.playerName.placeholder = "שם שחקן";
        if(ui.clearServerBtn) ui.clearServerBtn.style.display = 'none';
    } else if (gameType === 'app') {
        ui.playerEmail.style.display = 'none';
        ui.playerName.placeholder = "שם משתמש במערכת";
        if(ui.clearServerBtn) ui.clearServerBtn.style.display = 'block';
    } else {
        ui.playerEmail.style.display = 'none';
        ui.playerName.placeholder = "שם שחקן";
        if(ui.clearServerBtn) ui.clearServerBtn.style.display = 'none';
    }
    renderCategories();
}

function renderCategories() {
    if (!ui.categoriesList) return;
    ui.categoriesList.innerHTML = '';
    const cats = (typeof UI_CATEGORIES !== 'undefined' ? UI_CATEGORIES[currentMode] : []) || [];
    const savedCats = JSON.parse(localStorage.getItem('unified_opt_selectedCats_' + currentMode)) || [];

    cats.forEach(cat => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.margin = '5px 0';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'category';
        checkbox.value = cat.val;
        checkbox.style.width = 'auto';
        checkbox.style.display = 'inline';
        checkbox.style.marginLeft = '10px';
        if (savedCats.includes(cat.val)) checkbox.checked = true;
        checkbox.addEventListener('change', saveGlobalSettings);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + cat.text));
        ui.categoriesList.appendChild(label);
    });
}

// ============================================================================
// PLAYER MANAGEMENT & LOBBY LOGIC
// ============================================================================

function renderPlayerList() {
    ui.playerList.innerHTML = '';
    players.forEach((p, i) => {
        const li = document.createElement('li');

        const editBtn = document.createElement('span');
        editBtn.textContent = '✏️';
        editBtn.className = 'edit-btn';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            const newName = prompt("שם חדש:", p.name);
            if (newName) {
                p.name = newName;
                if (gameType === 'gmail') {
                    const newEmail = prompt("אימייל חדש:", p.email);
                    if (newEmail) p.email = newEmail;
                }
                savePlayers();
                renderPlayerList();
            }
        };

        const textSpan = document.createElement('span');
        let displayText = p.name;
        if (gameType === 'gmail' && p.email) displayText += ` (${p.email})`;

        if (gameType === 'app') {
            if (approvedPlayers.has(p.name)) {
                displayText += ' ✅';
                li.style.color = '#4ade80';
            } else {
                displayText += ' ⏳';
                li.style.opacity = '0.7';
            }
        }

        textSpan.textContent = displayText;
        textSpan.className = 'name';
        textSpan.onclick = async () => {
            if(confirm('למחוק את ' + p.name + '?')) {
                const removedName = p.name;
                players.splice(i, 1);
                approvedPlayers.delete(removedName);
                savePlayers();
                renderPlayerList();
            }
        };

        li.appendChild(editBtn);
        li.appendChild(textSpan);
        ui.playerList.appendChild(li);
    });
}

function savePlayers() {
    localStorage.setItem('unified_players', JSON.stringify(players));
}

ui.addPlayerBtn.onclick = async () => {
    const name = ui.playerName.value.trim();
    const email = ui.playerEmail.value.trim();

    if (!name) return;
    if (players.some(p => p.name === name)) {
        showToast('השחקן כבר ברשימה', 'error');
        return;
    }
    if (gameType === 'gmail' && !email) {
        showToast('חסר אימייל', 'error');
        return;
    }

    if (gameType === 'app') {
        if (name === currentUser) {
            approvedPlayers.add(name);
            showToast(`${name} (את/ה) נוסף בהצלחה`, 'success');
        } else {
            const success = await sendAppInvite(name);
            if (!success) return;
        }
    }

    players.push({ name, email });
    ui.playerName.value = '';
    ui.playerEmail.value = '';
    ui.playerName.focus();

    savePlayers();
    renderPlayerList();
};

async function sendAppInvite(targetUser) {
    const payload = {
        playersData: [{
            username: targetUser,
            content: `הזמנה למשחק מאת ${currentUser}`,
            type: 'invite'
        }]
    };

    try {
        const res = await fetch('/api/send_game_data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            showToast(`הזמנה נשלחה ל-${targetUser}`, 'success');
            return true;
        } else {
            showToast(data.message || 'שגיאה בשליחת הזמנה', 'error');
            return false;
        }
    } catch (e) {
        showToast('תקלה ברשת', 'error');
        return false;
    }
}

function startLobbyPolling() {
    if (lobbyInterval) clearInterval(lobbyInterval);
    lobbyInterval = setInterval(async () => {
        try {
            const res = await fetch('/api/check_lobby');
            const data = await res.json();
            if (data.success) {
                const serverApproved = new Set(data.approved_players);

                if (currentUser && players.some(p => p.name === currentUser)) {
                    serverApproved.add(currentUser);
                }

                let changed = false;

                serverApproved.forEach(p => {
                    if (!approvedPlayers.has(p)) {
                        showToast(`${p} אישר/ה והצטרף/ה!`, 'success');
                        approvedPlayers.add(p);
                        changed = true;
                    }
                });

                approvedPlayers.forEach(p => {
                    if (p === currentUser) return;

                    if (!serverApproved.has(p)) {
                        approvedPlayers.delete(p);
                        changed = true;
                    }
                });

                if (changed) renderPlayerList();
            }
        } catch (e) { console.error(e); }
    }, 1000);
}

function stopLobbyPolling() {
    if (lobbyInterval) clearInterval(lobbyInterval);
    lobbyInterval = null;
}

ui.resetBtn.onclick = () => {
    if(confirm('האם לאפס את כל השחקנים וההגדרות?')) {
        players = [];
        approvedPlayers.clear();
        savePlayers();
        localStorage.removeItem('unified_opt_giveClue');
        localStorage.removeItem('unified_opt_giveCat');
        localStorage.removeItem('unified_opt_numImposters');
        localStorage.removeItem('unified_opt_numClues');
        ['wordNword', 'wordNhint', 'categoryNword', 'categoryNcategory'].forEach(m => {
            localStorage.removeItem('unified_opt_selectedCats_' + m);
        });
        location.reload();
    }
};

// ============================================================================
// GAME LOGIC START
// ============================================================================

ui.startGameBtn.onclick = async () => {
    if (players.length < 3) {
        showToast('מינימום 3 שחקנים', 'error');
        return;
    }

    if (gameType === 'app') {
        const approvedCount = players.filter(p => approvedPlayers.has(p.name)).length;
        if (approvedCount < 3) {
             const pending = players.filter(p => !approvedPlayers.has(p.name));
             if (pending.length > 0) {
                 showToast(`לא ניתן להתחיל! השחקנים הבאים טרם אישרו: ${pending.map(p=>p.name).join(', ')}`, 'error');
                 return;
             }
        }
    }

    // Show ad before starting game
    const canStart = await checkAndShowAdBeforeGame();
    if (!canStart) return;

    startLogicAndDistribute();
};

async function startLogicAndDistribute() {
    const originalText = ui.startGameBtn.textContent;
    ui.startGameBtn.disabled = true;
    ui.startGameBtn.textContent = (gameType === 'regular') ? 'מארגן...' : 'שולח...';

    playersOrder = [...players].sort(() => 0.5 - Math.random());

    let numImposters = parseInt(ui.numImposters.value) || 1;
    numImposters = Math.min(numImposters, players.length - 1);

    let protectedCount = (players.length >= 6) ? 2 : (players.length >= 3 ? 1 : 0);
    const potentialImposters = playersOrder.slice(protectedCount).map(p => p.name);

    for (let i = potentialImposters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [potentialImposters[i], potentialImposters[j]] = [potentialImposters[j], potentialImposters[i]];
    }
    imposters = potentialImposters.slice(0, numImposters);

    wordsMap = {}; 
    let success = false;

    try {
        if (currentMode === 'wordNword') success = logic_WordNWord();
        else if (currentMode === 'wordNhint') success = logic_WordNHint();
        else if (currentMode === 'categoryNword') success = logic_CategoryNWord();
        else if (currentMode === 'categoryNcategory') success = logic_CategoryNCategory();
    } catch (e) {
        console.error(e);
        showToast('שגיאה בלוגיקה', 'error');
    }

    if (!success) {
        ui.startGameBtn.disabled = false;
        ui.startGameBtn.textContent = originalText;
        return;
    }

    localStorage.setItem('unified_wordsMap', JSON.stringify(wordsMap));
    localStorage.setItem('unified_imposters', JSON.stringify(imposters));
    forceSetupHostButton();

    if (gameType === 'gmail') {
        await sendViaEmail();
    } else if (gameType === 'app') {
        stopLobbyPolling();
        await sendToApp();
    } else {
        // Show ad before local game starts
        const canStart = await checkAndShowAdBeforeGame();
        if (canStart) {
            startLocalGame();
        }
    }

    ui.startGameBtn.disabled = false;
    ui.startGameBtn.textContent = originalText;
}

// ============================================================================
// LOGIC FUNCTIONS 
// ============================================================================
function getSelectedCategories(dbObject) {
    const checkboxes = document.querySelectorAll('.category:checked'); 
    let selectedVals = Array.from(checkboxes).map(c => c.value);
    if (selectedVals.length === 0) selectedVals = dbObject ? Object.keys(dbObject) : [];
    return selectedVals;
}

function logic_WordNWord() {
    if (typeof DATA_WordNWord === 'undefined') return false;
    const cats = getSelectedCategories(DATA_WordNWord);
    if (cats.length === 0) { showToast('אין קטגוריות', 'error'); return false; }
    const randomCat = cats[Math.floor(Math.random() * cats.length)];
    const list = DATA_WordNWord[randomCat];
    if (!list || list.length < 2) { showToast(`אין מספיק מילים ב-${randomCat}`, 'error'); return false; }
    let idx1 = Math.floor(Math.random() * list.length);
    let idx2 = idx1;
    while(idx2 === idx1) idx2 = Math.floor(Math.random() * list.length);
    players.forEach(p => wordsMap[p.name] = imposters.includes(p.name) ? list[idx2].word : list[idx1].word);
    return true;
}
function logic_WordNHint() {
    if (typeof DATA_WordNHint === 'undefined') return false;
    const cats = getSelectedCategories(DATA_WordNHint);
    if (cats.length === 0) { showToast('אין קטגוריות', 'error'); return false; }
    const randomCat = cats[Math.floor(Math.random() * cats.length)];
    const list = DATA_WordNHint[randomCat];
    if (!list) return false;
    const item = list[Math.floor(Math.random() * list.length)];
    const giveClue = ui.giveClueCheckbox.checked;
    const giveCat = ui.giveClueCategoryCheckbox.checked;
    const numClues = parseInt(ui.numCluesInput.value) || 1;
    players.forEach(p => {
        if (imposters.includes(p.name)) {
            let msg = "אתה האימפוסטר!";
            if (giveClue && item.clues) msg += "\nרמזים: " + [...item.clues].sort(() => 0.5 - Math.random()).slice(0, numClues).join(', ');
            if (giveCat) msg += "\nקטגוריה: " + randomCat;
            wordsMap[p.name] = msg;
        } else wordsMap[p.name] = item.word;
    });
    return true;
}
function logic_CategoryNWord() {
    if (typeof DATA_CategoryNWord === 'undefined') return false;
    const cats = getSelectedCategories(DATA_CategoryNWord);
    if (cats.length === 0) { showToast('אין נתונים', 'error'); return false; }
    const randomCat = cats[Math.floor(Math.random() * cats.length)];
    const list = DATA_CategoryNWord[randomCat];
    const numFake = parseInt(ui.numWordsImposterInput.value) || 3;
    players.forEach(p => {
        if (imposters.includes(p.name)) {
            let fakes = list ? [...list].sort(() => 0.5 - Math.random()).slice(0, numFake).map(i=>i.word).join(', ') : '';
            wordsMap[p.name] = "אתה האימפוסטר!\nמילים:\n" + fakes;
        } else wordsMap[p.name] = "הקטגוריה:\n" + randomCat;
    });
    return true;
}
function logic_CategoryNCategory() {
    if (typeof DATA_CategoryNCategory === 'undefined') return false;
    const cats = getSelectedCategories(DATA_CategoryNCategory);
    if (cats.length < 2) { showToast('צריך 2 קטגוריות לפחות', 'error'); return false; }
    let idx1 = Math.floor(Math.random() * cats.length);
    let idx2 = idx1;
    while(idx2 === idx1) idx2 = Math.floor(Math.random() * cats.length);
    players.forEach(p => wordsMap[p.name] = imposters.includes(p.name) ? cats[idx2] : cats[idx1]);
    return true;
}

// ============================================================================
// DISTRIBUTION & GAMEPLAY
// ============================================================================

async function sendViaEmail() {
    const payload = {
        players: playersOrder.map(p => ({
            name: p.name, email: p.email,
            role: imposters.includes(p.name) ? 'imposter' : 'crew',
            wordData: wordsMap[p.name]
        })),
        gameType: currentMode
    };
    try {
        const res = await fetch('/send_roles', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if ((await res.json()).success) { showToast('נשלח במייל!', 'success'); showEndGameScreen(); }
        else showToast('שגיאה בשליחה', 'error');
    } catch (e) { showToast('תקלה ברשת', 'error'); }
}

async function sendToApp() {
    const payload = {
        playersData: playersOrder.map(p => ({
            username: p.name,
            content: wordsMap[p.name],
            type: imposters.includes(p.name) ? 'imposter' : 'citizen'
        }))
    };
    try {
        const res = await fetch('/api/send_game_data', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if ((await res.json()).success) { showToast('המשחק התחיל באפליקציה!', 'success'); showEndGameScreen(); }
        else showToast('שגיאה', 'error');
    } catch (e) { showToast('תקלה ברשת', 'error'); }
}

function startLocalGame() {
    currentIndex = 0;
    ui.setupDiv.style.display = 'none';
    ui.gameDiv.style.display = 'flex';
    ui.gameDiv.style.flexDirection = 'column';
    ui.gameOrderDiv.style.display = 'none';
    showLocalCard();
}

function showLocalCard() {
    if (currentIndex >= playersOrder.length) {
        showEndGameScreen();
        return;
    }
    const pName = playersOrder[currentIndex].name;
    ui.currentPlayerH1.textContent = pName;
    ui.revealText.style.display = 'none';

    ui.modalOverlay.classList.add('hidden');
    ui.modalOverlay.classList.remove('active');
    ui.modalOverlay.style.display = 'none';
    ui.modalOverlay.classList.remove('hide-close-btn'); 

    ui.revealText.innerText = wordsMap[pName];

    if (ui.nextBtn) {
        ui.nextBtn.style.display = 'inline-block';
        ui.nextBtn.textContent = "סגור והעבר לשחקן הבא";
    }
}

ui.revealBtn.onclick = () => {
    ui.revealText.style.display = 'block';
    ui.modalOverlay.classList.remove('hidden');
    ui.modalOverlay.classList.add('active');
    ui.modalOverlay.style.display = 'flex';

    if (gameType === 'regular') {
        ui.modalOverlay.classList.add('hide-close-btn');
        if (ui.nextBtn) {
            ui.nextBtn.style.display = 'inline-block';
        }
    } else {
        ui.modalOverlay.classList.remove('hide-close-btn');
        if (ui.nextBtn) ui.nextBtn.style.display = 'inline-block';
    }
};

ui.nextBtn.onclick = () => {
    currentIndex++;
    showLocalCard();
};

ui.closeModalBtn.onclick = () => {
    if (gameType === 'regular') return;

    ui.modalOverlay.classList.remove('active');
    ui.modalOverlay.classList.add('hidden');
    ui.modalOverlay.style.display = 'none';
};

ui.modalOverlay.onclick = (e) => {
    if (gameType === 'regular') return;

    if (e.target === ui.modalOverlay) {
        ui.closeModalBtn.click();
    }
};

function showEndGameScreen() {
    ui.modalOverlay.classList.add('hidden');
    ui.modalOverlay.classList.remove('active');
    ui.modalOverlay.style.display = 'none';

    ui.gameDiv.style.display = 'none';
    ui.gameOrderDiv.style.display = 'block';

    ui.orderList.innerHTML = '';
    playersOrder.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.name;
        ui.orderList.appendChild(li);
    });

    renderEndGameButtons();
}

function renderEndGameButtons() {
    ui.gameOrderButtons.innerHTML = '';

    const setupBtn = document.createElement('button');
    setupBtn.textContent = 'חזרה להגדרות';
    setupBtn.onclick = () => {
        ui.gameOrderDiv.style.display = 'none';
        ui.setupDiv.style.display = 'block';
        updateUIVisibility(); 
        if (gameType === 'app') startLobbyPolling();
    };
    ui.gameOrderButtons.appendChild(setupBtn);

    if (gameType === 'regular') {
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'התחל משחק מחדש (אותם שחקנים)';
        restartBtn.style.background = 'var(--gradient-gold)';
        restartBtn.onclick = () => {
            startLogicAndDistribute();
        };
        ui.gameOrderButtons.appendChild(restartBtn);
    }

    if (gameType === 'app' && currentUser) {
        const hostBtn = document.createElement('button');
        hostBtn.textContent = `הצג את הקלף שלי (${currentUser})`;
        hostBtn.className = "gold-gradient-btn"; 
        hostBtn.onclick = () => showHostCard();
        ui.gameOrderButtons.appendChild(hostBtn);
    }
}

function showHostCard() {
    const map = wordsMap || JSON.parse(localStorage.getItem('unified_wordsMap'));
    if (map && map[currentUser]) {
        ui.revealText.innerText = map[currentUser];
        ui.revealText.style.display = 'block';
        if (ui.nextBtn) ui.nextBtn.style.display = 'none';
        ui.modalOverlay.classList.remove('hidden');
        ui.modalOverlay.classList.add('active');
        ui.modalOverlay.classList.remove('hide-close-btn');
        ui.modalOverlay.style.display = 'flex';
    } else {
        showToast('לא נמצא מידע', 'error');
    }
}

function forceSetupHostButton() {
    if (!ui.hostShowCardBtn || !ui.hostArea) return;
    if (gameType === 'app' && currentUser) {
        ui.hostArea.style.display = 'block';
        ui.hostShowCardBtn.onclick = () => showHostCard();
    } else {
        ui.hostArea.style.display = 'none';
    }
}

if (ui.clearServerBtn) {
    ui.clearServerBtn.onclick = async () => {
        if(confirm('בטוח לנקות שרת?')) {
            await fetch('/api/clear_game_data', { method: 'POST' });
            showToast('השרת נוקה', 'success');
            renderPlayerList(); 
        }
    };
}
window.addEventListener('pagehide', () => {
});

init();
// Daily Game Limit Logic - Updated with Full Screen Ad and Dual Protection

// Create unique device ID
function getOrCreateDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

const DAILY_GAME_STORAGE_KEY = 'dailyGameState';

function getCurrentDate() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function recordGamePlay() {
    const today = getCurrentDate();
    const state = JSON.parse(localStorage.getItem(DAILY_GAME_STORAGE_KEY) || '{"lastPlayedDate":null,"dailyCount":0}');

    if (state.lastPlayedDate !== today) {
        const newState = { lastPlayedDate: today, dailyCount: 1 };
        localStorage.setItem(DAILY_GAME_STORAGE_KEY, JSON.stringify(newState));
    } else {
        state.dailyCount += 1;
        localStorage.setItem(DAILY_GAME_STORAGE_KEY, JSON.stringify(state));
    }
}

// Full-Screen Ad Component
function createFullScreenAd(onComplete) {
    const adContainer = document.createElement('div');
    adContainer.id = 'full-screen-ad-container';
    adContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        direction: rtl;
        font-family: 'Heebo', sans-serif;
    `;

    const adContent = document.createElement('div');
    adContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 90%;
        max-height: 85vh;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;

    // Ad placeholder
    const adPlaceholder = document.createElement('div');
    adPlaceholder.style.cssText = `
        width: 100%;
        max-width: 600px;
        height: 400px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    `;
    adPlaceholder.textContent = 'פרסומת';

    // Countdown timer
    let timeLeft = 30;
    let canSkip = false;
    
    const timer = document.createElement('div');
    timer.style.cssText = `
        font-size: 48px;
        font-weight: bold;
        color: #333;
        margin: 20px 0;
    `;
    timer.textContent = `${timeLeft}`;

    const skipButton = document.createElement('button');
    skipButton.textContent = 'דלג על הפרסומת';
    skipButton.style.cssText = `
        background: #e74c3c;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 20px;
        opacity: 0.3;
        transition: opacity 0.3s, background 0.3s;
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

    adContent.appendChild(adPlaceholder);
    adContent.appendChild(timer);
    adContent.appendChild(skipButton);

    adContainer.appendChild(adContent);
    document.body.appendChild(adContainer);

    function completeAd() {
        adContainer.remove();
        if (onComplete) onComplete();
    }
}

// Main game start function with ad logic
async function goToImpoGame() {
    try {
        const isPremium = localStorage.getItem('isPremium') === 'true';
        const deviceId = getOrCreateDeviceId();
        const username = document.body.getAttribute('data-user') || null;

        // Check if ad is needed
        const response = await fetch('/api/check-game-ad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId, username })
        });

        const result = await response.json();

        // Record this game play
        await fetch('/api/record-game-play', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId, had_ad: result.needs_ad ? 1 : 0 })
        });

        // If premium or no ad needed, go straight to game
        if (isPremium || !result.needs_ad) {
            recordGamePlay();
            window.location.href = '/imposter_game';
            return;
        }

        // Show full-screen ad, then go to game
        createFullScreenAd(() => {
            recordGamePlay();
            window.location.href = '/imposter_game';
        });

    } catch (error) {
        console.error('Error checking ad:', error);
        // If error, just go to game
        recordGamePlay();
        window.location.href = '/imposter_game';
    }
}

// Main game start function with ad logic
async function goToImpoGame() {
    try {
        const isPremium = localStorage.getItem('isPremium') === 'true';
        const deviceId = getOrCreateDeviceId();
        const username = document.body.getAttribute('data-user') || null;

        // Check if ad is needed
        const response = await fetch('/api/check-game-ad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId, username })
        });

        const result = await response.json();

        // Record this game play
        await fetch('/api/record-game-play', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId, had_ad: result.needs_ad ? 1 : 0 })
        });

        // If premium or no ad needed, go straight to game
        if (isPremium || !result.needs_ad) {
            recordGamePlay();
            window.location.href = '/imposter_game';
            return;
        }

        // Show full-screen ad, then go to game
        createFullScreenAd(() => {
            recordGamePlay();
            window.location.href = '/imposter_game';
        });

    } catch (error) {
        console.error('Error checking ad:', error);
        // If error, just go to game
        recordGamePlay();
        window.location.href = '/imposter_game';
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.mode-card');
  cards.forEach((card, index) => {
      setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
      }, index * 200);
  });
});
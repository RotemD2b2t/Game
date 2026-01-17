// Daily Game Limit Logic
const DAILY_GAME_STORAGE_KEY = 'dailyGameState';
const MAX_FREE_GAMES_PER_DAY = 1;

function getDailyGameState() {
  const stored = localStorage.getItem(DAILY_GAME_STORAGE_KEY);
  if (!stored) {
    return { lastPlayedDate: null, dailyCount: 0 };
  }
  try {
    return JSON.parse(stored);
  } catch {
    return { lastPlayedDate: null, dailyCount: 0 };
  }
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function shouldShowAd() {
  const isPremium = localStorage.getItem('isPremium') === 'true';
  if (isPremium) return false;

  const state = getDailyGameState();
  const today = getCurrentDate();

  // If different day, no ad needed
  if (state.lastPlayedDate !== today) {
    return false;
  }

  // Same day: if already played once, show ad
  return state.dailyCount >= MAX_FREE_GAMES_PER_DAY;
}

function recordGamePlay() {
  const today = getCurrentDate();
  const state = getDailyGameState();

  if (state.lastPlayedDate !== today) {
    // New day
    const newState = { lastPlayedDate: today, dailyCount: 1 };
    localStorage.setItem(DAILY_GAME_STORAGE_KEY, JSON.stringify(newState));
  } else {
    // Same day: increment
    state.dailyCount += 1;
    localStorage.setItem(DAILY_GAME_STORAGE_KEY, JSON.stringify(state));
  }
}

// Interstitial Ad Modal HTML
function createAdModal() {
  const existingModal = document.getElementById('ad-interstitial-modal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'ad-interstitial-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: 12px;
      padding: 32px;
      max-width: 600px;
      width: 90%;
      text-align: center;
      direction: rtl;
    ">
      <h2 style="margin-top: 0; font-size: 20px; color: #333;">צפה בפרסומת כדי להמשיך למשחק</h2>
      
      <div style="
        background: #f3f4f6;
        border-radius: 8px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 24px 0;
        overflow: hidden;
      ">
        <ins class="adsbygoogle"
             style="display: block; width: 100%; height: 100%;"
             data-ad-client="ca-pub-4856462370528155"
             data-ad-slot="5555555555"
             data-ad-format="auto"></ins>
      </div>

      <div style="
        font-size: 18px;
        color: #666;
        margin: 16px 0;
      ">
        <span id="ad-countdown">אתה יכול לסגור בעוד 5 שניות...</span>
      </div>

      <button id="ad-close-btn" style="
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 6px;
        font-size: 16px;
        cursor: not-allowed;
        opacity: 0.5;
        width: 100%;
      " disabled>
        המתן 5 שניות...
      </button>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}

function goToImpoGame() {
  const isPremium = localStorage.getItem('isPremium') === 'true';

  // Premium or not logged in: go immediately
  if (isPremium || !localStorage.getItem('currentUser')) {
    window.location.href = "/imposter_game";
    return;
  }

  // Check if ad should be shown
  if (shouldShowAd()) {
    // Show ad modal
    const modal = createAdModal();
    let timeLeft = 5;

    const countdownEl = document.getElementById('ad-countdown');
    const closeBtn = document.getElementById('ad-close-btn');

    // Initialize AdSense
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }

    // Countdown timer
    const interval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(interval);
        countdownEl.textContent = '✓ ניתן לסגור את הפרסומת';
        closeBtn.disabled = false;
        closeBtn.style.opacity = '1';
        closeBtn.style.cursor = 'pointer';
        closeBtn.textContent = 'סגור ותחל במשחק';
      } else {
        countdownEl.textContent = `אתה יכול לסגור בעוד ${timeLeft} שניות...`;
      }
    }, 1000);

    closeBtn.addEventListener('click', () => {
      clearInterval(interval);
      recordGamePlay();
      modal.remove();
      window.location.href = "/imposter_game";
    });

    return;
  }

  // No ad needed: record and go
  recordGamePlay();
  window.location.href = "/imposter_game";
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
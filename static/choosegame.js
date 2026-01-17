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

// Go to Imposter Game
function goToImpoGame() {
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
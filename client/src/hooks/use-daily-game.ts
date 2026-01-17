import { useState, useCallback } from 'react';

interface DailyGameState {
  lastPlayedDate: string | null;
  dailyCount: number;
}

/**
 * Custom hook to manage daily free game limit logic
 * Returns whether to show ad and functions to manage game state
 */
export function useDailyFreeGame() {
  const STORAGE_KEY = 'dailyGameState';
  const MAX_FREE_GAMES_PER_DAY = 1;

  const getDailyState = useCallback((): DailyGameState => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { lastPlayedDate: null, dailyCount: 0 };
    }
    try {
      return JSON.parse(stored);
    } catch {
      return { lastPlayedDate: null, dailyCount: 0 };
    }
  }, []);

  const getCurrentDate = useCallback((): string => {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }, []);

  const shouldShowAd = useCallback((): boolean => {
    const user = localStorage.getItem('currentUser');
    const isPremium = localStorage.getItem('isPremium') === 'true';

    // Premium users don't see ads
    if (isPremium) {
      return false;
    }

    // Not logged in users don't see ads (they shouldn't be in game anyway)
    if (!user) {
      return false;
    }

    const state = getDailyState();
    const today = getCurrentDate();

    // If different day, reset counter - no ad needed
    if (state.lastPlayedDate !== today) {
      return false;
    }

    // Same day: if they've already played once, show ad
    return state.dailyCount >= MAX_FREE_GAMES_PER_DAY;
  }, [getDailyState, getCurrentDate]);

  const recordGamePlay = useCallback((): void => {
    const today = getCurrentDate();
    const state = getDailyState();

    // If it's a new day, reset counter
    if (state.lastPlayedDate !== today) {
      const newState: DailyGameState = {
        lastPlayedDate: today,
        dailyCount: 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } else {
      // Same day: increment counter
      state.dailyCount += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [getDailyState, getCurrentDate]);

  const resetDailyLimit = useCallback((): void => {
    // Only admin or premium users can reset (call from backend if needed)
    const newState: DailyGameState = {
      lastPlayedDate: null,
      dailyCount: 0,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  const getRemainingGames = useCallback((): number => {
    const state = getDailyState();
    const today = getCurrentDate();

    // New day = 1 free game
    if (state.lastPlayedDate !== today) {
      return 1;
    }

    // Same day
    const remaining = Math.max(0, 1 - state.dailyCount);
    return remaining;
  }, [getDailyState, getCurrentDate]);

  return {
    shouldShowAd,
    recordGamePlay,
    resetDailyLimit,
    getRemainingGames,
    getDailyState,
  };
}

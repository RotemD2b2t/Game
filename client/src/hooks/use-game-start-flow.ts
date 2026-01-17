import { useState, useCallback, useEffect } from 'react';
import { useDailyFreeGame } from './use-daily-game';

/**
 * Hook to manage game start flow with ad interstitial
 * Handles checking if ad should be shown and recording game play
 */
export function useGameStartFlow() {
  const [isAdShown, setIsAdShown] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { shouldShowAd, recordGamePlay } = useDailyFreeGame();

  const startGame = useCallback(
    async (gameStartCallback: () => void | Promise<void>) => {
      setIsPending(true);

      try {
        const user = localStorage.getItem('currentUser');
        const isPremium = localStorage.getItem('isPremium') === 'true';

        // Premium or not logged in: start immediately
        if (isPremium || !user) {
          await gameStartCallback();
          setIsPending(false);
          return;
        }

        // Check if ad should be shown
        if (shouldShowAd()) {
          // Show ad modal and wait for it to complete
          setIsAdShown(true);
          // The callback will be triggered after ad modal completes
          return;
        }

        // No ad needed: record play and start game
        recordGamePlay();
        await gameStartCallback();
      } catch (error) {
        console.error('Error starting game:', error);
      } finally {
        setIsPending(false);
      }
    },
    [shouldShowAd, recordGamePlay]
  );

  const handleAdComplete = useCallback(
    async (gameStartCallback: () => void | Promise<void>) => {
      try {
        recordGamePlay();
        setIsAdShown(false);
        await gameStartCallback();
      } catch (error) {
        console.error('Error after ad completion:', error);
        setIsAdShown(false);
      }
    },
    [recordGamePlay]
  );

  return {
    startGame,
    handleAdComplete,
    isAdShown,
    setIsAdShown,
    isPending,
    shouldShowAd,
  };
}

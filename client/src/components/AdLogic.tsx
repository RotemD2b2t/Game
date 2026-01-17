import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AdOverlayProps {
  onAdClosed: () => void;
}

export function AdOverlay({ onAdClosed }: AdOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [timeLeft]);

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Next Game Loading...</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-center text-muted-foreground">
            Watch this ad to start your next game...
          </p>
          {/* AdSense Unit */}
          <div className="w-full h-[250px] bg-muted flex items-center justify-center border-2 border-dashed rounded-md">
            <ins className="adsbygoogle"
                 style={{ display: 'block', minWidth: '300px', minHeight: '250px' }}
                 data-ad-client="ca-pub-4856462370528155"
                 data-ad-slot="YOUR_AD_SLOT"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
          <Button 
            onClick={onAdClosed} 
            disabled={!canClose}
            className="w-full"
            data-testid="button-close-ad"
          >
            {canClose ? "Close Ad & Start Game" : `Wait ${timeLeft}s...`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const checkDailyLimit = () => {
  const today = new Date().toISOString().split('T')[0];
  const lastPlayed = localStorage.getItem('last_played_date');
  let count = parseInt(localStorage.getItem('daily_count') || '0');

  if (lastPlayed !== today) {
    localStorage.setItem('last_played_date', today);
    localStorage.setItem('daily_count', '1');
    return { shouldShowAd: false };
  }

  if (count >= 1) {
    localStorage.setItem('daily_count', (count + 1).toString());
    return { shouldShowAd: true };
  }

  localStorage.setItem('daily_count', (count + 1).toString());
  return { shouldShowAd: false };
};

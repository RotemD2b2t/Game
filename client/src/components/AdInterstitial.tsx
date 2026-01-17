import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { initAdSense, adConfig } from "@/lib/adConfig";

interface AdInterstitialProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
}

export function AdInterstitial({ isOpen, onClose, onAdComplete }: AdInterstitialProps) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Initialize AdSense when dialog opens
    const timer = setTimeout(() => {
      initAdSense();
      setAdLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, timeLeft]);

  const handleClose = () => {
    setTimeLeft(5);
    setAdLoaded(false);
    onAdComplete();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setTimeLeft(5);
        setAdLoaded(false);
        onClose();
      }
    }}>
      <DialogContent className="max-w-2xl z-[9999] bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-center">
            צפה בפרסומת כדי להמשיך למשחק
          </DialogTitle>
        </DialogHeader>
        
        <div className="w-full flex flex-col items-center justify-center gap-4 py-8">
          {/* Ad Container */}
          <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-muted rounded-lg overflow-hidden">
            {adLoaded && (
              <ins
                className="adsbygoogle"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  maxWidth: '728px',
                }}
                data-ad-client={adConfig.adsensePublisherId}
                data-ad-slot={adConfig.footerSlot}
                data-ad-format="auto"
              />
            )}
          </div>

          {/* Countdown Timer */}
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-lg text-muted-foreground">
                אתה יכול לסגור את הפרסומת בעוד {timeLeft} שנייה...
              </p>
            ) : (
              <p className="text-lg text-green-600 font-semibold">
                ✓ ניתן לסגור את הפרסומת
              </p>
            )}
          </div>

          {/* Close Button */}
          <Button
            onClick={handleClose}
            disabled={timeLeft > 0}
            size="lg"
            className="w-full"
          >
            {timeLeft > 0
              ? `המתן ${timeLeft} שנייה...`
              : 'סגור ותחל במשחק'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

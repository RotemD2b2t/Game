/**
 * AdSense Configuration with automatic detection for multiple environments
 * Supports 4 environments:
 * 1. localhost:5001 (development on Mac)
 * 2. game-platform--rotemdujovny.replit.app (production - original)
 * 3. cfea6322-5da0-4046-9bdf-84eb085104be-00-glbm0cltnd21.pike.replit.dev (testing)
 * 4. 2a94b1c6-6e1e-4a7b-a334-078b58df0c1e-00-3v2a3s4g0yco4.pike.replit.dev (production - 2nd)
 */

interface AdConfig {
  adsensePublisherId: string;
  sidebarSlotLeft: string;
  sidebarSlotRight: string;
  footerSlot: string;
}

function getAdConfig(): AdConfig {
  // Get current hostname
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  
  // All environments use the same AdSense publisher ID
  // since they're all part of the same account
  const adsensePublisherId = 'ca-pub-4856462370528155';
  
  // Default ad slots (same for all environments)
  // These will be provided by Google AdSense
  const defaultSlots = {
    sidebarSlotLeft: '1234567890',    // Replace with actual slot from AdSense
    sidebarSlotRight: '0987654321',   // Replace with actual slot from AdSense
    footerSlot: '5555555555',         // Replace with actual slot from AdSense
  };
  
  // Log which environment is being used (for debugging)
  if (typeof window !== 'undefined') {
    console.log(`[AdSense] Detected environment: ${hostname}`);
  }
  
  return {
    adsensePublisherId,
    sidebarSlotLeft: defaultSlots.sidebarSlotLeft,
    sidebarSlotRight: defaultSlots.sidebarSlotRight,
    footerSlot: defaultSlots.footerSlot,
  };
}

export const adConfig = getAdConfig();

/**
 * Initializes AdSense (push ads on page/component load)
 * Call this after mounting components with ads
 */
export function initAdSense() {
  if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }
  }
}

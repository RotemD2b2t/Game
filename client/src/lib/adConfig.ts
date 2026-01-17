/**
 * AdSense Configuration with automatic detection for dev/production
 * Detects current hostname and uses appropriate credentials
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
  
  // Both dev and production use the same publisher ID
  // since they're both part of the same AdSense account
  const adsensePublisherId = 'ca-pub-4856462370528155';
  
  // Default ad slots (same for both dev and prod)
  // These will be provided by Google AdSense
  const defaultSlots = {
    sidebarSlotLeft: '1234567890',    // Replace with actual slot from AdSense
    sidebarSlotRight: '0987654321',   // Replace with actual slot from AdSense
    footerSlot: '5555555555',         // Replace with actual slot from AdSense
  };
  
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

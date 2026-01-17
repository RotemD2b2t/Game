import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { adConfig, initAdSense } from '@/lib/adConfig';

interface LayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isPremium = localStorage.getItem('isPremium') === 'true';
  const isAdmin = localStorage.getItem('currentUser') === 'RotemD';
  const isAdminPage = location === '/admin';
  const shouldShowAds = !isAdminPage && !isPremium;
  const showAdPlaceholder = isAdmin && isPremium; // Show gray placeholder for testing

  useEffect(() => {
    // Initialize AdSense when component mounts and location changes
    if (shouldShowAds) {
      const timer = setTimeout(() => {
        initAdSense();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location, shouldShowAds]);

  // Admin page - no ad layout
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Regular page with ad layout
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Desktop: Left Ad Sidebar */}
      {(shouldShowAds || showAdPlaceholder) && (
        <aside className="hidden md:flex w-[200px] border-r p-4 sticky top-0 h-screen items-center justify-center bg-muted/30 overflow-hidden">
          <div className="w-full h-[600px] flex items-center justify-center overflow-hidden">
            {showAdPlaceholder ? (
              <div className="w-[160px] h-[600px] bg-gray-300 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
                Left Ad Placeholder
              </div>
            ) : (
              <ins
                className="adsbygoogle"
                style={{
                  display: 'block',
                  width: '160px',
                  height: '600px',
                  margin: '0 auto',
                }}
                data-ad-client={adConfig.adsensePublisherId}
                data-ad-slot={adConfig.sidebarSlotLeft}
                data-ad-format="vertical"
              />
            )}
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col min-w-0">
        {/* Content area */}
        <div className={`flex-1 ${shouldShowAds || showAdPlaceholder ? 'md:pb-0' : ''} pb-[90px] md:pb-0`}>
          {children}
        </div>

        {/* Mobile: Sticky Footer Ad */}
        {(shouldShowAds || showAdPlaceholder) && (
          <footer className="md:hidden fixed bottom-0 left-0 right-0 h-[90px] border-t bg-background flex items-center justify-center z-[998] overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              {showAdPlaceholder ? (
                <div className="w-full h-[90px] bg-gray-300 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
                  Footer Ad Placeholder
                </div>
              ) : (
                <ins
                  className="adsbygoogle"
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    height: '90px',
                    maxWidth: '320px',
                  }}
                  data-ad-client={adConfig.adsensePublisherId}
                  data-ad-slot={adConfig.footerSlot}
                  data-ad-format="horizontal"
                />
              )}
            </div>
          </footer>
        )}
      </main>

      {/* Desktop: Right Ad Sidebar */}
      {(shouldShowAds || showAdPlaceholder) && (
        <aside className="hidden md:flex w-[200px] border-l p-4 sticky top-0 h-screen items-center justify-center bg-muted/30 overflow-hidden">
          <div className="w-full h-[600px] flex items-center justify-center overflow-hidden">
            {showAdPlaceholder ? (
              <div className="w-[160px] h-[600px] bg-gray-300 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
                Right Ad Placeholder
              </div>
            ) : (
              <ins
                className="adsbygoogle"
                style={{
                  display: 'block',
                  width: '160px',
                  height: '600px',
                  margin: '0 auto',
                }}
                data-ad-client={adConfig.adsensePublisherId}
                data-ad-slot={adConfig.sidebarSlotRight}
                data-ad-format="vertical"
              />
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

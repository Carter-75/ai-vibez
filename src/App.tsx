import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { AuthProvider } from './contexts/auth-context';
import { AuthModalProvider } from './components/auth/AuthModalProvider';
import { ThemeProvider } from './contexts/theme-context';
import { Toaster } from './components/ui/sonner';
import { AppLayout } from './components/layout/app-layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { IframeProvider } from './contexts/iframe-context';
import { applyIframeStyles, sendMessageToParent } from './utils/iframe';

export default function App() {
  useEffect(() => {
    // Apply iframe styles on mount
    applyIframeStyles();
    
    // Notify parent frame that the app has loaded
    sendMessageToParent({
      type: 'ai-vibez-loaded',
      data: { timestamp: Date.now() }
    });
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <IframeProvider>
          <AuthProvider>
            <AuthModalProvider>
              <AppLayout>
                <Outlet />
              </AppLayout>
              <Toaster richColors position="top-right" />
            </AuthModalProvider>
          </AuthProvider>
        </IframeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
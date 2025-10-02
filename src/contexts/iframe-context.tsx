/**
 * Iframe Context Provider
 * Manages iframe-specific state and configuration throughout the application
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getIframeConfig, listenToParentMessages } from '../utils/iframe';

interface IframeConfig {
  isIframe: boolean;
  isPortfolio: boolean;
  allowedFeatures: {
    showAuthModal: boolean;
    showDeploymentModal: boolean;
    showExternalLinks: boolean;
    allowFullscreen: boolean;
    showFooter: boolean;
    compactMode: boolean;
  };
  styling: {
    headerSize: 'compact' | 'normal';
    sidebarBehavior: 'overlay' | 'normal';
    containerClass: string;
  };
}

interface IframeContextType {
  config: IframeConfig;
  refreshConfig: () => void;
  parentMessage: any;
}

const IframeContext = createContext<IframeContextType | undefined>(undefined);

interface IframeProviderProps {
  children: ReactNode;
}

export function IframeProvider({ children }: IframeProviderProps) {
  const [config, setConfig] = useState<IframeConfig>(() => getIframeConfig());
  const [parentMessage, setParentMessage] = useState<any>(null);

  const refreshConfig = () => {
    setConfig(getIframeConfig());
  };

  useEffect(() => {
    // Set up listener for parent messages
    const unsubscribe = listenToParentMessages((message) => {
      setParentMessage(message);
      
      // Handle specific message types
      if (message?.type === 'theme-change') {
        // Handle theme changes from parent
        document.body.setAttribute('data-parent-theme', message.data?.theme || 'light');
      }
      
      if (message?.type === 'resize') {
        // Handle resize messages from parent
        refreshConfig();
      }
    });

    // Listen for window resize to update config
    const handleResize = () => {
      refreshConfig();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Note: listenToParentMessages doesn't return unsubscribe function yet
      // This is a placeholder for when we implement it
    };
  }, []);

  const value: IframeContextType = {
    config,
    refreshConfig,
    parentMessage,
  };

  return (
    <IframeContext.Provider value={value}>
      {children}
    </IframeContext.Provider>
  );
}

export function useIframe(): IframeContextType {
  const context = useContext(IframeContext);
  if (context === undefined) {
    throw new Error('useIframe must be used within an IframeProvider');
  }
  return context;
}

// Convenience hooks for common iframe checks
export function useIsIframe(): boolean {
  const { config } = useIframe();
  return config.isIframe;
}

export function useIsPortfolioIframe(): boolean {
  const { config } = useIframe();
  return config.isPortfolio;
}

export function useIframeFeatures() {
  const { config } = useIframe();
  return config.allowedFeatures;
}

export function useIframeStyling() {
  const { config } = useIframe();
  return config.styling;
}
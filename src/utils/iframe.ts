/**
 * Iframe detection and utility functions
 * Provides functionality for detecting iframe embedding and adjusting behavior accordingly
 */

/**
 * Detects if the application is running inside an iframe
 */
export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (e) {
    // If we can't access window.top due to cross-origin restrictions,
    // we're likely in an iframe
    return true;
  }
}

/**
 * Detects if the application is embedded on carter-portfolio.fyi
 */
export function isInPortfolioIframe(): boolean {
  try {
    const referrer = document.referrer;
    const parentOrigin = new URL(referrer).origin;
    
    return (
      isInIframe() &&
      (parentOrigin === 'https://carter-portfolio.fyi' ||
       parentOrigin === 'https://www.carter-portfolio.fyi' ||
       // Local development
       parentOrigin.includes('localhost:4000') ||
       parentOrigin.includes('localhost:8080'))
    );
  } catch (e) {
    // Fallback: check if we're in iframe and have portfolio-related query params
    return isInIframe() && (
      window.location.search.includes('portfolio=true') ||
      window.location.search.includes('embed=portfolio')
    );
  }
}

/**
 * Gets iframe-specific configuration
 */
export function getIframeConfig() {
  const inIframe = isInIframe();
  const inPortfolio = isInPortfolioIframe();
  
  return {
    isIframe: inIframe,
    isPortfolio: inPortfolio,
    allowedFeatures: {
      // Disable certain features when in iframe
      showAuthModal: !inIframe,
      showDeploymentModal: !inIframe,
      showExternalLinks: !inIframe,
      allowFullscreen: inIframe,
      showFooter: !inIframe,
      compactMode: inIframe,
    },
    styling: {
      headerSize: inIframe ? 'compact' : 'normal',
      sidebarBehavior: inIframe ? 'overlay' : 'normal',
      containerClass: inPortfolio ? 'portfolio-iframe-mode' : inIframe ? 'iframe-mode' : '',
    },
  };
}

/**
 * Apply iframe-specific body classes
 */
export function applyIframeStyles() {
  const config = getIframeConfig();
  const body = document.body;
  
  // Remove existing iframe classes
  body.classList.remove('iframe-mode', 'portfolio-iframe-mode');
  
  // Apply appropriate iframe class
  if (config.styling.containerClass) {
    body.classList.add(config.styling.containerClass);
  }
  
  // Add data attributes for CSS targeting
  body.setAttribute('data-iframe', config.isIframe.toString());
  body.setAttribute('data-portfolio', config.isPortfolio.toString());
}

/**
 * Send message to parent frame (for portfolio integration)
 */
export function sendMessageToParent(message: { type: string; data?: any }) {
  if (isInIframe() && window.parent) {
    try {
      window.parent.postMessage({
        source: 'ai-vibez',
        ...message,
      }, '*');
    } catch (e) {
      console.warn('Could not send message to parent frame:', e);
    }
  }
}

/**
 * Listen for messages from parent frame
 */
export function listenToParentMessages(handler: (message: any) => void) {
  if (isInIframe()) {
    window.addEventListener('message', (event) => {
      // Verify origin for security
      if (isInPortfolioIframe()) {
        const allowedOrigins = [
          'https://carter-portfolio.fyi',
          'https://www.carter-portfolio.fyi',
        ];
        
        // Allow localhost for development
        if (event.origin.includes('localhost')) {
          allowedOrigins.push(event.origin);
        }
        
        if (allowedOrigins.includes(event.origin)) {
          handler(event.data);
        }
      }
    });
  }
}

/**
 * Get optimal iframe dimensions for portfolio display
 */
export function getOptimalIframeDimensions() {
  return {
    width: '100%',
    minWidth: '320px',
    height: '600px',
    minHeight: '500px',
    maxHeight: '800px',
    aspectRatio: '16/10',
  };
}
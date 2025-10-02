# Iframe Embedding Guide for AI Vibez

This document explains how to embed AI Vibez in an iframe, specifically for integration with carter-portfolio.fyi and other authorized domains.

## Overview

AI Vibez now supports iframe embedding with the following features:
- **Secure iframe headers** - Proper X-Frame-Options and CSP configuration
- **Responsive design** - Adapts to iframe container dimensions
- **Portfolio integration** - Special styling and behavior for carter-portfolio.fyi
- **Parent communication** - PostMessage API for interaction with parent page

## Authorized Domains

AI Vibez can be embedded on the following domains:
- `https://carter-portfolio.fyi`
- `https://www.carter-portfolio.fyi`
- Local development: `http://localhost:4000`, `http://localhost:8080`

## Basic Embedding

### HTML
```html
<iframe 
  src="https://your-ai-vibez-domain.com" 
  width="100%" 
  height="600"
  frameborder="0"
  allowfullscreen
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  title="AI Vibez - AI-Powered App Builder">
</iframe>
```

### Recommended CSS
```css
.ai-vibez-iframe {
  width: 100%;
  min-width: 320px;
  height: 600px;
  min-height: 500px;
  max-height: 800px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
}

/* Responsive behavior */
@media (max-width: 768px) {
  .ai-vibez-iframe {
    height: 500px;
    border-radius: 8px;
  }
}
```

## Portfolio Integration Features

When embedded on carter-portfolio.fyi, AI Vibez automatically:

### Visual Adjustments
- Applies `portfolio-iframe-mode` styling
- Reduces header size for compact display
- Hides external links and footer elements
- Optimizes for showcase presentation

### Responsive Behavior
- Collapses sidebar on mobile devices
- Adjusts font sizes for readability
- Maintains functionality within constrained space

### Parent Communication
AI Vibez sends messages to the parent frame for:
- Load completion notifications
- Theme changes
- Resize requests

## Postmessage API

### Messages from AI Vibez to Parent
```javascript
// App loaded notification
{
  source: 'ai-vibez',
  type: 'ai-vibez-loaded',
  data: { timestamp: Date.now() }
}

// Theme change notification
{
  source: 'ai-vibez',
  type: 'theme-changed',
  data: { theme: 'dark' | 'light' }
}
```

### Messages from Parent to AI Vibez
```javascript
// Change theme
window.frames[0].postMessage({
  type: 'theme-change',
  data: { theme: 'dark' }
}, 'https://your-ai-vibez-domain.com');

// Notify of resize
window.frames[0].postMessage({
  type: 'resize',
  data: { width: 800, height: 600 }
}, 'https://your-ai-vibez-domain.com');
```

## Security Features

### Content Security Policy
AI Vibez uses CSP headers that allow embedding on authorized domains:
```
frame-ancestors 'self' https://carter-portfolio.fyi https://www.carter-portfolio.fyi;
```

### Origin Validation
- Validates referrer headers for iframe requests
- Applies different styling based on parent domain
- Blocks unauthorized iframe embedding attempts

### Sandbox Attributes
Recommended iframe sandbox attributes:
- `allow-scripts` - Required for app functionality
- `allow-same-origin` - Required for API calls
- `allow-forms` - Required for user interactions
- `allow-popups` - Required for certain features

## Implementation Example for Carter Portfolio

```html
<!DOCTYPE html>
<html>
<head>
  <title>Carter's Portfolio - AI Vibez Demo</title>
  <style>
    .demo-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .ai-vibez-showcase {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px;
      border-radius: 16px;
      margin: 40px 0;
    }
    
    .ai-vibez-iframe {
      width: 100%;
      height: 600px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
  </style>
</head>
<body>
  <div class="demo-container">
    <h1>AI Vibez Demo</h1>
    <p>Experience AI-powered app development:</p>
    
    <div class="ai-vibez-showcase">
      <iframe 
        class="ai-vibez-iframe"
        src="https://your-ai-vibez-domain.com?embed=portfolio"
        allowfullscreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="AI Vibez - Interactive Demo">
      </iframe>
    </div>
  </div>

  <script>
    // Listen for messages from AI Vibez iframe
    window.addEventListener('message', (event) => {
      if (event.data.source === 'ai-vibez') {
        console.log('AI Vibez message:', event.data);
        
        if (event.data.type === 'ai-vibez-loaded') {
          console.log('AI Vibez has loaded successfully');
        }
      }
    });
  </script>
</body>
</html>
```

## Configuration Options

### Query Parameters
- `?embed=portfolio` - Enables portfolio-specific styling
- `?theme=dark` - Sets initial theme (dark/light)
- `?compact=true` - Enables compact mode

### URL Examples
```
https://your-ai-vibez-domain.com?embed=portfolio&theme=dark
https://your-ai-vibez-domain.com?compact=true
```

## Troubleshooting

### Common Issues

1. **Iframe not loading**
   - Check that the domain is in the authorized list
   - Verify HTTPS is being used (required for secure contexts)

2. **Content appears cut off**
   - Ensure minimum height of 500px
   - Check responsive CSS rules

3. **Features missing in iframe**
   - Some features (auth modals, deployment) are disabled in iframe mode
   - This is intentional for security and UX reasons

### Debug Information
AI Vibez adds debug attributes to the body element when in iframe mode:
- `data-iframe="true"` - Indicates iframe mode
- `data-portfolio="true"` - Indicates portfolio embedding

## Browser Support

AI Vibez iframe embedding is supported in:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Considerations

- First load may take 2-3 seconds for full initialization
- Subsequent interactions are optimized for iframe context
- Large applications may need increased height for optimal display

## Contact

For questions about iframe embedding or authorization requests, please open an issue in the AI Vibez repository.
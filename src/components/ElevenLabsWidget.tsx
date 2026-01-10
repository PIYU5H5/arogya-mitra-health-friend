import { useEffect, useState, useRef } from "react";

const ElevenLabsWidget = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const widgetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure navigator.mediaDevices exists to prevent "undefined" errors
    if (typeof navigator !== 'undefined' && !navigator.mediaDevices) {
      // Create a dummy mediaDevices object to prevent "undefined" errors
      // This won't make getUserMedia work, but it prevents the widget from crashing
      (navigator as any).mediaDevices = {
        getUserMedia: () => Promise.reject(new Error('MediaDevices API not available')),
        enumerateDevices: () => Promise.resolve([]),
        getSupportedConstraints: () => ({})
      };
    }

    // Check if we're in a secure context (HTTPS or localhost/127.0.0.1)
    const isSecureContext = 
      location.protocol === 'https:' || 
      location.hostname === 'localhost' || 
      location.hostname === '127.0.0.1' ||
      location.hostname === '[::1]' ||
      (typeof window !== 'undefined' && window.isSecureContext === true);

    // Check if mediaDevices API is actually functional
    const hasMediaDevices = 
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function';

    if (!isSecureContext) {
      setErrorMessage("ElevenLabs widget requires HTTPS or localhost for microphone access.");
      setHasError(true);
      console.warn("ElevenLabs widget unavailable: Requires HTTPS or localhost");
      return;
    }

    if (!hasMediaDevices) {
      setErrorMessage("Your browser doesn't support microphone access.");
      setHasError(true);
      console.warn("ElevenLabs widget unavailable: MediaDevices API not available");
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="@elevenlabs/convai-widget-embed"]');
    if (existingScript) {
      // Check if custom element is defined
      if (customElements.get('elevenlabs-convai')) {
        setScriptLoaded(true);
      } else {
        // Wait for custom element to be defined
        customElements.whenDefined('elevenlabs-convai').then(() => {
          setScriptLoaded(true);
        });
      }
      return;
    }

    // Global error handler for widget-specific errors
    const handleWidgetError = (e: ErrorEvent) => {
      const errorMsg = e.message || e.error?.message || '';
      if (
        errorMsg.includes('getUserMedia') || 
        errorMsg.includes('mediaDevices') ||
        errorMsg.includes('permission') ||
        (e.target && (e.target as HTMLElement).tagName?.toLowerCase() === 'elevenlabs-convai')
      ) {
        setErrorMessage("Microphone access denied or unavailable. Please check browser permissions.");
        setHasError(true);
        console.error("ElevenLabs widget error:", e.message);
      }
    };

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason?.message || String(e.reason || '');
      if (reason.includes('getUserMedia') || reason.includes('mediaDevices')) {
        setErrorMessage("Microphone access denied or unavailable. Please check browser permissions.");
        setHasError(true);
        console.error("ElevenLabs widget promise rejection:", reason);
      }
    };

    window.addEventListener('error', handleWidgetError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Load the ElevenLabs script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    
    script.onload = () => {
      // Wait a bit for the custom element to be registered
      let attempts = 0;
      const checkCustomElement = setInterval(() => {
        attempts++;
        if (customElements.get('elevenlabs-convai')) {
          clearInterval(checkCustomElement);
          setScriptLoaded(true);
        } else if (attempts > 20) {
          // Timeout after 2 seconds
          clearInterval(checkCustomElement);
          console.warn("ElevenLabs custom element not registered after timeout");
          setScriptLoaded(true); // Still try to render, might work
        }
      }, 100);
    };
    
    script.onerror = () => {
      console.error("Failed to load ElevenLabs widget script");
      setErrorMessage("Failed to load ElevenLabs widget. Please check your internet connection.");
      setHasError(true);
    };

    document.body.appendChild(script);

    return () => {
      window.removeEventListener('error', handleWidgetError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      // Cleanup script on unmount only if we added it
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Cleanup widget element if it exists
      if (widgetRef.current?.parentNode) {
        widgetRef.current.parentNode.removeChild(widgetRef.current);
      }
    };
  }, []);

  // Don't render the widget if there's an error
  if (hasError) {
    // Silently fail - widget won't be displayed
    return null;
  }

  // Only render the widget element after script is loaded and mediaDevices is available
  if (!scriptLoaded) {
    return null;
  }

  // Double-check mediaDevices availability before rendering
  if (typeof navigator === 'undefined' || !navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return null;
  }

  try {
    return (
      <>
        {/* @ts-ignore - Custom element from ElevenLabs */}
        <elevenlabs-convai 
          agent-id="agent_3901kek7045aes9rvnzgb880169r"
        />
      </>
    );
  } catch (error) {
    console.error("Error rendering ElevenLabs widget:", error);
    return null;
  }
};

export default ElevenLabsWidget;

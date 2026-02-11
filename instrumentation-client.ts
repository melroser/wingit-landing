// instrumentation-client.ts (use this in ALL THREE apps)
import posthog from "posthog-js";

const isProd = process.env.NODE_ENV === "production";    
const apiHost = isProd ? "/ph" : "https://us.i.posthog.com";    
const uiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";    
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

function addPostHogIdsToUrl(url: string): string {    
  // Support cross-domain tracking to wingit.dev and app.wingit.dev  
  if (!url.includes('wingit.dev') && !url.includes('app.wingit.dev')) return url;  
    
  const sessionId = posthog.get_session_id();    
  const distinctId = posthog.get_distinct_id();    
  if (!sessionId || !distinctId) return url;    
  const separator = url.includes('?') ? '&' : '?';    
  return `${url}${separator}ph_session_id=${sessionId}&ph_distinct_id=${distinctId}`;    
}

let isInitialized = false;

export function initPostHog() {    
  if (isInitialized || typeof window === "undefined" || !key) return;    
      
  console.log('[PostHog] Initializing with key:', key?.substring(0, 10) + '...');    
      
  const params = new URLSearchParams(window.location.search);    
  const bootstrap_session_id = params.get('ph_session_id');    
  const bootstrap_distinct_id = params.get('ph_distinct_id');

  console.log('[PostHog] Bootstrap params:', { bootstrap_session_id, bootstrap_distinct_id });

  const config: any = {  
    api_host: apiHost,    
    session_recording: {    
      maskAllInputs: true,    
    },    
    mask_all_text: false,    
    cross_subdomain_cookie: true,    
    ui_host: uiHost,    
    defaults: "2025-11-30",    
    capture_pageview: true,    
    capture_exceptions: true,    
    debug: !isProd,    
    person_profiles: 'identified_only',  
  };

  // Add bootstrap if IDs exist  
  if (bootstrap_session_id && bootstrap_distinct_id) {  
    config.bootstrap = {  
      sessionID: bootstrap_session_id,  
      distinctID: bootstrap_distinct_id,  
    };  
    console.log('[PostHog] Using bootstrap:', config.bootstrap);  
  } else {  
    console.log('[PostHog] No bootstrap params found, creating new session');  
  }

  posthog.init(key, config);

  (window as any).posthog = posthog;    
  (window as any).__addPostHogIdsToUrl = addPostHogIdsToUrl;    
      
  isInitialized = true;    
  console.log('[PostHog] Initialized successfully');    
}

if (typeof window !== "undefined") {    
  initPostHog();    
}  

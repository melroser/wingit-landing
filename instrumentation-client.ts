import posthog from "posthog-js"

const isProd = process.env.NODE_ENV === "production"

// Netlify reverse proxy path in prod, direct ingest in dev
const apiHost = isProd ? "/ph" : "https://us.i.posthog.com"

// UI host should be the PostHog app, especially when api_host is proxied
const uiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: apiHost,
  ui_host: uiHost,

  // config snapshot defaults (valid values include "2025-05-24")
  defaults: "2025-05-24",

  capture_exceptions: true,
  debug: !isProd,
})

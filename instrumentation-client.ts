import posthog from "posthog-js";

const isProd = process.env.NODE_ENV === "production";
const apiHost = isProd ? "/ph" : "https://us.i.posthog.com";
const uiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (typeof window !== "undefined" && key) {
  posthog.init(key, {
    api_host: apiHost,
    ui_host: uiHost,
    defaults: "2025-11-30",
    capture_exceptions: true,
    debug: !isProd,
    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
  });

  // make it accessible in DevTools
  (window as any).posthog = posthog;
} else {
  // optional: helps catch missing key in prod
  if (typeof window !== "undefined") console.warn("PostHog key missing: NEXT_PUBLIC_POSTHOG_KEY");
}

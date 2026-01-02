"use client";

import type { ReactNode } from "react";
import "../instrumentation-client"; // runs posthog.init as a side effect

export default function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

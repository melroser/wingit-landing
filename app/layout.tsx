import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://wingit.dev"),
  title: "WingIt — AI presentations that don’t look like AI",
  description:
    "Generate clean, on-brand slide decks fast. Edit like a doc. Present live. Share instantly.",
  openGraph: {
    title: "WingIt — AI presentations that don’t look like AI",
    description:
      "Generate clean, on-brand slide decks fast. Edit like a doc. Present live. Share instantly.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WingIt — AI presentations that don’t look like AI",
    description:
      "Generate clean, on-brand slide decks fast. Edit like a doc. Present live. Share instantly.",
    images: ["/og.png"],
  },
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
            <Providers>{children}</Providers>
        </body>
    </html>
  );
}

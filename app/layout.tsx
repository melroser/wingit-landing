import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://wingit.dev"),
  title: "WingIt - AI-Generated Slides",
  description:
    "Generate Slides as you speak. Share Instantly.",
  openGraph: {
    title: "WingIt — AI-Generated Slides",
    description:
      "Generate Slides as you speak. Share Instantly.",
    images: [{ url: "/wingit.png", width: 634, height: 490 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WingIt — AI-Generated Slides",
    description:
      "Generate Slides as you speak. Share Instantly.",
    images: ["/wingit.svg"],
  },
  icons: [{ rel: "icon", url: "/favicon-32x32.png" }],
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

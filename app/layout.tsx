import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { getPageContent } from "@/lib/content";
import "./globals.css";

const sans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const heading = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const { meta } = getPageContent();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${meta.title} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: meta.description,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: meta.title,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
};

export const viewport: Viewport = { themeColor: "#002159" }; // --brand-900

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

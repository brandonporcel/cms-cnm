import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appDescription = "A CMS - CNM Dream";
const appShortTitle = "Sanity integration";

export const metadata: Metadata = {
  title: "CMS - CNM",
  description: appDescription,
  keywords: ["Sanity", "CMS", "Cinema"],
  authors: { name: "Brandon Porcel", url: "https://github.com/brandonporcel?" },
  creator: "Brandon Porcel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cms-cnm.vercel.app",
    title: appShortTitle,
    description: appDescription,
    siteName: "GOAT",
    images: [
      {
        url: "https://cms-cnm.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appShortTitle,
    description: appDescription,
    images: [
      {
        url: "https://cms-cnm.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: [
    {
      type: "favicon",
      url: "favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

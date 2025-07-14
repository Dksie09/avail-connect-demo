import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avail Connect Demo",
  description: "Demo app for avail-connect sdk",
  metadataBase: new URL("https://avail-connect-sdk-demo.vercel.app"),
  openGraph: {
    title: "Avail Connect Demo",
    description:
      "A modern demo showcasing Avail blockchain wallet integration using avail-connect SDK.",
    url: "https://avail-connect-sdk-demo.vercel.app", // change this
    siteName: "Avail Connect Demo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Avail Connect Wallet Demo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avail Connect Demo",
    description:
      "A modern demo showcasing Avail blockchain wallet integration using avail-connect SDK.",
    images: ["/og.png"],
    creator: "@AvailProject",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
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
        <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

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

export const metadata: Metadata = {
  title: "SecureSight - CCTV Monitoring Dashboard",
  description: "Professional CCTV monitoring and incident tracking dashboard",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Prevent unwanted script injections in production */}
        {process.env.NODE_ENV === 'production' && (
          <meta 
            httpEquiv="Content-Security-Policy" 
            content="script-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self' https:; default-src 'self';" 
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shipfront: The Crate",
  description:
    "The operating system for freight. Bookings, carriers, documents, exceptions, and live tracking in one workspace.",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#07090D",
  colorScheme: "dark" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-bg text-ink antialiased`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="grid-field" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="relative z-[2]">
          <SiteNav />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

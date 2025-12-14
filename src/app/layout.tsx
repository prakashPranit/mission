import type { Metadata } from "next";
import { cinzel, cormorant, geistMono } from "./fonts";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "The Digital Mandapa",
  description: "A convergence of ancient wisdom and digital engineering.",
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${geistMono.variable} antialiased bg-background text-foreground font-body`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster richColors position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Cardwriter",
  description: "Cardwriter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <main className={"max-w-screen-lg h-screen m-auto"}>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

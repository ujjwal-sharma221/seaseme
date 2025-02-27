import type { Metadata } from "next";
import { Asap } from "next/font/google";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

const font = Asap({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} px-4  antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster closeButton position="top-right" />
      </body>
    </html>
  );
}

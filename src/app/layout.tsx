"use client";

import "./globals.css";

// import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";

// const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-stone-50 dark:bg-stone-900 ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;

import type { Metadata } from "next";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";
import SetTheme from "@/components/SetTheme";

const variFont = localFont({
  src: './fonts/Comfortaa-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-variable'
})

const monoFont = localFont({
  src: './fonts/VictorMono-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-monospace'
})

export const metadata: Metadata = {
  title: "📝 homework-kanban",
  description: "Hi SOSi!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${variFont.variable} ${monoFont.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SetTheme />
          <div className={`h-screen p-5`}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

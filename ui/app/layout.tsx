import type { Metadata } from "next";
import "./globals.css";

import localFont from 'next/font/local'

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
    <html lang="en">
      <body className={`${variFont.variable} ${monoFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

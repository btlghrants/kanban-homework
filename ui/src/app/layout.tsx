import type { Metadata } from "next";
import "./globals.css";

import localFont from 'next/font/local'

const comfortaa = localFont({
  src: './fonts/Comfortaa-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-comfortaa'
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
      <body
        className={`${comfortaa.variable} antialiased`}
      >
        <h1 className="text-3xl">Root</h1>
        {children}
      </body>
    </html>
  );
}

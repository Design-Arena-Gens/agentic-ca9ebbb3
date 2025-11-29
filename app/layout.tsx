import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Vlog Prompt Generator - Google Veo 3.1",
  description: "Generate realistic food vlogging video prompts for Google Veo 3.1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}

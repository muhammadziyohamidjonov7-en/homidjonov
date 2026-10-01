import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiniFutbol — maydonni band qiling",
  description: "Toshkentdagi mini futbol maydonlarini toping va qulay vaqtda bron qiling.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
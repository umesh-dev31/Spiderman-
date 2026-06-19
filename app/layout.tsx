import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spider-Man: Brand New Day — In Cinemas July 31, 2026",
  description: "A new chapter begins. Spider-Man: Brand New Day — the most anticipated Marvel film of 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

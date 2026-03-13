import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Flow Showcase",
  description:
    "A polished Next.js application demonstrating the full power of the React Flow library for interactive diagrams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

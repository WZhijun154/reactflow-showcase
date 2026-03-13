import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

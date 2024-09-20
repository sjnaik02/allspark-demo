import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: "AllSpark",
  description: "AllSpark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}

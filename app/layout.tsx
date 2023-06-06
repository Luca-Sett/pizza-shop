import "./globals.css";
import { Poppins, Calistoga } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const calistoga = Calistoga({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-header",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${poppins.className} ${calistoga.variable} text-dark overflow-hidden`}>{children}</body>
    </html>
  );
}

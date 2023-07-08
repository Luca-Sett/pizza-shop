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
      <head>
        <title>Luca&apos;s Pizzeria</title>
        <meta
          name="description"
          content="Welcome to Luca's Pizzeria, the Best Pizza Ever! Order for collection or delivery here."
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,0,200"
        />
      </head>
      <body
        className={`${poppins.className} ${calistoga.variable} bg-off-white text-dark selection:bg-red-fg/25`}
      >
        {children}
      </body>
    </html>
  );
}

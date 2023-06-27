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
        <title>Luca's Pizzeria</title>
        <meta
          name="description"
          content="Welcome to Luca's Pizzeria, the Best Pizza Ever! Order for collection or delivery here."
        />
      </head>
      <body
        className={`${poppins.className} ${calistoga.variable} text-dark bg-off-white selection:bg-red-fg/25`}
      >
        {children}
      </body>
    </html>
  );
}

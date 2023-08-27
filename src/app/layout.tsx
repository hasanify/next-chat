import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextChat",
  description: "A realtime chat app made with NextJs!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="google-site-verification"
          content="14DgbqIjsLHaS01u1oaTmQhlK1jFytHRNX4odR2KcyQ"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#030712" />
      </head>
      <body className={`${inter.className} bg-gray-950 text-light`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

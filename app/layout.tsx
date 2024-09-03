import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });


const poppins = Poppins(
  { subsets: ["latin"],
  weight:['400','500','600','700'],
  variable:'--font-poppins'
});


export const metadata: Metadata = {
  title: 'Latheef',
  description: 'Latheef Ecommerce App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body className={poppins.className}>{children}</body>
      </Providers>
    </html>
  );
}

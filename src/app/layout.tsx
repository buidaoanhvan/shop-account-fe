import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const geistMontser = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Shop Tài Khoản",
  description: "Shop Tài Khoản",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistMontser.variable} antialiased`}>{children}</body>
    </html>
  );
}

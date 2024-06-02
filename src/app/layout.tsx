import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Softness - интернет-магазин мягких игрушек",
  description: "Мягкие игрушки высочайшего качества изготавливаются нами вручную и любовью. С доставкой по России.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

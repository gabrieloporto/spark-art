import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SparkArt",
  description:
    "Describe tu idea, y nuestro sistema la convertirá en una imagen usando inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased flex flex-col justify-between mx-[15%] lg:mx-[25%] bg-[#293747] text-[#eaeef4] gap-2 overflow-hidden min-h-screen my-8`}
      >
        {children}
      </body>
    </html>
  );
}

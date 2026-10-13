import type { Metadata } from "next";
import { Noto_Sans_TC, Nunito } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "東方靈數計算機",
  description:
    "輸入身分證字號、手機、車牌或地址，計算生氣、天醫、延年、伏位、絕命、五鬼、六煞、禍害八星磁場。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${notoSansTC.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

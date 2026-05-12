import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROTA-AI | Doğru Rota, Akıllı Çözüm — AI Otomasyon Ajansı",
  description:
    "ROTA-AI, işletmeler için web geliştirme, yapay zekâ otomasyonu, sosyal medya yönetimi ve e-ticaret çözümleri sunan AI otomasyon ajansıdır.",
  keywords: [
    "AI otomasyon",
    "web geliştirme",
    "yapay zeka",
    "dijital dönüşüm",
    "chatbot",
    "otomasyon ajansı",
    "e-ticaret otomasyonu",
    "sosyal medya otomasyonu",
    "İstanbul",
    "Türkiye",
  ],
  authors: [{ name: "ROTA-AI" }],
  openGraph: {
    title: "ROTA-AI | Doğru Rota, Akıllı Çözüm",
    description:
      "Web geliştirme ve AI otomasyon çözümleri ile işletmenizin dijital dönüşüm ortağı.",
    url: "https://rota-ai.com.tr",
    siteName: "ROTA-AI",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROTA-AI | Doğru Rota, Akıllı Çözüm",
    description:
      "Web geliştirme ve AI otomasyon çözümleri ile işletmenizin dijital dönüşüm ortağı.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#6366F1" />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}

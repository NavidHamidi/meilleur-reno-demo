import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MeilleureReno — Rénovation énergétique",
  description:
    "Jusqu'à 70 % d'aides financières pour vos travaux d'isolation à Paris. Artisans RGE certifiés, dossiers MaPrimeRénov' gérés, économies garanties.",
  keywords: [
    "rénovation énergétique",
    "isolation thermique Paris",
    "MaPrimeRénov",
    "artisans RGE",
    "aide isolation",
    "économies énergie",
  ],
  openGraph: {
    title: "MeilleureReno — Réduisez vos factures grâce à l'isolation",
    description:
      "Simulation gratuite en 2 minutes. Nos experts calculent vos aides et votre potentiel d'économies sous 24h.",
    url: "https://www.meilleurereno.com",
    siteName: "MeilleureReno",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://entreprise-esma.example"),
  title: {
    default: "ENTREPRISE ESMA | Travaux Publics, Bâtiment et Hydraulique au Niger",
    template: "%s | ENTREPRISE ESMA",
  },
  description:
    "ENTREPRISE ESMA, créée à Agadez en 2001, accompagne les projets de travaux publics, bâtiment, hydraulique, assainissement, industrie et services techniques au Niger.",
  keywords: [
    "entreprise BTP Niger",
    "travaux publics Agadez",
    "hydraulique Niger",
    "entreprise construction Niger",
    "assainissement Agadez",
    "services industriels Niger",
    "ENTREPRISE ESMA",
  ],
  authors: [{ name: "ENTREPRISE ESMA" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ENTREPRISE ESMA",
    description:
      "Plus de 20 ans d'expertise au service des infrastructures et du développement au Niger.",
    siteName: "ENTREPRISE ESMA",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

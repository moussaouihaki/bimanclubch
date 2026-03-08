import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Club Birman Suisse | L'Excellence",
  description: "Portail officiel de l'association suisse pour le Sacré de Birmanie.",
  icons: {
    icon: '/images/logo.png', // Fallback icon path if the browser needs it
    shortcut: '/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <I18nProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

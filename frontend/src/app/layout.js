import { Geist, Amiri, Scheherazade_New } from "next/font/google";
import { SettingsProvider } from "@/context/SettingsContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

const scheherazade = Scheherazade_New({
  variable: "--font-scheherazade",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Al-Quran | Digital Quran Application",
  description:
    "Read, search and explore the Holy Quran with beautiful typography and translations.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${amiri.variable} ${scheherazade.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
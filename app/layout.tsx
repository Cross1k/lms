import type { Metadata } from "next";
import { Montserrat, Mulish } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumi",
  description: "Learning illuminated",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={routing.defaultLocale}
      className={`${montserrat.variable} ${mulish.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

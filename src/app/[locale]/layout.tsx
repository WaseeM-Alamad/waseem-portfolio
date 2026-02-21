import type { Metadata } from "next";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/contexts/SmoothScrollContext";

const hilmar = localFont({
  src: [
    {
      path: "../../fonts/Hilmar-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Hilmar-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/Hilmar-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hilmar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waseem Alamad | Software Developer Portfolio",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32" },
    ],
  },
  description:
    "My portfolio where you can learn more about me and get a glance at my super cool projects 🤓",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-section="default"
    >
      <body suppressHydrationWarning className={hilmar.variable}>
        <NextIntlClientProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

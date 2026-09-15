import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "GovProcure IQ — USAC Form 470 & Public Procurement Intelligence Platform",
  description: "Automated E-Rate Form 470 RFP intelligence, transparent opportunity scoring, and public-sector technology purchasing history aggregation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased w-full min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Central Demo Traffic Verification Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=erate-procure-iq"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// Import components with no SSR
const ClientLayout = dynamic(() => import("@/components/layout/ClientLayout"), {
  ssr: false,
});

const Web3ProvidersNoSSR = dynamic(
  () => import("@/components/shared/Web3Providers"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Pharos | Decentralized Crowdfunding",
  description:
    "A decentralized crowdfunding platform built on blockchain technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3ProvidersNoSSR>
            <ClientLayout>{children}</ClientLayout>
          </Web3ProvidersNoSSR>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers";
import AuthProvider from "@/lib/AuthProvider";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Midlands - Seamless Payments to Crypto Conversion",
  description:
    "Midlands enables users to receive payments globally via bank transfers or credit card and convert them instantly into cryptocurrency. Secure, fast, and efficient payment solutions for a global audience.",
  keywords:
    "Global Payments, Cryptocurrency Conversion, Secure Transactions, Multi-Currency Support, Instant Crypto Payments, Payment Gateway, Crypto Wallet Integration, International Transfers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

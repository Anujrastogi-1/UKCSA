import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "./components";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSA Uttarakhand Chapter",
  description: "Cloud Security Alliance Uttarakhand Chapter"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

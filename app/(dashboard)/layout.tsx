import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "../globals.css";
import LeftsideBar from "@/components/layout/LeftsideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "BSCreates - Dashboard",
  description: "Admin Dashboard for BSCreates' data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={inter.className}>
       <ToasterProvider />
        <div className="flex max-lg:flex-col text-grey-1">
         <LeftsideBar />
         <TopBar />
         <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}

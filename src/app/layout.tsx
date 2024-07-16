import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalNav } from "@/ui/global-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animation Collection",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="overflow-y-scroll bg-gray-1100 pb-36">
        <GlobalNav />

        <div className="lg:pl-72">
          <div className="mx-auto max-w-[1200px] space-y-8 px-2 pt-20 lg:px-8 lg:py-8">

            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sessionprovider from "./providers/sessionprovider";
import Themeprovider from "./providers/themeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXf9sQhYbbVARXX_XsGXH6cznRTTL80-k&libraries=places&callback=initMap" async></script>
      </head>
      <body className={`${inter.className}  dark:bg-darkprimary`}>
        <Sessionprovider>
          <Themeprovider>
            {children}
          </Themeprovider>
        </Sessionprovider>
      </body>
    </html>
  );
}

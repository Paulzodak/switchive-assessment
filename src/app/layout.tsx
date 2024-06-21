// "use client";
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { selectShowFilter, setShowFilter } from "@/slices/navSlice";
import { Modal } from "@/components/atoms/Modal";
import { Providers } from "@/components/templates/providers";
// import { AnimatePresence, motion } from "framer-motion";

const metadata: Metadata = {
  title: "SHOPPY",
  description: "AN E-COMMERCE WEBSITE ASSESSMENT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const dispatch = useDispatch();
  // const showFilter = useSelector(selectShowFilter);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body className={" text-blue-950 text-[rgb(23 37 84)]"}>
        <Providers>
          <Navbar />
          {/* <header className="bg-gray-100 text-center h-12 flex items-center justify-center font-semibold ">
            HOME
          </header> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}

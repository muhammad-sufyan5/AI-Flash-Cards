import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Navbar from "@/components/landing-page/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Flashcards",
  description: "AI Flashcard App built using NEXT JS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <Navbar></Navbar>
          </header>
          <main>
            <ToastContainer />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

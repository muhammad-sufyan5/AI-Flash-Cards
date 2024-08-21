import { db } from "@/backend/db/firbase.config";
import Features from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { query, collection, where, getDoc, getDocs } from "firebase/firestore";

export default function LandingPage() {
  // const { userId } = auth();

  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      {/* <Features /> */}
      <Footer />
    </div>
  );
}
//This is the main page

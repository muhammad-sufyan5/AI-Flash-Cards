"use client";

import { useState } from "react";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FaBookOpen, FaUser, FaInfoCircle, FaPhone, FaCog, FaQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isFAQModalOpen, setFAQModalOpen] = useState(false);

  const handleAboutModalOpen = () => setAboutModalOpen(true);
  const handleAboutModalClose = () => setAboutModalOpen(false);
  const handleFAQModalOpen = () => setFAQModalOpen(true);
  const handleFAQModalClose = () => setFAQModalOpen(false);

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-md">
        <div className="flex items-center space-x-4">
          {/* Logo/Icon */}
          <Link href={"/"} className="flex items-center space-x-2">
            <FaBookOpen className="text-3xl hover:text-purple-400 transition-colors duration-300" />
            <span className="text-xl font-bold hidden md:inline hover:text-purple-400 transition-colors duration-300">
              CardMaster
            </span>
          </Link>
        </div>

        <div className="flex-grow flex items-center justify-center space-x-8">
          <Link href="/" className="relative group text-gray-300 hover:text-purple-400 transition-colors duration-300">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
          <Link href="/dashboard" className="relative group text-gray-300 hover:text-purple-400 transition-colors duration-300">
            Dashboard
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
          <button
            onClick={handleAboutModalOpen}
            className="relative group text-gray-300 hover:text-purple-400 transition-colors duration-300"
          >
            About
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </button>
          <button
            onClick={handleFAQModalOpen}
            className="relative group text-gray-300 hover:text-purple-400 transition-colors duration-300"
          >
            Help/FAQ
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton/>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>
      </nav>

      {/* About Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="mb-4">
            We are CardMaster, dedicated to revolutionizing the way you create and study flashcards. Our platform leverages AI to enhance your learning experience and make studying more efficient and enjoyable.
            </p>
            <button
              onClick={handleAboutModalClose}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {isFAQModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Help/FAQ</h2>
            <p className="mb-4">
              Welcome to the FAQ section! Here, you can find answers to the most commonly asked questions about our platform.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2"><strong>How do I create a flashcard?</strong> You can create a flashcard by navigating to the dashboard and clicking on the 'Create Flashcard' button.</li>
              <li className="mb-2"><strong>What features are available?</strong> Our platform offers features such as Analytics, Custom Forms, and User Management.</li>
              <li className="mb-2"><strong>How can I contact support?</strong> You can reach out to us through the Contact page for any support-related inquiries.</li>
            </ul>
            <button
              onClick={handleFAQModalClose}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

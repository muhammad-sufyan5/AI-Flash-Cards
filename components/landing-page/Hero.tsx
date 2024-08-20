"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { ChartBarIcon, PencilAltIcon, UserIcon, LightningBoltIcon, GlobeAltIcon, PuzzleIcon } from "@heroicons/react/outline";

const Hero = () => {
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  const handleNavigation = (e?: SyntheticEvent) => {
    e?.stopPropagation();
    if (title === "") {
      setError("The topic of flashcard is required");
    } else {
      router.push(`/create-deck/${title.replace(/ /g, "-")}`);
    }
  };

  const handleKeyDown = (e: any) => {
    e.stopPropagation();
    if (e.key === "Enter") handleNavigation(e);
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-600 text-white text-center">
      {/* Hero Section */}
      <div className="w-full max-w-3xl p-8 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg mt-20">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Supercharge Your Learning
        </h1>
        <p className="text-lg mb-6">
          Harness the power of AI to create and study flashcards effortlessly.
        </p>
        <div className="flex justify-center w-full max-w-xl mx-auto">
          <input
            type="text"
            value={title}
            onKeyDown={handleKeyDown}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your topic..."
            className="p-3 w-full rounded-l-md bg-gray-700 text-white outline-none border-none" 
          />
          <button
            onClick={handleNavigation}
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-3 rounded-r-md shadow-md"
          >
            Create
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl py-16 mt-16 mx-auto">
        <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg w-64 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <ChartBarIcon className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-lg text-gray-300">Monitor the performance of your flashcards and optimize learning.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg w-64 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <PencilAltIcon className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Custom Forms</h3>
            <p className="text-lg text-gray-300">Create your own flashcards with our easy-to-use custom forms.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg w-64 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <UserIcon className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-lg text-gray-300">Manage your account settings and preferences effortlessly.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg w-64 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <LightningBoltIcon className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Speed</h3>
            <p className="text-lg text-gray-300">Experience lightning-fast performance and responsiveness.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg w-64 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <GlobeAltIcon className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-lg text-gray-300">Access your flashcards from anywhere in the world.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg w-64 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <PuzzleIcon className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customization</h3>
            <p className="text-lg text-gray-300">Tailor your flashcards to fit your learning style and needs.</p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Hero;

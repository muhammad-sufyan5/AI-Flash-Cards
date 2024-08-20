"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FlashCard } from "@/types";
import { askLLM } from "@/backend/agent/agent";
import { db } from "@/backend/db/firbase.config";
import { addDoc, collection } from "firebase/firestore";

const FlashcardDashboard = ({ title }: { title: string }) => {
  const [content, setContent] = useState<string>("");
  const [flashCard, setFlashCard] = useState<null | FlashCard>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAsk = async () => {
    try {
      const response = await askLLM(title, content);
      setFlashCard(JSON.parse(response));
    } catch (error) {
      console.error("Error asking AI:", error);
      setError("Failed to get response from AI.");
    }
  };

  const saveFlashCard = async () => {
    if (!flashCard) {
      setError("No flashcard data to save.");
      return;
    }

    try {
      const collectionRef = collection(db, "flashcards");
      await addDoc(collectionRef, flashCard);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Error saving flashcard:", error);
      setError("Failed to save flashcard.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 bg-clip-text">
        {title}
      </h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Ask a Question</h2>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <textarea
            placeholder="Type your question here..."
            className="w-full md:w-[70%] p-4 bg-gray-700 border rounded-lg resize-none h-24 border-gray-600 text-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 transition duration-300"
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300"
            onClick={handleAsk}
          >
            Ask AI
          </button>
        </div>
      </div>

      {flashCard && (
        <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">Flashcard Response</h2>
          <div className="text-lg mb-4">
            <strong className="block text-gray-400">Front:</strong>
            <div className="mt-2 p-4 bg-gray-700 rounded border border-gray-600">{flashCard.front}</div>
          </div>
          <div className="text-lg">
            <strong className="block text-gray-400">Back:</strong>
            <div className="mt-2 p-4 bg-gray-700 rounded border border-gray-600">{flashCard.back}</div>
          </div>
          <button
            className="bg-green-500 text-white py-3 px-6 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-300"
            onClick={saveFlashCard}
          >
            Save Flashcard
          </button>
          {success && <div className="mt-4 text-green-400">Flashcard saved successfully!</div>}
          {error && <div className="mt-4 text-red-400">{error}</div>}
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Your Recent Questions</h2>
        <ul className="space-y-4">
          {["What is the capital of France?", "How does a combustion engine work?", "Explain the concept of Quantum Physics."].map((question, index) => (
            <li key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
              <span>{question}</span>
              <Link href="/flashcard-viewer">
                <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  View Response
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlashcardDashboard;

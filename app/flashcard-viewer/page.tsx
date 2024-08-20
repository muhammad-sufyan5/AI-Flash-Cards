'use client';

import Navbar from '@/components/landing-page/Navbar';
import { useState, useEffect } from 'react';

const FlashcardViewer = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [theme, setTheme] = useState('dark');
  const cards = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    // Add more cards as needed
  ];

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeSpent(0);
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTimeSpent(0);
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleMarkKnown = () => {
    if (!knownCards.includes(currentCard)) {
      setKnownCards([...knownCards, currentCard]);
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentCard(0);
    setKnownCards([]);
    setTimeSpent(0);
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const progressPercentage = ((currentCard + 1) / cards.length) * 100;

  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-100 text-black' : 'bg-white text-black'}`}>
        <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg my-7" >
          <div className="relative w-full h-64">
            <div
              className={`absolute w-full h-full transition-transform duration-700 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={handleFlip}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-white text-black shadow-lg p-6 rounded-lg backface-hidden">
                {cards[currentCard].question}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-white text-black shadow-lg p-6 rounded-lg rotate-y-180 backface-hidden">
                {cards[currentCard].answer}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button onClick={handlePrevious} className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-gray-700">
              Previous
            </button>
            <button onClick={handleNext} className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-gray-700">
              Next
            </button>
            <button onClick={handleMarkKnown} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-gray-700">
              Mark as Known
            </button>
          </div>

          <div className="mt-4 text-center font-semibold text-lg">
            Card {currentCard + 1} of {cards.length} ({knownCards.length} known)
          </div>

          <div className="mt-2 w-full bg-gray-300 rounded-full">
            <div className="bg-black h-2 rounded-full" style={{ width: `${progressPercentage}%` }} />
          </div>

          <div className="mt-4 text-center">
            Time spent on this card: {timeSpent} seconds
          </div>

          <div className="mt-6 flex justify-center space-x-6">
            <button onClick={handleReset} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-gray-700">
              Reset
            </button>
            <button onClick={handleThemeToggle} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-gray-700">
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashcardViewer;

'use client';

import React from 'react';
import { useState } from 'react';
import Modal from './Modal'; // Import the modal component

interface Deck {
  id: number;
  name: string;
  cards: number;
  preview: string[];
}

interface FlashcardDeckCardProps {
  deck: Deck;
  onEdit: (deck: Deck) => void; // Pass deck info to onEdit
  onDelete: () => void;
}

const FlashcardDeckCard: React.FC<FlashcardDeckCardProps> = ({ deck, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative text-gray-100">
        <h2 className="text-2xl font-bold mb-3">{deck.name}</h2>
        <p className="text-gray-400 mb-4">Cards: {deck.cards}</p>
        <div className="text-gray-300">
          <p className="font-semibold mb-2">Preview:</p>
          <ul className="list-disc ml-5 space-y-1">
            {deck.preview.map((question, idx) => (
              <li key={idx} className="text-sm">
                {question}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            onClick={handleEditClick} 
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300"
          >
            Edit
          </button>
          <button 
            onClick={onDelete} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal deck={deck} onClose={handleCloseModal} onSave={onEdit} />
      )}
    </>
  );
};

export default FlashcardDeckCard;

'use client';

import React, { useState } from 'react';

interface Deck {
  id: number;
  name: string;
  cards: number;
  preview: string[];
}

interface ModalProps {
  deck: Deck;
  onClose: () => void;
  onSave: (deck: Deck) => void;
}

const Modal: React.FC<ModalProps> = ({ deck, onClose, onSave }) => {
  const [name, setName] = useState(deck.name);
  const [cards, setCards] = useState(deck.cards);
  const [preview, setPreview] = useState(deck.preview.join('\n'));

  const handleSave = () => {
    onSave({ ...deck, name, cards, preview: preview.split('\n') });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Deck</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Deck Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Number of Cards</label>
          <input
            type="number"
            value={cards}
            onChange={(e) => setCards(Number(e.target.value))}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Preview</label>
          <textarea
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-24 resize-none"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

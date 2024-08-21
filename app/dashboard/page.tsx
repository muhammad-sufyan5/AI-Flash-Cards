'use client';

import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import FlashcardDeckCard from '@/components/dashboard/FlashcardDeckCard';
import Modal from '@/components/dashboard/Modal';
import Navbar from '@/components/landing-page/Navbar';

interface Deck {
  id: number;
  name: string;
  cards: number;
  preview: string[];
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [decks, setDecks] = useState<Deck[]>([
    { id: 1, name: 'General Knowledge', cards: 50, preview: ['What is the capital of France?', 'What is 2 + 2?'] },
    { id: 2, name: 'Math', cards: 30, preview: ['What is 10 * 10?', 'What is 100/4?'] },
    { id: 3, name: 'Science', cards: 20, preview: ['What is H2O?', 'What is the speed of light?'] },
  ]);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const router = useRouter();

  const filteredDecks = decks.filter((deck) =>
    deck.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateDeck = (e: SyntheticEvent) => {
    e.preventDefault();
    if (searchTerm === '') {
      setError('Search field is required');
    } else {
      // router.push('/create-deck');
      router.push(`/create-deck/${searchTerm.replace(/ /g, "-")}`);
    }
  };

  const handleEditDeck = (deck: Deck) => {
    setEditingDeck(deck);
  };

  const handleSaveDeck = (deck: Deck) => {
    setDecks(decks.map(d => d.id === deck.id ? deck : d));
    setEditingDeck(null);
  };

  const handleDeleteDeck = (id: number) => {
    setDecks(decks.filter((deck) => deck.id !== id));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-white text-center">
          Dashboard
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search for a deck..."
            required
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors duration-300 flex-1"
          />
          <button
            onClick={handleCreateDeck}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Create Deck/Flashcard
          </button>
        </div>
        {error && <div className="text-center text-red-400 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.length > 0 ? (
            filteredDecks.map((deck) => (
              <div key={deck.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <FlashcardDeckCard
                  deck={deck}
                  onEdit={handleEditDeck}
                  onDelete={() => handleDeleteDeck(deck.id)}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No decks found</p>
          )}
        </div>
        {editingDeck && (
          <Modal deck={editingDeck} onClose={() => setEditingDeck(null)} onSave={handleSaveDeck} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
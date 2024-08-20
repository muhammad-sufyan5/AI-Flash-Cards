import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../landing-page/Navbar';

interface Deck {
  id?: number;
  name: string;
  cards: string[];
}

interface CreateDeckFormProps {
  deck?: Deck;
}

const CreateDeckForm: React.FC<CreateDeckFormProps> = ({ deck = null }) => {
  const [name, setName] = useState<string>(deck ? deck.name : '');
  const [cards, setCards] = useState<string[]>(deck ? deck.cards : []);
  const router = useRouter();

  const handleSave = () => {
    // Save the deck (could involve calling an API or updating state)
    console.log('Deck saved:', { name, cards });
    router.push('/flashcards');
  };

  return (
    <>
    <Navbar/>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{deck ? 'Edit Deck' : 'Create Deck'}</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Deck Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 px-4 py-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Cards</label>
        <textarea
          value={cards.join('\n')}
          onChange={(e) => setCards(e.target.value.split('\n'))}
          className="mt-2 px-4 py-2 border border-gray-300 rounded-lg w-full h-40"
          placeholder="Enter one question per line"
        />
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Save Deck
      </button>
    </div>
    </>
  );
};

export default CreateDeckForm;

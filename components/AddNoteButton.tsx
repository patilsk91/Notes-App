
import React from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface AddNoteButtonProps {
  onClick: () => void;
}

const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-full p-4 shadow-lg hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform transition-transform duration-200 ease-in-out"
      aria-label="Add new note"
    >
      <PlusIcon className="h-8 w-8" />
    </button>
  );
};

export default AddNoteButton;

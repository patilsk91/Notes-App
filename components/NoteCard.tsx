
import React, { useState } from 'react';
import { type Note } from '../types';
import { generateTitleForNote } from '../services/geminiService';
import { TrashIcon } from './icons/TrashIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setIsDeleting(true);
    // Add a small delay for the user to confirm or cancel
    setTimeout(() => {
      if (window.confirm('Are you sure you want to delete this note?')) {
        onDelete(note.id);
      } else {
        setIsDeleting(false);
      }
    }, 100);
  };

  const handleGenerateTitle = async () => {
    setIsGeneratingTitle(true);
    setError(null);
    try {
      const title = await generateTitleForNote(note.content);
      const newContent = `**${title}**\n\n${note.content}`;
      onUpdate(note.id, newContent);
    } catch (err) {
      setError('Could not generate title. API key may be missing.');
      setTimeout(() => setError(null), 4000);
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(note.timestamp);

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Basic markdown for bold text: **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="whitespace-pre-wrap">
          {parts.map((part, i) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={i}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
      <div className="flex-grow mb-4 text-gray-300">
        {renderContent(note.content)}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{formattedDate}</span>
        <div className="flex items-center space-x-2">
           <button
            onClick={handleGenerateTitle}
            disabled={isGeneratingTitle}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Generate Title"
            title="Suggest Title (AI)"
          >
            {isGeneratingTitle ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <SparklesIcon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={handleDelete}
            className={`p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 ${isDeleting ? 'text-red-500' : ''}`}
            aria-label="Delete Note"
            title="Delete Note"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {error && <p className="text-xs text-red-400 mt-2 text-right">{error}</p>}
    </div>
  );
};


export default NoteCard;

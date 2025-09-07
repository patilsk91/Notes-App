
import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface AddNoteModalProps {
  onClose: () => void;
  onSave: (content: string) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ onClose, onSave }) => {
  const [content, setContent] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    textareaRef.current?.focus();
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg mx-auto flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-note-title"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 id="add-note-title" className="text-xl font-semibold text-gray-100">
            New Note
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"
            aria-label="Close"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 flex-grow">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note here..."
            className="w-full h-48 bg-gray-900 text-gray-200 border border-gray-700 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            aria-label="Note content"
          />
        </div>
        <div className="flex justify-end p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;

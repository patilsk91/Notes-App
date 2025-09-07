import React from 'react';
import { type Note } from '../types';
import NoteCard from './NoteCard';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
}

const EmptyState: React.FC = () => (
  <div className="text-center py-20 px-6">
    <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <h3 className="mt-2 text-xl font-semibold text-gray-300">No notes yet</h3>
    <p className="mt-1 text-md text-gray-500">Get started by creating a new note.</p>
  </div>
);

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onUpdate }) => {
  if (notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default NoteList;

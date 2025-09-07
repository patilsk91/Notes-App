import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { type Note } from './types';
import Header from './components/Header';
import NoteList from './components/NoteList';
import AddNoteButton from './components/AddNoteButton';
import AddNoteModal from './components/AddNoteModal';

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('gemini-notes', []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNote = (content: string) => {
    if (content.trim() === '') return;
    const newNote: Note = {
      id: Date.now(),
      content,
      timestamp: Date.now(),
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id: number, content: string) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, content } : note)));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => b.timestamp - a.timestamp);
  }, [notes]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      <div className="container mx-auto max-w-2xl p-4">
        <Header />
        <main className="mt-8">
          <NoteList notes={sortedNotes} onDelete={deleteNote} onUpdate={updateNote} />
        </main>
      </div>
      <AddNoteButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AddNoteModal
          onClose={() => setIsModalOpen(false)}
          onSave={addNote}
        />
      )}
    </div>
  );
};

export default App;

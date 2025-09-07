import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-4">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        Gemini Notes
      </h1>
      <p className="text-gray-400 mt-2">Your thoughts, organized in time.</p>
    </header>
  );
};

export default Header;

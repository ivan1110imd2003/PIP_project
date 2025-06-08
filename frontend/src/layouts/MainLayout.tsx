// src/layouts/MainLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-400">
            Trip Organizer
          </Link>
          <div>
            <Link to="/" className="text-gray-300 hover:text-blue-400 mr-4">
              Начало
            </Link>
            <Link to="/create-trip" className="text-gray-300 hover:text-blue-400">
              Създай екскурзия
            </Link>
            {/* Тук може да добавиш бутони за логин/регистрация */}
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Trip Organizer. Всички права запазени.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
"use client";

import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  topic: string;
  language: string;
  year: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="min-h-screen p-8 sm:p-20 text-center">
      <header className="mb-10">
        <h1 className="text-5xl font-bold" style={{ color: '#FFD700' }}>
          📖 Imam Ahmad Raza Books
        </h1>
        <p className="text-xl mt-4" style={{ color: '#228B22' }}>
          Islamic Digital Library Platform
        </p>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="border border-gray-600 rounded-lg p-4">
              <h3 className="font-bold text-lg" style={{ color: '#FFD700' }}>{book.title}</h3>
              <p style={{ color: '#228B22' }}>{book.topic}</p>
              <p className="text-sm text-gray-400">{book.language} - {book.year}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

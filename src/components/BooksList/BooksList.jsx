import React, { useState } from 'react';
import axios from 'axios';

const BooksList = () => {
  const [query, setQuery] = useState(''); // Variable de estado para el input de búsqueda, capta lo que el usuario escribe en dicho input
  const [books, setBooks] = useState([]); //useState del listado de books 

  const apiKey = 'AIzaSyCcAlkwd8aEXHrMgRlRcYT-oowmGShlYhg';
  const apiUrl = `https://www.googleapis.com/books/v1/volumes`;

  const searchBooks = async () => {
    if (query.trim() !== '') {
      try {
        const response = await axios.get(`${apiUrl}?q=${query}&key=${apiKey}`);
        setBooks(response.data.items);
      } catch (error) {
        console.error('Error al buscar libros:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ingrese el título del libro"
      />
      <button onClick={searchBooks}>Buscar</button>

      <div>
        {books.length > 0 && (
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <h4>{book.volumeInfo.title}</h4>
                <p>{book.volumeInfo.authors?.join(', ')}</p>
                <p>{book.volumeInfo.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BooksList;

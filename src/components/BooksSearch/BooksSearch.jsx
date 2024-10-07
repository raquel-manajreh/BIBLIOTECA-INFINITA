import React, { useState } from 'react';
import axios from 'axios';
import '../BooksSearch/BooksSearch.css';

const BooksSearch = () => {
  const [query, setQuery] = useState(''); // Estado del input
  const [books, setBooks] = useState([]); // Estado para almacenar los libros

  const apiKey = 'AIzaSyCcAlkwd8aEXHrMgRlRcYT-oowmGShlYhg';
  const apiUrl = `https://www.googleapis.com/books/v1/volumes`;

  const searchBooks = async () => {
    if (query.trim() !== '') {
      try {
        // Llamada a la API de Google Books
        const response = await axios.get(`${apiUrl}?q=${query}&key=${apiKey}`);
        
        // Guardar libros en el estado
        setBooks(response.data.items || []);
        
      } catch (error) {
        console.error('Error al buscar libros:', error);
      }
    }
  };

  return (
    <div className='searchingComponent'>
      <input className='searchInput'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
      />
      <button className='searchButton' onClick={searchBooks}>
      <i className="fa-solid fa-magnifying-glass"></i></button>

      <div>
        {books.length > 0 && (
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                {/* PARA VER TITULO */}
                <h4>{book.volumeInfo.title}</h4>
                
                {/* AUTORES */}
                <p>{book.volumeInfo.authors?.join(', ')}</p>

                {/* CATEGORIA */}
                <p>{book.volumeInfo.categories?.join(', ')}</p>
                
                {/* IMAGEN (si está disponible) */}
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Portada de ${book.volumeInfo.title}`}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BooksSearch;

import { useState } from 'react';
import axios from 'axios';
import { saveBooksInLibrary } from '../AuthRoutes/firebaseBooks';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import "../BooksSearch/BooksSearch.css";

const BooksSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [activeBookIndex, setActiveBookIndex] = useState(null);

  const apiKey = 'AIzaSyCcAlkwd8aEXHrMgRlRcYT-oowmGShlYhg';
  const apiUrl = `https://www.googleapis.com/books/v1/volumes`;

  const navigate = useNavigate();

  const searchBooks = async () => {
    if (query.trim() !== '') {
      try {
        const response = await axios.get(`${apiUrl}?q=${query}&key=${apiKey}`);
        const items = response.data.items;

        if (!items || items.length === 0) {
          setBooks([]);
          setError('No se encontraron libros para tu búsqueda.');
        } else {
          setBooks(items);
          setError(null);
        }

      } catch (error) {
        console.error('Error al buscar libros:', error);
        setBooks([]);
        setError('No se pudo obtener resultados. Verifica tu conexión.');
      }
    } else {
      setError('Escribe algo para buscar.');
      setBooks([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };

  const handleSave = async (book, estado) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    await saveBooksInLibrary(user.uid, book, estado);
    alert("¡Libro guardado!");
  };

  return (
    <div className='searchingComponent'>
      <input
        className='searchInput'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar..."
      />
      <button className='searchButton' onClick={searchBooks}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="books-container">
        {books.length > 0 && (
          <ul className="books-grid">
            {books.map((book, index) => (
              <li
                className="book-card"
                key={index}
                onClick={() => setActiveBookIndex(index === activeBookIndex ? null : index)}
              >
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    className="book-cover"
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Portada de ${book.volumeInfo.title}`}
                  />
                )}
                <div className="book-info">
                  {/* Mostrar sólo si el libro NO está activo */}
                  {activeBookIndex !== index && (
                    <>
                      <h4 className="book-title">{book.volumeInfo.title}</h4>
                      <p className="book-authors">
                        {book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
                      </p>
                      <p className="book-categories">
                        {book.volumeInfo.categories?.join(', ') || 'Sin categoría'}
                      </p>
                    </>
                  )}

                  {/* Mostrar botones solo si el libro está activo  - AQUÍ SOLO CAMBIAN LOS BOTONES DEL HOME-SEARCH*/}
                  {activeBookIndex === index && (
                    <div className="button-group" onClick={e => e.stopPropagation()}>
                      <button onClick={() => handleSave(book, "favoritos")}>Favoritos</button>
                      <button onClick={() => handleSave(book, "leidos")}>Leídos</button>
                      <button onClick={() => handleSave(book, "enCurso")}>En curso</button>
                      <button onClick={() => handleSave(book, "proximaHistoria")}>Próxima Historia</button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BooksSearch;

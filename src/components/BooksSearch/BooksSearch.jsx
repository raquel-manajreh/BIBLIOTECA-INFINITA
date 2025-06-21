import { useState } from 'react';
import axios from 'axios';
import { saveBooksInLibrary } from '../AuthRoutes/firebaseBooks';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import "../BooksSearch/BooksSearch.css";


const BooksSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const apiKey = 'AIzaSyCcAlkwd8aEXHrMgRlRcYT-oowmGShlYhg';
  const apiUrl = `https://www.googleapis.com/books/v1/volumes`;

  const navigate = useNavigate();

  const searchBooks = async () => {
    if (query.trim() !== '') {
      try {
        const response = await axios.get(`${apiUrl}?q=${query}&key=${apiKey}`);
        setBooks(response.data.items || []);
      } catch (error) {
        console.error('Error al buscar libros:', error);
      }
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

      <input className='searchInput' type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Buscar..." />
      <button className='searchButton' onClick={searchBooks}>
      <i className="fa-solid fa-magnifying-glass"></i></button>

      <div>
        {books.length > 0 && (
          <ul>
            {books.map((book, index) => (

              <li key={index}>

                
                <h4>{book.volumeInfo.title}</h4>  {/* PARA VER TITULO */}
                
                {/* IMAGEN (si está disponible) */}
                {book.volumeInfo.imageLinks?.thumbnail && (   
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Portada de ${book.volumeInfo.title}`}
                  />
                )}
                
                <p>{book.volumeInfo.authors?.join(', ')}</p>  {/* AUTORES */}

                <p>{book.volumeInfo.categories?.join(', ')}</p>  {/* CATEGORIA */}

                {/* <p>{book.id}</p>  */}
                 {/* ID */}


                <div className='button-group'>
                  <button onClick={() => handleSave(book, "favoritos")}>Favoritos</button>
                  <button onClick={() => handleSave(book, "leidos")}>Leídos</button>
                  <button onClick={() => handleSave(book, "enCurso")}>En curso</button>
                  <button onClick={() => handleSave(book, "proximaHistoria")}>Próxima Historia</button>
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

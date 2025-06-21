import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  getBooksFromLibrary,
  updateBookState,
  deleteBookFromLibrary
} from '../../components/AuthRoutes/firebaseBooks';

import './Biblioteca.css';

const Biblioteca = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError('No estás logueado');
        setLoading(false);
        return;
      }

      try {
        const booksFromDb = await getBooksFromLibrary(user.uid);
        setBooks(booksFromDb);
      } catch (err) {
        setError('Error al cargar los libros');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Identificadores internos
  const estados = ['favoritos', 'leidos', 'enCurso', 'proximaHistoria'];

  // Etiquetas amigables
  const etiquetas = {
    favoritos: 'Favoritos',
    leidos: 'Leídos',
    enCurso: 'En curso',
    proximaHistoria: 'Próxima Historia'
  };

  const groupedBooks = estados.reduce((acc, estado) => {
    acc[estado] = books.filter(book => book.estado === estado);
    return acc;
  }, {});

  const handleChangeEstado = async (bookId, newEstado) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setError("No estás logueado");
      return;
    }

    try {
      await updateBookState(user.uid, bookId, newEstado);
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, estado: newEstado } : book
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado del libro", error);
      setError("No se pudo actualizar el estado del libro");
    }
  };

  const handleDeleteBook = async (bookId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setError("No estás logueado");
      return;
    }

    try {
      await deleteBookFromLibrary(user.uid, bookId);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error("Error al eliminar el libro", error);
      setError("No se pudo eliminar el libro");
    }
  };

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="kanban-container">
      {estados.map(estado => (
        <div key={estado} className="kanban-column">
          <h3 className="column-title">{etiquetas[estado]}</h3>
          {groupedBooks[estado].map(book => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h4>{book.title}</h4>
              <p>{book.authors?.join(', ')}</p>
              <p><strong>Estado:</strong> {etiquetas[book.estado]}</p>

              <div className="button-group">
                {estados.map(e => (
                  <button key={e} onClick={() => handleChangeEstado(book.id, e)}>
                    {etiquetas[e]}
                  </button>
                ))}
                <button onClick={() => handleDeleteBook(book.id)} style={{ color: 'red' }}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Biblioteca;

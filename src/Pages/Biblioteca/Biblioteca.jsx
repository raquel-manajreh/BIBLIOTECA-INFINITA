import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getBooksFromLibrary, updateBookState } from '../../components/AuthRoutes/firebaseBooks';

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

  const handleChangeEstado = async (bookId, newEstado) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setError("No estás logueado");
      return;
    }

    try {
      await updateBookState(user.uid, bookId, newEstado);

      // Actualizamos estado local para reflejar el cambio en UI sin recargar
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

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>{error}</p>;
  if (books.length === 0) return <p>No tienes libros guardados.</p>;

  return (
    <div className="biblioteca-grid">
      {books.map(book => (
        <div key={book.id} className="book-card">
          <img src={book.image} alt={book.title} />
          <h4>{book.title}</h4>
          <p>{book.authors?.join(', ')}</p>
          <p><strong>Estado:</strong> {book.estado}</p>

          <div className="button-group">
            <button onClick={() => handleChangeEstado(book.id, "favoritos")}>Favoritos</button>
            <button onClick={() => handleChangeEstado(book.id, "leidos")}>Leídos</button>
            <button onClick={() => handleChangeEstado(book.id, "enCurso")}>En curso</button>
            <button onClick={() => handleChangeEstado(book.id, "proximaHistoria")}>Próxima Historia</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Biblioteca;

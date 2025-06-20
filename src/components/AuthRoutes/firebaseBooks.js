import { db } from "./firebaseConfig";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


//Funcion para GUARDAR libros
export const saveBooksInLibrary = async (uid, book, estado) => {
    try{
    const bookRef = doc(db, "users", uid, "books", book.id);
     
    await setDoc(bookRef, {
        id: book.id,
        title: book.volumeInfo.title || "Sin titulo",
        authors: book.volumeInfo.authors || [],
        categories: book.volumeInfo.categories || [],
        image: book.volumeInfo.imageLinks?.thumbnail || "",
        estado: estado,
    });

    console.log("Libro guardado en Firestore");

    } catch (error){
    console.error("Error al guardar el libro", error);
    }

};


// Funcion para LEER libros guardados en firebase
export const getBooksFromLibrary = async (uid) => {
  try {
    const booksRef = collection(db, "users", uid, "books");
    const snapshot = await getDocs(booksRef);

    const books = snapshot.docs.map(doc => doc.data());
    return books;
  } catch (error) {
    console.error("Error al obtener libros:", error);
    return [];
  }
};

//para ACTUALIZAR el estado del libro
export const updateBookState = async (uid, bookId, newEstado) => {
  try {
    const bookRef = doc(db, "users", uid, "books", bookId);
    await updateDoc(bookRef, { estado: newEstado });
    console.log("Estado del libro actualizado en Firestore");
  } catch (error) {
    console.error("Error al actualizar el estado del libro", error);
  }
};

//Funcion para ELIMINAR el libro de la biblioteca
export const deleteBookFromLibrary = async (uid, bookId) => {
  try {
    const bookRef = doc(db, "users", uid, "books", bookId);
    await deleteDoc(bookRef);
    console.log("Libro eliminado de Firestore");
  } catch (error) {
    console.error("Error al eliminar el libro", error);
  }
};

//Funcion exportada que usaremos posteriormente para agregar los books desde la busqueda a la bilbioteca virtual de cada usuario, de forma que tenemos toda la configuracion de firebase a parte, codigo mas limpio y organizado, con errores incluidos cuando se guarden o no los books a la lista.
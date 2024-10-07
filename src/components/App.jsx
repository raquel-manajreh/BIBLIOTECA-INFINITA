import NavBar from "./NavBar/NavBar";
import BooksSearch from "./BooksSearch/BooksSearch";
import '../scss/App.css';

function App() {

  return (
    <div>
      <NavBar/> 
      <h1 className="h1">BIBLIOTECA INFINITA</h1>
      <h2 className="h2">" Explora libros, expande mentes "</h2>
      <BooksSearch />
    </div>
  );
}

export default App;




//IMPORTANTE - SIEMPRE comprobar que se IMPORTE el componente

//Retornar UN SOLO elemento en la funcion del componente, es decir, entre () retornamos lo que queremos que se vea en la pagina web para que se muestre como UN SÓLO elemento
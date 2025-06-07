import BooksSearch from "../../components/BooksSearch/BooksSearch";
import "../Home/Home.css";

function Home() {
  return (
    <div>
      <h1 className="h1">BIBLIOTECA INFINITA</h1>
      <h2 className="h2">" Explora libros, expande mentes "</h2>
      <BooksSearch /> 
    </div>
  )
}

export default Home;

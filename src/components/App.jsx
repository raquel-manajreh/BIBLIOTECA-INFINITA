import { useState } from "react";
import BooksList from "./BooksList/BooksList";
import NavBar from "./NavBar/NavBar";

function App() {

  return (
    <div>
      <NavBar/> 
      {/* QUIERO QUE EL COMPONENTE BOOBKSLIST APAREZCA EN EL NAVBAR */}
      <h1>BIBLIOTECA INFINITA</h1>
      <BooksList />
    </div>
  );
}

export default App;




//IMPORTANTE - SIEMPRE comprobar que se IMPORTE el componente

//Retornar UN SOLO elemento en la funcion del componente, es decir, entre () retornamos lo que queremos que se vea en la pagina web para que se muestre como UN SÓLO elemento
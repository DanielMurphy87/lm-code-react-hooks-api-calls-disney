import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";


const App: React.FC = () => {


  const [currentPage, setCurrentPage] = useState<number>(1);

  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);

  useEffect(() => {
    const getCharacters = async (pageNumber: number) => {
      const apiResponse = await fetch(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
      const json = await apiResponse.json() as { data: DisneyCharacter[] };
      setCharacters(json.data);
    };
    getCharacters(currentPage);
  }, [currentPage]);

  return (
    <div className="page">
      <Header currentPage={currentPage} />
      <Navigation
        currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters} />
    </div>
  );
};

export default App;
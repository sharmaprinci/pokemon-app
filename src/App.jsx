import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../src/component/PokemonCard";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  // Fetching Pokemon Data
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const allPokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return pokemonDetails.data;
          })
        );
        setPokemons(allPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
    };

    fetchPokemons();
  }, []);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter Pokemon based on Search Input
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;


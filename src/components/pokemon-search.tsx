import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";

const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>("");
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Charger tous les Pokémon au démarrage
  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => {
      setAllPokemons(pokemons);
      setFilteredPokemons(pokemons); // Initialise avec tous les Pokémon
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setFilteredPokemons(allPokemons);
      return;
    }

    // Filtrer les Pokémon localement
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>): void => {
    // Utiliser setTimeout pour attendre que le clic soit enregistré avant de masquer la liste
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <div className="row" onBlur={handleBlur} onFocus={handleFocus} tabIndex={0}>
      <div className="col s12 m6 offset-m3">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <input
                type="text"
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={(e) => handleInputChange(e)}
                onFocus={handleFocus}
              />
            </div>
            {isFocused && (
              <div className="collection">
                {filteredPokemons.length > 0 ? (
                  filteredPokemons.map((pokemon) => (
                    <Link
                      key={pokemon.id}
                      to={`/pokemons/${pokemon.id}`}
                      className="collection-item"
                    >
                      {pokemon.name}
                    </Link>
                  ))
                ) : (
                  <p>Aucun résultat trouvé</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;

import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock.pokemon";

export default class PokemonService {
  static pokemons: Pokemon[] = POKEMONS;
  static isDev =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  static getPokemons(): Promise<Pokemon[]> {
    if (this.isDev) {
      return fetch("http://localhost:3001/pokemons")
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) => resolve(this.pokemons));
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${id}`)
        .then((response) => response.json())
        .then((data) => (this.isEmpty(data) ? null : data))
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) =>
      resolve(this.pokemons.find((pokemon) => pokemon.id === id) || null)
    );
  }

  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: "PUT",
        body: JSON.stringify(pokemon),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    const index = this.pokemons.findIndex((p) => p.id === pokemon.id);
    if (index !== -1) {
      this.pokemons[index] = pokemon;
    }
    return new Promise((resolve) => resolve(pokemon));
  }

  static deletePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    this.pokemons = this.pokemons.filter((p) => p.id !== pokemon.id);
    return new Promise((resolve) => resolve(pokemon));
  }

  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    // Convertir l'ID en chaîne de caractères
    const pokemonWithStringId = {
      ...pokemon,
      id: String(pokemon.id),
    };

    if (this.isDev) {
      return fetch("http://localhost:3001/pokemons", {
        method: "POST",
        body: JSON.stringify(pokemonWithStringId),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    this.pokemons.push(pokemon);
    return new Promise((resolve) => resolve(pokemon));
  }

  static searchPokemons(term: string): Promise<Pokemon[]> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons?q=${term}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Résultats de la recherche:", data); // Ajoutez cette ligne pour vérifier la réponse
          return Array.isArray(data) ? data : [];
        })
        .catch((error) => {
          console.error("Error fetching pokemons:", error);
          return [];
        });
    }
    const results = this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
    return new Promise((resolve) => resolve(results));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}

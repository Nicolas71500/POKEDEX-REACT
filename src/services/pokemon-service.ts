import Pokemon from "../models/pokemon";

export default class PokemonService {
  static getPokemons(): Promise<Pokemon[]> {
    return fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handleError(error));
  }

  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "PUT",
      body: JSON.stringify(pokemon),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static deletePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch("http://localhost:3001/pokemons", {
      method: "POST",
      body: JSON.stringify(pokemon),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static searchPokemons(term: string): Promise<Pokemon[]> {
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

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}

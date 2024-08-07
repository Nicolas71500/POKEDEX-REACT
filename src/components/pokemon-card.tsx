import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import "./pokemon-card.css";
import { useHistory } from "react-router-dom";
import formatDate from "../helpers/format-date";

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
};

const PokemonCard: FunctionComponent<Props> = ({
  pokemon,
  borderColor = "#009688",
}) => {
  const [color, setColor] = useState<string>();
  const history = useHistory();

  const showBorder = () => {
    setColor(borderColor);
  };

  const hideBorder = () => {
    setColor("#f5f5f5");
  };

  const formatType = (type: string): string => {
    let color: string;

    switch (type) {
      case "Feu":
        color = "red lighten-1";
        break;
      case "Eau":
        color = "blue lighten-1";
        break;
      case "Plante":
        color = "green lighten-1";
        break;
      case "Insecte":
        color = "brown lighten-1";
        break;
      case "Normal":
        color = "grey lighten-3";
        break;
      case "Vol":
        color = "blue lighten-3";
        break;
      case "Poison":
        color = "deep-purple accent-1";
        break;
      case "Fée":
        color = "pink lighten-4";
        break;
      case "Psy":
        color = "deep-purple darken-2";
        break;
      case "Electrik":
        color = "lime accent-1";
        break;
      case "Combat":
        color = "deep-orange";
        break;
      default:
        color = "grey";
        break;
    }

    return `chip ${color}`;
  };

  const goToPokemonDetail = (id: number) => {
    history.push(`/pokemons/${id}`);
  };

  // Convertir pokemon.created en objet Date
  let createdDate: Date;
  try {
    createdDate = new Date(pokemon.created);
    if (isNaN(createdDate.getTime())) {
      throw new Error("Invalid date");
    }
  } catch (error) {
    console.error("Error parsing date:", error);
    createdDate = new Date(); // Fallback to current date
  }

  return (
    <div
      className="col s6 m4"
      onClick={() => goToPokemonDetail(pokemon.id)}
      onMouseEnter={showBorder}
      onMouseLeave={hideBorder}
    >
      <div className="card horizontal" style={{ borderColor: color }}>
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p>
              <small>{formatDate(createdDate)}</small>
            </p>
            {pokemon.types.map((type) => (
              <span key={type} className={formatType(type)}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

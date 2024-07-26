import React from "react";
import PokemonList from "./pages/pokemon-list";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PokemonsDetail from "./pages/pokemon-detail";
import { Route, Link } from "react-router-dom";
import PageNotFound from "./pages/page-not-found";
import PokemonEdit from "./pages/pokemon-edit";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Nav de recherche*/}
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">
              Pokédex
            </Link>
          </div>
        </nav>
        {/* Routes */}
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/pokemons" component={PokemonList} />
          <Route exact path="/pokemons/:id" component={PokemonsDetail} />
          <Route exact path="/pokemons/edit/:id" component={PokemonEdit} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

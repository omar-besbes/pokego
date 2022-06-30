import './App.css';
import PokeSearch from "./components/PokeSearch";
import PokeList from "./components/PokeList";
import Pokedex from "./components/Pokedex";

function App() {
	return (
		<main className="d-flex flex-column container">
			{/*	Header or Breadcrumbs or sthg */}
			<Pokedex/>
			<PokeSearch/>
			<PokeList/>
		</main>
	);
}

export default App;

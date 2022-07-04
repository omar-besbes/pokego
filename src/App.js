import PokeSearch from "./components/PokeSearch";
import PokeList from "./components/PokeList";
import Pokedex from "./components/Pokedex";
import {Suspense} from "react";
import suspense from "./components/Suspense";

function App() {
	return (
		<main>
			{/*	Header or Breadcrumbs or sthg */}
			<Suspense fallback={suspense}>
				<Pokedex/>
			</Suspense>
			<Suspense fallback={suspense}>
				<PokeSearch/>
			</Suspense>
			<Suspense fallback={suspense}>
				<PokeList/>
			</Suspense>
		</main>
	);
}

export default App;

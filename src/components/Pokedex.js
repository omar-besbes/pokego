import {useRecoilValue} from "recoil";
import SelectedPokemons from "../atoms/SelectedPokemons";

const Pokedex = () => {
	const selectedPokemons = useRecoilValue(SelectedPokemons);

	return (
		<section className="container my-3 d-flex flex-column">
			<h1> Pokedex </h1>
			<div className="d-flex flex-wrap my-4">
				{selectedPokemons.map((pokemon, key) =>
					<article key={key} className="p-2 my-2 mx-3 btn">
						{pokemon}
					</article>
				)}
			</div>
		</section>
	)
}

export default Pokedex;
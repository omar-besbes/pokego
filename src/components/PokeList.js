import {useQuery} from "react-query";
import {useRecoilState, useRecoilValue} from "recoil";
import SelectedType from "../atoms/SelectedType";
import SelectedPokemons from "../atoms/SelectedPokemons";

const PokeList = () => {
	const type = useRecoilValue(SelectedType);
	const [selectedPokemons, setSelectedPokemons] = useRecoilState(SelectedPokemons);

	const pokemonsList = useQuery(type ? type : 'pokemon', async () => {
		return await fetch(`https://pokeapi.co/api/v2/${type ? `type/${type}` : 'pokemon'}`).then(response => response.json());
	}, {refetchOnWindowFocus: false});

	const handleClick = (event) => {
		setSelectedPokemons(event.currentTarget.classList.contains("btn-danger") ?
			[...selectedPokemons.filter(pokemon => pokemon !== event.currentTarget.id)]
			:
			[...selectedPokemons, event.currentTarget.id]);
	}

	if (pokemonsList.status === "loading") return (
		<>
			<h1> Search Results </h1>
			<div className="spinner-border text-danger align-self-center" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</>
	)
	if (pokemonsList.status === "error") return (
		<div>an error has occured</div>
	)

	return (
		<section className="container my-3 d-flex flex-column">
			<h1> Search Results </h1>
			<div className="d-flex flex-wrap my-4">
				{type ?
					pokemonsList.data.pokemon.map(({pokemon}, key) =>
						<article id={pokemon.name} key={key} className={`p-2 my-2 mx-3 btn ${selectedPokemons.includes(pokemon.name) ? "btn-danger" : "btn-outline-primary" }`} onClick={handleClick}>
							{pokemon.name}
						</article>
					)
					:
					pokemonsList.data.results.map((pokemon, key) =>
						<article id={pokemon.name} key={key} className={`p-2 my-2 mx-3 btn ${selectedPokemons.includes(pokemon.name) ? "btn-danger" : "btn-outline-primary" }`} onClick={handleClick}>
							{pokemon.name}
						</article>
					)
				}
			</div>
		</section>
	)
}

export default PokeList;
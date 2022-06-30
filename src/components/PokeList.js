import {useQuery} from "react-query";
import {useRecoilState, useRecoilValue} from "recoil";
import SelectedType from "../atoms/SelectedType";
import SelectedPokemons from "../atoms/SelectedPokemons";
import FavouritePokemons from "../atoms/FavouritePokemons";
import {useEffect, useState} from "react";

const PokeList = () => {
	const type = useRecoilValue(SelectedType);
	const [pokeFaves, setPokeFaves] = useRecoilState(FavouritePokemons);
	const [selectedPokemons, setSelectedPokemons] = useRecoilState(SelectedPokemons);

	const {data} = useQuery(`${type}`, async () => {
		return await fetch(`https://pokeapi.co/api/v2/${type !== "all" ? `type/${type}` : 'pokemon'}?limit=100`).then(response => response.json());
	}, {refetchOnWindowFocus: false});

	const [pokemonList, setPokemonList] = useState(null);

	const originalData = type !== "all" ? (data ? data.pokemon : null) : (data ? data.results : null);

	useEffect(() => {
		setPokemonList(type !== "all" ? (data ? data.pokemon : null) : (data ? data.results : null));
		document.getElementById("search-bar").value = "";
	}, [type]);

	const handleClick = (event) => {
		if (event.target.classList.contains("selector"))
			setSelectedPokemons(event.target.classList.contains("btn-secondary") ?
				[...selectedPokemons.filter(pokemon => pokemon !== event.currentTarget.id)] :
				[...selectedPokemons, event.currentTarget.id]);
		else if (event.target.classList.contains("icon"))
			setPokeFaves(event.target.classList.contains("icon-star") ?
				[...pokeFaves.filter(pokemon => pokemon !== event.currentTarget.id)] :
				[...pokeFaves, event.currentTarget.id]);
	}

	const handleChange = (event) => {
		const filter = event.target.value;
		setPokemonList(originalData.filter(pokemon => {
			const name = type !== "all" ? pokemon.pokemon?.name : pokemon?.name;
			return (name.search(filter) !== -1);
		}));
	}

	return (
		<section className="container my-3 d-flex flex-column">
			<h1 className="py-3 display-1">
				{type} pokemons
			</h1>
			<div className="input-group flex-nowrap">
				<span id="search" className="input-group-text icon-pokeball"/>
				<input id="search-bar" type="text" className="form-control" placeholder={`Search ${type} pokemons`}
					   aria-describedby="search" onChange={handleChange}/>
			</div>
			<div className="d-flex flex-wrap my-4">
				{pokemonList?.map((pokemon, key) => {
					const name = type !== "all" ? pokemon.pokemon?.name : pokemon?.name;
					return (<article id={name} key={key}
									 className="p-2 my-2 mx-3 btn-group"
									 onClick={handleClick}>
						{pokeFaves.includes(name) ? <span
								className={`icon icon-star btn ${selectedPokemons.includes(name) ? "btn-secondary" : "btn-outline-primary"}`}/> :
							<span
								className={`icon icon-star-outline btn ${selectedPokemons.includes(name) ? "btn-secondary" : "btn-outline-primary"}`}/>}
						<div
							className={`selector btn ${selectedPokemons.includes(name) ? "btn-secondary" : "btn-outline-primary"}`}>
							{name}
						</div>
					</article>)
				})}
			</div>
		</section>
	)
}

export default PokeList;
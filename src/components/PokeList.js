import {useQuery} from "react-query";
import {useRecoilState, useRecoilValue} from "recoil";
import SelectedType from "../atoms/SelectedType";
import SelectedPokemons from "../atoms/SelectedPokemons";
import FavouritePokemons from "../atoms/FavouritePokemons";
import {useEffect, useState} from "react";

const PokeList = () => {

	// States

	const type = useRecoilValue(SelectedType);
	const [pokemonList, setPokemonList] = useState(null);
	const [pokeFaves, setPokeFaves] = useRecoilState(FavouritePokemons);
	const [selectedPokemons, setSelectedPokemons] = useRecoilState(SelectedPokemons);
	const [pageLength] = useState(30);

	// Queries

	const {data} = useQuery(`${type.name}`, async () => {
		return await fetch(`${type.url}?limit=${pageLength}`).then(response => response.json());
	}, {refetchOnWindowFocus: false});

	const originalData = type.name !== "all" ? (data ? data.pokemon : null) : (data ? data.results : null);

	// useEffects

	useEffect(() => {
		setPokemonList(originalData);
	}, [originalData]);

	useEffect(() => {
		document.getElementById("search-bar").value = "";
	}, [type.name]);

	// functions

	const handleSelectClick = (event) => {
		const name = event.currentTarget.id.slice(5);
		setSelectedPokemons(event.target.classList.contains("btn-secondary") ?
			[...selectedPokemons.filter(pokemon => pokemon !== name)] :
			[...selectedPokemons, name]);
	}

	const handleFavClick = (event) => {
		const name = event.currentTarget.id.slice(5);
		setPokeFaves(event.target.classList.contains("icon-star") ?
			[...pokeFaves.filter(pokemon => pokemon !== name)] :
			[...pokeFaves, name]);
	}

	const handleChange = (event) => {
		const filter = event.target.value;
		setPokemonList(originalData.filter(pokemon => {
			const name = type.name !== "all" ? pokemon.pokemon?.name : pokemon?.name;
			return (name.search(filter) !== -1);
		}));
	}

	// JSX

	return (
		<section id="pokelist" className="section pokelist">
			<h1 className="py-3 display-1">
				{type.name} pokemons
			</h1>
			<div className="input-group flex-nowrap">
				<span id="search" className="input-group-text icon-pokeball"/>
				<input id="search-bar" type="text" className="form-control" placeholder={`Search ${type.name} pokemons`}
					   aria-describedby="search" onChange={handleChange}/>
			</div>
			<div className="d-flex flex-wrap my-4">
				{pokemonList?.map((pokemon, key) => {
					const name = type.name !== "all" ? pokemon.pokemon?.name : pokemon?.name;
					return (
						<article id={name} key={key} className="p-2 my-2 mx-3 btn-group">
							{pokeFaves.includes(name) ?
								<span id={`icon-${name}`} onClick={handleFavClick}
									  className={`icon-star btn ${selectedPokemons.includes(name) ? "btn-secondary" : "btn-outline-primary"}`}/>
								:
								<span id={`icon-${name}`} onClick={handleFavClick}
									  className={`icon-star-outline btn ${selectedPokemons.includes(name) ? "btn-secondary" : "btn-outline-primary"}`}/>
							}
							<div id={`text-${name}`} onClick={handleSelectClick}
								 className={`btn ${selectedPokemons.includes(name) ? "btn-secondary" : "btn-outline-primary"}`}>
								{name}
							</div>
						</article>
					)
				})}
			</div>
		</section>
	)
}

export default PokeList;
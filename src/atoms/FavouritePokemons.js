import {atom} from "recoil";

const FavouritePokemons = atom({
	key: "favourite-pokemons",
	default: []
})

export default FavouritePokemons;
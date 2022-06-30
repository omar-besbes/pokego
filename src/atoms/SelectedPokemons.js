import {atom} from "recoil";

const SelectedPokemons = atom({
	key: 'selected-pokemons',
	default: [],
})

export default SelectedPokemons;
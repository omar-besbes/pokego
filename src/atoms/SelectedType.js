import {atom} from "recoil";

const selectedType = atom({
	key: 'selected-types',
	default: {name: "all", url: "https://pokeapi.co/api/v2/pokemon"},
})

export default selectedType;
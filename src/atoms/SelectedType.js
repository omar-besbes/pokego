import {atom} from "recoil";

const selectedType = atom({
	key: 'selected-types',
	default: null,
})

export default selectedType;
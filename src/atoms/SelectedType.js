import {atom} from "recoil";

const selectedType = atom({
	key: 'selected-types',
	default: "all",
})

export default selectedType;
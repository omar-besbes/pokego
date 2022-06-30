import {useQuery} from "react-query";
import {useRecoilState} from "recoil";
import SelectedType from "../atoms/SelectedType";

const PokeSearch = () => {
	const [selectedType, setSelectedType] = useRecoilState(SelectedType);

	const {data} = useQuery('types', async () => {
		return await fetch('https://pokeapi.co/api/v2/type').then(res => res.json());
	}, {refetchOnWindowFocus: false});

	const handleClick = event => {
		setSelectedType(event.currentTarget.id);
	}

	const pokeTypes = [{name: "all"}, ...data.results];
	return (
		<section className="container d-flex flex-column my-3">
			<h1 className="py-3 display-1"> pokemon types </h1>
			<div className="d-flex flex-wrap my-4">
				{pokeTypes.map((pokeType, key) =>
				<article id={pokeType.name} key={key}
						 className={`p-2 my-2 mx-3 btn ${selectedType === pokeType.name ? "btn-secondary" : "btn-outline-primary"}`}
						 onClick={handleClick}>
					{pokeType.name}
				</article>
			)}
			</div>
		</section>
	)
}

export default PokeSearch;
import {useQuery} from "react-query";
import {useRecoilState} from "recoil";
import SelectedType from "../atoms/SelectedType";

const PokeSearch = () => {
	const [selectedType, setSelectedType] = useRecoilState(SelectedType);

	const {data} = useQuery('types', async () => {
		return await fetch('https://pokeapi.co/api/v2/type').then(res => res.json());
	}, {refetchOnWindowFocus: false});

	const handleClick = (event) => {
		setSelectedType(pokeTypes.find((pokeType) => pokeType.name === event.currentTarget.id));
		document.getElementById("pokelist").scrollIntoView();
	}

	const pokeTypes = [{name: "all", url: "https://pokeapi.co/api/v2/pokemon"}, ...data.results];

	return (
		<section id="pokesearch" className="section pokesearch flex-lg-row">
			<div>
				<h1 className="py-3 display-1"> pokemon types </h1>
				<div className="d-flex flex-wrap my-4">
					{pokeTypes.map((pokeType, key) =>
						<article id={pokeType.name} key={key}
								 className={`p-2 my-2 mx-3 btn ${selectedType.name === pokeType.name ? "btn-secondary" : "btn-outline-primary"}`}
								 onClick={handleClick}>
							{pokeType.name}
						</article>
					)}
				</div>
			</div>
			<img width={500} src={process.env.PUBLIC_URL + "/assets/img/pokesearch/bulbasaur.png"} alt="bulbasaur"/>
		</section>
	)
}

export default PokeSearch;
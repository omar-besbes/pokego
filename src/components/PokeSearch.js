import {useQuery} from "react-query";
import {useRecoilState} from "recoil";
import SelectedType from "../atoms/SelectedType";

const PokeSearch = () => {
	const [selectedType, setSelectedType] = useRecoilState(SelectedType);

	const {status, data} = useQuery('types', async () => {
		return await fetch('https://pokeapi.co/api/v2/type').then(res => res.json());
	}, {refetchOnWindowFocus: false});

	const handleClick = event => {
		const lastSelect = document.getElementById(selectedType);
		lastSelect?.classList.toggle("btn-outline-primary");
		lastSelect?.classList.toggle("btn-danger");
		event.currentTarget.classList.toggle("btn-outline-primary");
		event.currentTarget.classList.toggle("btn-danger");
		setSelectedType(event.currentTarget.id);
	}

	if (status === "loading") return <div>loading ...</div>;
	if (status === "error") return <div>an error has occured</div>
	return (
		<section className="container d-flex flex-column my-3">
			<h1 className="h1"> Choose pokemon type </h1>
			<div className="d-flex flex-wrap my-4">
				{data.results.map((pokeType, key) =>
				<article id={pokeType.name} key={key} className="p-2 my-2 mx-3 btn btn-outline-primary" onClick={handleClick}>
					{pokeType.name}
				</article>
			)}
			</div>
		</section>
	)
}

export default PokeSearch;
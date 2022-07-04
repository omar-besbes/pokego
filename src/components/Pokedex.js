import {useRecoilState} from "recoil";
import SelectedPokemons from "../atoms/SelectedPokemons";

const Pokedex = () => {
	const [selectedPokemons, setSelectedPokemons] = useRecoilState(SelectedPokemons);

	const handleClick = (event) => {
		setSelectedPokemons(selectedPokemons.filter((pokemon) => pokemon !== event.target.id));
	}

	return (
		<section id="pokedex" className="section pokedex">
			<img width={480} src={process.env.PUBLIC_URL + "/assets/img/pokedex/pikachu.png"} alt="pikachu"/>
			<div className="d-flex flex-column" style={{width: "100%", height: "100%"}}>
				<h1 className="py-3 display-1">
					Pokedex
				</h1>
				<div style={{width: "100%", height: "100%"}}
					 className="d-flex flex-wrap my-4 justify-content-center align-items-center">
					{selectedPokemons.length ?
						selectedPokemons.map((pokemon, key) =>
							<article id={pokemon} key={key} className="p-2 my-2 mx-3 btn btn-outline-primary"
									 onClick={handleClick}>
								{pokemon}
							</article>
						) :
						<div className="d-flex flex-column align-items-center">
							<h3 className="mb-5">Your pokedex is empty !</h3>
							<div className="btn btn-outline-primary"
								 onClick={() => document.getElementById("pokesearch").scrollIntoView()}>
								<h3>Get Your First Pokemon !</h3>
							</div>
						</div>
					}
				</div>
			</div>
		</section>
	)
}

export default Pokedex;
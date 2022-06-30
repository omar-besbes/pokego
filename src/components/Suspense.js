const Suspense = () => {
	return (
		<main className="d-flex flex-column container">
			<h1 className="py-3 display-1"> Loading Results ... </h1>
			<div className="spinner-border text-secondary align-self-center" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</main>
	);
};

export default Suspense;
const Suspense = () => {
	return (
		<>
			<h1 className="py-3 display-1"> Loading Results ... </h1>
			<div className="spinner-border text-secondary align-self-center" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</>
	);
};

export default Suspense;
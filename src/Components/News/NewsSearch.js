import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Get } from "../../Services/privateApiService";
// import "./SearchBar.scss";

const SearchBar = ({ setSearchResult }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const submitSearch = async () => {
		let response;
		if (searchQuery.length > 1) {
			setIsLoading(true);
			response = await Get(
				`${process.env.REACT_APP_API_NEWS}?search=${searchQuery}`
			);
		} else {
			response = await Get(process.env.REACT_APP_API_NEWS);
		}

		if (response.success) {
			setSearchResult(response.data);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		submitSearch();
	}, [searchQuery]);
	return (
		<div className="search__container">
			<input
				autoComplete="off"
				className="form-control form-control-lg mb-3"
				type="text"
				aria-label=".form-control-lg example"
				value={searchQuery}
				onChange={(e) => {
					setSearchQuery(e.currentTarget.value);
				}}
				placeholder="Buscar Novedades"
			/>
			{isLoading ? (
				<CgSpinner className="spinner__circle" />
			) : (
				<i className="fas fa-search"></i>
			)}
		</div>
	);
};

export default SearchBar;

import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Get } from "../../Services/privateApiService";
import "./SearchBar.scss";

const SearchBar = ({ setSerachResult }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const submitSearch = async () => {
		let response;
		if (searchQuery.length > 1) {
			setIsLoading(true);
			response = await Get(
				`${process.env.REACT_APP_API_MEMBERS}?search=${searchQuery}`
			);
		} else {
			response = await Get(process.env.REACT_APP_API_MEMBERS);
		}

		if (response.success) {
			setSerachResult(response.data);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		submitSearch();
	}, [searchQuery]);
	return (
		<div className="search__container">
			<input
				value={searchQuery}
				onChange={(e) => {
					setSearchQuery(e.currentTarget.value);
				}}
				placeholder="Buscar..."
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

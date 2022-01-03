import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../store/slices/newsSlice";

const NewsSearchBar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const submitSearch = async () => {
		if (searchQuery.length > 1) {
			setIsLoading(true);
			await dispatch(fetchNews(searchQuery));
		} else {
			await dispatch(fetchNews());
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

export default NewsSearchBar;

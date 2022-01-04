import React, { useState } from "react";
import { Formik } from "formik";
import { Get } from "../../Services/publicApiService";
import { CgSpinner } from "react-icons/cg";

export const SearchActivities = ({ setActivities }) => {
	const [isLoading, setIsLoading] = useState(false);

	const GetSearch = async (value) => {
		if (value.length > 1) {
			setIsLoading(true);
			const dataSearch = await Get(`activities?search=${value}`);
			setIsLoading(false);
			return dataSearch;
		} else {
			const dataSearch = await Get("activities");
			return dataSearch;
		}
	};

	const handleInputChange = (e, handleChange, values) => {
		handleChange(e);
		const { value } = values;
		const searchName = value.toLowerCase();
		GetSearch(searchName).then((res) => {
			if (res.success) {
				setActivities(res.data);
			}
		});
	};

	return (
		<Formik
			initialValues={{
				searchText: "",
			}}
		>
			{({ values, handleChange }) => (
				<div className="search__container">
					<input
						autoComplete="off"
						type="text"
						name="searchText"
						id="searchText"
						value={values.searchText}
						placeholder="Buscar..."
						aria-label=".form-control-lg example"
						onChange={(e) => handleInputChange(e, handleChange, e.target)}
					/>
					{isLoading ? (
						<CgSpinner className="spinner__circle" />
					) : (
						<i className="fas fa-search"></i>
					)}
				</div>
			)}
		</Formik>
	);
};

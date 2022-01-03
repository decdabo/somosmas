import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router";
import LoadingSpinner from "../../Components/Spinner/LoadingSpinner";
import useAuthActions from "../../store/hooks/useAuthActions";
import { getUserInfo } from "../../store/slices/authSlice";

const ProtectedRoute = ({ component: Component, path }) => {
	const { role_id, loading } = useAuthActions();
	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(getUserInfo());
	}, []);
	return (
		<Route
			path={path}
			render={() => {
				if (loading) {
					return <LoadingSpinner></LoadingSpinner>;
				} else {
					return role_id === 1 ? <Component /> : <Redirect to="/" />;
				}
			}}
		/>
	);
};

export default ProtectedRoute;

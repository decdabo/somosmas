import { types } from "../types";
import { Get } from "../../Services/publicApiService";

export const setListMembers = (list) => ({
	type: types.MEMBERS_LIST,
	payload: list,
});

export const setErrorMembers = (msg) => ({
	type: types.MEMBERS_ERROR,
	payload: msg,
});

export const listMembersPetitions = () => {
	return async (dispatch) => {
		try {
			const list = await Get("members");
			return dispatch(setListMembers(list.data));
		} catch (error) {
			dispatch(setErrorMembers(error.error));
		}
	};
};

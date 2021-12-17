import { types } from "../types";

const initialState = {
	members: [],
	error: {
		state: false,
		msg: "",
	},
};

export const membersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
	case types.MEMBERS_LIST:
		return{
			...state,
			members: payload,
		};
	case types.MEMBERS_ERROR:
		return{
			...state,
			error: {
				state: true,
				msg: payload,
			},
		};
	default:
		return state;
	}
};

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../Services/publicApiService";
import { Get } from "../../Services/privateApiService";

// ASYNC THUNK FUNCTIONS
/**
 * Async thunk action that validates user authenticity
 * @author Julian Kominovic
 * @function
 * @name validateAuth
 * @async
 * @param {Object} userData - User email and password passed as an object
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @returns {import("@reduxjs/toolkit").AsyncThunk} Async thunk action to dispatch
 *
 */
const validateAuth = createAsyncThunk("auth/validateAuth", async (userData) => {
	const response = await Post("login", userData).catch((err) =>
		console.log(err)
	);
	return response;
});

/**
 * Async thunk action that get user info if it is a token saved in LocalStorage
 * @author Julian Kominovic
 * @function
 * @name getUserInfo
 * @async
 * @returns {import("@reduxjs/toolkit").AsyncThunk} Async thunk action to dispatch
 *
 */
const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
	const response = await Get("auth/me").catch((err) => console.log(err));
	return response;
});

/**
 * Async thunk action that registers a new user
 * @author Julian Kominovic
 * @function
 * @name registerUser
 * @async
 * @param {Object} userData - User email, name and password passed as an object
 * @param {string} userData.email - User email
 * @param {String} userData.name - User name
 * @param {string} userData.password - User password
 * @returns {import("@reduxjs/toolkit").AsyncThunk} Async thunk action to dispatch
 *
 */
const registerUser = createAsyncThunk(
	"auth/register",
	async (registrationData) => {
		const response = await Post("register", registrationData).catch((err) =>
			console.log(err)
		);
		return response;
	}
);

export const authSlice = createSlice({
	name: "auth",
	// ROLES IDs
	// 0 = Default - not set
	// 1 = Admin
	// 2 = Standard
	initialState: {
		isAuth: false,
		id: 0,
		userName: "",
		userEmail: "",
		token: "",
		role_id: 0,
	},
	reducers: {
		logout: (state) => {
			return {
				...state,
				isAuth: false,
				id: 0,
				userName: "",
				userEmail: "",
				token: "",
				role_id: 0,
			};
		},
	},
	extraReducers: (builder) => {
		// ASYNC ACTIONS DOWN BELOW

		// ASYNC THUNK REGISTER USER
		builder.addCase(registerUser.fulfilled, (state, action) => {
			if (action.payload.error) return { ...state };
			const { name, email, id, role_id } = action.payload.data.user;
			const token = action.payload.data.token;

			return {
				...state,
				isAuth: true,
				userEmail: email,
				userName: name,
				id: id,
				token: token,
				role_id: role_id,
			};
		});

		builder.addCase(registerUser.rejected, (state) => {
			return { ...state, isAuth: false };
		});

		// ASYNC THUNK GET USER INFO CASES
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			const response = action.payload;

			if (!response.success) {
				return { ...state, isAuth: false };
			}
			const { id, name, email, role_id } = response.data.user;
			return {
				...state,
				isAuth: true,
				userEmail: email,
				userName: name,
				id: id,
				role_id: role_id,
			};
		});
		builder.addCase(getUserInfo.rejected, (state) => {
			return {
				...state,
				isAuth: false,
			};
		});

		//   ASYNC THUNK VALIDATION CASES
		builder.addCase(validateAuth.fulfilled, (state, action) => {
			const response = action.payload;

			if (response["error"] === "No token") {
				return { ...state, isAuth: false, token: "" };
			}
			localStorage.setItem("token", response.data.token);

			return {
				...state,
				isAuth: true,
				token: response.data.token,
			};
		});
		builder.addCase(validateAuth.rejected, (state) => {
			return { ...state, isAuth: false, token: "", role_id: 0 };
		});
	},
});

export { validateAuth, getUserInfo, registerUser };
export const { logout } = authSlice.actions;
export default authSlice.reducer;

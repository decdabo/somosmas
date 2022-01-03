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
const validateAuth = createAsyncThunk(
	"auth/validateAuth",
	async (userData, { fulfillWithValue }) => {
		const response = await Post("login", userData);
		return fulfillWithValue(response);
	}
);

/**
 * Async thunk action that get user info if it is a token saved in LocalStorage
 * @author Julian Kominovic
 * @function
 * @name getUserInfo
 * @async
 * @returns {import("@reduxjs/toolkit").AsyncThunk} Async thunk action to dispatch
 *
 */
const getUserInfo = createAsyncThunk(
	"auth/getUserInfo",
	async (_, { fulfillWithValue }) => {
		const response = await Get("auth/me");
		return fulfillWithValue(response);
	}
);

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
	async (registrationData, { fulfillWithValue }) => {
		const response = await Post("register", registrationData);
		return fulfillWithValue(response);
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
		error: "",
		loading: true,
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
				error: "",
				loading: false,
			};
		},
	},
	extraReducers: (builder) => {
		// ASYNC ACTIONS DOWN BELOW

		// ASYNC THUNK REGISTER USER
		builder.addCase(registerUser.fulfilled, (state, action) => {
			console.log(action.payload);
			if (action.payload.success) {
				const { name, email, id, role_id } = action.payload.data.user;
				const token = action.payload.data.token;
				localStorage.setItem("token", token);
				return {
					...state,
					isAuth: true,
					userEmail: email,
					userName: name,
					id: id,
					token: token,
					role_id: role_id,
					error: "",
					loading: false,
				};
			}
			return {
				...state,
				isAuth: false,
				id: 0,
				userName: "",
				userEmail: "",
				token: "",
				role_id: 0,
				error: action.payload.error.response.data.message,
				loading: false,
			};
		});

		builder.addCase(registerUser.pending, (state) => {
			return { ...state, loading: true };
		});

		builder.addCase(registerUser.rejected, (state) => {
			return { ...state, isAuth: false, loading: true };
		});

		// ASYNC THUNK GET USER INFO CASES
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			const response = action.payload;

			if (response.success) {
				const { id, name, email, role_id } = response.data.user;
				return {
					...state,
					isAuth: true,
					userEmail: email,
					userName: name,
					id: id,
					role_id: role_id,
					loading: false,
				};
			}
			return {
				...state,
				isAuth: false,
				loading: false,
			};
		});
		builder.addCase(getUserInfo.pending, (state) => {
			return { ...state, loading: true };
		});
		builder.addCase(getUserInfo.rejected, (state) => {
			return {
				...state,
				isAuth: false,
				loading: false,
			};
		});

		//   ASYNC THUNK VALIDATION CASES
		builder.addCase(validateAuth.fulfilled, (state, action) => {
			const response = action.payload;

			if (response["error"] === "No token") {
				return {
					...state,
					isAuth: false,
					token: "",
					loading: false,
					error: "Usuario y/o contraseña incorrectos.",
				};
			}
			localStorage.setItem("token", response.data.token);

			return {
				...state,
				isAuth: true,
				token: response.data.token,
				loading: false,
				error: "",
			};
		});
		builder.addCase(validateAuth.pending, (state) => {
			return { ...state, loading: true, error: "" };
		});
		builder.addCase(validateAuth.rejected, (state) => {
			return { ...state, isAuth: false, token: "", role_id: 0 };
		});
	},
});

export { validateAuth, getUserInfo, registerUser };
export const { logout } = authSlice.actions;
export default authSlice.reducer;

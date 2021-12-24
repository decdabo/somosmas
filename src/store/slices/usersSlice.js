import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Get } from "../../Services/publicApiService";
import urlQueryParams from "../../helpers/urlQueryParams";
const initialState = {
	loading: false,
	error: false,
	data: [],
};

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (searchParams, { rejectWithValue }) => {
		const response = await Get(
			urlQueryParams("users", searchParams.search, searchParams.limit)
		);
		if (response.success) {
			return response.data;
		}
		return rejectWithValue(response.error);
	}
);

const slice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export default slice.reducer;

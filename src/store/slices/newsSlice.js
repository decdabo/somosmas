import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Get } from "../../Services/publicApiService";

const initialState = {
	loading: false,
	error: false,
	data: [],
};
export const fetchNews = createAsyncThunk(
	"news/fetchSlides",
	async (_, { rejectWithValue }) => {
		const response = await Get("news");
		if (response.success) {
			return response.data;
		}
		return rejectWithValue(response.error);
	}
);

const slice = createSlice({
	name: "news",
	initialState: initialState,
	reducers: {
		deleteNew: (state, action) => {
			state.data = state.data.filter((item) => item.id !== action.payload.id);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchNews.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchNews.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchNews.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export const { deleteNew } = slice.actions;
export default slice.reducer;

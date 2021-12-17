import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Get } from "../../Services/publicApiService";

const initialState = {
	loading: false,
	error: false,
	data: [],
};
export const fetchSlides = createAsyncThunk(
	"slides/fetchSlides",
	async (_, {rejectWithValue}) => {
		const response = await Get("slides");
		if (response.success) {
			return response.data;
		}
		return rejectWithValue(response.error);
	}
);

const slice = createSlice({
	name: "slides",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchSlides.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchSlides.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchSlides.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});

	},
});
export default slice.reducer;

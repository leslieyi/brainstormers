import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSavedStudysets = createAsyncThunk(
  "savedStudysets/fetchSavedStudysets",
  () => fetch("/reviewsets").then((response) => response.json())
);

const savedStudysetsSlice = createSlice({
  name: "savedStudysets",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: {
    [fetchSavedStudysets.fulfilled](state, action) {
      state.value = action.payload;
    },
  },
});

export const selectSavedStudysets = (state) => state.savedStudysets.value;
export const selectReviewsetWithStudysetId = (studysetId) => (state) => state.savedStudysets.value.find(
  (reviewset) => reviewset.studyset.id == studysetId
);

export default savedStudysetsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStudysets = createAsyncThunk(
  "studysets/fetchStudysets",
  async ({ mine, sorted }) => {
    const url = mine
      ? sorted
        ? "/my-ordered-studysets"
        : "/my_studysets"
      : sorted
      ? "/ordered-studysets"
      : "/studysets";
    return fetch(url)
      .then((response) => response.json())
      .then((data) => ({ data, mine, sorted }));
  }
);

const studysetsSlice = createSlice({
  name: "studysets",
  initialState: {
    value: [],
    sorted: false,
    mine: false,
  },
  reducers: {},
  extraReducers: {
    [fetchStudysets.fulfilled](state, action) {
      const payload = action.payload;
      state.value = payload.data;
      state.sorted = payload.sorted;
      state.mine = payload.mine;
    },
  },
});

export const selectStudysets = (state) => state.studysets.value;


export default studysetsSlice.reducer;

//selectors are just functions

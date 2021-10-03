import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchOneStudyset = createAsyncThunk(
  "studysets/fetchOneStudyset",
  (id) => fetch(`/studysets/${id}`).then((response) => response.json())
);

const oneStudysetSlice = createSlice({
  name: "oneStudyset",
  initialState: {
    value: null, //empty object is not the same as null!
    editing: null, // null when not editing, id of flashcard when editing
  },
  reducers: {
    edit: (state, action) => {
      state.editing = action.payload;
    },
    cancelEdit: (state) => {
      state.editing = null;
    },
  },
  extraReducers: {
    [fetchOneStudyset.fulfilled](state, action) {
      state.value = action.payload;
      state.editing = null;
    },
  },
});

export const { edit, cancelEdit } = oneStudysetSlice.actions;
export const selectOneStudyset = (state) => state.oneStudyset.value;
export const selectEditing = (state) => {
  return state.oneStudyset.value.flashcards.find(
    (flashcard) => flashcard.id === state.oneStudyset.editing
  );
};
export const selectMine = (state) => {
  const studyset = state.oneStudyset.value;
  return studyset && studyset.user.id === state.user.value.id;
}

export default oneStudysetSlice.reducer;

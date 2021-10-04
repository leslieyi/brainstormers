import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSavedFlashcards = createAsyncThunk(
  "savedFlashcards/fetchSavedFlashcards",
  () => fetch("/reviewcards").then((response) => response.json())
);

const savedFlashcardsSlice = createSlice({
  name: "savedFlashcards",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: {
    [fetchSavedFlashcards.fulfilled](state, action) {
      state.value = action.payload;

    },
  },
});

export const selectSavedFlashcards = (state) => state.savedFlashcards.value;
export const selectReviewcardWithFlashcardId = (flashcardId) => (state) => state.savedFlashcards.value.find(
    (reviewcard) => reviewcard.flashcard.id == flashcardId
  );

export default savedFlashcardsSlice.reducer;

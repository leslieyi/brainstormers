import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import studysetsReducer from "./features/studyset/studysetsSlice";
import oneStudysetReducer from "./features/studyset/oneStudysetSlice";
import savedStudysetsReducer from "./features/savedStudysets/savedStudysetsSlice";
import savedFlashcardsReducer from "./features/flashcards/savedFlashcardsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    studysets: studysetsReducer,
    oneStudyset: oneStudysetReducer,    
    savedStudysets: savedStudysetsReducer,
    savedFlashcards: savedFlashcardsReducer,
  },
});

export default store;
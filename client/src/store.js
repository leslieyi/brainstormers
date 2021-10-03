import { configureStore } from "@reduxjs/toolkit";
import studysetsReducer from "./features/studyset/studysetsSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    studysets: studysetsReducer,
  },
});

export default store;
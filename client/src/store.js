import { configureStore } from "@reduxjs/toolkit";
import studysetsReducer from "./features/studyset/studysetsSlice";
import userReducer from "./features/user/userSlice";
import oneStudysetReducer from "./features/studyset/oneStudysetSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    studysets: studysetsReducer,
    oneStudyset: oneStudysetReducer,    
  },
});

export default store;
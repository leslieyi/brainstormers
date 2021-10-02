import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", () =>
  fetch("/me").then((response) => response.ok ? response.json() : null)
);

export const login = createAsyncThunk("user/login", (user) =>
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((res) => res.json())
);

export const logout = createAsyncThunk("user/logout", () =>
  fetch("/logout", { method: "DELETE" })
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null, // object of @current_user that has an array of studysets
  },
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled](state, action) {
      state.value = action.payload;
    },
    [logout.fulfilled](state) {
      state.value = null;
    },
    [login.fulfilled](state, action) {
      state.value = action.payload;
    },
  },
});

export const selectUser = (state) => { 
  const user = state.user.value;
  return (user && !user.errors) ? user : null;
};

export const selectErrors = (state) => {
  const user = state.user.value;
  return (user && user.errors) ? user.errors : [];
}

export default userSlice.reducer;

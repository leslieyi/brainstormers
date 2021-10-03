// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchMyStudysets = createAsyncThunk(
//   "myStudysets/fetchMyStudysets",
//   () => fetch("/my_studysets").then((response) => response.json())
// );

// export const fetchMyOrderedStudysets = createAsyncThunk(
//   "myStudysets/fetchMyOrderedStudysets",
//   () => fetch("/my_ordered_studysets").then((response) => response.json())
// );

// //Creating a studyset
// export const createStudyset = createAsyncThunk(
//   "myStudysets/createStudyset",
//   (studysetInputValue) =>
//     fetch(`/studysets`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(studysetInputValue),
//     })
//       .then((res) => res.json())
// );

// //Editing a Studyset

// //Deleting A Studyset
// // export const deleteMyStudyset = createAsyncThunk(
// //     "myStudysets/deleteMyStudyset",
// //     () =>     fetch(`/my_studysets/${id}`, {
// //         method: "DELETE",
// //       }).then((r) => {
// //         const newData = studysetsData.filter((studyset) => studyset.id !== id); //
// //         setStudysetsData(newData);

// //         const newReviewsets = reviewsets.filter(
// //           (reviewset) => reviewset.studyset.id !== id
// //         );
// //         setReviewsets(newReviewsets);
// //       });
// // )

// const myStudysetsSlice = createSlice({
//   name: "myStudysets",
//   initialState: {
//     value: [],
//   },
//   reducers: {},
//   extraReducers: {
//     [fetchMyStudysets.fulfilled](state, action) {
//       state.value = action.payload;
//     },
//     [fetchMyOrderedStudysets.fulfilled](state, action) {
//       state.value = action.payload;
//     },
//     [createStudyset.fulfilled](state, action) {
//       state.value.push(action.payload);
//     },
//   },
// });

// export const selectErrors = (state) => {
//   const myStudysets = state.myStudysets.value;
//   return myStudysets && myStudysets.errors ? myStudysets.errors : [];
// };

// export const selectMyStudysets = (state) => state.myStudysets.value;

// export default myStudysetsSlice.reducer;

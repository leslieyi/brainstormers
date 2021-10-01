export function fetchUser() {
    return function (dispatch) {
      dispatch({ type: "user/userLoading" });
      fetch("/me")
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "user/userLoaded", payload: data.username });
        });
    };
  }




const initialState = {
    entities: [], // array of user
    status: "idle", // loading state
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case "user/userLoading": //should be dispatched before the fetch() request is called
        return {
          ...state,
          status: "loading",
        };
      case "user/userLoaded": // should be dispatched along with a payload of the cats JSON collection. 
        return {
          ...state,
          entities: action.payload,
          status: "idle",
        };
      default:
        return state;
    }
  }
import { combineReducers } from "redux";

const initialState = {
  view: "dashboard",
};

const SET_VIEW = "SET_VIEW";

export const viewReducer = (
  state = initialState.view,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_VIEW:
      return state === "dashboard" ? "view_list" : "dashboard";
    default:
      return state;
  }
};

export const setView = () => ({
  type: SET_VIEW,
});

const rootReducer = combineReducers({
  view: viewReducer,
});

export default rootReducer;

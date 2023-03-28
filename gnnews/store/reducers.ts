import { combineReducers } from "redux";

const initialState = {
  view: "dashboard",
  visibleArticles: 0,
};

const SET_VIEW = "SET_VIEW";
const SET_VISIBLE_ARTICLES = "SET_VISIBLE_ARTICLES";

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

export const visibleArticlesReducer = (
  state = initialState.visibleArticles,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_VISIBLE_ARTICLES:
      return action.payload;
    default:
      return state;
  }
};

export const setView = () => ({
  type: SET_VIEW,
});

export const setVisibleArticles = (value: number) => ({
  type: SET_VISIBLE_ARTICLES,
  payload: value,
});

const rootReducer = combineReducers({
  view: viewReducer,
  visibleArticles: visibleArticlesReducer,
});

export default rootReducer;

import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "redux/reducers";

export default function initializeStore(initialState: any) {
  return createStore(
    combineReducers(rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}

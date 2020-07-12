import initialState from "redux/initialStates";
import keyword from "./keyword";

export default (
  state = initialState.search,
  action: { type: string; payload: string },
) => ({
  ...state,
  ...keyword(state, action),
});

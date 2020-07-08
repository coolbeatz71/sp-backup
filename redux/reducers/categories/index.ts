import initialState from "redux/initialStates";
import all from "./all";
import hide from "./hide";

export default (
  state = initialState.categories,
  action: { type: string; payload: any },
) => ({
  ...state,
  ...all(state, action),
  ...hide(state, action),
});

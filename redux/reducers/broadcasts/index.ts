import initialState from "redux/initialStates";
import all from "./all";

export default (
  state = initialState.broadcasts,
  action: { type: string; payload: any },
) => ({
  ...state,
  ...all(state, action),
});

import initialState from "redux/initialStates";
import reset from "./reset";
import change from "./change";
import resetUpdate from "./reset-update";

export default (
  state = initialState.pin,
  action: { type: string; payload: any },
) => ({
  ...state,
  ...reset(state, action),
  ...change(state, action),
  ...resetUpdate(state, action),
});

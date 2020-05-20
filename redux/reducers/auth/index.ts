import initialState from "redux/initialStates";
import signup from "./signup";
import login from "./login";

export default (state = initialState.auth, action: { type: string, payload: any}) => ({
  ...state,
  ...signup(state, action),
  ...login(state, action),
});

import initialState from "redux/initialStates";
import signup from "./signup";
import login from "./login";
import logout from "./logout";

export default (state = initialState.auth, action: { type: string, payload: any}) => ({
  ...state,
  ...signup(state, action),
  ...login(state, action),
  ...logout(state, action),
});

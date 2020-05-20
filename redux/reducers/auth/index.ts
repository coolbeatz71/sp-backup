import initialState from "redux/initialStates";
import signup from "./signup";

export default (state = initialState.auth, action: { type: string, payload: any}) => ({
  ...state,
  ...signup(state, action),
});

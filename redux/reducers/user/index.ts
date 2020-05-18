import initialState from "redux/initialStates";
import currentUser from "./currentUser";

export default (state = initialState.user, action: { type: string, payload: any}) => ({
  ...state,
  ...currentUser(state, action),
});

import initialState from "redux/initialStates";
import currentUser from "./currentUser";
import updateProfile from "./updateProfile";

export default (state = initialState.user, action: { type: string, payload: any}) => ({
  ...state,
  ...currentUser(state, action),
  ...updateProfile(state, action),
});

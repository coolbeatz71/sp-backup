import initialState from "redux/initialStates";
import changeName from "./changeName";

export default (state = initialState.example, action: { type: string, payload: any}) => ({
  ...state,
  ...changeName(state, action),
});

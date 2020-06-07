import initialState from "redux/initialStates";
import feed from "./feed";
import userCauses from "./userCauses";

export default (
  state = initialState.causes,
  action: { type: string; payload: any },
) => {
  return {
    ...state,
    ...feed(state, action),
    ...userCauses(state, action),
  };
};

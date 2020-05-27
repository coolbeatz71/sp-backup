import initialState from "redux/initialStates";
import feed from "./feed";

export default (
  state = initialState.causes,
  action: { type: string, payload: any },
) => {
  return {
    ...state,
    ...feed(state, action),
  };
};

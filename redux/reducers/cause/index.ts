import initialState from "redux/initialStates";
import feed from "./feed";
import userCauses from "./userCauses";
import create from "./create";
import single from "./single";

export default (
  state = initialState.cause,
  action: { type: string; payload: any },
) => {
  return {
    ...state,
    ...feed(state, action),
    ...userCauses(state, action),
    ...create(state, action),
    ...single(state, action),
  };
};

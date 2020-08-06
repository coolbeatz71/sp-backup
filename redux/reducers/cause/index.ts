import initialState from "redux/initialStates";
import feed from "./feed";
import userCauses from "./userCauses";
import create from "./create";
import single from "./single";
import all from "./all";
import donateCause from "./donateCause";
import pauseCause from "./pauseCause";
import edit from "./edit";
import cancelCause from "./cancelCause";

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
    ...all(state, action),
    ...donateCause(state, action),
    ...pauseCause(state, action),
    ...edit(state, action),
    ...cancelCause(state, action),
  };
};

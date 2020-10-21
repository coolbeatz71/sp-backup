import initialState from "redux/initialStates";
import feed from "./feed";
import userCauses from "./userCauses";
import create from "./create";
import single from "./single";
import getDonors from "./getDonors";
import searchDonors from "./searchDonors";
import all from "./all";
import donateCause from "./donateCause";
import pauseCause from "./pauseCause";
import edit from "./edit";
import cancelCause from "./cancelCause";
import resumeCause from "./resumeCause";

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
    ...getDonors(state, action),
    ...searchDonors(state, action),
    ...all(state, action),
    ...donateCause(state, action),
    ...pauseCause(state, action),
    ...edit(state, action),
    ...cancelCause(state, action),
    ...resumeCause(state, action),
  };
};

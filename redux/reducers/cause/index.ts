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
import transfer from "./transfer";

export default (
  state = initialState.cause,
  action: { type: string; payload: any },
) => {
  const post = {
    ...create(state, action),
    ...donateCause(state, action),
    ...transfer(state, action),
  };
  const get = {
    ...feed(state, action),
    ...userCauses(state, action),
    ...single(state, action),
    ...getDonors(state, action),
    ...searchDonors(state, action),
    ...all(state, action),
  };
  const update = {
    ...pauseCause(state, action),
    ...edit(state, action),
    ...cancelCause(state, action),
    ...resumeCause(state, action),
  };

  return {
    ...state,
    ...post,
    ...get,
    ...update,
  };
};

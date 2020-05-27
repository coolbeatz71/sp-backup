import example, { Iexample } from "./example";
import user, { Iuser } from "./user";
import auth, { Iauth } from "./auth";
import causes, { ICauses } from "./causes";
export default {
  example,
  user,
  auth,
  causes,
};

export interface IRootState {
  example: Iexample;
  user: Iuser;
  auth: Iauth;
  causes: ICauses;
}

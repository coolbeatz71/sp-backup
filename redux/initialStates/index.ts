import example, { Iexample } from "./example";
import user, { Iuser } from "./user";
import auth, { Iauth } from "./auth";
import cause, { ICause } from "./cause";
export default {
  example,
  user,
  auth,
  cause,
};

export interface IRootState {
  example: Iexample;
  user: Iuser;
  auth: Iauth;
  cause: ICause;
}

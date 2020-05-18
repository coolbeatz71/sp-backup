import example, { Iexample } from "./example";
import user, { Iuser } from "./user";
import auth, { Iauth } from "./auth";

export default {
  example,
  user,
  auth,
};

export interface IRootState {
  example: Iexample;
  user: Iuser;
  auth: Iauth;
}

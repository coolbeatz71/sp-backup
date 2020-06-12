import example, { Iexample } from "./example";
import user, { Iuser } from "./user";
import auth, { Iauth } from "./auth";
import cause, { ICause } from "./cause";
import categories, { IAllCategories } from "./categories";
export default {
  example,
  user,
  auth,
  cause,
  categories,
};

export interface IRootState {
  example: Iexample;
  user: Iuser;
  auth: Iauth;
  cause: ICause;
  categories: IAllCategories;
}

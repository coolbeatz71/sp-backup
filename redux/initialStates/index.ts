import example, { Iexample } from "./example";
import user, { Iuser } from "./user";
import { auth, Iauth } from "./auth";
import cause, { ICause } from "./cause";
import categories, { IAllCategories } from "./categories";
import pin, { IPinReset } from "./pin";
import search, { ISearchKeyword } from "./search";
export default {
  example,
  user,
  auth,
  cause,
  categories,
  pin,
  search,
};

export interface IRootState {
  example: Iexample;
  user: Iuser;
  auth: Iauth;
  cause: ICause;
  categories: IAllCategories;
  pin: IPinReset;
  search: ISearchKeyword;
}

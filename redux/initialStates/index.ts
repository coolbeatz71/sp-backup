import user, { Iuser } from "./user";
import { auth, Iauth } from "./auth";
import cause, { ICause } from "./cause";
import categories, { IAllCategories } from "./categories";
import broadcasts, { IAllBroadcasts } from "./broadcasts";
import pin, { IPinReset } from "./pin";
import search, { ISearchKeyword } from "./search";
export default {
  user,
  auth,
  cause,
  categories,
  broadcasts,
  pin,
  search,
};

export interface IRootState {
  user: Iuser;
  auth: Iauth;
  cause: ICause;
  categories: IAllCategories;
  broadcasts: IAllBroadcasts;
  pin: IPinReset;
  search: ISearchKeyword;
}

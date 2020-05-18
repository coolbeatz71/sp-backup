import getToken from "helpers/getToken";

export default {
  currentUser: {
    isLoggedin: !!getToken(),
    data: {},
    loading: false,
    error: {},
  },
};

export interface Iuser {
  currentUser: {
    isLoggedin: boolean;
    data: {};
    loading: boolean;
    error: any;
  };
}
